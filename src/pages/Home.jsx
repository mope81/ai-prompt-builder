import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  AcademicCapIcon, 
  UserGroupIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'
import LoadingSpinner from '../components/LoadingSpinner'

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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-rose-900">
      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)]" />
      
      {/* Content */}
      <div className="relative min-h-screen">
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

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-16">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索提示词模板..."
                  className="w-full px-6 py-4 rounded-full bg-black/20 backdrop-blur-sm border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        </div>
      </div>
    </div>
  )
}

export default React.memo(Home)
