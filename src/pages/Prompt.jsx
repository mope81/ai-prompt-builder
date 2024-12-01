import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  BookOpenIcon,
  SquaresPlusIcon 
} from '@heroicons/react/24/outline';
import PromptBuilder from '../components/PromptBuilder';
import PromptHistory from '../components/PromptHistory';
import PromptTemplate from '../components/PromptTemplate';
import LoadingSpinner from '../components/LoadingSpinner';
import { getSavedPrompts, savePrompt } from '../services/storageService';

const TABS = [
  {
    id: 'builder',
    name: '提示词构建器',
    icon: SparklesIcon,
    description: '使用智能提示词构建器，创建完美的 AI 提示词'
  },
  {
    id: 'templates',
    name: '模板库',
    icon: SquaresPlusIcon,
    description: '使用预设模板，快速生成专业提示词'
  },
  {
    id: 'vocabulary',
    name: '提示词库',
    icon: BookOpenIcon,
    description: '浏览和管理提示词库，提升提示词质量'
  }
];

function Prompt() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('builder');
  const [promptHistory, setPromptHistory] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const loadSavedPrompts = async () => {
      const savedPrompts = await getSavedPrompts();
      setPromptHistory(savedPrompts);
      setIsLoading(false);
    };
    loadSavedPrompts();
  }, []);

  const handleSavePrompt = async (promptContent) => {
    const savedPrompt = await savePrompt(promptContent);
    if (savedPrompt) {
      setPromptHistory(prev => [savedPrompt, ...prev]);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
    }
  };

  const handleSelectPrompt = (prompt) => {
    setActiveTab('builder');
    // TODO: 将选中的提示词加载到构建器中
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-rose-900">
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
      
      {/* Content */}
      <div className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full pt-24 pb-12 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI 提示词工作室
            </h1>
            <p className="text-xl text-gray-300">
              {TABS.find(tab => tab.id === activeTab)?.description}
            </p>
          </motion.div>
        </header>

        {/* Tabs Navigation */}
        <nav className="sticky top-0 z-50 w-full mb-8 bg-black/20 backdrop-blur-md py-4 px-4 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative px-6 py-2.5 rounded-xl transition-all duration-200 
                    flex items-center gap-2 min-w-[160px] justify-center
                    ${activeTab === tab.id
                      ? 'bg-white/15 text-white shadow-lg shadow-white/10 scale-105 hover:bg-white/20'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:scale-102'
                    }
                  `}
                >
                  <tab.icon className={`w-5 h-5 transition-all duration-200 
                    ${activeTab === tab.id ? 'text-blue-400' : 'text-gray-400'}`} 
                  />
                  <span className="font-medium">{tab.name}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 border-2 border-blue-400/30 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-4 pb-12 mt-4">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeTab === 'builder' && (
              <PromptBuilder onSave={handleSavePrompt} />
            )}

            {activeTab === 'templates' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <PromptTemplate onApply={(template) => {
                  setActiveTab('builder');
                  // TODO: 将模板应用到构建器
                }} />
              </div>
            )}

            {activeTab === 'vocabulary' && (
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* TODO: 实现提示词库组件 */}
                  <div className="text-center text-gray-400">
                    提示词库功能即将推出...
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Notification */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showNotification ? 1 : 0, y: showNotification ? 0 : 50 }}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
      >
        提示词已保存！
      </motion.div>
    </div>
  );
}

export default React.memo(Prompt);
