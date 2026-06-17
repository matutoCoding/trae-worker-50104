import type { Course, CourseSchedule, Lesson } from '@/types';

export const courseList: Course[] = [
  {
    id: '1',
    title: '景德镇陶瓷入门课程',
    cover: 'https://picsum.photos/id/30/750/500',
    craftId: '1',
    craftName: '景德镇陶瓷',
    masterId: '1',
    masterName: '王大师',
    description: '从零开始学习陶瓷制作，掌握拉坯、修坯、施釉等基础技艺，亲手制作属于自己的陶瓷作品。',
    level: '入门',
    duration: '4周',
    lessons: 12,
    students: 328,
    price: 1299,
    originalPrice: 1999,
    rating: 4.9,
    tags: ['零基础可学', '实操为主', '大师亲授']
  },
  {
    id: '2',
    title: '苏绣基础针法教程',
    cover: 'https://picsum.photos/id/103/750/500',
    craftId: '2',
    craftName: '苏绣',
    masterId: '2',
    masterName: '李老师',
    description: '系统学习苏绣基础针法，包括平针、套针、扎针等，完成第一幅刺绣作品。',
    level: '入门',
    duration: '3周',
    lessons: 10,
    students: 512,
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    tags: ['针法教学', '随到随学', '作业点评']
  },
  {
    id: '3',
    title: '宣纸制作工艺探秘',
    cover: 'https://picsum.photos/id/106/750/500',
    craftId: '3',
    craftName: '宣纸制作',
    masterId: '3',
    masterName: '张师傅',
    description: '深入了解宣纸制作的108道工序，体验宣纸捞制技艺，感受传统工艺的魅力。',
    level: '进阶',
    duration: '2周',
    lessons: 8,
    students: 156,
    price: 1599,
    rating: 4.9,
    tags: ['实地体验', '非遗工坊', '深度研学']
  },
  {
    id: '4',
    title: '景泰蓝制作技艺',
    cover: 'https://picsum.photos/id/119/750/500',
    craftId: '4',
    craftName: '景泰蓝',
    masterId: '4',
    masterName: '陈大师',
    description: '学习景泰蓝掐丝、点蓝、烧蓝等核心工艺，制作一件精美的景泰蓝工艺品。',
    level: '进阶',
    duration: '5周',
    lessons: 15,
    students: 89,
    price: 2599,
    originalPrice: 3599,
    rating: 4.7,
    tags: ['系统课程', '实操性强', '作品可带走']
  },
  {
    id: '5',
    title: '竹编入门与实用',
    cover: 'https://picsum.photos/id/110/750/500',
    craftId: '5',
    craftName: '竹编',
    masterId: '5',
    masterName: '刘师傅',
    description: '学习竹编基础技法，编织实用的生活竹器，感受竹编艺术的质朴之美。',
    level: '入门',
    duration: '3周',
    lessons: 9,
    students: 425,
    price: 699,
    originalPrice: 999,
    rating: 4.8,
    tags: ['零基础友好', '实用性强', '材料包赠送']
  },
  {
    id: '6',
    title: '木雕浮雕技法',
    cover: 'https://picsum.photos/id/115/750/500',
    craftId: '6',
    craftName: '木雕',
    masterId: '6',
    masterName: '赵大师',
    description: '掌握木雕浮雕基本技法，学习人物、花鸟、山水等题材的雕刻技巧。',
    level: '高级',
    duration: '8周',
    lessons: 24,
    students: 67,
    price: 3999,
    rating: 4.9,
    tags: ['大师课', '深度系统', '一对一辅导']
  }
];

