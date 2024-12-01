import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchRelatedPrompts } from '../services/promptService'

// 默认框架结构
const defaultSections = [
  {
    id: 'subject',
    name: '主体',
    description: '描述你想要创建的主要对象或场景',
    examples: [
      'a beautiful young woman',
      'a majestic mountain landscape',
      'a futuristic cityscape'
    ]
  },
  {
    id: 'style',
    name: '风格',
    description: '定义作品的艺术风格',
    examples: [
      'oil painting',
      'digital art',
      'watercolor illustration'
    ]
  },
  {
    id: 'lighting',
    name: '光照',
    description: '设置场景的光照效果',
    examples: [
      'soft natural lighting',
      'dramatic sunset',
      'volumetric fog'
    ]
  },
  {
    id: 'camera',
    name: '镜头',
    description: '设置拍摄角度和效果',
    examples: [
      'close-up portrait',
      'aerial view',
      'macro photography'
    ]
  },
  {
    id: 'details',
    name: '细节',
    description: '添加更多细节来丰富画面',
    examples: [
      'intricate details',
      'highly detailed',
      'photorealistic'
    ]
  },
  {
    id: 'quality',
    name: '质量',
    description: '指定输出质量和分辨率',
    examples: [
      '8k uhd',
      'masterpiece',
      'best quality'
    ]
  }
]

// 预设框架模板
const frameworkTemplates = [
  {
    id: 'portrait',
    name: '人像摄影',
    sections: [
      { id: 'subject', name: '人物', description: '描述人物特征' },
      { id: 'pose', name: '姿势', description: '描述人物姿势' },
      { id: 'clothing', name: '服装', description: '描述服装样式' },
      { id: 'lighting', name: '光照', description: '描述光照效果' },
      { id: 'background', name: '背景', description: '描述场景背景' },
      { id: 'camera', name: '相机', description: '描述拍摄参数' }
    ]
  },
  {
    id: 'landscape',
    name: '风景绘画',
    sections: [
      { id: 'scene', name: '场景', description: '描述主要场景' },
      { id: 'time', name: '时间', description: '描述时间段' },
      { id: 'weather', name: '天气', description: '描述天气状况' },
      { id: 'style', name: '风格', description: '描述艺术风格' },
      { id: 'mood', name: '氛围', description: '描述整体氛围' }
    ]
  }
]

// 预设词库
const promptVocabulary = {
  // 人物相关
  person: {
    keywords: ['人物', '人像', '女性', '男性', '肖像'],
    values: [
      'a beautiful young woman with long flowing hair',
      'a handsome man in his thirties',
      'an elderly person with wise eyes',
      'a child with a bright smile',
      'a mysterious figure in shadows'
    ]
  },
  // 场景相关
  scene: {
    keywords: ['场景', '背景', '环境', '地点'],
    values: [
      'a mystical forest at twilight',
      'a bustling cityscape at night',
      'a peaceful beach at sunset',
      'a snow-covered mountain peak',
      'an ancient temple ruins'
    ]
  },
  // 光照相关
  lighting: {
    keywords: ['光照', '光线', '光效'],
    values: [
      'soft natural lighting',
      'dramatic rim lighting',
      'moody atmospheric lighting',
      'golden hour sunlight',
      'ethereal glowing light'
    ]
  },
  // 风格相关
  style: {
    keywords: ['风格', '艺术', '画风'],
    values: [
      'oil painting style',
      'digital art',
      'watercolor illustration',
      'photorealistic rendering',
      'concept art style'
    ]
  },
  // 氛围相关
  mood: {
    keywords: ['氛围', '心情', '情绪'],
    values: [
      'peaceful and serene',
      'mysterious and dark',
      'joyful and bright',
      'melancholic and thoughtful',
      'energetic and dynamic'
    ]
  },
  // 细节相关
  details: {
    keywords: ['细节', '特征', '质量'],
    values: [
      'highly detailed',
      'intricate details',
      'fine textures',
      'sharp focus',
      'ultra realistic'
    ]
  },
  // 构图相关
  composition: {
    keywords: ['构图', '视角', '镜头'],
    values: [
      'close-up portrait',
      'wide angle view',
      'aerial perspective',
      'dynamic composition',
      'symmetrical framing'
    ]
  },
  // 天气相关
  weather: {
    keywords: ['天气', '气候'],
    values: [
      'clear sunny day',
      'stormy weather',
      'misty atmosphere',
      'rain and thunder',
      'snowy winter scene'
    ]
  },
  // 时间相关
  time: {
    keywords: ['时间', '时段'],
    values: [
      'golden sunset',
      'blue hour',
      'midnight',
      'early morning',
      'dusk'
    ]
  },
  // 服装相关
  clothing: {
    keywords: ['服装', '装扮', '衣着'],
    values: [
      'elegant evening dress',
      'casual modern outfit',
      'traditional costume',
      'futuristic fashion',
      'vintage clothing'
    ]
  }
}

