import React, { createContext, useContext, useState, useCallback } from 'react';
import { localStorageDB } from '../utils/localStorageDB';
import { VocabularyTypes } from '../models/VocabularyTypes';

const VocabularyContext = createContext();

export function VocabularyProvider({ children }) {
  const [systemVocabulary, setSystemVocabulary] = useState(VocabularyTypes.SystemVocabulary);
  const [userVocabulary, setUserVocabulary] = useState(VocabularyTypes.UserVocabulary);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 加载系统词库
  const loadSystemVocabulary = useCallback(async () => {
    try {
      setLoading(true);
      const data = await localStorageDB.getSystemVocabulary();
      setSystemVocabulary(data);
      setError(null);
    } catch (err) {
      console.error('加载系统词库失败:', err);
      setError('加载系统词库失败');
    } finally {
      setLoading(false);
    }
  }, []);

  // 加载用户词库
  const loadUserVocabulary = useCallback(async (userId) => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const data = await localStorageDB.getUserVocabulary(userId);
      setUserVocabulary(data);
      setError(null);
    } catch (err) {
      console.error('加载用户词库失败:', err);
      setError('加载用户词库失败');
    } finally {
      setLoading(false);
    }
  }, []);

  // 添加用户类别
  const addUserCategory = useCallback(async (userId, categoryName, categoryData) => {
    if (!userId || !categoryName) return;
    
    try {
      setLoading(true);
      await localStorageDB.addUserCategory(userId, categoryName, categoryData);
      await loadUserVocabulary(userId);
      setError(null);
    } catch (err) {
      console.error('添加用户类别失败:', err);
      setError('添加用户类别失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadUserVocabulary]);

  // 添加用户词条
  const addUserTerm = useCallback(async (userId, categoryName, term) => {
    if (!userId || !categoryName || !term) return;
    
    try {
      setLoading(true);
      await localStorageDB.addUserTerm(userId, categoryName, term);
      await loadUserVocabulary(userId);
      setError(null);
    } catch (err) {
      console.error('添加用户词条失败:', err);
      setError('添加用户词条失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadUserVocabulary]);

  // 导出词库
  const exportVocabulary = useCallback(async (userId) => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const data = await localStorageDB.exportUserVocabulary(userId);
      setError(null);
      return data;
    } catch (err) {
      console.error('导出词库失败:', err);
      setError('导出词库失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 导入词库
  const importVocabulary = useCallback(async (userId, data) => {
    if (!userId || !data) return;
    
    try {
      setLoading(true);
      await localStorageDB.importUserVocabulary(userId, data);
      await loadUserVocabulary(userId);
      setError(null);
    } catch (err) {
      console.error('导入词库失败:', err);
      setError('导入词库失败');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadUserVocabulary]);

  // 初始化
  React.useEffect(() => {
    loadSystemVocabulary();
  }, [loadSystemVocabulary]);

  // 清理函数
  const cleanup = useCallback(() => {
    setSystemVocabulary(VocabularyTypes.SystemVocabulary);
    setUserVocabulary(VocabularyTypes.UserVocabulary);
    setLoading(false);
    setError(null);
  }, []);

  const value = {
    systemVocabulary,
    userVocabulary,
    loading,
    error,
    loadUserVocabulary,
    addUserCategory,
    addUserTerm,
    exportVocabulary,
    importVocabulary,
    cleanup
  };

  return (
    <VocabularyContext.Provider value={value}>
      {children}
    </VocabularyContext.Provider>
  );
}

export function useVocabulary() {
  const context = useContext(VocabularyContext);
  if (!context) {
    throw new Error('useVocabulary must be used within a VocabularyProvider');
  }
  return context;
}
