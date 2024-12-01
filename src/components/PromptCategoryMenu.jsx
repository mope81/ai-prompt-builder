import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function PromptCategoryMenu({ 
  category, 
  name, 
  description, 
  icon: Icon, 
  options, 
  selectedOptions, 
  onToggle 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-all ${
          isOpen || selectedOptions.length > 0
            ? 'bg-blue-500/20 text-blue-400'
            : 'bg-white/5 hover:bg-white/10 text-gray-300'
        }`}
        title={description}
      >
        <Icon className="w-5 h-5" />
        <span className="sr-only">{name}</span>
        {selectedOptions.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {selectedOptions.length}
          </span>
        )}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-64 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg border border-white/10"
            style={{ 
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          >
            {/* 菜单标题 */}
            <div className="p-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-gray-400" />
                <span className="text-white font-medium">{name}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{description}</p>
            </div>

            {/* 选项列表 */}
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar p-2">
              {options.map((option) => (
                <button
                  key={option.name}
                  onClick={() => onToggle(option.name)}
                  className={`w-full text-left p-2 rounded-lg text-sm transition-colors mb-1 ${
                    selectedOptions.includes(option.name)
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'hover:bg-white/10 text-gray-300'
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
