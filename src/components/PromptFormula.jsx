import React, { useState } from 'react'
import vocabularyDataPro from '../data/vocabularyDataPro'

// 提示词生成器类
const PromptGenerator = {
  generatePrompt(template, language = 'zh', vocabularyData) {
    // 支持两种格式：{category} 和 [category]
    const placeholderRegex = /(?:\{(\w+)\}|\[([^\]]+)\])/g
    const matches = [...template.matchAll(placeholderRegex)]
    const promptParts = []
    let lastIndex = 0

    for (const match of matches) {
      const [fullMatch, curlyBracketCategory, squareBracketCategory] = match
      const rawCategory = curlyBracketCategory || squareBracketCategory
      const category = this.normalizeCategory(rawCategory)
      const startIndex = match.index
      
      // 添加非占位符部分
      if (startIndex > lastIndex) {
        promptParts.push(template.slice(lastIndex, startIndex))
      }

      // 处理占位符
      if (vocabularyData[language][category]) {
        const categoryData = vocabularyData[language][category]
        const subcategories = Object.keys(categoryData)
        const randomSubcategory = subcategories[Math.floor(Math.random() * subcategories.length)]
        const options = categoryData[randomSubcategory]
        const randomOption = options[Math.floor(Math.random() * options.length)]
        promptParts.push(randomOption)
      } else {
        promptParts.push(fullMatch) // 如果找不到对应的类别，保留原始占位符
      }

      lastIndex = startIndex + fullMatch.length
    }

    // 添加最后一部分
    if (lastIndex < template.length) {
      promptParts.push(template.slice(lastIndex))
    }

    return promptParts.join('')
  },

  // 标准化类别名称
  normalizeCategory(category) {
    if (!category) return ''
    
    const categoryMap = {
      '主题': 'subject',
      '主体': 'subject',
      '对象': 'subject',
      '材质与风格': 'style',
      '风格': 'style',
      '样式': 'style',
      '细节与质量': 'details',
      '细节': 'details',
      '质量': 'details',
      '视觉效果': 'effect',
      '效果': 'effect',
      '技术参数': 'technical',
      '参数': 'technical',
      '光照': 'lighting',
      '灯光': 'lighting',
      '相机': 'camera',
      '镜头': 'camera',
      '色彩': 'color',
      '颜色': 'color'
    }

    const normalized = category.toLowerCase().trim()
    return categoryMap[normalized] || categoryMap[category] || normalized
  }
}

