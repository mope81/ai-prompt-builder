// 基础版本词库
const vocabularyDataBasic = {
  zh: {
    subject: {
      person: ['人像', '自拍', '全身照', '特写'],
      nature: ['风景', '日落', '山脉', '海滩', '森林'],
      object: ['静物', '食物', '建筑', '产品'],
      abstract: ['抽象', '概念', '艺术', '创意']
    },
    style: {
      artistic: ['水彩风格', '油画效果', '素描风格', '复古风'],
      mood: ['温暖', '清新', '梦幻', '神秘'],
      technique: ['特写', '全景', '微距', '剪影']
    },
    details: {
      time: ['日出', '黄昏', '夜晚', '清晨'],
      weather: ['晴朗', '多云', '雨天', '雾气'],
      effect: ['柔焦', '虚化', '锐利', '高对比度']
    }
  },
  en: {
    subject: {
      person: ['portrait', 'selfie', 'full body', 'close-up'],
      nature: ['landscape', 'sunset', 'mountains', 'beach', 'forest'],
      object: ['still life', 'food', 'architecture', 'product'],
      abstract: ['abstract', 'concept', 'art', 'creative']
    },
    style: {
      artistic: ['watercolor', 'oil painting', 'sketch', 'vintage'],
      mood: ['warm', 'fresh', 'dreamy', 'mysterious'],
      technique: ['close-up', 'panorama', 'macro', 'silhouette']
    },
    details: {
      time: ['sunrise', 'dusk', 'night', 'morning'],
      weather: ['sunny', 'cloudy', 'rainy', 'foggy'],
      effect: ['soft focus', 'bokeh', 'sharp', 'high contrast']
    }
  }
}

export default vocabularyDataBasic;
