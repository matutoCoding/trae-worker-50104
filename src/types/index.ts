export interface Craft {
  id: string;
  name: string;
  category: string;
  cover: string;
  description: string;
  history: string;
  features: string[];
  level: string;
  origin: string;
  masterCount: number;
  studentCount: number;
}

export interface Master {
  id: string;
  name: string;
  avatar: string;
  title: string;
  craftId: string;
  craftName: string;
  generation: number;
  bio: string;
  achievements: string[];
  works: string[];
}

export interface Course {
  id: string;
  title: string;
  cover: string;
  craftId: string;
  craftName: string;
  masterId: string;
  masterName: string;
  description: string;
  level: '入门' | '进阶' | '高级';
  duration: string;
  lessons: number;
  students: number;
  price: number;
  originalPrice?: number;
  rating: number;
  tags: string[];
}

export interface CourseSchedule {
  id: string;
  courseId: string;
  className: string;
  startDate: string;
  endDate: string;
  classTime: string;
  totalSessions: number;
  remainingSlots: number;
  maxSlots: number;
  price: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  videoUrl: string;
  duration: string;
  order: number;
  description: string;
  isFree: boolean;
}

export interface Work {
  id: string;
  title: string;
  cover: string;
  images: string[];
  authorId: string;
  authorName: string;
  authorAvatar: string;
  craftId: string;
  craftName: string;
  description: string;
  price?: number;
  isForSale: boolean;
  likes: number;
  comments: number;
  createdAt: string;
  isMasterWork: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  level: string;
  points: number;
  studyDays: number;
  totalHours: number;
  completedCourses: number;
  certificates: number;
  works: number;
}

export interface Exam {
  id: string;
  title: string;
  craftId: string;
  craftName: string;
  level: string;
  duration: number;
  totalQuestions: number;
  passingScore: number;
  fee: number;
}

export interface Certificate {
  id: string;
  title: string;
  craftName: string;
  level: string;
  issueDate: string;
  certificateNo: string;
  masterName: string;
}

export interface Order {
  id: string;
  orderNo: string;
  type: 'course' | 'work' | 'custom' | 'exam';
  title: string;
  cover: string;
  amount: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface CustomOrder {
  id: string;
  orderNo: string;
  craftName: string;
  description: string;
  budget: number;
  deadline: string;
  status: 'pending' | 'quoted' | 'accepted' | 'in_progress' | 'completed';
  createdAt: string;
}

export interface PracticeRecord {
  id: string;
  date: string;
  content: string;
  duration: number;
  image?: string;
  notes?: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  images: string[];
  likes: number;
  comments: number;
  createdAt: string;
  category: string;
}
