// 词库数据
const vocabularyLibrary = {
  subject: {
    name: '主题',
    values: [
      // 自然景观
      'a mystical forest at dawn', 'a futuristic city in neon lights', 'a serene mountain lake at sunset', 
      'an ancient temple hidden in mist', 'a cosmic nebula with swirling colors', 'a magical floating island',
      'a peaceful zen garden in autumn', 'a bustling night market in rain', 'an underwater coral city',
      'a desert oasis under starlight', 'a crystalline ice cave', 'a volcanic landscape at twilight',
      'a bioluminescent beach at night', 'a rainbow waterfall in jungle', 'a misty bamboo forest',
      'a northern lights display', 'a cherry blossom storm', 'a meteor shower over desert',
      'a giant redwood forest', 'a tropical paradise island', 'a geothermal hot spring',
      
      // 人物场景
      'a cyberpunk street vendor', 'a mysterious fortune teller', 'a wandering samurai in cherry blossoms',
      'a space explorer on alien planet', 'a steampunk inventor in workshop', 'a magical librarian with books',
      'a dragon tamer with ancient scroll', 'a time traveler in victorian era', 'a witch brewing potions',
      'a digital nomad in future cafe', 'an alchemist in secret lab', 'a street artist creating mural',
      'a quantum physicist at work', 'a deep sea explorer', 'a desert archaeologist',
      'a robotic chef in kitchen', 'a hologram street performer', 'a space station mechanic',
      
      // 奇幻生物
      'a phoenix rising from ashes', 'a crystal dragon in flight', 'a mechanical unicorn with gears',
      'a spirit fox with nine tails', 'a rainbow serpent in clouds', 'a jade lion guardian statue',
      'a golden butterfly migration', 'a celestial deer constellation', 'an electric jellyfish school',
      'a clockwork phoenix', 'a digital spirit wolf', 'a coral reef dragon',
      'a quantum butterfly swarm', 'a plasma energy being', 'a crystal golem guardian',
      'a time-shifting sphinx', 'a dream weaver spider', 'a star whale in space',
      
      // 建筑空间
      'a floating sky palace', 'an underwater glass dome city', 'a treehouse library in giant tree',
      'a steampunk clock tower', 'a crystal greenhouse garden', 'a neon subway station at midnight',
      'a floating market on canal', 'a hidden mountain monastery', 'an art deco theater facade',
      'a quantum computing facility', 'a vertical forest skyscraper', 'a solar punk community',
      'a biodome on mars surface', 'an ancient library ruins', 'a floating tea house',
      'a holographic art gallery', 'a bamboo sky bridge', 'a subterranean crystal city',
      
      // 抽象概念
      'the concept of time flow', 'the dance of four seasons', 'the birth of a new universe',
      'the melody of northern lights', 'the spirit of ancient forest', 'the dreams of ocean depths',
      'the balance of yin and yang', 'the cycle of life and death', 'the harmony of elements',
      'the convergence of realities', 'the essence of creativity', 'the pulse of urban life',
      'the whispers of quantum realm', 'the rhythm of cosmos', 'the flow of digital data',
      'the echoes of lost civilizations', 'the dance of probability', 'the song of wind and rain'
    ]
  },
  style: {
    name: '风格',
    values: [
      // 艺术风格
      'hyperrealistic digital art', 'impressionistic oil painting', 'ethereal watercolor illustration',
      'detailed pencil sketch', 'vibrant concept art', 'minimalistic line art', 'surrealistic digital painting',
      'art nouveau style', 'ukiyo-e japanese style', 'pop art aesthetic', 'gothic dark fantasy',
      'abstract expressionism', 'cubist interpretation', 'baroque digital fusion', 'pointillism technique',
      'graffiti street art', 'bauhaus design', 'art deco elegance', 'modernist simplicity',
      'post-impressionist vision', 'contemporary minimalism', 'classical realism',
      
      // 技术风格
      'cinematic 8K rendering', 'studio photography', 'isometric pixel art', 'low poly 3D art',
      'retro synthwave style', 'cyberpunk neon art', 'vaporwave aesthetic', 'glitch art effect',
      'neural network generation', 'procedural fractal art', 'generative adversarial art',
      'volumetric light simulation', 'ray traced rendering', 'holographic projection',
      'quantum visualization', 'augmented reality overlay', 'virtual reality space',
      
      // 混合风格
      'mixed media collage', 'geometric abstract', 'photorealistic fantasy', 'sci-fi concept art',
      'steampunk mechanical', 'art deco futurism', 'baroque cyberpunk fusion', 'tribal futuristic',
      'organic tech fusion', 'retro futuristic blend', 'digital impressionism', 'neo traditional',
      'biomechanical hybrid', 'ethereal cyberpunk', 'quantum baroque', 'cosmic art nouveau',
      'techno-organic fusion', 'digital surrealism', 'cyber-impressionism',
      
      // 材质风格
      'metallic chrome finish', 'holographic iridescent', 'glass crystal clear', 'matte velvet surface',
      'polished marble look', 'rough concrete texture', 'smooth plastic shine', 'brushed metal effect',
      'liquid mercury flow', 'diamond faceted cut', 'pearl nacre shine', 'rustic wood grain',
      'carbon fiber weave', 'ceramic glazed surface', 'leather textured look', 'fabric woven pattern',
      'paper origami fold', 'rubber matte finish'
    ]
  },
  lighting: {
    name: '光照',
    values: [
      // 自然光照
      'soft morning sunlight', 'golden hour warm glow', 'dramatic sunset rays', 'misty moonlight',
      'dappled forest light', 'stormy dramatic clouds', 'northern lights glow', 'starry night sky',
      'rainbow prism effect', 'sunburst through clouds', 'twilight blue hour',
      'dawn breaking light', 'eclipse shadow play', 'celestial star trails',
      'meteor shower streaks', 'bioluminescent glow', 'desert sun flare',
      
      // 人工光照
      'neon city lights', 'warm candlelight', 'cold fluorescent light', 'colorful disco lights',
      'stark spotlight beam', 'soft studio lighting', 'cinema lighting setup', 'LED color wash',
      'laser light show', 'holographic displays', 'quantum light effects',
      'plasma lamp glow', 'fiber optic trails', 'UV blacklight glow',
      'strobe light flash', 'stage spotlight beams', 'concert lighting rig',
      
      // 氛围光效
      'ethereal glowing aura', 'magical sparkle effect', 'volumetric god rays', 'moody atmospheric haze',
      'backlit silhouette', 'rim lighting effect', 'subsurface scattering', 'bioluminescent glow',
      'ghostly spirit lights', 'fairy light bokeh', 'crystal light prisms',
      'quantum particle glow', 'plasma energy field', 'astral projection light',
      'dream sequence glow', 'memory light leak', 'time portal radiance',
      
      // 特殊光效
      'rainbow prism refraction', 'laser beam trails', 'fire light flicker', 'underwater caustics',
      'crystal light dispersion', 'holographic light play', 'lightning flash burst', 'particle light dust',
      'quantum entanglement glow', 'temporal light shift', 'dimensional rift shine',
      'neural network visualization', 'data stream light flow', 'binary code illumination',
      'matrix code rain light', 'digital glitch flare', 'cybernetic circuit glow'
    ]
  },
  camera: {
    name: '相机',
    values: [
      // 镜头类型
      'wide angle dramatic view', 'telephoto compressed perspective', 'macro extreme closeup', 
      'fisheye distorted view', 'tilt-shift miniature effect', 'anamorphic cinematic lens',
      'panoramic wide view', 'super telephoto reach', 'microscope detailed view',
      'telescope space view', 'infrared spectrum lens', 'x-ray transparent view',
      'quantum microscope view', 'multispectral imaging', 'hyperspectral capture',
      
      // 拍摄角度
      'bird\'s eye overhead view', 'worm\'s eye view from below', 'dutch angle tilted frame',
      'over-the-shoulder shot', 'straight-on front view', 'profile side view shot',
      'three-quarter angle view', 'top-down flat lay', 'diagonal dynamic angle',
      'extreme low angle shot', 'extreme high angle view', 'rotating orbital shot',
      'spiral descending view', 'floating drone angle', 'underwater perspective',
      
      // 相机动作
      'tracking shot in motion', 'slow motion capture', 'time lapse sequence', 'freeze frame moment',
      'dolly zoom effect', 'handheld camera shake', 'steady cam smooth motion', 'drone aerial shot',
      'bullet time array', 'virtual camera path', 'particle view tracking',
      'quantum perspective shift', 'dimensional camera hop', 'time slice array',
      'light field refocus', 'volumetric capture', 'holographic recording',
      
      // 景深效果
      'shallow depth of field', 'deep focus sharp', 'bokeh background blur', 'focus pull rack',
      'split diopter shot', 'lens flare effect', 'soft focus dreamy', 'multiple exposure blend',
      'tilt shift selective focus', 'freelensing blur', 'prismatic focus split',
      'quantum blur effect', 'temporal focus shift', 'dimensional focus blend',
      'neural network defocus', 'AI generated bokeh', 'synthetic aperture effect'
    ]
  },
  mood: {
    name: '氛围',
    values: [
      // 情感氛围
      'mysterious and enigmatic', 'peaceful and serene', 'dark and moody', 'bright and cheerful',
      'melancholic and nostalgic', 'energetic and dynamic', 'dreamy and surreal', 'epic and majestic',
      'intimate and personal', 'grand and spectacular', 'quiet and contemplative',
      'chaotic and turbulent', 'harmonious and balanced', 'tense and dramatic',
      'playful and whimsical', 'solemn and dignified', 'ethereal and otherworldly',
      'nostalgic and sentimental', 'futuristic and advanced', 'ancient and mystical',
      'adventurous and bold', 'relaxed and casual', 'luxurious and opulent',
      
      // 时间氛围
      'early morning fresh', 'lazy afternoon calm', 'busy evening rush', 'quiet midnight peace',
      'golden autumn mood', 'crisp winter scene', 'fresh spring feeling', 'warm summer vibes',
      'timeless moment pause', 'future chrome gleam', 'retro vintage feel',
      'eternal twilight glow', 'temporal flux shift', 'quantum time slice',
      'dimensional drift mood', 'parallel time flow', 'time spiral energy',
      
      // 环境氛围
      'foggy and mysterious', 'rainy and romantic', 'sunny and vibrant', 'stormy and dramatic',
      'snowy and peaceful', 'windy and dynamic', 'humid and tropical', 'dry and desert-like',
      'cosmic and stellar', 'underwater serene', 'subterranean deep',
      'volcanic and primal', 'glacial and pristine', 'jungle and lush',
      'urban and electric', 'rural and rustic', 'industrial and raw',
      
      // 场景氛围
      'urban and bustling', 'rural and peaceful', 'industrial and raw', 'natural and wild',
      'futuristic and clean', 'ancient and weathered', 'mystical and enchanted', 'scientific and precise',
      'artistic and creative', 'spiritual and sacred', 'digital and virtual', 'organic and flowing',
      'mechanical and precise', 'ethereal and light', 'primal and powerful', 'cosmic and infinite',
      'quantum and abstract', 'temporal and shifting'
    ]
  },
  // 新增色彩类别
  color: {
    name: '色彩',
    values: [
      // 色调
      'vibrant neon colors', 'muted pastel palette', 'monochromatic grayscale', 'rich jewel tones',
      'warm autumn colors', 'cool winter tones', 'iridescent rainbow hues', 'metallic gold and silver',
      
      // 配色方案
      'complementary color scheme', 'analogous harmony', 'split complementary', 'triadic color balance',
      'high contrast dramatic', 'low contrast subtle', 'duotone gradient blend', 'polychromatic burst',
      
      // 氛围色彩
      'cyberpunk neon glow', 'vintage color fading', 'dreamy pastel wash', 'dark moody tones',
      'ethereal light leaks', 'film negative colors', 'infrared color shift', 'psychedelic color mix'
    ]
  },
  // 新增质地类别
  texture: {
    name: '质地',
    values: [
      // 自然质地
      'rough stone surface', 'smooth liquid glass', 'organic wood grain', 'crystalline formation',
      'flowing water ripples', 'sandy desert texture', 'leafy forest floor', 'misty fog particles',
      
      // 人造质地
      'brushed metal finish', 'woven fabric pattern', 'polished chrome shine', 'rusted industrial',
      'digital glitch pattern', 'pixel mosaic grid', 'holographic shimmer', 'neon light trails',
      
      // 抽象质地
      'fractal patterns', 'geometric tessellation', 'quantum interference', 'data visualization',
      'particle system flow', 'wave interference', 'noise distortion', 'cellular automata'
    ]
  },
  // 新增角色主体类别
  character: {
    name: '角色',
    values: [
      // 人物类型
      'beautiful young woman', 'handsome young man', 'elegant elderly person', 'innocent child',
      'mysterious wizard', 'brave warrior', 'graceful dancer', 'focused artist',
      'wise scholar', 'skilled craftsman', 'powerful ruler', 'humble monk',
      'futuristic cyborg', 'mystical shaman', 'urban explorer', 'nature guardian',
      
      // 幻想生物
      'majestic dragon', 'ethereal fairy', 'ancient phoenix', 'wise unicorn',
      'mystical mermaid', 'powerful griffin', 'celestial angel', 'dark demon',
      'forest spirit', 'water nymph', 'storm giant', 'crystal golem',
      'shadow creature', 'light being', 'dream weaver', 'star child',
      
      // 职业角色
      'skilled samurai', 'stealthy ninja', 'royal knight', 'wandering monk',
      'mysterious witch', 'powerful mage', 'precise archer', 'brave paladin',
      'cunning rogue', 'wise druid', 'battle-worn warrior', 'peaceful healer',
      'tech-savvy hacker', 'space explorer', 'time traveler', 'dimensional walker',
      
      // 外观特征
      'flowing long hair', 'sharp facial features', 'piercing eyes', 'graceful posture',
      'ornate costume', 'battle armor', 'mystical tattoos', 'glowing aura',
      'ethereal wings', 'mechanical limbs', 'crystal skin', 'elemental form',
      'royal attire', 'tribal markings', 'futuristic suit', 'ancient robes'
    ]
  },
  // 新增场景类别
  scene: {
    name: '场景',
    values: [
      // 自然场景
      'mystical forest clearing', 'towering mountain peak', 'serene beach sunset', 'hidden waterfall',
      'crystal cave interior', 'ancient tree grove', 'floating islands', 'coral reef city',
      'northern lights display', 'desert oasis', 'bamboo forest path', 'cherry blossom garden',
      'volcanic landscape', 'arctic ice field', 'tropical paradise', 'misty valley',
      
      // 建筑场景
      'futuristic cityscape', 'ancient temple ruins', 'medieval castle', 'floating palace',
      'underground bunker', 'space station interior', 'steampunk workshop', 'magical library',
      'cyber punk streets', 'crystal cathedral', 'zen garden temple', 'floating market',
      'neon lit alley', 'quantum laboratory', 'time travel hub', 'dimensional nexus',
      
      // 奇幻场景
      'dragon\'s lair', 'fairy realm', 'crystal dimension', 'spirit world',
      'dream landscape', 'astral plane', 'elemental realm', 'cosmic void',
      'time stream', 'parallel universe', 'quantum realm', 'digital world',
      'memory palace', 'thought dimension', 'soul sanctuary', 'energy vortex'
    ]
  },
  // 新增时间类别
  time: {
    name: '时间',
    values: [
      // 时间点
      'golden dawn moment', 'bright midday sun', 'peaceful dusk hour', 'mysterious midnight',
      'blue hour transition', 'magic hour glow', 'first light breaking', 'last light fading',
      'twilight transition', 'starlit night', 'moonlit evening', 'solar eclipse moment',
      'lunar eclipse phase', 'celestial alignment', 'time freeze instant', 'eternal moment',
      
      // 季节时间
      'spring bloom peak', 'summer heat wave', 'autumn leaves falling', 'winter frost forming',
      'cherry blossom time', 'monsoon rain season', 'harvest moon phase', 'solstice alignment',
      'equinox balance', 'migration period', 'hibernation time', 'growth season',
      'decay period', 'renewal cycle', 'transformation phase', 'stasis moment',
      
      // 特殊时间
      'time spiral loop', 'parallel timeline', 'alternate history', 'future vision',
      'past memory', 'present moment', 'temporal fold', 'chronological twist',
      'time dilation', 'quantum moment', 'relative timeflow', 'temporal paradox',
      'time convergence', 'divergent timeline', 'causal nexus', 'temporal anomaly'
    ]
  },
  // 新增天气类别
  weather: {
    name: '天气',
    values: [
      // 自然天气
      'gentle rain shower', 'thunderstorm brewing', 'snow falling softly', 'fog rolling in',
      'clouds gathering', 'clear sky above', 'rainbow appearing', 'lightning striking',
      'wind gusting strong', 'hail storm raging', 'mist rising slow', 'frost forming',
      'dew drops forming', 'hurricane approaching', 'tornado spinning', 'blizzard howling',
      
      // 特殊天气
      'aurora borealis', 'meteor shower', 'comet passing', 'solar flare burst',
      'lunar rainbow', 'fire rain', 'crystal snow', 'light pillars',
      'sun dogs glowing', 'diamond dust', 'polar night', 'midnight sun',
      'ball lightning', 'red sprites', 'blue jets', 'elves phenomenon',
      
      // 魔幻天气
      'magic storm', 'time rain', 'soul wind', 'dream fog',
      'spirit clouds', 'dimensional storm', 'quantum weather', 'probability rain',
      'memory mist', 'thought thunder', 'emotion lightning', 'wisdom wind',
      'chaos storm', 'order breeze', 'balance tempest', 'harmony weather'
    ]
  },
  // 新增专业摄影类别
  photography: {
    name: '专业摄影',
    values: [
      // 摄影大师风格
      'style of Ansel Adams', 'style of Henri Cartier-Bresson', 'style of Annie Leibovitz',
      'style of Steve McCurry', 'style of Richard Avedon', 'style of Peter Lindbergh',
      'style of Irving Penn', 'style of Helmut Newton', 'style of Robert Capa',
      'style of Sebastião Salgado', 'style of David LaChapelle', 'style of Mario Testino',
      
      // 摄影技术
      'medium format film', 'large format camera', 'hasselblad', 'leica', 'polaroid',
      'kodak portra 400', 'fujifilm pro 400h', 'ilford delta 3200', 'cinestill 800t',
      'cross processed film', 'push processed', 'pull processed', 'double exposure',
      
      // 专业摄影效果
      'studio strobe lighting', 'ring light portrait', 'beauty dish lighting',
      'rembrandt lighting', 'butterfly lighting', 'split lighting', 'loop lighting',
      'broad lighting', 'short lighting', 'rim lighting', 'hair light', 'kicker light',
      'barn door lighting', 'snoot lighting', 'gobo lighting', 'fresnel spotlight',
      
      // 后期处理
      'dodge and burn', 'color grading', 'tone mapping', 'frequency separation',
      'high pass sharpening', 'local contrast', 'selective coloring', 'cross processing',
      'hdr processing', 'black and white conversion', 'split toning', 'film grain'
    ]
  },
  // 新增艺术家风格类别
  artist: {
    name: '艺术家风格',
    values: [
      // 古典大师
      'style of Leonardo da Vinci', 'style of Michelangelo', 'style of Rembrandt',
      'style of Johannes Vermeer', 'style of Claude Monet', 'style of Vincent van Gogh',
      'style of Pablo Picasso', 'style of Salvador Dalí', 'style of Gustav Klimt',
      'style of Wassily Kandinsky', 'style of Frida Kahlo', 'style of Georgia O\'Keeffe',
      
      // 现代艺术家
      'style of Takashi Murakami', 'style of Yayoi Kusama', 'style of Banksy',
      'style of Jeff Koons', 'style of Damien Hirst', 'style of Ai Weiwei',
      'style of Marina Abramović', 'style of Jean-Michel Basquiat', 'style of Keith Haring',
      'style of David Hockney', 'style of Gerhard Richter', 'style of Jenny Saville',
      
      // 数字艺术家
      'style of Beeple', 'style of Android Jones', 'style of Simon Stålenhag',
      'style of James Jean', 'style of Sparth', 'style of Craig Mullins',
      'style of Maciej Kuciara', 'style of Feng Zhu', 'style of John Harris',
      'style of Dan Mumford', 'style of Alphonse Mucha', 'style of Greg Rutkowski'
    ]
  },
  // 新增专业灯光类别
  lighting_setup: {
    name: '灯光设置',
    values: [
      // 灯光布局
      'three-point lighting', 'key light only', 'high-key lighting', 'low-key lighting',
      'paramount lighting', 'split lighting setup', 'back lighting setup', 'rim lighting setup',
      'bounce lighting', 'diffused lighting', 'harsh lighting', 'soft lighting',
      'natural window light', 'practical lighting', 'motivated lighting', 'available light',
      
      // 灯光设备
      'softbox lighting', 'octabox main light', 'beauty dish setup', 'ring light setup',
      'umbrella lighting', 'grid spot lighting', 'barn doors setup', 'fresnel spotlight',
      'led panel lighting', 'tungsten lighting', 'fluorescent lighting', 'hmi lighting',
      'strobe lighting', 'continuous lighting', 'flash lighting', 'gelled lighting',
      
      // 灯光效果
      'dramatic shadows', 'soft shadows', 'hard shadows', 'no shadows',
      'volumetric lighting', 'edge lighting', 'silhouette lighting', 'contre-jour',
      'chiaroscuro effect', 'lens flare effect', 'light leak effect', 'god rays',
      'specular highlights', 'diffused highlights', 'gradient lighting', 'dappled light',
      
      // 色温和颜色
      '5600K daylight', '3200K tungsten', 'mixed color temperature', 'warm lighting',
      'cool lighting', 'colored gel lighting', 'rgb lighting', 'complementary lighting',
      'analogous lighting', 'split complementary', 'triadic lighting', 'monochromatic lighting'
    ]
  },
  // 新增专业后期类别
  post_processing: {
    name: '后期处理',
    values: [
      // 调色风格
      'cinematic color grading', 'film emulation', 'bleach bypass look', 'cross processed',
      'vintage color palette', 'modern teal orange', 'pastel color palette', 'monochromatic',
      'high contrast look', 'low contrast look', 'selective coloring', 'duotone effect',
      'split toning style', 'color harmony', 'complementary colors', 'analogous colors',
      
      // 后期技术
      'frequency separation', 'dodge and burn', 'high pass sharpening', 'clarity boost',
      'local contrast', 'global contrast', 'shadow recovery', 'highlight recovery',
      'tone mapping', 'hdr processing', 'exposure blending', 'focus stacking',
      'perspective correction', 'lens correction', 'chromatic aberration fix', 'noise reduction',
      
      // 特殊效果
      'film grain effect', 'light leak overlay', 'lens flare overlay', 'bokeh overlay',
      'double exposure effect', 'motion blur effect', 'radial blur effect', 'zoom blur effect',
      'vignette effect', 'halation effect', 'bloom effect', 'glow effect',
      'chromatic aberration', 'glitch effect', 'pixelation effect', 'scan lines'
    ]
  }
};

