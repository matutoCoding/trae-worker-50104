import type { UserProfile, Certificate, Order, CustomOrder, PracticeRecord } from '@/types';

export const userProfile: UserProfile = {
  id: 'u001',
  name: '非遗学员',
  avatar: 'https://picsum.photos/id/1005/200/200',
  phone: '138****8888',
  level: '进阶学员',
  points: 2580,
  studyDays: 36,
  totalHours: 128,
  completedCourses: 3,
  certificates: 2,
  works: 5
};

export const certificateList: Certificate[] = [
  {
    id: 'c1',
    title: '景德镇陶瓷技艺结业证书',
    craftName: '景德镇陶瓷',
    level: '初级',
    issueDate: '2026-03-15',
    certificateNo: 'FY202603001',
    masterName: '王大师'
  },
  {
    id: 'c2',
    title: '苏绣基础技艺结业证书',
    craftName: '苏绣',
    level: '初级',
    issueDate: '2026-05-20',
    certificateNo: 'FY202605002',
    masterName: '李老师'
  }
];

export const orderList: Order[] = [
  {
    id: 'o1',
    orderNo: '202606100001',
    type: 'course',
    title: '景德镇陶瓷入门课程',
    cover: 'https://picsum.photos/id/30/200/200',
    amount: 1299,
    status: 'completed',
    createdAt: '2026-06-10 14:30'
  },
  {
    id: 'o2',
    orderNo: '202606120002',
    type: 'work',
    title: '竹编提篮',
    cover: 'https://picsum.photos/id/110/200/200',
    amount: 380,
    status: 'paid',
    createdAt: '2026-06-12 09:15'
  },
  {
    id: 'o3',
    orderNo: '202606150003',
    type: 'exam',
    title: '苏绣技艺等级考核（中级）',
    cover: 'https://picsum.photos/id/103/200/200',
    amount: 299,
    status: 'pending',
    createdAt: '2026-06-15 16:45'
  }
];

export const customOrderList: CustomOrder[] = [
  {
    id: 'co1',
    orderNo: 'DZ202605001',
    craftName: '景德镇陶瓷',
    description: '定制一对刻字青花瓷瓶，作为结婚礼物，希望刻上新人姓名和日期，风格简约雅致。',
    budget: 3000,
    budgetRange: '1000-3000元',
    deadline: '2026-07-01',
    status: 'in_progress',
    createdAt: '2026-05-20'
  },
  {
    id: 'co2',
    orderNo: 'DZ202606002',
    craftName: '苏绣',
    description: '定制一幅全家福肖像刺绣，尺寸约50*70cm，希望达到写实效果。',
    budget: 8000,
    budgetRange: '5000-10000元',
    deadline: '2026-09-01',
    status: 'quoted',
    createdAt: '2026-06-05'
  }
];

export const practiceRecords: PracticeRecord[] = [
  {
    id: 'p1',
    date: '2026-06-16',
    content: '练习青花缠枝莲纹绘制',
    duration: 120,
    notes: '今天练习了缠枝莲的构图，线条比之前流畅了一些，但还要加强笔法练习。'
  },
  {
    id: 'p2',
    date: '2026-06-15',
    content: '拉坯练习-碗',
    duration: 90,
    notes: '拉了5个碗，有2个比较满意，继续加油。'
  },
  {
    id: 'p3',
    date: '2026-06-14',
    content: '揉泥练习',
    duration: 60,
    notes: '复习揉泥技法，保持手感。'
  },
  {
    id: 'p4',
    date: '2026-06-13',
    content: '修坯练习',
    duration: 150,
    notes: '学习了挖足技巧，还需要更多练习。'
  },
  {
    id: 'p5',
    date: '2026-06-12',
    content: '看教学视频',
    duration: 45,
    notes: '复习了第三课的内容，做了笔记。'
  },
  {
    id: 'p6',
    date: '2026-06-11',
    content: '陶艺基础理论学习',
    duration: 60,
    notes: '学习了釉料的分类和特点。'
  },
  {
    id: 'p7',
    date: '2026-06-10',
    content: '上线下课程',
    duration: 180,
    notes: '今天王老师亲自指导，收获很大。'
  }
];
