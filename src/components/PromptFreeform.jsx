import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  PlusIcon, 
  XMarkIcon,
  PencilSquareIcon,
  TagIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

function PromptFreeform({ onSave, availableTags = [] }) {
  const [freeformText, setFreeformText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [showTagPanel, setShowTagPanel] = useState(false);

  // 生成最终的提示词
  const finalPrompt = useCallback(() => {
    let prompt = freeformText;
    if (selectedTags.length > 0) {
      prompt += '\\n' + selectedTags.join(', ');
    }
    return prompt;
  }, [freeformText, selectedTags]);

  // 复制到剪贴板
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalPrompt());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  // 保存提示词
  const handleSave = () => {
    if (onSave && (freeformText.trim() || selectedTags.length > 0)) {
      onSave({
        content: finalPrompt(),
        tags: selectedTags,
        freeform: freeformText,
        type: 'freeform',
        timestamp: new Date().toISOString()
      });
    }
  };

  // 添加或移除标签
  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // 重置所有内容
  const handleReset = () => {
    setFreeformText('');
    setSelectedTags([]);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PencilSquareIcon className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-medium text-white">自由创作</h2>
        </div>
        <button
          onClick={() => setShowTagPanel(!showTagPanel)}
          className={`px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all
            ${showTagPanel 
              ? 'bg-blue-500/20 text-blue-400' 
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
        >
          <TagIcon className="w-4 h-4" />
          <span className="text-sm">标签面板</span>
        </button>
      </div>

      {/* 输入区域 */}
      <div className="mb-4">
        <textarea
          value={freeformText}
          onChange={(e) => setFreeformText(e.target.value)}
          placeholder="在这里输入你的提示词..."
          className="w-full h-32 bg-black/20 text-white placeholder-gray-500 rounded-lg p-3 
            focus:ring-2 focus:ring-blue-500/50 focus:outline-none resize-none"
        />
      </div>

      {/* 标签面板 */}
      {showTagPanel && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="mb-4"
        >
          <div className="text-sm text-gray-400 mb-2">可用标签：</div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-all
                  ${selectedTags.includes(tag)
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {selectedTags.includes(tag) ? (
                  <XMarkIcon className="w-4 h-4" />
                ) : (
                  <PlusIcon className="w-4 h-4" />
                )}
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* 已选标签 */}
      {selectedTags.length > 0 && (
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">已选标签：</div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <motion.span
                key={tag}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm 
                  flex items-center gap-1.5"
              >
                {tag}
                <XMarkIcon
                  className="w-4 h-4 cursor-pointer hover:text-blue-300"
                  onClick={() => toggleTag(tag)}
                />
              </motion.span>
            ))}
          </div>
        </div>
      )}

      {/* 预览 */}
      {(freeformText || selectedTags.length > 0) && (
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">预览：</div>
          <div className="bg-black/30 rounded-lg p-3 text-gray-300">
            {finalPrompt()}
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-lg flex items-center gap-2 
            bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
        >
          <ArrowPathIcon className="w-4 h-4" />
          重置
        </button>
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded-lg flex items-center gap-2 
            bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
        >
          {isCopied ? (
            <>
              <CheckIcon className="w-4 h-4" />
              已复制
            </>
          ) : (
            <>
              <ClipboardDocumentIcon className="w-4 h-4" />
              复制
            </>
          )}
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg flex items-center gap-2 
            bg-blue-500/80 text-white hover:bg-blue-500 transition-all"
        >
          <PlusIcon className="w-4 h-4" />
          保存
        </button>
      </div>
    </div>
  );
}

export default React.memo(PromptFreeform);