// 定义风格主题
const styleThemes = {
  fantasy: {
    keywords: ['magical', 'mystical', 'ethereal', 'ancient', 'mythical'],
    character: ['wizard', 'fairy', 'dragon', 'phoenix', 'mage', 'shaman'],
    scene: ['magical library', 'ancient temple ruins', 'crystal dimension'],
    lighting: ['magical sparkle', 'ethereal glow', 'mystical light'],
    weather: ['magic storm', 'soul wind', 'dream fog'],
    mood: ['mysterious', 'ethereal', 'magical', 'dreamy'],
    style: ['surrealistic', 'ethereal watercolor', 'magical', 'fantasy'],
    color: ['iridescent', 'mystical', 'ethereal', 'crystal'],
    texture: ['crystalline', 'magical', 'ethereal', 'mystical']
  },
  cyberpunk: {
    keywords: ['cyber', 'neon', 'futuristic', 'tech', 'digital'],
    character: ['cyborg', 'hacker', 'android', 'robot', 'tech'],
    scene: ['cyber punk streets', 'neon city', 'futuristic', 'digital'],
    lighting: ['neon', 'holographic', 'cyber', 'digital'],
    weather: ['quantum weather', 'probability rain', 'dimensional storm'],
    mood: ['technological', 'futuristic', 'electric', 'cyber'],
    style: ['cyberpunk', 'neon art', 'digital', 'tech'],
    color: ['neon', 'cyber', 'digital', 'tech'],
    texture: ['holographic', 'digital', 'tech', 'cyber']
  },
  nature: {
    keywords: ['natural', 'organic', 'wild', 'elemental', 'primal'],
    character: ['druid', 'ranger', 'nature spirit', 'forest guardian'],
    scene: ['forest', 'mountain', 'ocean', 'valley', 'natural'],
    lighting: ['sunlight', 'moonlight', 'natural', 'organic'],
    weather: ['rain', 'snow', 'storm', 'natural'],
    mood: ['peaceful', 'serene', 'wild', 'natural'],
    style: ['organic', 'natural', 'realistic', 'environmental'],
    color: ['earth tones', 'natural', 'organic', 'elemental'],
    texture: ['organic', 'natural', 'rough', 'smooth']
  },
  steampunk: {
    keywords: ['steam', 'mechanical', 'victorian', 'brass', 'clockwork'],
    character: ['inventor', 'engineer', 'mechanic', 'steam', 'clockwork'],
    scene: ['workshop', 'factory', 'mechanical', 'steam'],
    lighting: ['warm', 'industrial', 'mechanical', 'steam'],
    weather: ['steam', 'fog', 'mechanical', 'industrial'],
    mood: ['industrial', 'mechanical', 'steam', 'victorian'],
    style: ['steampunk', 'mechanical', 'victorian', 'industrial'],
    color: ['brass', 'copper', 'bronze', 'metallic'],
    texture: ['metallic', 'mechanical', 'industrial', 'brass']
  }
};

