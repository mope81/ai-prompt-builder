import React, { useState, useEffect } from 'react';
import { vocabularyManager } from '../utils/vocabularyDB';

export default function VocabularyManager({ userId }) {
  const [systemVocabulary, setSystemVocabulary] = useState(null);
  const [userVocabulary, setUserVocabulary] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [newTerm, setNewTerm] = useState({ category: '', term: '' });
  const [popularPrompts, setPopularPrompts] = useState([]);

  useEffect(() => {
    loadVocabularies();
    loadPopularPrompts();
  }, [userId]);

  const loadVocabularies = async () => {
    const sysVocab = await vocabularyManager.getSystemVocabulary();
    const userVocab = await vocabularyManager.getUserVocabulary(userId);
    setSystemVocabulary(sysVocab);
    setUserVocabulary(userVocab);
  };

  const loadPopularPrompts = async () => {
    const prompts = await vocabularyManager.getPopularPrompts();
    setPopularPrompts(prompts);
  };

  const handleAddUserCategory = async (e) => {
    e.preventDefault();
    await vocabularyManager.addUserCategory(
      userId,
      newCategory.name,
      newCategory.description
    );
    setNewCategory({ name: '', description: '' });
    await loadVocabularies();
  };

  const handleAddUserTerm = async (e) => {
    e.preventDefault();
    await vocabularyManager.addUserTerm(
      userId,
      newTerm.category,
      newTerm.term
    );
    setNewTerm({ category: '', term: '' });
    await loadVocabularies();
  };

  const handleExport = async () => {
    const data = await vocabularyManager.exportUserVocabulary(userId);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vocabulary-export.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          await vocabularyManager.importUserVocabulary(userId, e.target.result);
          await loadVocabularies();
        } catch (error) {
          console.error('Import failed:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">词库管理</h2>
      
      {/* 系统词库展示 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">系统词库</h3>
        <div className="grid grid-cols-3 gap-4">
          {systemVocabulary?.categories && Object.entries(systemVocabulary.categories).map(([key, category]) => (
            <div key={key} className="border p-4 rounded-lg">
              <h4 className="font-medium">{category.name}</h4>
              <p className="text-sm text-gray-600">{category.description}</p>
              <div className="mt-2">
                {category.values.map((term, i) => (
                  <span key={i} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 用户词库管理 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">我的词库</h3>
        
        {/* 添加新类别 */}
        <form onSubmit={handleAddUserCategory} className="mb-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="类别名称"
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="类别描述"
              value={newCategory.description}
              onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
              className="border rounded px-3 py-2 flex-1"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              添加类别
            </button>
          </div>
        </form>

        {/* 添加新词条 */}
        <form onSubmit={handleAddUserTerm} className="mb-4">
          <div className="flex gap-4">
            <select
              value={newTerm.category}
              onChange={(e) => setNewTerm({...newTerm, category: e.target.value})}
              className="border rounded px-3 py-2"
            >
              <option value="">选择类别</option>
              {userVocabulary?.categories && Object.keys(userVocabulary.categories).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="新词条"
              value={newTerm.term}
              onChange={(e) => setNewTerm({...newTerm, term: e.target.value})}
              className="border rounded px-3 py-2 flex-1"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              添加词条
            </button>
          </div>
        </form>

        {/* 用户词库展示 */}
        <div className="grid grid-cols-3 gap-4">
          {userVocabulary?.categories && Object.entries(userVocabulary.categories).map(([key, category]) => (
            <div key={key} className="border p-4 rounded-lg">
              <h4 className="font-medium">{category.name}</h4>
              <p className="text-sm text-gray-600">{category.description}</p>
              <div className="mt-2">
                {category.values.map((term, i) => (
                  <span key={i} className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 导入导出 */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">导入/导出</h3>
        <div className="flex gap-4">
          <button
            onClick={handleExport}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            导出词库
          </button>
          <label className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer">
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

      {/* 热门提示词展示 */}
      <div>
        <h3 className="text-xl font-semibold mb-4">热门创意提示词</h3>
        <div className="space-y-4">
          {popularPrompts.map((prompt) => (
            <div key={prompt.id} className="border p-4 rounded-lg">
              <p className="text-lg">{prompt.prompt}</p>
              <div className="mt-2">
                {prompt.categories.map((category, i) => (
                  <span key={i} className="inline-block bg-purple-100 rounded-full px-3 py-1 text-sm mr-2">
                    {category}
                  </span>
                ))}
                <span className="text-sm text-gray-500">
                  👍 {prompt.likes}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
