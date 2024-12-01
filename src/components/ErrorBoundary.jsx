import React from 'react';

export default function ErrorFallback({error}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center p-8 bg-slate-800/50 backdrop-blur-lg rounded-2xl border border-slate-700">
        <h2 className="text-xl text-red-500 font-semibold mb-4">出错了</h2>
        <pre className="mt-2 text-sm text-gray-400 p-4 bg-slate-900/50 rounded-lg overflow-auto max-w-lg">
          {error.message}
        </pre>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >
          刷新页面
        </button>
      </div>
    </div>
  );
}
