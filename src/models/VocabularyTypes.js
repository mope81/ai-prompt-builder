/**
 * @typedef {Object} Category
 * @property {string} name - 类别名称
 * @property {string} description - 类别描述
 * @property {string[]} values - 词条列表
 */

/**
 * @typedef {Object} SystemVocabulary
 * @property {Object.<string, Category>} categories - 系统词库类别
 * @property {number} lastUpdate - 最后更新时间戳
 */

/**
 * @typedef {Object} UserCategory
 * @property {string} name - 类别名称
 * @property {string} description - 类别描述
 * @property {string[]} values - 词条列表
 */

/**
 * @typedef {Object} UserVocabulary
 * @property {string} userId - 用户ID
 * @property {Object.<string, UserCategory>} categories - 用户词库类别
 */

/**
 * @typedef {Object} CreativePrompt
 * @property {string} id - 提示词ID
 * @property {string} userId - 创建者ID
 * @property {string} prompt - 提示词内容
 * @property {string[]} categories - 相关类别
 * @property {Date} timestamp - 创建时间
 * @property {number} likes - 点赞数
 */

// 默认系统词库类别
export const DEFAULT_CATEGORIES = {
  subject: {
    name: "主题",
    description: "图像的主要内容和主题",
    values: [
      "风景", "人物", "动物", "建筑",
      "静物", "抽象", "科幻", "奇幻"
    ]
  },
  style: {
    name: "风格",
    description: "艺术风格和表现手法",
    values: [
      "写实", "印象派", "抽象派", "极简主义",
      "赛博朋克", "蒸汽朋克", "复古", "未来主义"
    ]
  },
  mood: {
    name: "情绪",
    description: "图像传达的情感和氛围",
    values: [
      "欢快", "忧郁", "神秘", "温暖",
      "冷酷", "梦幻", "紧张", "平静"
    ]
  },
  lighting: {
    name: "光照",
    description: "光线效果和氛围",
    values: [
      "自然光", "人工光", "暖光", "冷光",
      "逆光", "柔光", "强光", "环境光"
    ]
  },
  color: {
    name: "色彩",
    description: "主要色调和配色方案",
    values: [
      "明亮", "暗沉", "单色", "多彩",
      "暖色调", "冷色调", "黑白", "复古色"
    ]
  },
  composition: {
    name: "构图",
    description: "画面构图和布局",
    values: [
      "对称", "黄金分割", "居中", "三分法",
      "对角线", "框架式", "前景突出", "环形"
    ]
  }
};

// 词库数据结构类型定义
export const VocabularyTypes = {
  DEFAULT_CATEGORIES,
  
  // 系统词库结构
  SystemVocabulary: {
    categories: DEFAULT_CATEGORIES,
    lastUpdate: new Date().toISOString()
  },
  
  // 用户词库结构
  UserVocabulary: {
    categories: {},
    lastUpdate: new Date().toISOString()
  },
  
  // 类别结构
  Category: {
    name: "",
    description: "",
    values: []
  }
};