export const scheduleList: CourseSchedule[] = [
  {
    id: 's1',
    courseId: '1',
    className: '陶瓷入门暑期班',
    startDate: '2026-07-01',
    endDate: '2026-07-28',
    classTime: '每周一、三、五 14:00-17:00',
    totalSessions: 12,
    remainingSlots: 8,
    maxSlots: 15,
    price: 1299
  },
  {
    id: 's2',
    courseId: '1',
    className: '陶瓷入门周末班',
    startDate: '2026-07-06',
    endDate: '2026-08-03',
    classTime: '每周六、日 10:00-12:00',
    totalSessions: 12,
    remainingSlots: 5,
    maxSlots: 12,
    price: 1499
  },
  {
    id: 's3',
    courseId: '2',
    className: '苏绣基础班',
    startDate: '2026-07-15',
    endDate: '2026-08-05',
    classTime: '每周二、四、六 14:00-16:00',
    totalSessions: 10,
    remainingSlots: 12,
    maxSlots: 20,
    price: 899
  },
  {
    id: 's4',
    courseId: '2',
    className: '苏绣晚班',
    startDate: '2026-07-20',
    endDate: '2026-08-10',
    classTime: '每周一、三、五 19:00-21:00',
    totalSessions: 10,
    remainingSlots: 15,
    maxSlots: 18,
    price: 999
  },
  {
    id: 's5',
    courseId: '3',
    className: '宣纸工艺探秘班',
    startDate: '2026-08-01',
    endDate: '2026-08-14',
    classTime: '每日 9:00-12:00',
    totalSessions: 8,
    remainingSlots: 6,
    maxSlots: 10,
    price: 1599
  },
  {
    id: 's6',
    courseId: '4',
    className: '景泰蓝制作系统班',
    startDate: '2026-07-10',
    endDate: '2026-08-14',
    classTime: '每周一、二、四、五 14:00-17:00',
    totalSessions: 15,
    remainingSlots: 3,
    maxSlots: 8,
    price: 2599
  },
  {
    id: 's7',
    courseId: '5',
    className: '竹编入门暑期班',
    startDate: '2026-07-05',
    endDate: '2026-07-25',
    classTime: '每周二、四、六 10:00-12:00',
    totalSessions: 9,
    remainingSlots: 10,
    maxSlots: 15,
    price: 699
  },
  {
    id: 's8',
    courseId: '5',
    className: '竹编实用班',
    startDate: '2026-08-01',
    endDate: '2026-08-21',
    classTime: '每周一、三、五 14:00-16:00',
    totalSessions: 9,
    remainingSlots: 12,
    maxSlots: 16,
    price: 799
  },
  {
    id: 's9',
    courseId: '6',
    className: '木雕浮雕大师班',
    startDate: '2026-07-15',
    endDate: '2026-09-10',
    classTime: '每周二、四、六 9:00-12:00',
    totalSessions: 24,
    remainingSlots: 2,
    maxSlots: 6,
    price: 3999
  }
];

