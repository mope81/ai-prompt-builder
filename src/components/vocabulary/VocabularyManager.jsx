import React, { useEffect, useState, useCallback } from 'react';
import { useVocabulary } from '../../contexts/VocabularyContext';

export default function VocabularyManager({ userId }) {
  const {
    systemVocabulary,
    userVocabulary,
    loading,
    error,
    loadUserVocabulary,
    addUserCategory,
    addUserTerm,
    exportVocabulary,
    importVocabulary,
    cleanup,
    setUserVocabulary,
    saveVocabularyToStorage
  } = useVocabulary();

  const [newCategoryName, setNewCategoryName] = useState('');
  const [newTerm, setNewTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [newTerms, setNewTerms] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});

  // 使用 useCallback 包装加载函数
  const loadData = useCallback(async () => {
    if (userId) {
      try {
        await loadUserVocabulary(userId);
      } catch (err) {
        console.error('加载用户数据失败:', err);
      }
    }
  }, [userId, loadUserVocabulary]);

  useEffect(() => {
    let isSubscribed = true;

    const init = async () => {
      if (isSubscribed) {
        await loadData();
      }
    };

    init();

    return () => {
      isSubscribed = false;
      cleanup && cleanup();
    };
  }, [loadData, cleanup]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      await addUserCategory(userId, newCategoryName, {
        name: newCategoryName,
        description: '',
        values: []
      });
      setNewCategoryName('');
    } catch (err) {
      console.error('添加类别失败:', err);
    }
  };

  const handleAddTerm = async (categoryId) => {
    if (!newTerms[categoryId].trim() || !categoryId) return;

    try {
      await addUserTerm(userId, categoryId, newTerms[categoryId]);
      setNewTerms((prev) => ({ ...prev, [categoryId]: '' }));
    } catch (err) {
      console.error('添加词条失败:', err);
    }
  };

  const handleNewTermChange = (categoryId, value) => {
    setNewTerms((prev) => ({ ...prev, [categoryId]: value }));
  };

  const handleDeleteTerm = (categoryId, term) => {
    const updatedVocabulary = { ...userVocabulary };
    const category = updatedVocabulary.categories[categoryId];
    if (category) {
      category.values = category.values.filter(v => v !== term);
      setUserVocabulary(updatedVocabulary);
      saveVocabularyToStorage(updatedVocabulary);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedVocabulary = { ...userVocabulary };
    updatedVocabulary.categories = Object.fromEntries(
      Object.entries(updatedVocabulary.categories).filter(([key]) => key !== categoryId)
    );
    setUserVocabulary(updatedVocabulary);
    saveVocabularyToStorage(updatedVocabulary);
  };

  const handleStartEditCategory = (categoryId, categoryName) => {
    setEditingCategory(categoryId);
    setEditCategoryName(categoryName);
  };

  const handleSaveCategory = (categoryId) => {
    if (!editCategoryName.trim()) return;

    const updatedVocabulary = { ...userVocabulary };
    const categoryData = updatedVocabulary.categories[categoryId];
    
    // 创建新的类别对象
    const newCategory = {
      name: editCategoryName,
      values: categoryData.values || []
    };

    // 删除旧的类别
    delete updatedVocabulary.categories[categoryId];

    // 添加新的类别（使用新的ID）
    const newId = editCategoryName.toLowerCase().replace(/\s+/g, '-');
    updatedVocabulary.categories[newId] = newCategory;

    setUserVocabulary(updatedVocabulary);
    saveVocabularyToStorage(updatedVocabulary);
    setEditingCategory(null);
    setEditCategoryName('');
  };

  const handleExport = async () => {
    try {
      const data = await exportVocabulary(userId);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vocabulary_export.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('导出失败:', err);
    }
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = JSON.parse(event.target.result);
        await importVocabulary(userId, data);
      };
      reader.readAsText(file);
    } catch (err) {
      console.error('导入失败:', err);
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  if (loading) {
    return <div className="p-4">加载中...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="pt-20">
        {/* 页面标题和操作栏 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white/5 backdrop-blur-sm rounded-lg p-6">
            <h1 className="text-4xl font-bold text-white mb-4 sm:mb-0">
              词库管理
            </h1>
            <div className="flex gap-4">
              <button
                onClick={handleExport}
                className="px-6 py-2.5 bg-blue-500 hover:bg-blue-400 text-white rounded-lg transition-colors"
              >
                导出词库
              </button>
              <label className="px-6 py-2.5 bg-green-500 hover:bg-green-400 text-white rounded-lg transition-colors cursor-pointer">
                导入词库
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* 主要内容区域 - 使用两栏布局 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左侧系统词库面板 */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">系统词库</h2>
                  <button
                    onClick={() => setExpandedCategories(prev => {
                      const allCategories = {};
                      Object.keys(systemVocabulary?.categories || {}).forEach(key => {
                        allCategories[key] = !Object.values(prev).some(v => v);
                      });
                      return allCategories;
                    })}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {Object.values(expandedCategories).some(v => v) ? '全部折叠' : '全部展开'}
                  </button>
                </div>
                <div className="space-y-2">
                  {systemVocabulary?.categories && Object.entries(systemVocabulary.categories).map(([key, category]) => (
                    <div key={key} className="bg-white/5 rounded-lg">
                      <button
                        className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors"
                        onClick={() => toggleCategory(key)}
                      >
                        <span className="text-white font-medium">{category.name}</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className={`h-5 w-5 text-blue-400 transform transition-transform ${expandedCategories[key] ? 'rotate-180' : ''}`} 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {expandedCategories[key] && (
                        <div className="px-3 pb-3 space-y-1">
                          {category.values && category.values.map((term, index) => (
                            <div key={index} className="text-gray-300 text-sm pl-4 py-1">
                              {term}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 右侧用户词库管理区域 */}
            <div className="flex-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">用户词库</h2>
                </div>

                {/* 添加新类别 */}
                <div className="mb-8">
                  <div className="flex gap-4 items-center">
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="flex-1 bg-white/10 text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      placeholder="输入新类别名称..."
                    />
                    <button
                      onClick={handleAddCategory}
                      className="px-6 py-2.5 bg-purple-500 hover:bg-purple-400 text-white rounded-lg transition-colors"
                    >
                      添加类别
                    </button>
                  </div>
                </div>

                {/* 用户词库列表 */}
                <div className="space-y-6">
                  {userVocabulary?.categories && Object.entries(userVocabulary.categories).map(([categoryId, category]) => (
                    <div key={categoryId} className="bg-white/5 rounded-lg p-4">
                      {/* 类别标题和操作按钮 */}
                      <div className="flex justify-between items-center mb-4">
                        {editingCategory === categoryId ? (
                          <input
                            type="text"
                            value={editCategoryName}
                            onChange={(e) => setEditCategoryName(e.target.value)}
                            className="flex-1 bg-white/10 text-white rounded px-3 py-1 mr-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          />
                        ) : (
                          <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                        )}
                        <div className="flex gap-2">
                          {editingCategory === categoryId ? (
                            <button
                              onClick={() => handleSaveCategory(categoryId)}
                              className="text-green-400 hover:text-green-300 p-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStartEditCategory(categoryId, category.name)}
                              className="text-blue-400 hover:text-blue-300 p-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteCategory(categoryId)}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* 词条列表 */}
                      <div className="space-y-2">
                        {category.values && category.values.map((term, index) => (
                          <div key={index} className="flex items-center justify-between bg-white/5 rounded p-2">
                            <span className="text-white">{term}</span>
                            <button
                              onClick={() => handleDeleteTerm(categoryId, term)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* 添加新词条 */}
                      <div className="flex gap-2 mt-4">
                        <input
                          type="text"
                          value={newTerms[categoryId] || ''}
                          onChange={(e) => handleNewTermChange(categoryId, e.target.value)}
                          className="flex-1 bg-white/5 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                          placeholder="添加新词条..."
                        />
                        <button
                          onClick={() => handleAddTerm(categoryId)}
                          className="px-4 py-2 bg-purple-500 hover:bg-purple-400 text-white rounded transition-colors"
                        >
                          添加
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
