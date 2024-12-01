// 专业版本词库
const vocabularyDataPro = {
  zh: {
    subject: {
      portrait: ['人像写真', '时尚人像', '艺术人像', '街拍人像', '环境人像'],
      landscape: ['自然风光', '城市风光', '建筑空间', '微观世界', '星空银河'],
      commercial: ['商业产品', '美食摄影', '室内设计', '时尚服装', '珠宝首饰'],
      creative: ['概念创意', '抽象艺术', '超现实主义', '实验摄影', '多重曝光']
    },
    style: {
      artistic: ['印象派', '极简主义', '赛博朋克', '新浪漫主义', '后现代主义'],
      technique: ['长曝光', 'HDR', '多重曝光', '红外摄影', '移轴摄影'],
      composition: ['黄金分割', '对称构图', '引导线条', '框架构图', '三分法则'],
      processing: ['胶片风格', '黑白艺术', '交叉冲印', '褪色复古', '双色调']
    },
    lighting: {
      natural: ['自然光', '黄金时刻', '蓝调时刻', '逆光', '侧逆光'],
      artificial: ['工作室灯光', 'LED创意光', '闪光灯', '环形灯', '持续光'],
      mood: ['低调光线', '高调光线', '轮廓光', '分离光', '漫射光'],
      technique: ['雷米灯光', '蝴蝶光', '分割打光', '轮廓光', '填充光']
    },
    camera: {
      settings: ['大光圈', '慢快门', '高ISO', '低ISO', 'HDR'],
      lens: ['广角镜头', '长焦镜头', '微距镜头', '鱼眼镜头', '移轴镜头'],
      format: ['全画幅', '中画幅', '大画幅', 'APS-C', '无反相机'],
      brand: ['佳能', '尼康', '索尼', '富士', '徕卡']
    },
    details: {
      texture: ['纹理细节', '肌理效果', '质感表现', '材质特性', '表面处理'],
      color: ['单色调', '互补色', '类比色', '分裂互补', '三角色彩'],
      effect: ['景深控制', '运动模糊', '色彩分离', '选择性对焦', '色调映射'],
      post: ['局部调整', '色彩分级', '皮肤修饰', '频率分离', '调色风格']
    },
    color: {
      scheme: ['暖色调', '冷色调', '高饱和', '低饱和', '单色调'],
      harmony: ['互补色系', '邻近色系', '三角色系', '分裂互补', '双色调'],
      mood: ['明快色调', '沉稳色调', '梦幻色调', '复古色调', '电影色调'],
      technical: ['色彩平衡', '色相偏移', '选择性色彩', '色调分离', '色彩和谐']
    },
    effect: {
      visual: ['景深模糊', '运动模糊', '柔焦效果', '高反差', '低反差'],
      artistic: ['双重曝光', '光线追踪', '色彩分离', '噪点颗粒', '色偏效果'],
      digital: ['HDR效果', '色调映射', 'LUT调色', '胶片模拟', '复古褪色'],
      special: ['镜头光斑', '色散效果', '暗角效果', '色温偏移', '梦幻效果']
    },
    technical: {
      quality: ['8K超高清', '4K高清', 'RAW格式', '无损质量', '高位深'],
      format: ['全画幅', '中画幅', 'APS-C', '微型4/3', '大画幅'],
      processing: ['AI增强', '降噪处理', '锐化处理', '动态范围优化', '色彩管理'],
      output: ['数字输出', '打印输出', '网络优化', '移动设备优化', '专业校准']
    }
  },
  en: {
    subject: {
      portrait: ['fashion portrait', 'artistic portrait', 'street portrait', 'environmental portrait', 'studio portrait'],
      landscape: ['nature landscape', 'urban landscape', 'architectural space', 'macro world', 'astrophotography'],
      commercial: ['product photography', 'food photography', 'interior design', 'fashion', 'jewelry'],
      creative: ['conceptual', 'abstract art', 'surrealism', 'experimental', 'multiple exposure']
    },
    style: {
      artistic: ['impressionism', 'minimalism', 'cyberpunk', 'new romanticism', 'post-modernism'],
      technique: ['long exposure', 'HDR', 'multiple exposure', 'infrared', 'tilt-shift'],
      composition: ['golden ratio', 'symmetry', 'leading lines', 'framing', 'rule of thirds'],
      processing: ['film look', 'black and white art', 'cross processing', 'vintage fade', 'duotone']
    },
    lighting: {
      natural: ['natural light', 'golden hour', 'blue hour', 'backlight', 'rim light'],
      artificial: ['studio lighting', 'creative LED', 'flash', 'ring light', 'continuous light'],
      mood: ['low key', 'high key', 'silhouette', 'split lighting', 'diffused light'],
      technique: ['rembrandt', 'butterfly', 'split', 'rim', 'fill light']
    },
    camera: {
      settings: ['wide aperture', 'slow shutter', 'high ISO', 'low ISO', 'HDR'],
      lens: ['wide angle', 'telephoto', 'macro', 'fisheye', 'tilt-shift'],
      format: ['full frame', 'medium format', 'large format', 'APS-C', 'mirrorless'],
      brand: ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Leica']
    },
    details: {
      texture: ['textural detail', 'surface pattern', 'material quality', 'substance character', 'surface treatment'],
      color: ['monochrome', 'complementary', 'analogous', 'split complementary', 'triadic'],
      effect: ['depth of field', 'motion blur', 'color separation', 'selective focus', 'tone mapping'],
      post: ['local adjustment', 'color grading', 'skin retouching', 'frequency separation', 'color styling']
    },
    color: {
      scheme: ['warm tones', 'cool tones', 'high saturation', 'low saturation', 'monochromatic'],
      harmony: ['complementary', 'analogous', 'triadic', 'split complementary', 'duotone'],
      mood: ['vibrant', 'muted', 'dreamy', 'vintage', 'cinematic'],
      technical: ['color balance', 'hue shift', 'selective color', 'tonal separation', 'color harmony']
    },
    effect: {
      visual: ['depth blur', 'motion blur', 'soft focus', 'high contrast', 'low contrast'],
      artistic: ['double exposure', 'ray tracing', 'color split', 'grain', 'color shift'],
      digital: ['HDR effect', 'tone mapping', 'LUT grading', 'film simulation', 'vintage fade'],
      special: ['lens flare', 'chromatic aberration', 'vignette', 'temperature shift', 'dreamy effect']
    },
    technical: {
      quality: ['8K ultra HD', '4K HD', 'RAW format', 'lossless quality', 'high bit depth'],
      format: ['full frame', 'medium format', 'APS-C', 'micro 4/3', 'large format'],
      processing: ['AI enhanced', 'noise reduction', 'sharpening', 'dynamic range optimization', 'color management'],
      output: ['digital output', 'print output', 'web optimization', 'mobile optimization', 'professional calibration']
    }
  }
}

export default vocabularyDataPro;
