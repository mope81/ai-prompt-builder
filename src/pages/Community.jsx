import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LoadingSpinner from '../components/LoadingSpinner'

function Community() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div className="relative min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl font-display bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent pb-2">
              创作者社区
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              加入我们的社区，分享你的作品，与其他创作者交流
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 lg:px-8 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-slate-700"
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600 mb-6">
            社区
          </h2>
          <p className="text-slate-300">
            即将推出社区讨论功能...
          </p>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}

export default React.memo(Community)
