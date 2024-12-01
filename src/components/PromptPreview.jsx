import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardDocumentIcon,
  ArrowPathIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

export default function PromptPreview({ prompt, onRegenerate }) {
  const [copied, setCopied] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [error, setError] = useState(null);

  // 复制到剪贴板
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setError(null);
    } catch (err) {
      setError('复制失败，请重试');
      console.error('复制失败:', err);
    }
  };

  // 重新生成
  const handleRegenerate = async () => {
    if (!prompt || regenerating) return;
    
    try {
      setRegenerating(true);
      setError(null);
      await onRegenerate();
    } catch (err) {
      setError('重新生成失败，请重试');
      console.error('重新生成失败:', err);
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-200">预览</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors relative"
            title="复制到剪贴板"
          >
            {copied ? (
              <motion.span
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center text-green-500"
              >
                ✓
              </motion.span>
            ) : (
              <DocumentDuplicateIcon className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={handleRegenerate}
            disabled={!prompt || regenerating}
            className={`p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors ${
              (!prompt || regenerating) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="重新生成"
          >
            <ArrowPathIcon className={`w-5 h-5 ${regenerating ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 提示词显示区域 */}
      <div className="mt-4">
        {prompt ? (
          <p className="text-gray-300 whitespace-pre-wrap break-words">
            {prompt}
          </p>
        ) : (
          <p className="text-gray-500 italic">
            点击生成按钮开始创建提示词...
          </p>
        )}
      </div>

      {/* 错误提示 */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}
