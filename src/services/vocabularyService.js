import { localStorageDB } from '../utils/localStorageDB';

/**
 * 词库服务类
 */
class VocabularyService {
  constructor() {
    this.db = localStorageDB;
  }

  /**
   * 初始化系统词库
   */
  async initializeSystemVocabulary() {
    try {
      const systemVocabulary = await this.db.getSystemVocabulary();
      if (!systemVocabulary) {
        await this.db.setSystemVocabulary(VocabularyTypes.DEFAULT_CATEGORIES);
      }
    } catch (error) {
      console.error('初始化系统词库失败:', error);
      throw error;
    }
  }

  /**
   * 获取系统词库
   */
  async getSystemVocabulary() {
    return await this.db.getSystemVocabulary();
  }

  /**
   * 获取用户词库
   */
  async getUserVocabulary(userId) {
    return await this.db.getUserVocabulary(userId);
  }

  /**
   * 更新系统类别
   */
  async updateSystemCategory(categoryName, categoryData) {
    return await this.db.updateSystemCategory(categoryName, categoryData);
  }

  /**
   * 添加系统词条
   */
  async addSystemTerm(categoryName, term) {
    return await this.db.addSystemTerm(categoryName, term);
  }

  /**
   * 添加用户类别
   */
  async addUserCategory(userId, categoryName, categoryData) {
    return await this.db.addUserCategory(userId, categoryName, categoryData);
  }

  /**
   * 添加用户词条
   */
  async addUserTerm(userId, categoryName, term) {
    return await this.db.addUserTerm(userId, categoryName, term);
  }

  /**
   * 保存创意提示词
   */
  async saveCreativePrompt(userId, promptData) {
    return await this.db.saveCreativePrompt(userId, promptData);
  }

  /**
   * 获取热门提示词
   */
  async getPopularPrompts(limit = 10) {
    return await this.db.getPopularPrompts(limit);
  }

  /**
   * 导出用户词库
   */
  async exportUserVocabulary(userId) {
    return await this.db.exportUserVocabulary(userId);
  }

  /**
   * 导入用户词库
   */
  async importUserVocabulary(userId, vocabularyData) {
    return await this.db.importUserVocabulary(userId, vocabularyData);
  }

  /**
   * 检查更新
   */
  async checkForUpdates(lastUpdateTimestamp) {
    return await this.db.checkForUpdates(lastUpdateTimestamp);
  }
}

// 导出服务实例
export const vocabularyService = new VocabularyService();
