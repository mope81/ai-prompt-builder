import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  AcademicCapIcon, 
  UserGroupIcon,
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Prompt 配方',
    description: '使用我们独特的提示词配方系统，轻松构建专业级的 AI 提示词',
    icon: SparklesIcon,
    to: '/prompt',
    gradient: 'from-blue-400 to-blue-600'
  },
  {
    name: 'Prompt 学院',
    description: '系统学习 Prompt Engineering，掌握提示词编写的核心技巧和最佳实践',
    icon: AcademicCapIcon,
    to: '/learn',
    gradient: 'from-purple-400 to-purple-600'
  },
  {
    name: 'Prompt 社区',
    description: '加入充满创造力的 Prompt 工程师社区，分享经验与灵感',
    icon: UserGroupIcon,
    to: '/community',
    gradient: 'from-pink-400 to-pink-600'
  }
]

function Home() {
  return (
    <main className="flex-1 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI Prompt Builder
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            使用专业的提示词工程技术，创建完美的 AI 提示词
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              to="/prompt" 
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              开始使用
            </Link>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 3) }}
            >
              <Link 
                to={feature.to}
                className="block p-6 rounded-xl bg-gray-800/50 hover:bg-gray-800/70 transition-colors"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.name}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default React.memo(Home)