// 定义类别之间的语义关联关系
const semanticRelations = {
  character: {
    scene: {
      'mysterious wizard|mage|shaman': ['magical library', 'ancient temple ruins', 'crystal dimension'],
      'brave warrior|knight|paladin': ['medieval castle', 'dragon\'s lair', 'battle field'],
      'cyborg|hacker|tech': ['futuristic cityscape', 'space station interior', 'quantum laboratory'],
      'druid|ranger|nature': ['mystical forest clearing', 'ancient tree grove', 'zen garden temple'],
      'fairy|angel|spirit': ['fairy realm', 'crystal dimension', 'spirit world'],
      'explorer|adventurer|wanderer': ['hidden waterfall', 'ancient ruins', 'mysterious cave']
    },
    weather: {
      'magical|mystical': ['magic storm', 'soul wind', 'dream fog'],
      'nature|druid|forest': ['gentle rain shower', 'clear sky above', 'wind gusting strong'],
      'tech|cyber|future': ['quantum weather', 'probability rain', 'dimensional storm'],
      'dark|shadow|night': ['storm clouds', 'dark mist', 'shadow fog']
    },
    mood: {
      'warrior|knight': ['epic and majestic', 'powerful and dynamic', 'brave and bold'],
      'wizard|mage': ['mysterious and enigmatic', 'magical and ethereal', 'wise and ancient'],
      'fairy|spirit': ['dreamy and surreal', 'ethereal and light', 'peaceful and serene'],
      'cyborg|tech': ['futuristic and clean', 'technological and advanced', 'modern and sleek']
    }
  },
  scene: {
    lighting: {
      'forest|nature|garden': ['dappled forest light', 'soft morning sunlight', 'magical sparkle effect'],
      'cyber|neon|future': ['neon city lights', 'holographic displays', 'quantum light effects'],
      'temple|ruins|ancient': ['volumetric god rays', 'mystical glow', 'ethereal light'],
      'space|cosmic|quantum': ['starlight', 'nebula glow', 'cosmic radiation']
    },
    mood: {
      'mystical|magical|ethereal': ['mysterious and enigmatic', 'dreamy and surreal', 'ethereal and otherworldly'],
      'urban|city|street': ['busy and energetic', 'modern and sleek', 'technological and advanced'],
      'nature|forest|garden': ['peaceful and serene', 'harmonious and balanced', 'fresh and vibrant'],
      'ruins|ancient|temple': ['ancient and mystical', 'solemn and dignified', 'mysterious and powerful']
    },
    style: {
      'cyber|neon|future': ['cyberpunk neon art', 'digital art', 'futuristic render'],
      'nature|forest|garden': ['realistic nature', 'organic painting', 'environmental art'],
      'magical|mystical|ethereal': ['fantasy art', 'magical illustration', 'ethereal painting'],
      'ancient|ruins|temple': ['classical art', 'architectural rendering', 'historical illustration']
    }
  },
  time: {
    lighting: {
      'dawn|morning': ['soft morning sunlight', 'golden hour warm glow', 'first light'],
      'night|midnight': ['starry night sky', 'moonlight', 'bioluminescent glow'],
      'twilight|dusk': ['magic hour glow', 'blue hour transition', 'last light fading'],
      'day|noon': ['bright sunlight', 'harsh daylight', 'clear illumination']
    },
    weather: {
      'night|midnight': ['starlit night', 'aurora borealis', 'meteor shower'],
      'storm|tempest': ['thunderstorm brewing', 'lightning striking', 'wind gusting strong'],
      'clear|calm': ['clear sky above', 'gentle breeze', 'sunny day'],
      'dawn|morning': ['morning mist', 'dawn fog', 'early dew']
    },
    mood: {
      'dawn|morning': ['fresh and energetic', 'peaceful and serene', 'hopeful and bright'],
      'night|midnight': ['mysterious and dark', 'quiet and contemplative', 'ethereal and dreamy'],
      'twilight|dusk': ['melancholic and nostalgic', 'romantic and peaceful', 'transitional and calm'],
      'storm|tempest': ['dramatic and intense', 'powerful and dynamic', 'chaotic and turbulent']
    }
  }
};

