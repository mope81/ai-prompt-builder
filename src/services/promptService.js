// 本地提示词服务
export const promptService = {
  // 获取关键词类别
  getCategory(keyword) {
    const categories = {
      subject: ['人物', '风景', '动物', '建筑', '静物'],
      style: ['写实', '抽象', '印象派', '超现实', '极简'],
      mood: ['欢快', '忧郁', '平静', '神秘', '激情'],
      lighting: ['自然光', '人工光', '暖光', '冷光', '逆光'],
      color: ['暖色', '冷色', '单色', '多彩', '黑白'],
      composition: ['对称', '三分法', '黄金分割', '中心构图', '对角线'],
      quality: ['高清', '精细', '细节', '锐利', '柔和']
    }
    
    return Object.entries(categories).find(([_, keywords]) => 
      keywords.some(k => keyword.toLowerCase().includes(k))
    )?.[0] || null
  },

  // 获取类别的所有关键词
  getCategoryKeywords(category) {
    const keywords = {
      subject: ['人物', '风景', '动物', '建筑', '静物', '抽象', '自然'],
      style: ['写实', '抽象', '印象派', '超现实', '极简', '后现代', '古典'],
      mood: ['欢快', '忧郁', '平静', '神秘', '激情', '温馨', '浪漫'],
      lighting: ['自然光', '人工光', '暖光', '冷光', '逆光', '侧光', '顶光'],
      color: ['暖色', '冷色', '单色', '多彩', '黑白', '饱和', '柔和'],
      composition: ['对称', '三分法', '黄金分割', '中心构图', '对角线', '框架', '前景'],
      quality: ['高清', '精细', '细节', '锐利', '柔和', '质感', '纹理']
    }
    
    return keywords[category] || []
  }
}

// 提示词服务
const API_ENDPOINT = 'https://api.example.com/prompts' // 替换为实际的API端点

// 获取相关提示词
export const fetchRelatedPrompts = async (category, options = {}) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/related/${category}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.prompts
  } catch (error) {
    console.error('获取在线提示词失败:', error)
    return null
  }
}

// 获取热门提示词
export const fetchTrendingPrompts = async (limit = 10) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/trending?limit=${limit}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.prompts
  } catch (error) {
    console.error('获取热门提示词失败:', error)
    return []
  }
}

// 提交新的提示词
export const submitPrompt = async (prompt) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prompt)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error('提交提示词失败:', error)
    return false
  }
}

// 获取提示词建议
export const fetchPromptSuggestions = async (input, limit = 5) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/suggestions?input=${encodeURIComponent(input)}&limit=${limit}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.suggestions
  } catch (error) {
    console.error('获取提示词建议失败:', error)
    return []
  }
}

// 获取提示词评分
export const getPromptRating = async (prompt) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.rating
  } catch (error) {
    console.error('获取提示词评分失败:', error)
    return null
  }
}

// 本地提示词缓存
const promptCache = {
  cache: new Map(),
  maxAge: 1000 * 60 * 60, // 1小时

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    })
  },

  get(key) {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > this.maxAge) {
      this.cache.delete(key)
      return null
    }

    return item.value
  },

  clear() {
    this.cache.clear()
  }
}

// 带缓存的提示词获取
export const getCachedPrompts = async (category, options = {}) => {
  const cacheKey = `${category}-${JSON.stringify(options)}`
  const cachedResult = promptCache.get(cacheKey)
  
  if (cachedResult) {
    return cachedResult
  }

  const prompts = await fetchRelatedPrompts(category, options)
  if (prompts) {
    promptCache.set(cacheKey, prompts)
  }

  return prompts
}

// 导出缓存系统供其他模块使用
export const cache = promptCache