export const lessonList: Lesson[] = [
  {
    id: 'l1',
    courseId: '1',
    title: '陶瓷艺术概论',
    videoUrl: '',
    duration: '45分钟',
    order: 1,
    description: '了解陶瓷的历史发展、工艺分类和艺术特点',
    isFree: true
  },
  {
    id: 'l2',
    courseId: '1',
    title: '揉泥基础技法',
    videoUrl: '',
    duration: '60分钟',
    order: 2,
    description: '学习菊花揉、羊头揉等揉泥方法，掌握泥料准备技巧',
    isFree: true
  },
  {
    id: 'l3',
    courseId: '1',
    title: '拉坯入门',
    videoUrl: '',
    duration: '90分钟',
    order: 3,
    description: '学习定中心、开孔、拔高、修形等拉坯基本技法',
    isFree: false
  },
  {
    id: 'l4',
    courseId: '1',
    title: '碗的拉制',
    videoUrl: '',
    duration: '80分钟',
    order: 4,
    description: '实操练习碗形器物的拉制方法',
    isFree: false
  },
  {
    id: 'l5',
    courseId: '1',
    title: '修坯技巧',
    videoUrl: '',
    duration: '75分钟',
    order: 5,
    description: '学习利坯、挖足等修坯工艺',
    isFree: false
  },
  {
    id: 'l6',
    courseId: '1',
    title: '施釉方法',
    videoUrl: '',
    duration: '65分钟',
    order: 6,
    description: '学习蘸釉、荡釉、喷釉等施釉技法',
    isFree: false
  },
  {
    id: 'l7',
    courseId: '1',
    title: '陶瓷装饰技法',
    videoUrl: '',
    duration: '70分钟',
    order: 7,
    description: '学习青花、粉彩等传统装饰方法',
    isFree: false
  },
  {
    id: 'l8',
    courseId: '1',
    title: '素烧与釉烧',
    videoUrl: '',
    duration: '55分钟',
    order: 8,
    description: '了解烧制原理，掌握窑炉操作基础',
    isFree: false
  },
  {
    id: 'l9',
    courseId: '1',
    title: '茶具制作实践',
    videoUrl: '',
    duration: '100分钟',
    order: 9,
    description: '完整制作一套功夫茶具',
    isFree: false
  },
  {
    id: 'l10',
    courseId: '1',
    title: '陶瓷作品赏析',
    videoUrl: '',
    duration: '50分钟',
    order: 10,
    description: '欣赏历代名瓷，提升审美能力',
    isFree: false
  },
  {
    id: 'l11',
    courseId: '1',
    title: '常见问题与解决方案',
    videoUrl: '',
    duration: '60分钟',
    order: 11,
    description: '解决变形、开裂、釉色不均等常见问题',
    isFree: false
  },
  {
    id: 'l12',
    courseId: '1',
    title: '毕业作品创作指导',
    videoUrl: '',
    duration: '120分钟',
    order: 12,
    description: '完成结业作品，准备等级考核',
    isFree: false
  },
  {
    id: 'l13',
    courseId: '2',
    title: '苏绣艺术简介',
    videoUrl: '',
    duration: '40分钟',
    order: 1,
    description: '了解苏绣的历史、流派和艺术特点',
    isFree: true
  },
  {
    id: 'l14',
    courseId: '2',
    title: '刺绣工具与材料',
    videoUrl: '',
    duration: '45分钟',
    order: 2,
    description: '认识绣线、绣布、绷架、针具等工具',
    isFree: true
  },
  {
    id: 'l15',
    courseId: '2',
    title: '平针基础',
    videoUrl: '',
    duration: '60分钟',
    order: 3,
    description: '学习齐针、铺针等基础平针针法',
    isFree: false
  },
  {
    id: 'l16',
    courseId: '2',
    title: '套针技法',
    videoUrl: '',
    duration: '70分钟',
    order: 4,
    description: '学习平套、散套、集套等套针技法',
    isFree: false
  },
  {
    id: 'l17',
    courseId: '2',
    title: '扎针与滚针',
    videoUrl: '',
    duration: '55分钟',
    order: 5,
    description: '学习线条刺绣的表现技法',
    isFree: false
  },
  {
    id: 'l18',
    courseId: '2',
    title: '打籽针与盘金',
    videoUrl: '',
    duration: '65分钟',
    order: 6,
    description: '学习装饰性刺绣针法',
    isFree: false
  },
  {
    id: 'l19',
    courseId: '2',
    title: '花卉刺绣',
    videoUrl: '',
    duration: '80分钟',
    order: 7,
    description: '练习牡丹、荷花等花卉题材',
    isFree: false
  },
  {
    id: 'l20',
    courseId: '2',
    title: '禽鸟刺绣',
    videoUrl: '',
    duration: '85分钟',
    order: 8,
    description: '练习鸟类羽毛的表现技法',
    isFree: false
  },
  {
    id: 'l21',
    courseId: '2',
    title: '人物肖像刺绣',
    videoUrl: '',
    duration: '90分钟',
    order: 9,
    description: '学习人物面部的精细表现',
    isFree: false
  },
  {
    id: 'l22',
    courseId: '2',
    title: '作品装裱与保存',
    videoUrl: '',
    duration: '40分钟',
    order: 10,
    description: '刺绣作品的后期处理方法',
    isFree: false
  },
  {
    id: 'l23',
    courseId: '3',
    title: '宣纸的历史与文化',
    videoUrl: '',
    duration: '50分钟',
    order: 1,
    description: '了解宣纸的千年历史和文化价值',
    isFree: true
  },
  {
    id: 'l24',
    courseId: '3',
    title: '宣纸原料探秘',
    videoUrl: '',
    duration: '55分钟',
    order: 2,
    description: '认识青檀皮、沙田稻草等原料',
    isFree: true
  },
  {
    id: 'l25',
    courseId: '3',
    title: '原料加工工艺',
    videoUrl: '',
    duration: '65分钟',
    order: 3,
    description: '学习浸泡、蒸煮、漂洗等工序',
    isFree: false
  },
  {
    id: 'l26',
    courseId: '3',
    title: '打浆与配料',
    videoUrl: '',
    duration: '60分钟',
    order: 4,
    description: '掌握纸浆制作的关键技术',
    isFree: false
  },
  {
    id: 'l27',
    courseId: '3',
    title: '捞纸技艺',
    videoUrl: '',
    duration: '75分钟',
    order: 5,
    description: '手工捞纸的动作要领和技巧',
    isFree: false
  },
  {
    id: 'l28',
    courseId: '3',
    title: '压榨与烘干',
    videoUrl: '',
    duration: '55分钟',
    order: 6,
    description: '湿纸的脱水和干燥工艺',
    isFree: false
  },
  {
    id: 'l29',
    courseId: '3',
    title: '检验与整理',
    videoUrl: '',
    duration: '50分钟',
    order: 7,
    description: '宣纸的质量标准和分级',
    isFree: false
  },
  {
    id: 'l30',
    courseId: '3',
    title: '宣纸的鉴别与使用',
    videoUrl: '',
    duration: '60分钟',
    order: 8,
    description: '如何鉴别优质宣纸及书画应用',
    isFree: false
  },
  {
    id: 'l31',
    courseId: '4',
    title: '景泰蓝艺术概论',
    videoUrl: '',
    duration: '50分钟',
    order: 1,
    description: '了解景泰蓝的历史、工艺和艺术特点',
    isFree: true
  },
  {
    id: 'l32',
    courseId: '4',
    title: '景泰蓝的材料与工具',
    videoUrl: '',
    duration: '55分钟',
    order: 2,
    description: '认识铜胎、釉料、焊丝等材料',
    isFree: true
  },
  {
    id: 'l33',
    courseId: '4',
    title: '制胎工艺',
    videoUrl: '',
    duration: '75分钟',
    order: 3,
    description: '学习铜胎的锻打、焊接技术',
    isFree: false
  },
  {
    id: 'l34',
    courseId: '4',
    title: '掐丝技法基础',
    videoUrl: '',
    duration: '85分钟',
    order: 4,
    description: '学习花丝的掰、弯、掐、粘技巧',
    isFree: false
  },
  {
    id: 'l35',
    courseId: '4',
    title: '图案设计与掐丝',
    videoUrl: '',
    duration: '95分钟',
    order: 5,
    description: '传统图案的掐丝表现',
    isFree: false
  },
  {
    id: 'l36',
    courseId: '4',
    title: '点蓝工艺',
    videoUrl: '',
    duration: '80分钟',
    order: 6,
    description: '釉料的调配和填充技法',
    isFree: false
  },
  {
    id: 'l37',
    courseId: '4',
    title: '烧蓝工艺',
    videoUrl: '',
    duration: '65分钟',
    order: 7,
    description: '掌握烧制温度和时间控制',
    isFree: false
  },
  {
    id: 'l38',
    courseId: '4',
    title: '磨光工艺',
    videoUrl: '',
    duration: '60分钟',
    order: 8,
    description: '粗磨、细磨、精磨的技巧',
    isFree: false
  },
  {
    id: 'l39',
    courseId: '4',
    title: '镀金工艺',
    videoUrl: '',
    duration: '55分钟',
    order: 9,
    description: '表面镀金的工艺流程',
    isFree: false
  },
  {
    id: 'l40',
    courseId: '4',
    title: '小件作品制作',
    videoUrl: '',
    duration: '100分钟',
    order: 10,
    description: '制作景泰蓝首饰盒',
    isFree: false
  },
  {
    id: 'l41',
    courseId: '4',
    title: '花瓶制作实践',
    videoUrl: '',
    duration: '120分钟',
    order: 11,
    description: '完成一件景泰蓝花瓶作品',
    isFree: false
  },
  {
    id: 'l42',
    courseId: '4',
    title: '作品鉴赏与收藏',
    videoUrl: '',
    duration: '50分钟',
    order: 12,
    description: '了解景泰蓝的收藏价值',
    isFree: false
  },
  {
    id: 'l43',
    courseId: '4',
    title: '大师作品欣赏',
    videoUrl: '',
    duration: '45分钟',
    order: 13,
    description: '欣赏历代景泰蓝精品',
    isFree: false
  },
  {
    id: 'l44',
    courseId: '4',
    title: '创新设计思路',
    videoUrl: '',
    duration: '55分钟',
    order: 14,
    description: '传统工艺的当代表达',
    isFree: false
  },
  {
    id: 'l45',
    courseId: '4',
    title: '毕业创作指导',
    videoUrl: '',
    duration: '120分钟',
    order: 15,
    description: '完成结业作品创作',
    isFree: false
  },
  {
    id: 'l46',
    courseId: '5',
    title: '竹编艺术介绍',
    videoUrl: '',
    duration: '40分钟',
    order: 1,
    description: '了解竹编的历史和各地流派',
    isFree: true
  },
  {
    id: 'l47',
    courseId: '5',
    title: '竹子的选择与处理',
    videoUrl: '',
    duration: '50分钟',
    order: 2,
    description: '学习选材、破竹、劈篾技巧',
    isFree: true
  },
  {
    id: 'l48',
    courseId: '5',
    title: '基础编织法',
    videoUrl: '',
    duration: '60分钟',
    order: 3,
    description: '学习平编、十字编、人字编',
    isFree: false
  },
  {
    id: 'l49',
    courseId: '5',
    title: '盘编技法',
    videoUrl: '',
    duration: '65分钟',
    order: 4,
    description: '学习圆形容器的编织方法',
    isFree: false
  },
  {
    id: 'l50',
    courseId: '5',
    title: '六角眼编法',
    videoUrl: '',
    duration: '70分钟',
    order: 5,
    description: '通透型编织技法',
    isFree: false
  },
  {
    id: 'l51',
    courseId: '5',
    title: '竹编果盘制作',
    videoUrl: '',
    duration: '80分钟',
    order: 6,
    description: '完成第一件实用竹编作品',
    isFree: false
  },
  {
    id: 'l52',
    courseId: '5',
    title: '竹编菜篮编织',
    videoUrl: '',
    duration: '85分钟',
    order: 7,
    description: '学习提梁的安装技巧',
    isFree: false
  },
  {
    id: 'l53',
    courseId: '5',
    title: '收口技法',
    videoUrl: '',
    duration: '55分钟',
    order: 8,
    description: '各种收口方法的学习',
    isFree: false
  },
  {
    id: 'l54',
    courseId: '5',
    title: '竹编小摆件',
    videoUrl: '',
    duration: '75分钟',
    order: 9,
    description: '创意竹编作品设计',
    isFree: false
  },
  {
    id: 'l55',
    courseId: '6',
    title: '木雕艺术概论',
    videoUrl: '',
    duration: '50分钟',
    order: 1,
    description: '了解木雕的历史、流派和艺术特点',
    isFree: true
  },
  {
    id: 'l56',
    courseId: '6',
    title: '木雕材料与工具',
    videoUrl: '',
    duration: '60分钟',
    order: 2,
    description: '认识木材特性和各类雕刻刀具',
    isFree: true
  },
  {
    id: 'l57',
    courseId: '6',
    title: '木雕基础技法',
    videoUrl: '',
    duration: '75分钟',
    order: 3,
    description: '学习平刀、圆刀、斜刀的使用',
    isFree: false
  },
  {
    id: 'l58',
    courseId: '6',
    title: '浮雕基础',
    videoUrl: '',
    duration: '85分钟',
    order: 4,
    description: '浅浮雕、深浮雕的表现方法',
    isFree: false
  },
  {
    id: 'l59',
    courseId: '6',
    title: '花卉浮雕',
    videoUrl: '',
    duration: '90分钟',
    order: 5,
    description: '牡丹、梅兰竹菊的雕刻技法',
    isFree: false
  },
  {
    id: 'l60',
    courseId: '6',
    title: '禽鸟浮雕',
    videoUrl: '',
    duration: '95分钟',
    order: 6,
    description: '凤凰、仙鹤等吉祥禽鸟的雕刻',
    isFree: false
  },
  {
    id: 'l61',
    courseId: '6',
    title: '人物浮雕',
    videoUrl: '',
    duration: '100分钟',
    order: 7,
    description: '传统人物的开脸和衣纹表现',
    isFree: false
  },
  {
    id: 'l62',
    courseId: '6',
    title: '山水浮雕',
    videoUrl: '',
    duration: '95分钟',
    order: 8,
    description: '山水楼阁的层次表现',
    isFree: false
  },
  {
    id: 'l63',
    courseId: '6',
    title: '透雕技法',
    videoUrl: '',
    duration: '80分钟',
    order: 9,
    description: '镂空雕刻的技巧和要点',
    isFree: false
  },
  {
    id: 'l64',
    courseId: '6',
    title: '圆雕入门',
    videoUrl: '',
    duration: '100分钟',
    order: 10,
    description: '立体雕刻的空间造型',
    isFree: false
  },
  {
    id: 'l65',
    courseId: '6',
    title: '木雕打磨技巧',
    videoUrl: '',
    duration: '60分钟',
    order: 11,
    description: '由粗到细的打磨流程',
    isFree: false
  },
  {
    id: 'l66',
    courseId: '6',
    title: '上漆与烫蜡',
    videoUrl: '',
    duration: '65分钟',
    order: 12,
    description: '木雕的表面处理工艺',
    isFree: false
  },
  {
    id: 'l67',
    courseId: '6',
    title: '小型摆件创作',
    videoUrl: '',
    duration: '120分钟',
    order: 13,
    description: '完成一件木雕小摆件',
    isFree: false
  },
  {
    id: 'l68',
    courseId: '6',
    title: '大型作品构图',
    videoUrl: '',
    duration: '70分钟',
    order: 14,
    description: '大型木雕的设计与构图',
    isFree: false
  },
  {
    id: 'l69',
    courseId: '6',
    title: '传统题材创作',
    videoUrl: '',
    duration: '110分钟',
    order: 15,
    description: '吉祥图案的寓意与表现',
    isFree: false
  },
  {
    id: 'l70',
    courseId: '6',
    title: '现代木雕创新',
    videoUrl: '',
    duration: '75分钟',
    order: 16,
    description: '传统技艺的当代表达',
    isFree: false
  },
  {
    id: 'l71',
    courseId: '6',
    title: '大师作品鉴赏',
    videoUrl: '',
    duration: '60分钟',
    order: 17,
    description: '欣赏名家木雕精品',
    isFree: false
  },
  {
    id: 'l72',
    courseId: '6',
    title: '木雕收藏与保养',
    videoUrl: '',
    duration: '55分钟',
    order: 18,
    description: '木雕的收藏价值和保养知识',
    isFree: false
  },
  {
    id: 'l73',
    courseId: '6',
    title: '毕业作品创作一',
    videoUrl: '',
    duration: '150分钟',
    order: 19,
    description: '结业作品设计与粗坯制作',
    isFree: false
  },
  {
    id: 'l74',
    courseId: '6',
    title: '毕业作品创作二',
    videoUrl: '',
    duration: '150分钟',
    order: 20,
    description: '结业作品精细雕刻',
    isFree: false
  },
  {
    id: 'l75',
    courseId: '6',
    title: '毕业作品创作三',
    videoUrl: '',
    duration: '120分钟',
    order: 21,
    description: '结业作品打磨与上漆',
    isFree: false
  },
  {
    id: 'l76',
    courseId: '6',
    title: '毕业作品点评',
    videoUrl: '',
    duration: '90分钟',
    order: 22,
    description: '大师一对一点评指导',
    isFree: false
  },
  {
    id: 'l77',
    courseId: '6',
    title: '等级考核准备',
    videoUrl: '',
    duration: '60分钟',
    order: 23,
    description: '高级考核要点分析',
    isFree: false
  },
  {
    id: 'l78',
    courseId: '6',
    title: '职业发展规划',
    videoUrl: '',
    duration: '50分钟',
    order: 24,
    description: '木雕从业者的职业路径',
    isFree: false
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courseList.find(c => c.id === id);
};

export const getSchedulesByCourse = (courseId: string): CourseSchedule[] => {
  return scheduleList.filter(s => s.courseId === courseId);
};

export const getLessonsByCourse = (courseId: string): Lesson[] => {
  return lessonList.filter(l => l.courseId === courseId).sort((a, b) => a.order - b.order);
};