const PromptFormula = ({ version = 'pro' }) => {
  const [language, setLanguage] = useState('zh')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [template, setTemplate] = useState('')

  const defaultTemplates = {
    zh: [
      '[主题]_[风格]_[光照]_[相机]_[细节]_[色彩]',
      '[主题] 使用 [相机] 拍摄，采用 [风格] 风格，[光照] 照明，突出 [细节] 和 [色彩] 色调',
      '创作一张 [风格] 风格的照片，展现 [主题]，通过 [光照] 和 [色彩] 色调增强效果'
    ],
    en: [
      '{subject}_{style}_{lighting}_{camera}_{details}_{color}',
      '{subject}, {style}, shot with {camera}, {lighting}, {details}, {color} tones',
      'Produce a {style} photograph depicting {subject}, enhanced with {lighting} and {color} tones'
    ]
  }

  const handleGenerate = () => {
    try {
      if (!template.trim()) {
        alert(language === 'zh' ? '请输入提示词框架' : 'Please enter a prompt framework')
        return
      }
      const prompt = PromptGenerator.generatePrompt(template, language, vocabularyDataPro)
      setResult(prompt)
      setCopied(false)
    } catch (err) {
      alert(language === 'zh' ? 
        '生成提示词时出错：' + err.message : 
        'Error generating prompt: ' + err.message
      )
      console.error('Generation error:', err)
    }
  }

  const handleClear = () => {
    setTemplate('')
    setResult('')
    setCopied(false)
  }

  return (
    <div className={`backdrop-blur-lg rounded-xl p-6 ${
      version === 'pro' ? 
      'bg-gradient-to-br from-blue-900/50 to-slate-800/50 border border-blue-700/30' : 
      'bg-slate-800/50'
    }`}>
      {/* 语言切换 */}
      <div className="flex justify-between items-center mb-6">
        <h3 className={`text-xl font-bold ${
          version === 'pro' ? 
          'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600' : 
          'text-white'
        }`}>
          {version === 'pro' ? 
            (language === 'zh' ? '专业版本' : 'Professional Version') : 
            (language === 'zh' ? '基础版本' : 'Basic Version')
          }
        </h3>
        <button
          onClick={() => setLanguage(lang => lang === 'zh' ? 'en' : 'zh')}
          className={`px-3 py-1 rounded-lg transition-colors ${
            version === 'pro' ? 
            'bg-blue-800/50 hover:bg-blue-700/50' : 
            'bg-slate-700 hover:bg-slate-600'
          }`}
        >
          {language === 'zh' ? 'EN' : '中文'}
        </button>
      </div>

      {/* 预设模板 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          {language === 'zh' ? '预设模板' : 'Templates'}
        </h2>
        <div className="grid gap-2">
          {defaultTemplates[language].map((tmpl, index) => (
            <button
              key={index}
              onClick={() => setTemplate(tmpl)}
              className={`text-left px-4 py-2 rounded-lg transition-colors ${
                version === 'pro' ? 
                'bg-blue-800/50 hover:bg-blue-700/50' : 
                'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {tmpl}
            </button>
          ))}
        </div>
      </div>

      {/* 输入区域 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          {language === 'zh' ? '自定义框架' : 'Custom Framework'}
        </h2>
        <textarea
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          rows={4}
          placeholder={language === 'zh' ? 
            "输入提示词框架，例如：[主题]_[风格]_[细节]" : 
            "Enter prompt framework, e.g.: {subject} in {style}"}
          className={`w-full p-3 rounded-lg placeholder-slate-400 focus:outline-none focus:ring-2 ${
            version === 'pro' ? 
            'bg-blue-800/50 focus:ring-blue-500' : 
            'bg-slate-700 focus:ring-slate-500'
          }`}
        />
      </div>

      {/* 按钮区域 */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleGenerate}
          className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            version === 'pro' ? 
            'bg-blue-600 hover:bg-blue-700' : 
            'bg-slate-600 hover:bg-slate-700'
          }`}
        >
          {language === 'zh' ? '生成提示词' : 'Generate Prompt'}
        </button>
        <button
          onClick={handleClear}
          className={`px-4 py-2 rounded-lg transition-colors ${
            version === 'pro' ? 
            'bg-blue-800/50 hover:bg-blue-700/50' : 
            'bg-slate-700 hover:bg-slate-600'
          }`}
        >
          {language === 'zh' ? '清空' : 'Clear'}
        </button>
      </div>

      {/* 复制提示 */}
      {copied && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-300">
          {language === 'zh' ? '已复制到剪贴板' : 'Copied to clipboard'}
        </div>
      )}

      {/* 结果展示 */}
      {result && (
        <div className={`mt-6 p-4 rounded-lg ${
          version === 'pro' ? 
          'bg-blue-800/50' : 
          'bg-slate-700'
        }`}>
          <h2 className="text-xl font-semibold mb-3">
            {language === 'zh' ? '生成的提示词' : 'Generated Prompt'}
          </h2>
          <p className="text-slate-300 break-words">{result}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(result)
                .then(() => setCopied(true))
                .catch(err => console.error('Copy failed:', err))
            }}
            className={`mt-4 px-4 py-2 rounded-lg transition-colors ${
              version === 'pro' ? 
              'bg-blue-700/50 hover:bg-blue-600/50' : 
              'bg-slate-600 hover:bg-slate-500'
            }`}
          >
            {language === 'zh' ? '复制到剪贴板' : 'Copy to Clipboard'}
          </button>
        </div>
      )}
    </div>
  )
}

export default PromptFormula
