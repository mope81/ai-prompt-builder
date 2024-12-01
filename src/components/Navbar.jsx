import { Link, useLocation, NavLink as RouterNavLink } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// NavLink component
const NavLink = ({ to, children }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <RouterNavLink
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'bg-white/10 text-white'
          : 'text-gray-300 hover:bg-white/10 hover:text-white'
      }`}
    >
      {children}
    </RouterNavLink>
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: '提示词配方', href: '/prompt' },
    { name: '学习', href: '/learn' },
    { name: '社区', href: '/community' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-white">Prompt Lab</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NavLink to="/">首页</NavLink>
            <NavLink to="/prompt">提示词</NavLink>
            <NavLink to="/learn">学习</NavLink>
            <NavLink to="/community">社区</NavLink>
            <NavLink to="/vocabulary-manager">词库管理</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-black/10 border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                首页
              </NavLink>
              <NavLink
                to="/prompt"
                onClick={() => setIsMenuOpen(false)}
              >
                提示词
              </NavLink>
              <NavLink
                to="/learn"
                onClick={() => setIsMenuOpen(false)}
              >
                学习
              </NavLink>
              <NavLink
                to="/community"
                onClick={() => setIsMenuOpen(false)}
              >
                社区
              </NavLink>
              <NavLink
                to="/vocabulary-manager"
                onClick={() => setIsMenuOpen(false)}
              >
                词库管理
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
