import type { Work } from '@/types';

export const workList: Work[] = [
  {
    id: '1',
    title: '青花山水纹赏瓶',
    cover: 'https://picsum.photos/id/30/600/600',
    images: ['https://picsum.photos/id/30/600/600', 'https://picsum.photos/id/31/600/600', 'https://picsum.photos/id/32/600/600'],
    authorId: '1',
    authorName: '王大师',
    authorAvatar: 'https://picsum.photos/id/64/200/200',
    craftId: '1',
    craftName: '景德镇陶瓷',
    description: '此瓶造型典雅，通体绘青花山水图案，笔触细腻，意境深远。采用传统青花工艺，经1300度高温烧制而成。',
    price: 5800,
    isForSale: true,
    likes: 256,
    comments: 38,
    createdAt: '2026-05-12',
    isMasterWork: true
  },
  {
    id: '2',
    title: '双面绣牡丹屏风',
    cover: 'https://picsum.photos/id/103/600/600',
    images: ['https://picsum.photos/id/103/600/600', 'https://picsum.photos/id/104/600/600'],
    authorId: '2',
    authorName: '李老师',
    authorAvatar: 'https://picsum.photos/id/91/200/200',
    craftId: '2',
    craftName: '苏绣',
    description: '采用苏绣传统双面绣技法，正反两面图案一致，牡丹花姿绰约，色彩典雅，是苏绣艺术的精品之作。',
    price: 12800,
    isForSale: true,
    likes: 189,
    comments: 25,
    createdAt: '2026-04-28',
    isMasterWork: true
  },
  {
    id: '3',
    title: '景泰蓝缠枝莲纹瓶',
    cover: 'https://picsum.photos/id/119/600/600',
    images: ['https://picsum.photos/id/119/600/600', 'https://picsum.photos/id/120/600/600'],
    authorId: '4',
    authorName: '陈大师',
    authorAvatar: 'https://picsum.photos/id/338/200/200',
    craftId: '4',
    craftName: '景泰蓝',
    description: '铜胎掐丝珐琅，通体饰缠枝莲纹，色彩艳丽，掐丝流畅，镀金富丽，是典型的宫廷风格景泰蓝作品。',
    price: 8600,
    isForSale: true,
    likes: 167,
    comments: 21,
    createdAt: '2026-05-20',
    isMasterWork: true
  },
  {
    id: '4',
    title: '竹编提篮',
    cover: 'https://picsum.photos/id/110/600/600',
    images: ['https://picsum.photos/id/110/600/600'],
    authorId: '5',
    authorName: '刘师傅',
    authorAvatar: 'https://picsum.photos/id/1027/200/200',
    craftId: '5',
    craftName: '竹编',
    description: '采用上等毛竹，经多道工序手工编织而成。造型质朴大方，结实耐用，是传统工艺与现代审美的完美结合。',
    price: 380,
    isForSale: true,
    likes: 312,
    comments: 56,
    createdAt: '2026-06-01',
    isMasterWork: true
  },
  {
    id: '5',
    title: '学员习作-青花瓷杯',
    cover: 'https://picsum.photos/id/225/600/600',
    images: ['https://picsum.photos/id/225/600/600', 'https://picsum.photos/id/226/600/600'],
    authorId: 's1',
    authorName: '学员小李',
    authorAvatar: 'https://picsum.photos/id/1000/200/200',
    craftId: '1',
    craftName: '景德镇陶瓷',
    description: '陶瓷入门班学员作品，手工拉坯成型，青花手绘。虽然还略显稚嫩，但已初见功底，记录学习成长的足迹。',
    isForSale: false,
    likes: 45,
    comments: 8,
    createdAt: '2026-06-10',
    isMasterWork: false
  },
  {
    id: '6',
    title: '学员习作-手帕绣',
    cover: 'https://picsum.photos/id/102/600/600',
    images: ['https://picsum.photos/id/102/600/600'],
    authorId: 's2',
    authorName: '绣娘小芳',
    authorAvatar: 'https://picsum.photos/id/1012/200/200',
    craftId: '2',
    craftName: '苏绣',
    description: '苏绣基础班学员作品，学习一个月后的成果。针法虽然还有进步空间，但对刺绣的热爱跃然布上。',
    isForSale: false,
    likes: 78,
    comments: 15,
    createdAt: '2026-06-08',
    isMasterWork: false
  },
  {
    id: '7',
    title: '木雕人物摆件',
    cover: 'https://picsum.photos/id/115/600/600',
    images: ['https://picsum.photos/id/115/600/600', 'https://picsum.photos/id/116/600/600'],
    authorId: '6',
    authorName: '赵大师',
    authorAvatar: 'https://picsum.photos/id/1005/200/200',
    craftId: '6',
    craftName: '木雕',
    description: '选用黄杨木精雕细琢而成，人物造型生动传神，衣纹飘逸自然，展现了高超的雕刻技艺。',
    price: 6800,
    isForSale: true,
    likes: 234,
    comments: 42,
    createdAt: '2026-05-15',
    isMasterWork: true
  },
  {
    id: '8',
    title: '紫砂壶-石瓢壶',
    cover: 'https://picsum.photos/id/175/600/600',
    images: ['https://picsum.photos/id/175/600/600'],
    authorId: 'm8',
    authorName: '周大师',
    authorAvatar: 'https://picsum.photos/id/1074/200/200',
    craftId: '8',
    craftName: '紫砂壶',
    description: '经典石瓢壶造型，原矿紫砂泥料，全手工制作。出水流畅，握感舒适，是实用与收藏兼具的佳品。',
    price: 3500,
    isForSale: true,
    likes: 456,
    comments: 78,
    createdAt: '2026-05-30',
    isMasterWork: true
  }
];

export const getWorkById = (id: string): Work | undefined => {
  return workList.find(w => w.id === id);
};

export const getWorksByCraft = (craftId: string): Work[] => {
  return workList.filter(w => w.craftId === craftId);
};

export const getMasterWorks = (): Work[] => {
  return workList.filter(w => w.isMasterWork);
};

export const getStudentWorks = (): Work[] => {
  return workList.filter(w => !w.isMasterWork);
};
