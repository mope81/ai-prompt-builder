import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  query,
  where,
  getDocs
} from 'firebase/firestore';

// Firebase 配置（需要替换为实际的配置）
const firebaseConfig = {
  // 你的 Firebase 配置
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 词库数据管理类
class VocabularyManager {
  constructor() {
    this.vocabularyRef = collection(db, 'vocabulary');
    this.userVocabularyRef = collection(db, 'userVocabulary');
    this.creativePromptsRef = collection(db, 'creativePrompts');
  }

  // 获取系统词库
  async getSystemVocabulary() {
    const docRef = doc(this.vocabularyRef, 'system');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }

  // 获取用户自定义词库
  async getUserVocabulary(userId) {
    const docRef = doc(this.userVocabularyRef, userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }

  // 添加新的类别
  async addCategory(categoryName, description, icon) {
    const docRef = doc(this.vocabularyRef, 'system');
    await updateDoc(docRef, {
      [`categories.${categoryName}`]: {
        name: categoryName,
        description,
        icon,
        values: []
      }
    });
  }

  // 向类别添加新词条
  async addTermToCategory(categoryName, term) {
    const docRef = doc(this.vocabularyRef, 'system');
    await updateDoc(docRef, {
      [`categories.${categoryName}.values`]: arrayUnion(term)
    });
  }

  // 添加用户自定义类别
  async addUserCategory(userId, categoryName, description) {
    const docRef = doc(this.userVocabularyRef, userId);
    await setDoc(docRef, {
      [`categories.${categoryName}`]: {
        name: categoryName,
        description,
        values: []
      }
    }, { merge: true });
  }

  // 添加用户自定义词条
  async addUserTerm(userId, categoryName, term) {
    const docRef = doc(this.userVocabularyRef, userId);
    await updateDoc(docRef, {
      [`categories.${categoryName}.values`]: arrayUnion(term)
    });
  }

  // 保存创意提示词
  async saveCreativePrompt(userId, prompt, categories) {
    await setDoc(doc(this.creativePromptsRef), {
      userId,
      prompt,
      categories,
      timestamp: new Date(),
      likes: 0
    });
  }

  // 获取热门创意提示词
  async getPopularPrompts(limit = 10) {
    const q = query(this.creativePromptsRef, where('likes', '>', 0));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .sort((a, b) => b.likes - a.likes)
      .slice(0, limit);
  }

  // 获取用户的创意提示词
  async getUserPrompts(userId) {
    const q = query(this.creativePromptsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // 导出用户词库
  async exportUserVocabulary(userId) {
    const userVocab = await this.getUserVocabulary(userId);
    return JSON.stringify(userVocab, null, 2);
  }

  // 导入用户词库
  async importUserVocabulary(userId, vocabularyData) {
    const docRef = doc(this.userVocabularyRef, userId);
    await setDoc(docRef, JSON.parse(vocabularyData), { merge: true });
  }

  // 定期更新检查（可以在前端定时调用）
  async checkForUpdates(lastUpdateTimestamp) {
    const docRef = doc(this.vocabularyRef, 'system');
    const docSnap = await getDoc(docRef);
    const systemData = docSnap.data();
    
    return {
      hasUpdates: systemData.lastUpdate > lastUpdateTimestamp,
      lastUpdate: systemData.lastUpdate,
      data: systemData
    };
  }
}

export const vocabularyManager = new VocabularyManager();
