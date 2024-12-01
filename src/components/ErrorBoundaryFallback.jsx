import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  const handleReset = () => {
    // 尝试重置错误
    resetErrorBoundary();
  };

  const handleGoHome = () => {
    // 返回首页并重置错误
    navigate('/');
    resetErrorBoundary();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-rose-900 p-4">
      <div className="bg-black/30 backdrop-blur-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-red-400 mb-4">出现了一些问题</h2>
        <div className="bg-black/20 rounded p-4 mb-4 overflow-auto max-h-40">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap">
            {error.message}
            {error.stack && '\n\n' + error.stack}
          </pre>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            重试
          </button>
          <button
            onClick={handleGoHome}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
          >
            返回首页
          </button>
        </div>
      </div>
    </div>
  );
}