// 辅助函数：检查字符串是否包含某些关键词
const containsKeywords = (str, keywords) => {
  return keywords.some(keyword => str.toLowerCase().includes(keyword.toLowerCase()));
};

// 辅助函数：确定主题风格
const determineTheme = (selections) => {
  if (!selections) return null;
  
  const themeScores = Object.entries(styleThemes).map(([theme, themeData]) => {
    const score = Object.entries(selections).reduce((total, [category, value]) => {
      if (!value) return total;
      if (themeData[category] && themeData[category].some(keyword => 
        value.toLowerCase().includes(keyword.toLowerCase())
      )) {
        return total + 1;
      }
      if (themeData.keywords && themeData.keywords.some(keyword =>
        value.toLowerCase().includes(keyword.toLowerCase())
      )) {
        return total + 0.5;
      }
      return total;
    }, 0);
    return { theme, score };
  });
  
  const bestTheme = themeScores.reduce((best, current) => 
    current.score > best.score ? current : best, 
    { theme: null, score: 0 }
  );
  
  return bestTheme.score > 1 ? bestTheme.theme : null;
};

// 辅助函数：获取随机值
const getRandomValue = (category, context = {}) => {
  if (!category) return '';
  
  const normalizedCategory = category.toLowerCase();
  if (!vocabularyLibrary[normalizedCategory]) {
    throw new Error(`未找到词库：${category}`);
  }
  
  const values = vocabularyLibrary[normalizedCategory].values;
  if (!values || values.length === 0) {
    throw new Error(`词库 ${category} 中没有可用的值`);
  }

  // 根据上下文筛选合适的值
  let filteredValues = [...values];
  
  // 应用语义关联规则
  if (context.previousSelections) {
    const relations = semanticRelations[normalizedCategory];
    if (relations) {
      Object.entries(context.previousSelections).forEach(([prevCategory, prevValue]) => {
        if (relations[prevCategory]) {
          // 查找匹配的语义规则
          const matchingRule = Object.entries(relations[prevCategory]).find(([key, _]) => {
            return containsKeywords(prevValue, key.split('|'));
          });
          
          if (matchingRule) {
            // 优先选择相关的值
            const [_, relatedValues] = matchingRule;
            const preferredValues = filteredValues.filter(value => 
              relatedValues.some(related => value.includes(related))
            );
            if (preferredValues.length > 0) {
              filteredValues = preferredValues;
            }
          }
        }
      });
    }
  }
  
  // 确定主题风格
  const theme = determineTheme(context.previousSelections);
  if (theme) {
    const themeValues = styleThemes[theme][normalizedCategory];
    if (themeValues) {
      filteredValues = filteredValues.filter(value => 
        themeValues.some(keyword => value.toLowerCase().includes(keyword.toLowerCase()))
      );
    }
  }
  
  // 使用加密安全的随机数生成器
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return filteredValues[array[0] % filteredValues.length];
};

