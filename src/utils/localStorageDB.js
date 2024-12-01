import { VocabularyTypes } from '../models/VocabularyTypes';

/**
 * 本地存储数据库服务
 */
class LocalStorageDB {
  constructor() {
    this.SYSTEM_VOCABULARY_KEY = 'systemVocabulary';
    this.USER_VOCABULARY_KEY = 'userVocabulary';
    
    // 初始化检查
    this.initializeStorage();
  }

  // 初始化存储
  initializeStorage() {
    // 检查系统词库是否存在，不存在则初始化
    if (!localStorage.getItem(this.SYSTEM_VOCABULARY_KEY)) {
      localStorage.setItem(
        this.SYSTEM_VOCABULARY_KEY, 
        JSON.stringify(VocabularyTypes.SystemVocabulary)
      );
    }
  }

  // 获取系统词库
  async getSystemVocabulary() {
    try {
      const data = localStorage.getItem(this.SYSTEM_VOCABULARY_KEY);
      return data ? JSON.parse(data) : VocabularyTypes.SystemVocabulary;
    } catch (error) {
      console.error('获取系统词库失败:', error);
      return VocabularyTypes.SystemVocabulary;
    }
  }

  // 获取用户词库
  async getUserVocabulary(userId) {
    try {
      const key = `${this.USER_VOCABULARY_KEY}_${userId}`;
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : VocabularyTypes.UserVocabulary;
    } catch (error) {
      console.error('获取用户词库失败:', error);
      return VocabularyTypes.UserVocabulary;
    }
  }

  // 更新系统类别
  async updateSystemCategory(categoryName, categoryData) {
    try {
      const vocabulary = await this.getSystemVocabulary();
      vocabulary.categories[categoryName] = {
        ...VocabularyTypes.Category,
        ...categoryData
      };
      vocabulary.lastUpdate = new Date().toISOString();
      localStorage.setItem(this.SYSTEM_VOCABULARY_KEY, JSON.stringify(vocabulary));
    } catch (error) {
      console.error('更新系统类别失败:', error);
      throw error;
    }
  }

  // 添加系统词条
  async addSystemTerm(categoryName, term) {
    try {
      const vocabulary = await this.getSystemVocabulary();
      if (!vocabulary.categories[categoryName]) {
        vocabulary.categories[categoryName] = {
          ...VocabularyTypes.Category,
          name: categoryName
        };
      }
      
      const category = vocabulary.categories[categoryName];
      if (!category.values.includes(term)) {
        category.values.push(term);
        vocabulary.lastUpdate = new Date().toISOString();
        localStorage.setItem(this.SYSTEM_VOCABULARY_KEY, JSON.stringify(vocabulary));
      }
    } catch (error) {
      console.error('添加系统词条失败:', error);
      throw error;
    }
  }

  // 添加用户类别
  async addUserCategory(userId, categoryName, categoryData) {
    try {
      const key = `${this.USER_VOCABULARY_KEY}_${userId}`;
      const vocabulary = await this.getUserVocabulary(userId);
      vocabulary.categories[categoryName] = {
        ...VocabularyTypes.Category,
        ...categoryData
      };
      vocabulary.lastUpdate = new Date().toISOString();
      localStorage.setItem(key, JSON.stringify(vocabulary));
    } catch (error) {
      console.error('添加用户类别失败:', error);
      throw error;
    }
  }

  // 添加用户词条
  async addUserTerm(userId, categoryName, term) {
    try {
      const key = `${this.USER_VOCABULARY_KEY}_${userId}`;
      const vocabulary = await this.getUserVocabulary(userId);
      if (!vocabulary.categories[categoryName]) {
        vocabulary.categories[categoryName] = {
          ...VocabularyTypes.Category,
          name: categoryName
        };
      }
      
      const category = vocabulary.categories[categoryName];
      if (!category.values.includes(term)) {
        category.values.push(term);
        vocabulary.lastUpdate = new Date().toISOString();
        localStorage.setItem(key, JSON.stringify(vocabulary));
      }
    } catch (error) {
      console.error('添加用户词条失败:', error);
      throw error;
    }
  }

  // 导出用户词库
  async exportUserVocabulary(userId) {
    try {
      const vocabulary = await this.getUserVocabulary(userId);
      return JSON.stringify(vocabulary, null, 2);
    } catch (error) {
      console.error('导出用户词库失败:', error);
      throw error;
    }
  }

  // 导入用户词库
  async importUserVocabulary(userId, vocabularyData) {
    try {
      const key = `${this.USER_VOCABULARY_KEY}_${userId}`;
      const data = typeof vocabularyData === 'string' 
        ? JSON.parse(vocabularyData) 
        : vocabularyData;
      
      // 验证导入的数据结构
      if (!data.categories) {
        throw new Error('无效的词库数据格式');
      }
      
      data.lastUpdate = new Date().toISOString();
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('导入用户词库失败:', error);
      throw error;
    }
  }

  // 检查更新
  async checkForUpdates(lastUpdateTimestamp) {
    try {
      const vocabulary = await this.getSystemVocabulary();
      const currentUpdate = new Date(vocabulary.lastUpdate);
      const lastUpdate = lastUpdateTimestamp ? new Date(lastUpdateTimestamp) : new Date(0);
      
      return {
        hasUpdates: currentUpdate > lastUpdate,
        lastUpdate: vocabulary.lastUpdate,
        data: vocabulary
      };
    } catch (error) {
      console.error('检查更新失败:', error);
      throw error;
    }
  }
}

// 导出数据库实例
export const localStorageDB = new LocalStorageDB();
