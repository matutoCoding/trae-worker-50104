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