// 扩展的专业提示词词库
const advancedPromptVocabulary = {
  // 主题内容
  subject: {
    keywords: ['主题', '内容'],
    values: [
      'cyberpunk city',
      'ethereal fairy',
      'cosmic space station',
      'ancient dragon',
      'steampunk machine',
      'underwater kingdom',
      'floating islands',
      'crystal cave',
      'desert nomad',
      'neon tokyo'
    ]
  },
  // 风格与情感
  styleAndMood: {
    keywords: ['风格与情感', '风格情感', '情感'],
    values: [
      'dreamy and ethereal',
      'dark and mysterious',
      'vibrant and energetic',
      'serene and peaceful',
      'dramatic and intense',
      'whimsical and playful',
      'melancholic and moody',
      'elegant and refined',
      'raw and emotional',
      'mystical and magical'
    ]
  },
  // 艺术家风格
  artist: {
    keywords: ['艺术家'],
    values: [
      'by Alphonse Mucha',
      'in the style of Studio Ghibli',
      'like Monet',
      'inspired by HR Giger',
      'in the style of Gustav Klimt',
      'by Peter Mohrbacher',
      'like James Jean',
      'inspired by Yoshitaka Amano',
      'in the style of Greg Rutkowski',
      'like Artgerm'
    ]
  },
  // 细节质量
  details: {
    keywords: ['细节'],
    values: [
      'highly detailed',
      'intricate details',
      'hyperrealistic',
      'ultra detailed',
      'fine details',
      'sharp focus',
      'precise linework',
      'meticulous details',
      '8k resolution',
      'photorealistic details'
    ]
  },
  // 视觉效果
  visualEffects: {
    keywords: ['视觉效果', '特效'],
    values: [
      'volumetric lighting',
      'ray tracing',
      'global illumination',
      'subsurface scattering',
      'ambient occlusion',
      'chromatic aberration',
      'depth of field',
      'motion blur',
      'bloom effect',
      'particle effects'
    ]
  },
  // 平台/引擎
  platform: {
    keywords: ['平台'],
    values: [
      'Unreal Engine 5',
      'Octane Render',
      'V-Ray',
      'Cinema 4D',
      'Unity Engine',
      'Arnold Renderer',
      'Blender Cycles',
      'Houdini Engine',
      'Corona Renderer',
      'Redshift'
    ]
  },
  // 艺术媒介
  medium: {
    keywords: ['艺术媒介', '媒介'],
    values: [
      'digital painting',
      'oil on canvas',
      'watercolor illustration',
      '3D rendering',
      'concept art',
      'matte painting',
      'pencil drawing',
      'vector art',
      'mixed media',
      'traditional art'
    ]
  },
  // 比例与版本
  aspectAndVersion: {
    keywords: ['比例', '版本'],
    values: [
      'aspect ratio 16:9',
      'portrait orientation',
      'landscape format',
      'square composition',
      'cinematic ratio',
      'widescreen format',
      'vertical composition',
      'panoramic view',
      'golden ratio',
      'rule of thirds'
    ]
  },
  // 图像风格
  imageStyle: {
    keywords: ['图像风格', '画面风格'],
    values: [
      'trending on artstation',
      'award winning',
      'professional photography',
      'editorial style',
      'magazine quality',
      'album cover art',
      'movie poster style',
      'book illustration',
      'game concept art',
      'commercial quality'
    ]
  }
}

