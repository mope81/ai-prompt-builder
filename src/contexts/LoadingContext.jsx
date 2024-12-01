import React, { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState(null);

  const startLoading = useCallback((message = '正在加载...') => {
    setLoadingMessage(message);
    setIsLoading(true);
    setError(null);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setLoadingMessage('');
  }, []);

  const setLoadingError = useCallback((error) => {
    setError(error);
    setIsLoading(false);
    setLoadingMessage('');
  }, []);

  // 包装异步操作的辅助函数
  const withLoading = useCallback(async (asyncFn, message = '正在加载...') => {
    try {
      startLoading(message);
      const result = await asyncFn();
      stopLoading();
      return result;
    } catch (error) {
      setLoadingError(error);
      throw error;
    }
  }, [startLoading, stopLoading, setLoadingError]);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingMessage,
        error,
        startLoading,
        stopLoading,
        setLoadingError,
        withLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
