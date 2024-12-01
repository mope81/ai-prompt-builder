import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  SparklesIcon,
  CommandLineIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: '提示词生成器',
    description: '使用我们的提示词生成器，快速创建专业的 AI 提示词',
    icon: SparklesIcon,
    to: '/prompt',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    name: '提示词模板',
    description: '浏览和使用我们精心准备的提示词模板',
    icon: DocumentTextIcon,
    to: '/templates',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    name: '提示词教程',
    description: '学习如何编写更好的提示词，提高 AI 输出质量',
    icon: CommandLineIcon,
    to: '/tutorials',
    gradient: 'from-rose-500 to-rose-600',
  },
];

export default function Hero() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            AI Prompt 提示词工程
          </h1>
          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            使用我们的工具和资源，轻松创建专业的 AI 提示词
          </p>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={feature.to}
                    className="block p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all group"
                  >
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.gradient}`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-gray-300">
                      {feature.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
