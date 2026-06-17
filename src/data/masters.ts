import type { Master } from '@/types';

export const masterList: Master[] = [
  {
    id: '1',
    name: '王大师',
    avatar: 'https://picsum.photos/id/64/200/200',
    title: '国家级工艺美术大师',
    craftId: '1',
    craftName: '景德镇陶瓷',
    generation: 6,
    bio: '从事陶瓷艺术创作40余年，擅长青花瓷和粉彩瓷创作，作品多次获得国家级奖项。',
    achievements: ['国家级非物质文化遗产传承人', '中国工艺美术大师', '作品被故宫博物院收藏'],
    works: ['青花山水瓶', '粉彩花鸟盘', '釉里红缠枝莲']
  },
  {
    id: '2',
    name: '李老师',
    avatar: 'https://picsum.photos/id/91/200/200',
    title: '省级工艺美术大师',
    craftId: '2',
    craftName: '苏绣',
    generation: 4,
    bio: '苏绣世家第四代传人，精通各种刺绣针法，尤其擅长双面绣和人物肖像绣。',
    achievements: ['省级非物质文化遗产传承人', '江苏省工艺美术大师', '苏绣艺术研究会副会长'],
    works: ['双面绣牡丹', '人物肖像绣', '百鸟朝凤图']
  },
  {
    id: '3',
    name: '张师傅',
    avatar: 'https://picsum.photos/id/177/200/200',
    title: '国家级非遗传承人',
    craftId: '3',
    craftName: '宣纸制作',
    generation: 5,
    bio: '出生于宣纸制作世家，从事宣纸制作技艺30余年，对传统宣纸制作工艺有深入研究。',
    achievements: ['国家级非物质文化遗产传承人', '宣纸制作技艺代表性传承人', '中国文房四宝协会理事'],
    works: ['红星宣纸', '千年古宣', '贡宣系列']
  },
  {
    id: '4',
    name: '陈大师',
    avatar: 'https://picsum.photos/id/338/200/200',
    title: '中国工艺美术大师',
    craftId: '4',
    craftName: '景泰蓝',
    generation: 7,
    bio: '景泰蓝制作技艺传承人，从事景泰蓝设计制作35年，作品造型典雅，工艺精湛。',
    achievements: ['中国工艺美术大师', '北京工艺美术特级大师', '景泰蓝艺术研究会会长'],
    works: ['景泰蓝花瓶', '缠枝莲纹赏瓶', '龙凤呈祥大盘']
  },
  {
    id: '5',
    name: '刘师傅',
    avatar: 'https://picsum.photos/id/1027/200/200',
    title: '省级非遗传承人',
    craftId: '5',
    craftName: '竹编',
    generation: 3,
    bio: '竹编技艺传承人，精通各种竹编技法，作品既实用又美观，深受市场欢迎。',
    achievements: ['省级非物质文化遗产传承人', '浙江省工艺美术大师', '竹编艺术协会副会长'],
    works: ['竹编果盘', '竹编花瓶', '竹编茶具']
  },
  {
    id: '6',
    name: '赵大师',
    avatar: 'https://picsum.photos/id/1005/200/200',
    title: '中国木雕艺术大师',
    craftId: '6',
    craftName: '木雕',
    generation: 5,
    bio: '东阳木雕传承人，从事木雕创作30余年，擅长人物雕刻和山水浮雕。',
    achievements: ['中国木雕艺术大师', '浙江省工艺美术大师', '东阳木雕协会会长'],
    works: ['十八罗汉木雕', '山水人物屏风', '百鸟朝凤摆件']
  }
];

export const getMasterById = (id: string): Master | undefined => {
  return masterList.find(m => m.id === id);
};

export const getMastersByCraft = (craftId: string): Master[] => {
  return masterList.filter(m => m.craftId === craftId);
};
