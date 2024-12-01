import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClockIcon,
  ArrowPathIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function PromptHistory({ history = [], onSelect }) {
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (timestamp) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(timestamp)) {
        newFavorites.delete(timestamp);
      } else {
        newFavorites.add(timestamp);
      }
      return newFavorites;
    });
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return '刚刚';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} 分钟前`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} 小时前`;
    } else {
      return date.toLocaleDateString('zh-CN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  if (history.length === 0) {
    return (
      <div className="text-gray-400 text-sm text-center py-4">
        暂无历史记录
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {history.map((item, index) => (
        <motion.div
          key={item.timestamp}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group flex items-start gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors"
        >
          <div className="flex-shrink-0 mt-1">
            <ClockIcon className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-300 text-sm break-words">{item.prompt}</p>
            <div className="flex items-center gap-4 mt-1">
              <span className="text-xs text-gray-500">
                {formatTimestamp(item.timestamp)}
              </span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleFavorite(item.timestamp)}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  {favorites.has(item.timestamp) ? (
                    <StarIconSolid className="w-4 h-4" />
                  ) : (
                    <StarIcon className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => onSelect?.(item)}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <ArrowPathIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