// 自然语言模板词库
const naturalPromptVocabulary = {
  // 摄影角度
  cameraAngle: {
    keywords: ['cameraAngle', '角度', '视角'],
    values: [
      'low angle shot',
      'high angle view',
      'birds eye view',
      'worms eye view',
      'dutch angle',
      'straight-on angle',
      'over-the-shoulder shot',
      'aerial view',
      'eye-level shot',
      'tilted perspective'
    ]
  },
  // 拍摄类型
  shotType: {
    keywords: ['shotType', '镜头类型'],
    values: [
      'close-up shot',
      'medium shot',
      'wide shot',
      'extreme close-up',
      'establishing shot',
      'tracking shot',
      'panoramic shot',
      'portrait shot',
      'full body shot',
      'macro shot'
    ]
  },
  // 构图
  composition: {
    keywords: ['composition', '构图'],
    values: [
      'rule of thirds',
      'golden ratio',
      'symmetrical balance',
      'leading lines',
      'dynamic tension',
      'triangular composition',
      'radial balance',
      'frame within frame',
      'centered composition',
      'diagonal composition'
    ]
  },
  // 导演风格
  director: {
    keywords: ['director', '导演'],
    values: [
      'Wes Anderson',
      'Christopher Nolan',
      'Stanley Kubrick',
      'Tim Burton',
      'Wong Kar-wai',
      'Guillermo del Toro',
      'David Lynch',
      'Akira Kurosawa',
      'Ridley Scott',
      'Denis Villeneuve'
    ]
  },
  // 色彩
  color: {
    keywords: ['color', '颜色', '色彩'],
    values: [
      'vibrant colors',
      'muted tones',
      'pastel palette',
      'monochromatic scheme',
      'complementary colors',
      'warm color palette',
      'cool tones',
      'neon colors',
      'earthy tones',
      'iridescent colors'
    ]
  },
  // 背景
  background: {
    keywords: ['background', '背景'],
    values: [
      'mystical forest',
      'urban cityscape',
      'abstract void',
      'cosmic space',
      'underwater scene',
      'mountain landscape',
      'desert wasteland',
      'fantasy realm',
      'industrial setting',
      'magical garden'
    ]
  },
  // 图像质量
  quality: {
    keywords: ['quality', '质量'],
    values: [
      '8k resolution',
      'photorealistic',
      'highly detailed',
      'studio quality',
      'professional grade',
      'cinematic quality',
      'award-winning quality',
      'masterpiece quality',
      'ultra-realistic',
      'premium quality'
    ]
  },
  // 结构
  structure: {
    keywords: ['structure', '结构'],
    values: [
      'well-balanced composition',
      'harmonious arrangement',
      'dynamic layout',
      'organized elements',
      'structured design',
      'cohesive arrangement',
      'unified composition',
      'balanced elements',
      'rhythmic pattern',
      'flowing structure'
    ]
  }
}

