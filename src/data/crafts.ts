import type { Craft } from '@/types';

export const craftList: Craft[] = [
  {
    id: '1',
    name: '景德镇陶瓷',
    category: '传统技艺',
    cover: 'https://picsum.photos/id/30/750/500',
    description: '景德镇陶瓷是中国江西省景德镇市的传统陶瓷制作工艺，素有"瓷都"之称。景德镇陶瓷以白瓷闻名，素有"白如玉、明如镜、薄如纸、声如磬"的美誉。',
    history: '景德镇陶瓷始于汉代，兴于唐宋，盛于明清。宋代创烧了青白瓷，元代发展了青花瓷，明清时期达到鼎盛，成为皇家御窑。',
    features: ['拉坯成型', '釉上彩', '釉下彩', '高温烧制', '手工描绘'],
    level: '国家级非遗',
    origin: '江西景德镇',
    masterCount: 28,
    studentCount: 1560
  },
  {
    id: '2',
    name: '苏绣',
    category: '传统刺绣',
    cover: 'https://picsum.photos/id/103/750/500',
    description: '苏绣是江苏苏州地区的传统刺绣工艺，是中国四大名绣之一。苏绣以针法精细、色彩雅致著称，图案秀丽，题材广泛。',
    history: '苏绣已有2000多年历史，三国时期已具较高水平，明清时期达到鼎盛，形成了独特的地方风格。',
    features: ['平针绣', '打籽绣', '盘金绣', '双面绣', '乱针绣'],
    level: '国家级非遗',
    origin: '江苏苏州',
    masterCount: 35,
    studentCount: 2100
  },
  {
    id: '3',
    name: '宣纸制作',
    category: '传统技艺',
    cover: 'https://picsum.photos/id/106/750/500',
    description: '宣纸是中国传统的书画用纸，原产于安徽泾县。宣纸质地绵韧、光洁如玉、不蛀不腐、墨韵万变，被誉为"纸寿千年"。',
    history: '宣纸始于唐代，历经宋元明清不断发展，成为中国书画艺术不可或缺的载体。',
    features: ['青檀树皮', '沙田稻草', '108道工序', '天然原料', '手工捞纸'],
    level: '国家级非遗',
    origin: '安徽泾县',
    masterCount: 18,
    studentCount: 890
  },
  {
    id: '4',
    name: '景泰蓝',
    category: '传统金属工艺',
    cover: 'https://picsum.photos/id/119/750/500',
    description: '景泰蓝，又名铜胎掐丝珐琅，是一种将各种颜色的珐琅附在铜胎或青铜胎上的工艺。因明代景泰年间工艺达到巅峰，故名景泰蓝。',
    history: '景泰蓝工艺起源于元代，明代景泰年间达到鼎盛，清代继续发展，成为宫廷艺术的代表。',
    features: ['铜胎掐丝', '珐琅釉料', '点蓝烧蓝', '磨光镀金', '手工制作'],
    level: '国家级非遗',
    origin: '北京',
    masterCount: 22,
    studentCount: 680
  },
  {
    id: '5',
    name: '竹编',
    category: '传统编织',
    cover: 'https://picsum.photos/id/110/750/500',
    description: '竹编是用竹子编织成各种生活用品和工艺品的传统技艺。竹编工艺历史悠久，品种繁多，具有浓郁的地方特色和民族风格。',
    history: '竹编工艺可追溯到新石器时代，浙江余姚河姆渡遗址就出土了竹编实物。',
    features: ['选材考究', '劈丝精细', '编织多样', '实用美观', '绿色环保'],
    level: '国家级非遗',
    origin: '浙江东阳',
    masterCount: 42,
    studentCount: 3200
  },
  {
    id: '6',
    name: '木雕',
    category: '传统雕刻',
    cover: 'https://picsum.photos/id/115/750/500',
    description: '木雕是雕塑的一种，以木材为原料进行雕刻创作。中国木雕历史悠久，流派众多，是传统工艺美术的重要组成部分。',
    history: '木雕艺术起源于新石器时代，唐宋时期趋于成熟，明清时期达到高峰，形成了众多地方流派。',
    features: ['圆雕', '浮雕', '透雕', '镂雕', '线刻'],
    level: '国家级非遗',
    origin: '浙江东阳',
    masterCount: 38,
    studentCount: 1890
  },
  {
    id: '7',
    name: '剪纸',
    category: '传统民间艺术',
    cover: 'https://picsum.photos/id/225/750/500',
    description: '剪纸是中国最古老的民间艺术之一，用剪刀或刻刀在纸上剪刻花纹，用于装点生活或配合民俗活动。',
    history: '剪纸艺术历史悠久，可追溯到汉代。唐代剪纸已处于大发展时期，明清走向成熟。',
    features: ['窗花', '喜花', '鞋花', '门笺', '斗香花'],
    level: '人类非遗',
    origin: '全国各地',
    masterCount: 56,
    studentCount: 4500
  },
  {
    id: '8',
    name: '紫砂壶',
    category: '传统陶艺',
    cover: 'https://picsum.photos/id/175/750/500',
    description: '紫砂壶是中国江苏宜兴丁蜀镇的传统工艺品，用紫砂泥制成，是饮茶品茗的重要器具。紫砂壶以其独特的材质和工艺闻名于世。',
    history: '紫砂壶始于北宋，盛于明清，名家辈出，成为中国茶文化的重要组成部分。',
    features: ['紫砂泥料', '手工打身', '明针工艺', '壶铭篆刻', '泡茶留香'],
    level: '国家级非遗',
    origin: '江苏宜兴',
    masterCount: 32,
    studentCount: 1250
  }
];
