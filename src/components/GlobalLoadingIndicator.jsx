import React from 'react';

export default function GlobalLoadingIndicator({ fullScreen = true }) {
  const containerClasses = fullScreen 
    ? "fixed inset-0 flex items-center justify-center bg-[#0B0F17]/80 backdrop-blur-sm z-50"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* 主要加载动画 */}
        <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
        {/* 内圈动画 */}
        <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-purple-500/20 border-b-purple-500 animate-spin animate-delay-150" />
        {/* 加载文字 */}
        <div className="mt-4 text-center text-gray-400 text-sm">
          正在加载...
        </div>
      </div>
    </div>
  );
}