// 本地词库
const vocabularyLibrary = {
  style: {
    name: '风格',
    values: [
      'digital art', 'oil painting', 'watercolor', 'pencil sketch', 'concept art',
      'realistic', 'surrealistic', 'minimalistic', 'impressionistic', 'abstract',
      '3D rendering', 'pixel art', 'anime style', 'comic book style', 'photorealistic'
    ]
  },
  subject: {
    name: '主题',
    values: [
      'a mystical forest', 'a futuristic city', 'a serene lake', 'a majestic mountain',
      'an ancient temple', 'a cosmic nebula', 'a magical creature', 'a peaceful garden',
      'a bustling marketplace', 'an underwater scene', 'a floating island', 'a desert oasis'
    ]
  },
  mood: {
    name: '情绪',
    values: [
      'peaceful', 'mysterious', 'energetic', 'melancholic', 'dreamy',
      'dramatic', 'serene', 'ethereal', 'whimsical', 'nostalgic'
    ]
  },
  detail: {
    name: '细节',
    values: [
      'intricate details in the foreground', 'rich textures throughout', 'delicate patterns',
      'fine ornamental elements', 'subtle atmospheric effects', 'detailed architectural features',
      'elaborate decorative motifs', 'complex natural formations', 'precise geometric shapes'
    ]
  },
  lighting: {
    name: '光照',
    values: [
      'soft ambient lighting', 'dramatic rim lighting', 'warm golden hour light',
      'cool moonlight', 'volumetric god rays', 'atmospheric fog', 'dramatic shadows',
      'bioluminescent glow', 'neon highlights', 'natural sunlight'
    ]
  },
  color: {
    name: '颜色',
    values: [
      'vibrant complementary colors', 'muted earth tones', 'pastel palette',
      'monochromatic scheme', 'rich jewel tones', 'cool blues and purples',
      'warm sunset colors', 'neon color accents', 'deep saturated hues'
    ]
  },
  background: {
    name: '背景',
    values: [
      'a misty valley', 'an alien planet', 'a cyberpunk cityscape', 'a magical realm',
      'an enchanted forest', 'a celestial space', 'a crystal cave', 'an ancient ruins',
      'a floating archipelago', 'a parallel dimension'
    ]
  },
  cameraAngle: {
    name: '相机角度',
    values: [
      'low angle shot', 'bird\'s eye view', 'dutch angle', 'extreme close-up',
      'wide angle', 'isometric perspective', 'first person view', 'aerial view'
    ]
  },
  shotType: {
    name: '镜头类型',
    values: [
      'establishing shot', 'portrait shot', 'macro shot', 'panoramic view',
      'dynamic action shot', 'dramatic composition', 'cinematic frame'
    ]
  },
  composition: {
    name: '构图',
    values: [
      'rule of thirds', 'golden ratio', 'symmetrical balance', 'leading lines',
      'dynamic diagonal', 'radial composition', 'triangular composition',
      'frame within frame', 'spiral composition'
    ]
  },
  artist: {
    name: '艺术家',
    values: [
      'Vincent van Gogh', 'Salvador Dali', 'Claude Monet', 'Hayao Miyazaki',
      'Gustav Klimt', 'Andy Warhol', 'Alphonse Mucha', 'HR Giger',
      'James Gurney', 'Yoshitaka Amano'
    ]
  },
  director: {
    name: '导演',
    values: [
      'Christopher Nolan', 'Wes Anderson', 'Stanley Kubrick', 'Guillermo del Toro',
      'Tim Burton', 'Wong Kar-wai', 'Akira Kurosawa', 'Ridley Scott'
    ]
  },
  quality: {
    name: '质量',
    values: [
      'highly detailed', 'masterfully crafted', 'professionally rendered',
      'ultra high resolution', 'cinematic quality', 'studio quality',
      'award-winning quality', 'museum quality'
    ]
  },
  structure: {
    name: '结构',
    values: [
      'Trending on ArtStation', '8k resolution', 'Unreal Engine 5',
      'Octane render', 'Ray tracing', 'Global illumination',
      'Volumetric lighting', 'Photorealistic rendering'
    ]
  }
}

