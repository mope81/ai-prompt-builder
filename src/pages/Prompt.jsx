import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  BookOpenIcon,
  SquaresPlusIcon 
} from '@heroicons/react/24/outline';
import PromptBuilder from '../components/PromptBuilder';
import PromptTemplate from '../components/PromptTemplate';
import LoadingSpinner from '../components/LoadingSpinner';

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
  const [activeTab, setActiveTab] = useState('builder');
  const [savedPrompts, setSavedPrompts] = useState([]);

  const handleSavePrompt = (promptContent) => {
    setSavedPrompts(prev => [...prev, { id: Date.now(), content: promptContent }]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'builder':
        return <PromptBuilder onSave={handleSavePrompt} />;
      case 'templates':
        return <PromptTemplate />;
      case 'vocabulary':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">提示词库</h2>
            <p>提示词库功能即将推出...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 container mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
}

export default React.memo(Prompt);