// 辅助函数：替换变量
const replaceVariables = (template) => {
  const variables = new Set();
  let result = template;
  const context = {
    previousSelections: {}
  };
  
  // 找出所有变量
  template.replace(/\{(\w+)\}/g, (match, variable) => {
    variables.add(variable.toLowerCase());
  });
  
  // 检查所有变量是否存在对应的词库
  for (const variable of variables) {
    if (!vocabularyLibrary[variable]) {
      throw new Error(`未找到变量 "${variable}" 对应的词库`);
    }
  }
  
  // 按照逻辑顺序替换变量
  const orderOfReplacement = ['character', 'scene', 'time', 'weather', 'lighting', 'mood', 'style', 'color', 'texture', 'camera'];
  
  // 首先替换主要类别
  orderOfReplacement.forEach(category => {
    if (variables.has(category)) {
      const value = getRandomValue(category, context);
      result = result.replace(new RegExp(`\{${category}\}`, 'g'), value);
      context.previousSelections[category] = value;
    }
  });
  
  return result;
};

// 生成完整的提示词
function generatePrompt(template = '') {
  // 如果没有提供模板，使用默认模板
  if (!template) {
    // 获取一个随机的主要角色或物品作为主体
    const mainSubject = Math.random() < 0.5 
      ? getRandomValue('character')  // 50% 概率选择角色
      : vocabularyLibrary.subject.values.filter(item =>  // 50% 概率选择物品主体
          !item.includes('concept of') &&  // 排除抽象概念
          !item.includes('dance of') &&
          !item.includes('birth of') &&
          !item.includes('melody of') &&
          !item.includes('spirit of') &&
          !item.includes('dreams of') &&
          !item.includes('balance of') &&
          !item.includes('cycle of') &&
          !item.includes('harmony of') &&
          !item.includes('convergence of') &&
          !item.includes('essence of') &&
          !item.includes('pulse of') &&
          !item.includes('whispers of') &&
          !item.includes('rhythm of') &&
          !item.includes('flow of') &&
          !item.includes('echoes of') &&
          !item.includes('dance of') &&
          !item.includes('song of')
        )[Math.floor(Math.random() * vocabularyLibrary.subject.values.length)];
    
    // 可选的元素类别
    const optionalElements = [
      { category: 'style', weight: 0.8 },     // 80% 概率包含风格
      { category: 'lighting', weight: 0.5 },   // 50% 概率包含光照
      { category: 'mood', weight: 0.4 },       // 40% 概率包含氛围
      { category: 'color', weight: 0.6 },      // 60% 概率包含色彩
      { category: 'camera', weight: 0.3 },     // 30% 概率包含相机
      { category: 'weather', weight: 0.3 },    // 30% 概率包含天气
      { category: 'scene', weight: 0.7 }       // 70% 概率包含场景
    ];
    
    // 根据权重随机选择 2-4 个元素
    const selectedElements = optionalElements
      .filter(element => Math.random() < element.weight)  // 根据权重筛选
      .map(element => getRandomValue(element.category))   // 获取随机值
      .filter(Boolean);  // 移除可能的 null/undefined 值
    
    // 如果选中的元素少于2个，强制选择权重最高的元素直到达到2个
    while (selectedElements.length < 2) {
      const remainingElements = optionalElements
        .filter(element => !selectedElements.includes(getRandomValue(element.category)))
        .sort((a, b) => b.weight - a.weight);
      
      if (remainingElements.length > 0) {
        const element = getRandomValue(remainingElements[0].category);
        if (element) selectedElements.push(element);
      }
    }
    
    // 如果超过4个，只保留随机的4个
    if (selectedElements.length > 4) {
      selectedElements.sort(() => Math.random() - 0.5);
      selectedElements.length = 4;
    }
    
    // 将主体和选中的元素组合成完整的提示词
    return `${mainSubject}, ${selectedElements.join(', ')}`;
  }
  
  // 如果提供了模板，替换变量
  return replaceVariables(template);
}

export { generatePrompt, vocabularyLibrary };