// 合并所有词库
const allVocabulary = { ...promptVocabulary, ...advancedPromptVocabulary, ...naturalPromptVocabulary }

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function PromptFormula() {
  const [isCustomMode, setIsCustomMode] = useState(false)
  const [sections, setSections] = useState(defaultSections)
  const [sectionValues, setSectionValues] = useState({})
  const [weights, setWeights] = useState({})
  const [showCopiedTooltip, setShowCopiedTooltip] = useState(false)
  const [activeExample, setActiveExample] = useState(null)
  const [customFramework, setCustomFramework] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [generatedPrompt, setGeneratedPrompt] = useState('')

  // 初始化新框架
  const initializeFramework = (newSections) => {
    setSections(newSections)
    setSectionValues(Object.fromEntries(newSections.map(section => [section.id, ''])))
    setWeights(Object.fromEntries(newSections.map(section => [section.id, 1])))
  }

  // 解析模板字符串
  const parseTemplateString = (template) => {
    const regex = /\[(.*?)\]/g
    const sections = []
    let match

    while ((match = regex.exec(template)) !== null) {
      sections.push({
        id: `section_${sections.length}`,
        name: match[1],
        description: `请输入${match[1]}相关描述`
      })
    }

    return sections
  }

  // 解析自然语言模板
  const parseNaturalTemplate = (template) => {
    const regex = /\{([^}]+)\}/g
    const sections = []
    let match

    while ((match = regex.exec(template)) !== null) {
      sections.push({
        id: `section_${sections.length}`,
        name: match[1],
        description: `请输入${match[1]}相关描述`
      })
    }

    return sections
  }

  // 解析自定义框架文本
  const parseCustomFramework = async () => {
    try {
      let newSections
      if (customFramework.includes('{') && customFramework.includes('}')) {
        // 自然语言模板格式
        newSections = parseNaturalTemplate(customFramework)
      } else if (customFramework.includes('[') && customFramework.includes(']')) {
        // 方括号模板格式
        newSections = parseTemplateString(customFramework)
      } else {
        // 原有的行分隔格式
        const lines = customFramework.split('\n').filter(line => line.trim())
        newSections = lines.map((line, index) => {
          const [name, description = ''] = line.split(':').map(s => s.trim())
          return {
            id: `custom_${index}`,
            name,
            description: description || `请输入${name}相关描述`
          }
        })
      }
      
      initializeFramework(newSections)
      setIsCustomMode(true)
      
      // 自动生成初始提示词
      setTimeout(autoGeneratePrompt, 100)
    } catch (error) {
      console.error('解析框架失败:', error)
    }
  }

  // 使用预设模板
  const useTemplate = (template) => {
    setSelectedTemplate(template)
    initializeFramework(template.sections)
    setIsCustomMode(true)
  }

  // 重置为默认框架
  const resetToDefault = () => {
    setIsCustomMode(false)
    setSelectedTemplate(null)
    initializeFramework(defaultSections)
    setCustomFramework('')
  }

  // 根据关键词匹配词库类别
  const matchVocabularyCategory = (keyword) => {
    const normalizedKeyword = keyword.toLowerCase()
    for (const [category, data] of Object.entries(allVocabulary)) {
      if (data.keywords.some(key => normalizedKeyword.includes(key.toLowerCase()))) {
        return category
      }
    }
    return null
  }

  // 从词库中随机选择一个值
  const getRandomValue = (category) => {
    if (!category || !allVocabulary[category]) return ''
    const values = allVocabulary[category].values
    return values[Math.floor(Math.random() * values.length)]
  }

  // 自动生成提示词
  const autoGeneratePrompt = useCallback(async (useOnline = false) => {
    if (useOnline) {
      await fetchOnlinePrompts(sections)
    } else {
      const newSectionValues = {}
      sections.forEach(section => {
        const category = matchVocabularyCategory(section.name) || 
                        matchVocabularyCategory(section.description)
        if (category) {
          newSectionValues[section.id] = getRandomValue(category)
        }
      })
      setSectionValues(newSectionValues)
    }
  }, [sections])

  // 从网络获取相关提示词
  const fetchOnlinePrompts = async (sections) => {
    setIsLoading(true)
    setError(null)
    const newSectionValues = {}
    
    try {
      for (const section of sections) {
        // 尝试从网络获取内容
        const onlinePrompt = await fetchRelatedPrompts(section.name)
        if (onlinePrompt) {
          newSectionValues[section.id] = onlinePrompt
        } else {
          // 如果网络获取失败，回退到本地词库
          const category = matchVocabularyCategory(section.name)
          newSectionValues[section.id] = getRandomValue(category)
        }
      }
      
      setSectionValues(newSectionValues)
    } catch (err) {
      setError('获取在线提示词时出错，已使用本地词库')
      // 出错时使用本地词库
      sections.forEach(section => {
        const category = matchVocabularyCategory(section.name)
        newSectionValues[section.id] = getRandomValue(category)
      })
      setSectionValues(newSectionValues)
    } finally {
      setIsLoading(false)
    }
  }

  // 一键随机生成完整提示词
  const quickGeneratePrompt = async (useOnline = false) => {
    // 如果没有自定义框架，使用默认框架
    if (!customFramework.trim()) {
      setCustomFramework(`Create a {style} image of {subject} with a {mood} mood. {detail}. Use {lighting} and {color} to enhance the scene. Set in {background}. Use a {cameraAngle} for a {shotType}. Apply {composition} to the composition. Inspired by the style of {artist} and the cinematic vision of {director}. Ensure the image is {quality}. {structure}`)
    }
    
    await parseCustomFramework()
    if (useOnline) {
      await fetchOnlinePrompts(sections)
    }
  }

  // 复制提示词到剪贴板
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setShowCopiedTooltip(true)
    setTimeout(() => setShowCopiedTooltip(false), 2000)
  }

  // 处理示例点击事件
  const handleExampleClick = (sectionId, example) => {
    setSectionValues(prev => ({
      ...prev,
      [sectionId]: example
    }))
    setActiveExample(example)
    setTimeout(() => setActiveExample(null), 500)
  }

  // 生成自然语言格式的提示词
  const generateNaturalPrompt = () => {
    let template = customFramework
    sections.forEach(section => {
      const value = sectionValues[section.id]?.trim()
      if (value) {
        template = template.replace(`{${section.name}}`, value)
      }
    })
    return template
  }

  // 生成提示词
  const generatePrompt = () => {
    if (customFramework.includes('{') && customFramework.includes('}')) {
      return generateNaturalPrompt()
    }
    
    return sections
      .map(section => {
        const value = sectionValues[section.id]?.trim()
        const weight = weights[section.id]
        if (!value) return ''
        return weight === 1 ? value : `(${value}:${weight})`
      })
      .filter(Boolean)
      .join(', ')
  }

  // 从词库中随机获取值
  const getRandomValueFromLibrary = (category) => {
    const values = vocabularyLibrary[category]?.values || []
    return values[Math.floor(Math.random() * values.length)] || ''
  }

  // 解析模板并填充内容
  const generateFromTemplate = (template) => {
    // 使用正则表达式匹配所有 {variable} 模式
    return template.replace(/\{(\w+)\}/g, (match, variable) => {
      // 从词库中获取随机值
      return getRandomValueFromLibrary(variable) || match
    })
  }

  // 一键随机生成完整提示词
  const quickGeneratePromptFromLibrary = () => {
    const template = `Create a {style} image of {subject} with a {mood} mood. {detail}. Use {lighting} and {color} to enhance the scene. Set in {background}. Use a {cameraAngle} for a {shotType}. Apply {composition} to the composition. Inspired by the style of {artist} and the cinematic vision of {director}. Ensure the image is {quality}. {structure}`
    
    // 生成完整提示词
    const generatedPrompt = generateFromTemplate(template)
    setGeneratedPrompt(generatedPrompt)
  }

  return (
    <section id="prompt-formula" className="section bg-secondary-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-secondary-900 mb-4">Prompt 公式</h2>
          <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
            使用结构化方法创建高质量的 Prompt，让 AI 更好地理解你的创意
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* 框架选择 */}
          <div className="mb-8 bg-white rounded-xl shadow-soft p-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">选择框架</h3>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetToDefault}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    !isCustomMode
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-secondary-600 border border-secondary-200'
                  }`}
                >
                  默认框架
                </motion.button>
                {frameworkTemplates.map(template => (
                  <motion.button
                    key={template.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => useTemplate(template)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      selectedTemplate?.id === template.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-white text-secondary-600 border border-secondary-200'
                    }`}
                  >
                    {template.name}
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => quickGeneratePrompt(true)}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all flex items-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {isLoading ? '生成中...' : '在线一键生成'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={quickGeneratePromptFromLibrary}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  一键生成
                </motion.button>
              </div>

              <div className="relative">
                <textarea
                  value={customFramework}
                  onChange={(e) => setCustomFramework(e.target.value)}
                  placeholder={`输入自定义框架结构，支持三种格式：
1. [主题]_[风格与情感]_[艺术家]_[细节] 格式
2. 每行一个部分，格式：部分名称:描述
3. 自然语言模板：Create a {style} image of {subject}...

如果直接点击"在线一键生成"，将使用默认模板并从网络获取相关内容`}
                  className="w-full h-48 p-3 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="flex gap-2 mt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={parseCustomFramework}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors"
                    disabled={isLoading}
                  >
                    使用自定义框架
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => autoGeneratePrompt(true)}
                    className="px-4 py-2 bg-secondary-500 text-white rounded-lg font-medium hover:bg-secondary-600 transition-colors flex items-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    )}
                    {isLoading ? '获取中...' : '在线重新生成'}
                  </motion.button>
                </div>
              </div>

              {error && (
                <div className="mt-2 text-red-500 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* 提示词编辑区 */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6"
          >
            {sections.map(section => (
              <motion.div
                key={section.id}
                variants={item}
                className="bg-white rounded-xl shadow-soft p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                      {section.name}
                    </h3>
                    <p className="text-secondary-600 text-sm">
                      {section.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-secondary-600">权重</span>
                    <input
                      type="range"
                      min="0.1"
                      max="2"
                      step="0.1"
                      value={weights[section.id] || 1}
                      onChange={(e) => setWeights(prev => ({
                        ...prev,
                        [section.id]: parseFloat(e.target.value)
                      }))}
                      className="w-24 h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-medium text-secondary-900 w-8">
                      {weights[section.id] || 1}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={sectionValues[section.id] || ''}
                      onChange={(e) => setSectionValues(prev => ({
                        ...prev,
                        [section.id]: e.target.value
                      }))}
                      placeholder={`输入${section.name}描述...`}
                      className="w-full px-4 py-2 rounded-lg border border-secondary-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  {section.examples?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {section.examples.map(example => (
                        <motion.button
                          key={example}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          animate={{
                            scale: activeExample === example ? [1, 1.1, 1] : 1
                          }}
                          onClick={() => handleExampleClick(section.id, example)}
                          className="px-3 py-1.5 text-sm font-medium bg-secondary-100 text-secondary-600 rounded-full hover:bg-secondary-200 transition-colors"
                        >
                          {example}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 bg-white rounded-xl shadow-soft p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-secondary-900">
                生成的 Prompt
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copyToClipboard(generatePrompt())}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-600 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                复制
              </motion.button>
            </div>
            
            <pre className="bg-secondary-50 p-4 rounded-lg overflow-x-auto text-secondary-800 whitespace-pre-wrap">
              {generatePrompt() || '开始输入以生成 Prompt...'}
            </pre>
          </motion.div>

          {/* 生成的提示词显示区域 */}
          {generatedPrompt && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-secondary-100">
              <div className="flex justify-between items-start gap-2">
                <p className="text-secondary-900 whitespace-pre-wrap">{generatedPrompt}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => copyToClipboard(generatedPrompt)}
                  className="p-2 text-secondary-500 hover:text-secondary-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                </motion.button>
              </div>
              {showCopiedTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-sm text-primary-500"
                >
                  已复制到剪贴板
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* 复制提示 */}
        <AnimatePresence>
          {showCopiedTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-4 right-4 px-4 py-2 bg-primary-500 text-white rounded-lg shadow-lg"
            >
              已复制到剪贴板
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
