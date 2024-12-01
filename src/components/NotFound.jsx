import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold mb-4">404 - 页面不存在</h1>
      <p className="text-xl text-gray-400 mb-8">抱歉，您访问的页面不存在。</p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white"
      >
        返回首页
      </Link>
    </div>
  );
}
