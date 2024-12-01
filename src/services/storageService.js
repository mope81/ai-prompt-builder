// 本地存储服务

const STORAGE_KEYS = {
  PROMPTS: 'saved_prompts',
  TEMPLATES: 'custom_templates',
  FAVORITES: 'favorite_prompts'
};

// 保存提示词
export const savePrompt = (prompt) => {
  try {
    const savedPrompts = getSavedPrompts();
    const newPrompt = {
      id: Date.now().toString(),
      content: prompt,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    savedPrompts.unshift(newPrompt);
    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(savedPrompts));
    return newPrompt;
  } catch (error) {
    console.error('Error saving prompt:', error);
    return null;
  }
};

// 获取保存的提示词
export const getSavedPrompts = () => {
  try {
    const prompts = localStorage.getItem(STORAGE_KEYS.PROMPTS);
    return prompts ? JSON.parse(prompts) : [];
  } catch (error) {
    console.error('Error getting saved prompts:', error);
    return [];
  }
};

// 删除提示词
export const deletePrompt = (promptId) => {
  try {
    const prompts = getSavedPrompts();
    const updatedPrompts = prompts.filter(p => p.id !== promptId);
    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(updatedPrompts));
    return true;
  } catch (error) {
    console.error('Error deleting prompt:', error);
    return false;
  }
};

// 更新提示词
export const updatePrompt = (promptId, newContent) => {
  try {
    const prompts = getSavedPrompts();
    const promptIndex = prompts.findIndex(p => p.id === promptId);
    if (promptIndex === -1) return false;
    
    prompts[promptIndex] = {
      ...prompts[promptIndex],
      content: newContent,
      updatedAt: new Date().toISOString()
    };
    
    localStorage.setItem(STORAGE_KEYS.PROMPTS, JSON.stringify(prompts));
    return true;
  } catch (error) {
    console.error('Error updating prompt:', error);
    return false;
  }
};

// 保存自定义模板
export const saveTemplate = (template) => {
  try {
    const templates = getCustomTemplates();
    const newTemplate = {
      id: Date.now().toString(),
      ...template,
      createdAt: new Date().toISOString()
    };
    templates.unshift(newTemplate);
    localStorage.setItem(STORAGE_KEYS.TEMPLATES, JSON.stringify(templates));
    return newTemplate;
  } catch (error) {
    console.error('Error saving template:', error);
    return null;
  }
};

// 获取自定义模板
export const getCustomTemplates = () => {
  try {
    const templates = localStorage.getItem(STORAGE_KEYS.TEMPLATES);
    return templates ? JSON.parse(templates) : [];
  } catch (error) {
    console.error('Error getting custom templates:', error);
    return [];
  }
};

// 切换收藏状态
export const toggleFavorite = (promptId) => {
  try {
    const favorites = getFavorites();
    const index = favorites.indexOf(promptId);
    
    if (index === -1) {
      favorites.push(promptId);
    } else {
      favorites.splice(index, 1);
    }
    
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.error('Error toggling favorite:', error);
    return false;
  }
};

// 获取收藏列表
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};
