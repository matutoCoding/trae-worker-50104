import { useState, useEffect } from 'react';
import { appStore } from '@/store/appStore';
import type { EnrolledCourse, ExamRecord, Certificate, CustomOrder, Work, CommunityPost } from '@/types';

interface StoreState {
  enrolledCourses: EnrolledCourse[];
  examRecords: ExamRecord[];
  certificates: Certificate[];
  customOrders: CustomOrder[];
  works: Work[];
  communityPosts: CommunityPost[];
}

function getStoreState(): StoreState {
  return {
    enrolledCourses: appStore.getEnrolledCourses(),
    examRecords: appStore.getExamRecords(),
    certificates: appStore.getCertificates(),
    customOrders: appStore.getCustomOrders(),
    works: appStore.getWorks(),
    communityPosts: appStore.getCommunityPosts()
  };
}

export function useAppStoreState(): StoreState {
  const [state, setState] = useState<StoreState>(getStoreState());

  useEffect(() => {
    const unsubscribe = appStore.subscribe(() => {
      setState(getStoreState());
    });
    return unsubscribe;
  }, []);

  return state;
}

export function useEnrolledCourses() {
  const state = useAppStoreState();
  return {
    enrolledCourses: state.enrolledCourses,
    isEnrolled: (courseId: string) => state.enrolledCourses.some(ec => ec.courseId === courseId),
    getEnrolledCourse: (courseId: string) => state.enrolledCourses.find(ec => ec.courseId === courseId)
  };
}

export function useCertificates() {
  const state = useAppStoreState();
  return state.certificates;
}

export function useCustomOrders() {
  const state = useAppStoreState();
  return state.customOrders;
}

export function useWorks() {
  const state = useAppStoreState();
  return state.works;
}

export function useCommunityPosts() {
  const state = useAppStoreState();
  return state.communityPosts;
}

export function useExamRecords() {
  const state = useAppStoreState();
  return state.examRecords;
}
