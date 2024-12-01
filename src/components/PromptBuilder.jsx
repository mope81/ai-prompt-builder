import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { 
  PlusIcon, 
  MinusIcon, 
  SparklesIcon,
  ArrowPathIcon,
  AdjustmentsHorizontalIcon,
  LightBulbIcon,
  CameraIcon,
  SunIcon,
  HeartIcon,
  SwatchIcon,
  ViewfinderCircleIcon,
  ClockIcon,
  PhotoIcon,
  TrashIcon,
  DocumentDuplicateIcon,
  GlobeAltIcon,
  SquaresPlusIcon,
  CubeTransparentIcon,
  PaintBrushIcon,
  FilmIcon,
  MusicalNoteIcon,
  CloudIcon,
  FireIcon,
  BeakerIcon,
  CommandLineIcon,
  UserIcon,
  CameraIcon as CameraIconPro,  
  UserCircleIcon,             
  SunIcon as LightingIcon,     
  AdjustmentsVerticalIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import PromptPreview from './PromptPreview';
import PromptHistory from './PromptHistory';
import PromptTemplate from './PromptTemplate';
import PromptCategoryMenu from './PromptCategoryMenu';
import PromptFreeform from './PromptFreeform';
import { vocabularyLibrary } from '../utils/promptGenerator';
import { motion } from 'framer-motion';

// 将词库转换为菜单选项格式
const promptCategories = {
  subject: {
    name: '主题',
    description: '选择创作的核心主题元素',
    icon: LightBulbIcon,
    options: vocabularyLibrary.subject.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  style: {
    name: '风格',
    description: '选择作品的整体艺术风格',
    icon: AdjustmentsHorizontalIcon,
    options: vocabularyLibrary.style.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  lighting: {
    name: '光照',
    description: '设置场景的光照效果',
    icon: SunIcon,
    options: vocabularyLibrary.lighting.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  camera: {
    name: '相机',
    description: '选择拍摄视角和效果',
    icon: CameraIcon,
    options: vocabularyLibrary.camera.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  mood: {
    name: '氛围',
    description: '设置画面的情感氛围',
    icon: HeartIcon,
    options: vocabularyLibrary.mood.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  color: {
    name: '色彩',
    description: '设置作品的色彩方案',
    icon: SwatchIcon,
    options: vocabularyLibrary.color.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  texture: {
    name: '质地',
    description: '添加材质和表面效果',
    icon: CubeTransparentIcon,
    options: [
      'oil paint', 'watercolor', 'acrylic', 'charcoal', 'ink', 'pencil',
      'digital', 'mixed media', 'gouache', 'tempera', 'pastel', 'spray paint',
      'marble', 'bronze', 'ceramic', 'glass', 'wood', 'metal', 'fabric',
      'paper', 'gold leaf', 'silver', 'crystal', 'leather', 'stone'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  composition: {
    name: '构图',
    description: '设置画面的构图方式',
    icon: ViewfinderCircleIcon,
    options: [
      'rule of thirds', 'golden ratio', 'symmetrical', 'asymmetrical',
      'centered composition', 'diagonal composition', 'triangular composition',
      'frame within frame', 'leading lines', 'minimalist composition'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  time: {
    name: '时间',
    description: '选择时间段和季节',
    icon: ClockIcon,
    options: [
      'sunrise', 'midday', 'sunset', 'midnight', 'blue hour', 'golden hour',
      'spring season', 'summer season', 'autumn season', 'winter season',
      'stormy weather', 'clear sky', 'foggy morning', 'rainy evening'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  detail: {
    name: '细节',
    description: '添加特殊细节和效果',
    icon: SparklesIcon,
    options: [
      'highly detailed', 'intricate details', 'fine textures', 'smooth surfaces',
      'rough textures', 'ornate patterns', 'minimalist details', 'weathered look',
      'pristine condition', 'hyper realistic', 'abstract patterns', 'geometric details'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  quality: {
    name: '品质',
    description: '设置图像品质参数',
    icon: PhotoIcon,
    options: [
      '8K resolution', 'high definition', 'photorealistic', 'masterpiece',
      'best quality', 'ultra detailed', 'professional', 'award winning',
      'trending on artstation', 'unreal engine', 'octane render', 'ray tracing'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  artMovement: {
    name: '艺术流派',
    description: '选择艺术历史中的重要流派',
    icon: PaintBrushIcon,
    options: [
      'impressionism', 'surrealism', 'art nouveau', 'baroque', 'renaissance',
      'pop art', 'minimalism', 'abstract expressionism', 'cubism', 'romanticism',
      'art deco', 'gothic art', 'rococo', 'modernism', 'post-impressionism',
      'futurism', 'dadaism', 'bauhaus', 'symbolism', 'pre-raphaelite'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  material: {
    name: '材质',
    description: '定义作品的材质效果',
    icon: CubeTransparentIcon,
    options: [
      'oil paint', 'watercolor', 'acrylic', 'charcoal', 'ink', 'pencil',
      'digital', 'mixed media', 'gouache', 'tempera', 'pastel', 'spray paint',
      'marble', 'bronze', 'ceramic', 'glass', 'wood', 'metal', 'fabric',
      'paper', 'gold leaf', 'silver', 'crystal', 'leather', 'stone'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  technique: {
    name: '技法',
    description: '特定的艺术技法和表现手法',
    icon: SquaresPlusIcon,
    options: [
      'impasto', 'glazing', 'scumbling', 'stippling', 'hatching', 'cross-hatching',
      'wet-on-wet', 'dry brush', 'sfumato', 'chiaroscuro', 'trompe l\'oeil',
      'pointillism', 'collage', 'frottage', 'grattage', 'decalcomania',
      'sgraffito', 'alla prima', 'underpainting', 'layering', 'blending'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  visualEffect: {
    name: '视觉效果',
    description: '添加特殊的视觉效果',
    icon: SparklesIcon,
    options: [
      'motion blur', 'depth of field', 'lens flare', 'chromatic aberration',
      'glitch effect', 'double exposure', 'vignette', 'film grain',
      'holographic', 'prismatic', 'reflection', 'refraction', 'dispersion',
      'caustics', 'bloom effect', 'ray tracing', 'particle effects'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  atmosphere: {
    name: '氛围效果',
    description: '环境氛围和空气效果',
    icon: CloudIcon,
    options: [
      'fog', 'mist', 'smoke', 'haze', 'dust particles', 'steam',
      'volumetric lighting', 'atmospheric perspective', 'aurora borealis',
      'clouds', 'rain', 'snow', 'lightning', 'rainbow', 'sunbeams',
      'starry sky', 'northern lights', 'sunset glow', 'morning dew'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  stylization: {
    name: '风格化',
    description: '特定的艺术风格化效果',
    icon: BeakerIcon,
    options: [
      'cel shading', 'low poly', 'voxel art', 'vector art', 'geometric',
      'abstract', 'minimalist', 'maximalist', 'retro', 'vintage',
      'grunge', 'cyberpunk', 'steampunk', 'art deco', 'psychedelic',
      'kawaii', 'noir', 'synthwave', 'vaporwave', 'brutalist'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  mediaInfluence: {
    name: '媒体影响',
    description: '受特定媒体影响的风格',
    icon: FilmIcon,
    options: [
      'movie still', 'album cover', 'book illustration', 'concept art',
      'comic book', 'manga style', 'anime style', 'game art', 'propaganda poster',
      'fashion photography', 'documentary photo', 'street photography',
      'editorial illustration', 'scientific illustration', 'technical drawing'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  emotion: {
    name: '情感',
    description: '作品传达的情感',
    icon: HeartIcon,
    options: [
      'peaceful', 'energetic', 'melancholic', 'joyful', 'mysterious',
      'dramatic', 'romantic', 'ethereal', 'whimsical', 'nostalgic',
      'haunting', 'serene', 'chaotic', 'dreamy', 'powerful',
      'intimate', 'lonely', 'hopeful', 'contemplative', 'ecstatic'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  technical: {
    name: '技术参数',
    description: '技术和渲染参数',
    icon: CommandLineIcon,
    options: [
      'high resolution', 'detailed', 'sharp focus', 'HDR', '32k',
      'octane render', 'cycles render', 'v-ray', 'physically based rendering',
      'subsurface scattering', 'ambient occlusion', 'global illumination',
      'anti-aliasing', 'post-processing', 'color grading', 'tone mapping'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  cultural: {
    name: '文化风格',
    description: '特定文化的艺术风格',
    icon: GlobeAltIcon,
    options: [
      'japanese art', 'chinese painting', 'persian miniature', 'african art',
      'celtic art', 'islamic art', 'aboriginal art', 'mexican folk art',
      'scandinavian design', 'indian mandala', 'tibetan thangka', 
      'russian constructivism', 'egyptian art', 'greek classical',
      'byzantine', 'native american art', 'art brut', 'outsider art'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  experimental: {
    name: '实验效果',
    description: '创新和实验性的效果',
    icon: FireIcon,
    options: [
      'generative art', 'algorithmic art', 'glitch art', 'databending',
      'neural style transfer', 'fractals', 'procedural generation',
      'cellular automata', 'emergence', 'chaos theory', 'recursive patterns',
      'morphing', 'particle systems', 'evolutionary art', 'artificial life'
    ].map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  character: {
    name: '角色',
    description: '选择画面中的主要角色',
    icon: UserIcon,
    options: vocabularyLibrary.character.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  scene: {
    name: '场景',
    description: '选择画面发生的场景',
    icon: GlobeAltIcon,
    options: vocabularyLibrary.scene.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  time: {
    name: '时间',
    description: '设置画面的时间点',
    icon: ClockIcon,
    options: vocabularyLibrary.time.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  weather: {
    name: '天气',
    description: '添加天气效果',
    icon: CloudIcon,
    options: vocabularyLibrary.weather.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  photography: {
    name: '专业摄影',
    description: '添加专业摄影师风格和技术',
    icon: CameraIconPro,
    options: vocabularyLibrary.photography.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  artist: {
    name: '艺术家风格',
    description: '选择艺术家的独特风格',
    icon: UserCircleIcon,
    options: vocabularyLibrary.artist.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  lighting_setup: {
    name: '灯光设置',
    description: '设置专业的灯光布局',
    icon: LightingIcon,
    options: vocabularyLibrary.lighting_setup.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
  post_processing: {
    name: '后期处理',
    description: '添加专业的后期处理效果',
    icon: AdjustmentsVerticalIcon,
    options: vocabularyLibrary.post_processing.values.map(value => ({
      name: value,
      description: '点击添加到提示词',
      weight: 1.0
    }))
  },
};

// 预设模板
const promptTemplates = {
  portrait: {
    name: '人像摄影',
    description: '适合人像摄影的提示词组合',
    categories: {
      character: ['portrait', 'person', 'model', 'beauty shot'],
      lighting: ['soft lighting', 'natural light', 'studio lighting', 'rim light'],
      camera: ['85mm lens', 'shallow depth of field', 'bokeh', 'high key'],
      mood: ['elegant', 'professional', 'dramatic', 'natural'],
      photography: ['portrait photography', 'fashion photography', 'headshot']
    }
  },
  landscape: {
    name: '风景摄影',
    description: '适合风景摄影的提示词组合',
    categories: {
      scene: ['landscape', 'mountains', 'forest', 'beach', 'waterfall'],
      lighting: ['golden hour', 'dramatic lighting', 'natural light', 'sunset'],
      weather: ['clear sky', 'cloudy', 'misty', 'stormy'],
      mood: ['peaceful', 'majestic', 'serene', 'epic'],
      photography: ['landscape photography', 'wide angle', 'panorama', 'long exposure']
    }
  },
  concept: {
    name: '概念艺术',
    description: '适合概念艺术创作的提示词组合',
    categories: {
      style: ['concept art', 'digital art', 'illustration', 'fantasy art'],
      mood: ['epic', 'mysterious', 'fantastical', 'futuristic'],
      quality: ['highly detailed', 'professional', 'masterpiece', '8k'],
      lighting: ['dramatic lighting', 'volumetric lighting', 'cinematic'],
      post_processing: ['color grading', 'post-processing', 'photorealistic']
    }
  },
  anime: {
    name: '动漫风格',
    description: '适合动漫和插画风格的提示词组合',
    categories: {
      style: ['anime', 'manga', 'japanese animation', 'cel shading'],
      character: ['cute', 'chibi', 'beautiful anime girl', 'bishonen'],
      quality: ['high quality', 'detailed', 'clean lines'],
      mood: ['kawaii', 'dramatic', 'emotional', 'slice of life'],
      features: ['big eyes', 'colorful hair', 'expressive']
    }
  },
  product: {
    name: '商品摄影',
    description: '适合产品和商业摄影的提示词组合',
    categories: {
      setup: ['product photography', 'commercial', 'advertising'],
      lighting: ['studio lighting', 'soft box', 'professional lighting'],
      background: ['white background', 'gradient background', 'minimalist'],
      quality: ['high end', 'professional', 'commercial quality'],
      features: ['product details', 'texture visible', 'brand showcase']
    }
  },
  architecture: {
    name: '建筑摄影',
    description: '适合建筑和室内设计的提示词组合',
    categories: {
      subject: ['architecture', 'building', 'interior', 'exterior'],
      style: ['modern', 'minimalist', 'geometric', 'contemporary'],
      lighting: ['natural lighting', 'ambient light', 'architectural lighting'],
      perspective: ['wide angle', 'symmetrical', 'leading lines'],
      quality: ['professional', 'sharp details', 'high resolution']
    }
  },
  food: {
    name: '美食摄影',
    description: '适合美食和餐饮摄影的提示词组合',
    categories: {
      style: ['food photography', 'culinary art', 'gourmet'],
      lighting: ['soft lighting', 'natural light', 'side lighting'],
      setup: ['overhead shot', 'close-up', '45-degree angle'],
      props: ['rustic table', 'elegant plating', 'garnish'],
      mood: ['appetizing', 'fresh', 'delicious', 'professional']
    }
  },
  fantasy: {
    name: '奇幻场景',
    description: '适合奇幻和魔法场景的提示词组合',
    categories: {
      scene: ['fantasy landscape', 'magical realm', 'enchanted forest'],
      elements: ['magic', 'crystals', 'floating islands', 'portals'],
      creatures: ['dragons', 'mythical creatures', 'magical beings'],
      atmosphere: ['mystical', 'ethereal', 'magical atmosphere'],
      style: ['fantasy art', 'magical realism', 'high fantasy']
    }
  },
  cyberpunk: {
    name: '赛博朋克',
    description: '适合未来科技和赛博朋克风格的提示词组合',
    categories: {
      scene: ['cyberpunk city', 'neon streets', 'futuristic'],
      elements: ['hologram', 'cyber tech', 'neon lights', 'flying cars'],
      mood: ['dystopian', 'high tech', 'low life', 'noir'],
      style: ['sci-fi', 'cyberpunk', 'tech noir'],
      lighting: ['neon glow', 'dark atmosphere', 'rain reflections']
    }
  },
  abstract: {
    name: '抽象艺术',
    description: '适合创作抽象和实验性艺术的提示词组合',
    categories: {
      style: ['abstract art', 'experimental', 'non-representational'],
      elements: ['geometric shapes', 'fluid forms', 'patterns'],
      technique: ['mixed media', 'digital manipulation', 'generative art'],
      color: ['vibrant colors', 'color theory', 'complementary colors'],
      mood: ['expressive', 'emotional', 'conceptual']
    }
  },
  horror: {
    name: '恐怖氛围',
    description: '适合恐怖和黑暗风格的提示词组合',
    categories: {
      atmosphere: ['dark', 'eerie', 'haunting', 'mysterious'],
      lighting: ['low key', 'shadows', 'atmospheric fog'],
      elements: ['horror elements', 'supernatural', 'creepy'],
      style: ['dark art', 'gothic', 'macabre'],
      mood: ['unsettling', 'suspenseful', 'sinister']
    }
  },
  minimalist: {
    name: '极简主义',
    description: '适合极简和清新风格的提示词组合',
    categories: {
      style: ['minimalist', 'clean', 'simple', 'modern'],
      composition: ['negative space', 'geometric', 'balanced'],
      color: ['monochrome', 'limited palette', 'subtle tones'],
      mood: ['calm', 'zen', 'sophisticated'],
      quality: ['refined', 'elegant', 'precise']
    }
  },
  watercolor: {
    name: '水彩艺术',
    description: '适合水彩画和传统艺术风格的提示词组合',
    categories: {
      style: ['watercolor', 'traditional art', 'painterly'],
      technique: ['wet on wet', 'layered wash', 'color bleeding'],
      texture: ['paper texture', 'granulation', 'soft edges'],
      mood: ['dreamy', 'ethereal', 'delicate'],
      color: ['transparent', 'luminous', 'pastel colors']
    }
  },
  vintage: {
    name: '复古风格',
    description: '适合复古和怀旧风格的提示词组合',
    categories: {
      era: ['retro', 'vintage', 'classic', 'nostalgic'],
      style: ['film photography', 'old school', 'timeless'],
      effects: ['grain', 'vignette', 'color fade'],
      mood: ['nostalgic', 'romantic', 'timeless'],
      processing: ['analog film', 'vintage filter', 'sepia tones']
    }
  },
  game_art: {
    name: '游戏艺术',
    description: '适合游戏场景和角色设计的提示词组合',
    categories: {
      style: ['game art', 'character design', 'environment art'],
      quality: ['3D rendered', 'high poly', 'game assets'],
      lighting: ['real-time lighting', 'dynamic shadows', 'ambient occlusion'],
      mood: ['epic', 'playful', 'immersive'],
      features: ['textures', 'normal maps', 'pbr materials']
    }
  },
  three_d_render: {
    name: '3D渲染',
    description: '适合3D建模和渲染的提示词组合',
    categories: {
      style: ['3D render', 'CGI', 'photorealistic'],
      quality: ['octane render', 'ray tracing', 'global illumination'],
      materials: ['subsurface scattering', 'metallic', 'glass'],
      lighting: ['hdri lighting', 'studio setup', 'caustics'],
      features: ['depth of field', 'motion blur', 'ambient occlusion']
    }
  },
  illustration: {
    name: '插画设计',
    description: '适合商业插画和设计的提示词组合',
    categories: {
      style: ['digital illustration', 'vector art', 'editorial'],
      technique: ['flat design', 'line art', 'gradient mesh'],
      purpose: ['book cover', 'editorial', 'advertising'],
      mood: ['whimsical', 'professional', 'engaging'],
      features: ['character design', 'composition', 'typography']
    }
  },
  nature: {
    name: '自然微距',
    description: '适合自然和微距摄影的提示词组合',
    categories: {
      subject: ['macro photography', 'nature', 'flowers', 'insects'],
      technique: ['focus stacking', 'shallow depth', 'close-up'],
      lighting: ['natural light', 'backlight', 'soft diffusion'],
      detail: ['texture', 'patterns', 'fine details'],
      mood: ['natural', 'organic', 'intimate']
    }
  },
  street: {
    name: '街头摄影',
    description: '适合街头和纪实摄影的提示词组合',
    categories: {
      style: ['street photography', 'documentary', 'candid'],
      scene: ['urban', 'city life', 'street scene'],
      technique: ['black and white', 'high contrast', 'decisive moment'],
      mood: ['authentic', 'raw', 'storytelling'],
      composition: ['leading lines', 'rule of thirds', 'framing']
    }
  },
  fashion: {
    name: '时尚摄影',
    description: '适合时尚和美妆摄影的提示词组合',
    categories: {
      style: ['fashion photography', 'editorial', 'high fashion'],
      lighting: ['beauty lighting', 'fashion lighting', 'dramatic'],
      pose: ['fashion pose', 'editorial pose', 'dynamic'],
      mood: ['glamorous', 'edgy', 'trendy'],
      post: ['fashion retouch', 'color grading', 'skin retouch']
    }
  },
  creative_fusion: {
    name: '随机创意',
    description: '混合多种风格的创意提示词组合',
    categories: {
      art_style: [
        'oil painting', 'watercolor', 'digital art', 'concept art',
        'anime style', 'photorealistic', '3D render', 'abstract'
      ],
      fusion_elements: [
        'cyberpunk elements', 'fantasy elements', 'steampunk', 'retrofuturistic',
        'organic mechanical fusion', 'surreal', 'biomechanical', 'ethereal'
      ],
      technique_mix: [
        'mixed media', 'experimental techniques', 'style fusion', 'hybrid art',
        'unconventional methods', 'innovative approach', 'cross-genre', 'artistic mashup'
      ],
      creative_effects: [
        'glitch art', 'double exposure', 'fractals', 'geometric patterns',
        'particle effects', 'light trails', 'holographic', 'dimensional shift'
      ],
      mood_blend: [
        'dreamlike', 'mysterious', 'chaotic harmony', 'dynamic contrast',
        'temporal fusion', 'reality bending', 'dimensional blend', 'cosmic'
      ]
    }
  }
};

// 随机风格生成器
const getRandomElements = (array, count = 1) => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

function PromptBuilder({ onSave }) {
  const [activeTab, setActiveTab] = useState('formula'); // 'formula' | 'freeform'

  // 从词库中提取所有可用的标签
  const availableTags = useMemo(() => {
    const tags = new Set();
    Object.values(vocabularyLibrary).forEach(category => {
      category.values.forEach(value => {
        if (value.tags) {
          value.tags.forEach(tag => tags.add(tag));
        }
      });
    });
    return Array.from(tags);
  }, []);

  // 状态定义
  const [selectedOptions, setSelectedOptions] = useState({});
  const [customPrompts, setCustomPrompts] = useState([]);
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [promptHistory, setPromptHistory] = useState([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [promptWeights, setPromptWeights] = useState({});

  // 处理权重变化
  const handleWeightChange = useCallback((prompt, weight) => {
    setPromptWeights(prev => ({
      ...prev,
      [prompt]: parseFloat(weight)
    }));
  }, []);

  // 使用 useCallback 优化回调函数
  const handleOptionClick = useCallback((category, optionName) => {
    setSelectedOptions(prev => {
      try {
        const currentSelected = prev[category] || [];
        const newSelected = currentSelected.includes(optionName)
          ? currentSelected.filter(name => name !== optionName)
          : [...currentSelected, optionName];
        return {
          ...prev,
          [category]: newSelected
        };
      } catch (err) {
        setError('选项选择失败，请重试');
        return prev;
      }
    });
  }, []);

  const toggleFavorite = useCallback((category, optionName) => {
    setFavorites(prev => {
      try {
        const key = `${category}-${optionName}`;
        return prev.includes(key)
          ? prev.filter(item => item !== key)
          : [...prev, key];
      } catch (err) {
        setError('收藏操作失败，请重试');
        return prev;
      }
    });
  }, []);

  const addCustomPrompt = useCallback(() => {
    setCustomPrompts(prev => [...prev, '']);
  }, []);

  const updateCustomPrompt = useCallback((index, value) => {
    setCustomPrompts(prev => {
      try {
        const newPrompts = [...prev];
        newPrompts[index] = value;
        return newPrompts;
      } catch (err) {
        setError('更新自定义提示词失败，请重试');
        return prev;
      }
    });
  }, []);

  const removeCustomPrompt = useCallback((index) => {
    setCustomPrompts(prev => prev.filter((_, i) => i !== index));
  }, []);

  // 应用模板
  const applyTemplate = useCallback((templateKey) => {
    try {
      const template = promptTemplates[templateKey];
      if (!template) return;

      // 清除现有选择
      setSelectedOptions({});
      setCustomPrompts([]);
      setError(null);
      
      // 特殊处理随机创意模板
      if (templateKey === 'creative_fusion') {
        const randomizedCategories = {};
        Object.entries(template.categories).forEach(([category, options]) => {
          // 从每个类别随机选择2-3个选项
          const count = Math.floor(Math.random() * 2) + 2; // 2-3个
          randomizedCategories[category] = getRandomElements(options, count);
        });
        setSelectedOptions(randomizedCategories);
      } else {
        // 常规模板直接应用所有选项
        setSelectedOptions(template.categories);
      }
      setActiveTemplate(templateKey);
    } catch (err) {
      console.error('应用模板失败:', err);
      setError('应用模板失败，请重试');
    }
  }, []);

  // 生成提示词
  const generatePrompt = useCallback(() => {
    try {
      // 收集所有选中的选项
      const selectedPrompts = Object.entries(selectedOptions)
        .flatMap(([category, options]) => 
          options.map(option => {
            const weight = promptWeights[option] || 1.0;
            return weight === 1.0 ? option : `${option}:${weight.toFixed(1)}`;
          })
        )
        .filter(Boolean);

      // 添加自定义提示词
      const customWeightedPrompts = customPrompts.map(prompt => {
        const weight = promptWeights[prompt] || 1.0;
        return weight === 1.0 ? prompt : `${prompt}:${weight.toFixed(1)}`;
      });

      const allPrompts = [...selectedPrompts, ...customWeightedPrompts];

      if (allPrompts.length === 0) {
        setError('请至少选择一个选项或添加自定义提示词');
        return '';
      }

      // 随机打乱提示词顺序
      const shuffledPrompts = [...allPrompts].sort(() => Math.random() - 0.5);
      const finalPrompt = shuffledPrompts.join(', ');
      
      setGeneratedPrompt(finalPrompt);
      // 添加带时间戳的历史记录
      setPromptHistory(prev => [{
        prompt: finalPrompt,
        timestamp: new Date().getTime(),
        weights: { ...promptWeights }  // 保存权重到历史记录
      }, ...prev].slice(0, 10));
      setError(null);
      
      return finalPrompt;
    } catch (err) {
      console.error('生成提示词失败:', err);
      setError('生成提示词失败，请重试');
      return '';
    }
  }, [selectedOptions, customPrompts, promptWeights]);

  // 监听模板变化，自动生成提示词
  useEffect(() => {
    if (activeTemplate) {
      generatePrompt();
    }
  }, [activeTemplate, generatePrompt]);

  // 导出当前配置
  const exportConfig = useCallback(() => {
    try {
      const config = {
        selectedOptions,
        customPrompts,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };
      
      const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `prompt-config-${new Date().toISOString()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('导出配置失败:', err);
      setError('导出配置失败，请重试');
    }
  }, [selectedOptions, customPrompts]);

  // 导入配置
  const importConfig = useCallback((event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const config = JSON.parse(e.target.result);
          setSelectedOptions(config.selectedOptions || {});
          setCustomPrompts(config.customPrompts || []);
          generatePrompt();
        } catch (err) {
          setError('导入配置失败，文件格式不正确');
        }
      };
      reader.readAsText(file);
    } catch (err) {
      console.error('导入配置失败:', err);
      setError('导入配置失败，请重试');
    }
  }, []);

  // 错误提示组件
  const ErrorMessage = () => error && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
    >
      {error}
    </motion.div>
  );

  // 选项卡片组件
  const OptionCard = ({ category, option }) => {
    const isSelected = selectedOptions[category]?.includes(option.name);
    const weight = promptWeights[option.name] || 1.0;
    
    return (
      <div className="relative group p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <button
          onClick={() => handleOptionClick(category, option.name)}
          className={`w-full text-left p-2 rounded-lg ${
            isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'
          }`}
        >
          <div className="font-medium">{option.name}</div>
          {option.description && (
            <div className="text-sm text-gray-500">{option.description}</div>
          )}
        </button>
      </div>
    );
  };

  // 已选提示词组件
  const SelectedPromptItem = ({ category, prompt }) => {
    const weight = promptWeights[prompt] || 1.0;
    
    return (
      <div 
        className="group flex items-center bg-white/10 hover:bg-white/20 rounded-full px-3 py-1.5 text-sm text-white transition-colors"
      >
        <span>{prompt}</span>
        <div className="flex items-center ml-2 gap-2">
          <input
            type="number"
            min="0.1"
            max="2.0"
            step="0.1"
            value={weight}
            onChange={(e) => handleWeightChange(prompt, e.target.value)}
            className="w-16 px-2 py-0.5 text-xs bg-white/5 border border-white/10 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={() => handleOptionClick(category, prompt)}
            className="text-white/60 hover:text-white/90"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // 已选提示词区域
  const SelectedPrompts = () => (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2 text-white">已选提示词</h3>
      <div className="flex flex-wrap gap-2">
        {Object.entries(selectedOptions).map(([category, options]) =>
          options.map(option => (
            <SelectedPromptItem
              key={option}
              category={category}
              prompt={option}
            />
          ))
        )}
        {customPrompts.map((prompt, index) => (
          <div 
            key={index}
            className="group flex items-center bg-white/10 hover:bg-white/20 rounded-full px-3 py-1.5 text-sm text-white transition-colors"
          >
            <span>{prompt}</span>
            <div className="flex items-center ml-2 gap-2">
              <input
                type="number"
                min="0.1"
                max="2.0"
                step="0.1"
                value={promptWeights[prompt] || 1.0}
                onChange={(e) => handleWeightChange(prompt, e.target.value)}
                className="w-16 px-2 py-0.5 text-xs bg-white/5 border border-white/10 rounded text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                onClick={() => removeCustomPrompt(index)}
                className="text-white/60 hover:text-white/90"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* 构建器类型选择 */}
      <div className="flex justify-center mb-6">
        <div className="bg-black/20 backdrop-blur-md py-4 px-4 shadow-lg rounded-xl">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            <button
              onClick={() => setActiveTab('formula')}
              className={`
                relative px-6 py-2.5 rounded-xl transition-all duration-200 
                flex items-center gap-2 min-w-[160px] justify-center
                ${activeTab === 'formula'
                  ? 'bg-white/15 text-white shadow-lg shadow-white/10 scale-105 hover:bg-white/20'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:scale-102'
                }
              `}
            >
              <SparklesIcon className={`w-5 h-5 transition-all duration-200 
                ${activeTab === 'formula' ? 'text-blue-400' : 'text-gray-400'}`} 
              />
              <span className="font-medium">提示词配方</span>
              {activeTab === 'formula' && (
                <motion.div
                  layoutId="activeTabBuilder"
                  className="absolute inset-0 border-2 border-blue-400/30 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('freeform')}
              className={`
                relative px-6 py-2.5 rounded-xl transition-all duration-200 
                flex items-center gap-2 min-w-[160px] justify-center
                ${activeTab === 'freeform'
                  ? 'bg-white/15 text-white shadow-lg shadow-white/10 scale-105 hover:bg-white/20'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white hover:scale-102'
                }
              `}
            >
              <PencilSquareIcon className={`w-5 h-5 transition-all duration-200 
                ${activeTab === 'freeform' ? 'text-blue-400' : 'text-gray-400'}`} 
              />
              <span className="font-medium">自由创作</span>
              {activeTab === 'freeform' && (
                <motion.div
                  layoutId="activeTabBuilder"
                  className="absolute inset-0 border-2 border-blue-400/30 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      {activeTab === 'formula' ? (
        <div className="grid lg:grid-cols-[1fr,400px] gap-6">
          {/* 左侧配方构建器 */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">提示词配方</h2>
                  <p className="text-sm text-gray-500 mt-1">选择或输入提示词参数，生成专业的 AI 提示词</p>
                </div>
                <div className="flex items-center gap-2">
                  {/* 模板选择 */}
                  <div className="relative">
                    <select
                      value={activeTemplate || ''}
                      onChange={(e) => applyTemplate(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">选择模板</option>
                      {Object.entries(promptTemplates).map(([key, template]) => (
                        <option key={key} value={key}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 导入/导出按钮 */}
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept=".json"
                      onChange={importConfig}
                      className="hidden"
                      id="import-config"
                    />
                    <label
                      htmlFor="import-config"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors cursor-pointer"
                      title="导入配置"
                    >
                      <ArrowUpTrayIcon className="w-5 h-5" />
                    </label>
                    <button
                      onClick={exportConfig}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                      title="导出配置"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedOptions({});
                      setCustomPrompts([]);
                      setGeneratedPrompt('');
                      setActiveTemplate(null);
                    }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                    title="清除所有内容"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowTemplates(!showTemplates)}
                    className={`p-2 rounded-lg transition-colors ${
                      showTemplates ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 hover:bg-white/10 text-gray-300'
                    }`}
                    title="使用模板"
                  >
                    <DocumentDuplicateIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 已选提示词区域 */}
              <SelectedPrompts />

              {/* 分类按钮组 */}
              <div className="flex flex-wrap gap-2 mb-6">
                {Object.entries(promptCategories).map(([key, category]) => (
                  <PromptCategoryMenu
                    key={key}
                    category={key}
                    name={category.name}
                    description={category.description}
                    icon={category.icon}
                    options={category.options}
                    selectedOptions={selectedOptions[key] || []}
                    onToggle={(optionName) => handleOptionClick(key, optionName)}
                  />
                ))}
              </div>

              {/* 自定义提示词输入 */}
              <div className="mt-6">
                <input
                  type="text"
                  placeholder="添加自定义提示词..."
                  className="w-full p-3 bg-white/5 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      setCustomPrompts(prev => [...prev, e.target.value.trim()]);
                      e.target.value = '';
                    }
                  }}
                />
              </div>

              {/* 生成按钮 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <button
                  onClick={generatePrompt}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  <SparklesIcon className="w-5 h-5" />
                  生成提示词
                </button>
              </motion.div>
            </div>
          </div>

          {/* 右侧预览和历史记录 */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <PromptPreview 
                prompt={generatedPrompt} 
                onRegenerate={generatePrompt}
                onSave={onSave}
              />
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">历史记录</h3>
                <button
                  onClick={() => setPromptHistory([])}
                  className="px-3 py-1 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors"
                >
                  清除历史
                </button>
              </div>
              <PromptHistory 
                history={promptHistory} 
                onSelect={(item) => setGeneratedPrompt(item.prompt)}
              />
            </div>
          </div>
        </div>
      ) : (
        <PromptFreeform 
          onSave={onSave}
          availableTags={availableTags}
        />
      )}
    </div>
  );
}

export default PromptBuilder;
