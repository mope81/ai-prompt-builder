import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  BookOpenIcon,
  SquaresPlusIcon 
} from '@heroicons/react/24/outline';
import PromptBuilder from '../components/PromptBuilder';
import PromptTemplate from '../components/PromptTemplate';

const TABS = [
  {
    id: 'builder',
    name: 'Prompt Builder',
    icon: SparklesIcon,
    description: 'Create perfect AI prompts with our intelligent builder'
  },
  {
    id: 'templates',
    name: 'Templates',
    icon: BookOpenIcon,
    description: 'Choose from our curated collection of prompt templates'
  },
  {
    id: 'vocabulary',
    name: 'Vocabulary',
    icon: SquaresPlusIcon,
    description: 'Manage and organize your prompt vocabulary'
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
          <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Vocabulary Manager
            </h2>
            <p className="text-gray-300">
              The vocabulary manager feature is coming soon...
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tab Navigation */}
      <div className="mb-8">
        <div className="border-b border-gray-800">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group relative py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
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
                
                {/* Tab Description Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-48 text-center">
                  {tab.description}
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
        className="min-h-[60vh]"
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
}

export default React.memo(Prompt);
