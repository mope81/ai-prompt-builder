import React from 'react';
import { useLoading } from '../contexts/LoadingContext';

export default function TestErrorHandling() {
  const { withLoading } = useLoading();

  // 测试异步加载
  const testAsyncLoading = async () => {
    await withLoading(async () => {
      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('异步操作完成');
    }, '测试异步加载中...');
  };

  // 测试异步错误
  const testAsyncError = async () => {
    try {
      await withLoading(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        throw new Error('测试异步错误');
      }, '即将出现一个错误...');
    } catch (error) {
      console.error('捕获到错误:', error);
    }
  };

  // 测试渲染错误
  const testRenderError = () => {
    throw new Error('测试渲染错误');
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">错误处理测试</h2>
      
      <div className="space-y-4">
        <button
          onClick={testAsyncLoading}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
        >
          测试异步加载
        </button>

        <button
          onClick={testAsyncError}
          className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
        >
          测试异步错误
        </button>

        <button
          onClick={testRenderError}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          测试渲染错误
        </button>
      </div>
    </div>
  );
}
