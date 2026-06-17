import type { EnrolledCourse, ExamRecord, Certificate, CustomOrder, Work, CommunityPost } from '@/types';
import { certificateList, customOrderList } from '@/data/user';
import { workList } from '@/data/works';
import { getLessonsByCourse } from '@/data/courses';

type Listener = () => void;

interface AppState {
  enrolledCourses: EnrolledCourse[];
  examRecords: ExamRecord[];
  certificates: Certificate[];
  customOrders: CustomOrder[];
  works: Work[];
  communityPosts: CommunityPost[];
}

const initialPosts: CommunityPost[] = [
  {
    id: 'p1',
    title: '',
    content: '今天终于完成了人生第一件青花瓷作品！虽然还有很多瑕疵，但从揉泥、拉坯、修坯到绘画、上釉、烧制，每一步都充满了期待。感谢王大师的耐心指导！分享给大家看看~',
    authorId: 'u1',
    authorName: '陶瓷爱好者小王',
    authorAvatar: 'https://picsum.photos/id/1012/100/100',
    images: [
      'https://picsum.photos/id/30/400/400',
      'https://picsum.photos/id/31/400/400',
      'https://picsum.photos/id/32/400/400'
    ],
    likes: 56,
    comments: 12,
    createdAt: '2小时前',
    category: '景德镇陶瓷',
    isLiked: false
  },
  {
    id: 'p2',
    title: '',
    content: '分享一个苏绣针法小技巧：绣花瓣时用戗针，从花瓣边缘向中心层层推进，颜色由深到浅渐变，这样绣出来的花朵会更有立体感。大家可以试试看！',
    authorId: 'u2',
    authorName: '绣娘李姐',
    authorAvatar: 'https://picsum.photos/id/1027/100/100',
    images: [],
    likes: 89,
    comments: 23,
    createdAt: '5小时前',
    category: '苏绣',
    isLiked: true
  }
];

class AppStore {
  private state: AppState;
  private listeners: Listener[] = [];

  constructor() {
    this.state = {
      enrolledCourses: [],
      examRecords: [],
      certificates: [...certificateList],
      customOrders: [...customOrderList],
      works: [...workList],
      communityPosts: initialPosts
    };
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  getState() {
    return this.state;
  }

  addEnrolledCourse(course: Omit<EnrolledCourse, 'id' | 'completedLessons' | 'progress' | 'status'>) {
    const existing = this.state.enrolledCourses.find(
      ec => ec.courseId === course.courseId && ec.scheduleId === course.scheduleId
    );
    if (existing) return existing;

    const totalLessons = getLessonsByCourse(course.courseId).length;
    const newCourse: EnrolledCourse = {
      ...course,
      id: 'ec' + Date.now(),
      completedLessons: [],
      progress: 0,
      status: 'learning'
    };

    this.state.enrolledCourses = [newCourse, ...this.state.enrolledCourses];
    this.notify();
    return newCourse;
  }

  getEnrolledCourses(): EnrolledCourse[] {
    return this.state.enrolledCourses;
  }

  getEnrolledCourseByCourseId(courseId: string): EnrolledCourse | undefined {
    return this.state.enrolledCourses.find(ec => ec.courseId === courseId);
  }

  isEnrolled(courseId: string): boolean {
    return this.state.enrolledCourses.some(ec => ec.courseId === courseId);
  }

  updateLessonProgress(courseId: string, lessonId: string) {
    const course = this.state.enrolledCourses.find(ec => ec.courseId === courseId);
    if (!course) return;

    if (!course.completedLessons.includes(lessonId)) {
      course.completedLessons = [...course.completedLessons, lessonId];
      const totalLessons = getLessonsByCourse(courseId).length;
      course.progress = totalLessons > 0
        ? Math.round((course.completedLessons.length / totalLessons) * 100)
        : 0;
      if (course.progress >= 100) {
        course.status = 'completed';
      }
      this.notify();
    }
  }

  getCompletedLessons(courseId: string): string[] {
    const course = this.state.enrolledCourses.find(ec => ec.courseId === courseId);
    return course?.completedLessons || [];
  }

  addExamRecord(record: Omit<ExamRecord, 'id'>): ExamRecord {
    const newRecord: ExamRecord = {
      ...record,
      id: 'er' + Date.now()
    };
    this.state.examRecords = [newRecord, ...this.state.examRecords];

    if (record.passed && !this.state.certificates.some(
      c => c.craftName === record.craftName && c.level === record.level
    )) {
      const newCert: Certificate = {
        id: 'cert' + Date.now(),
        title: `${record.craftName}技艺等级证书`,
        craftName: record.craftName,
        level: record.level,
        issueDate: new Date().toISOString().split('T')[0],
        certificateNo: 'FY' + Date.now().toString().slice(-10),
        masterName: '非遗技艺认证中心'
      };
      this.state.certificates = [newCert, ...this.state.certificates];
      newRecord.certificateId = newCert.id;
    }

    this.notify();
    return newRecord;
  }

  getExamRecords(): ExamRecord[] {
    return this.state.examRecords;
  }

  getLatestExamRecord(craftName: string, level: string): ExamRecord | undefined {
    return this.state.examRecords.find(
      er => er.craftName === craftName && er.level === level
    );
  }

  getCertificates(): Certificate[] {
    return this.state.certificates;
  }

  addCustomOrder(order: Omit<CustomOrder, 'id' | 'status' | 'createdAt'> & { budgetRange: string }): CustomOrder {
    const newOrder: CustomOrder = {
      ...order,
      id: 'co' + Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.state.customOrders = [newOrder, ...this.state.customOrders];
    this.notify();
    return newOrder;
  }

  getCustomOrders(): CustomOrder[] {
    return this.state.customOrders;
  }

  addWork(work: Omit<Work, 'id' | 'likes' | 'comments' | 'createdAt'>): Work {
    const newWork: Work = {
      ...work,
      id: 'w' + Date.now(),
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.state.works = [newWork, ...this.state.works];
    this.notify();
    return newWork;
  }

  getWorks(): Work[] {
    return this.state.works;
  }

  addCommunityPost(post: Omit<CommunityPost, 'id' | 'likes' | 'comments' | 'createdAt' | 'isLiked'>): CommunityPost {
    const newPost: CommunityPost = {
      ...post,
      id: 'cp' + Date.now(),
      likes: 0,
      comments: 0,
      createdAt: '刚刚',
      isLiked: false
    };
    this.state.communityPosts = [newPost, ...this.state.communityPosts];
    this.notify();
    return newPost;
  }

  getCommunityPosts(): CommunityPost[] {
    return this.state.communityPosts;
  }

  updatePostLikes(postId: string) {
    const post = this.state.communityPosts.find(p => p.id === postId);
    if (post) {
      post.isLiked = !post.isLiked;
      post.likes = post.isLiked ? post.likes + 1 : post.likes - 1;
      this.notify();
    }
  }
}

export const appStore = new AppStore();

export function useAppStore() {
  return {
    enrolledCourses: appStore.getEnrolledCourses(),
    examRecords: appStore.getExamRecords(),
    certificates: appStore.getCertificates(),
    customOrders: appStore.getCustomOrders(),
    works: appStore.getWorks(),
    communityPosts: appStore.getCommunityPosts(),
    isEnrolled: appStore.isEnrolled.bind(appStore),
    getEnrolledCourse: appStore.getEnrolledCourseByCourseId.bind(appStore),
    getCompletedLessons: appStore.getCompletedLessons.bind(appStore)
  };
}
