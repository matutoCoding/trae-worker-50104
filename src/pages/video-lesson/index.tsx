import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import classNames from 'classnames';
import { getCourseById, getLessonsByCourse } from '@/data/courses';
import { appStore } from '@/store/appStore';
import { useEnrolledCourses } from '@/hooks/useAppStore';
import type { Course, Lesson } from '@/types';

const VideoLessonPage: React.FC = () => {
  const router = useRouter();
  const courseId = router.params.courseId || '1';
  const course: Course | undefined = useMemo(() => getCourseById(courseId), [courseId]);
  const lessons: Lesson[] = useMemo(() => getLessonsByCourse(courseId), [courseId]);
  const { getEnrolledCourse } = useEnrolledCourses();
  const enrolledCourse = getEnrolledCourse(courseId);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [watchProgress, setWatchProgress] = useState(0);

  useEffect(() => {
    if (enrolledCourse) {
      setCompletedLessons(enrolledCourse.completedLessons);
    }
  }, [enrolledCourse]);

  const currentLesson = lessons[currentLessonIndex];
  const completedCount = completedLessons.length;
  const totalCount = lessons.length;
  const overallProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handlePlay = () => {
    Taro.showToast({ title: '开始播放视频', icon: 'none' });
    console.log('[Video] 开始播放:', currentLesson?.title);
    setWatchProgress(30);
  };

  const handleSelectLesson = (index: number) => {
    setCurrentLessonIndex(index);
    setWatchProgress(0);
    console.log('[Video] 切换课时:', lessons[index]?.title);
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setWatchProgress(0);
    } else {
      Taro.showToast({ title: '已经是第一课', icon: 'none' });
    }
  };

  const handleNextLesson = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      appStore.updateLessonProgress(courseId, currentLesson.id);
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setWatchProgress(0);
    } else {
      Taro.showModal({
        title: '恭喜完成课程',
        content: '您已完成所有课时的学习！可以去参加等级考核获取证书啦~',
        showCancel: true,
        confirmText: '去考核',
        success: (res) => {
          if (res.confirm) {
            Taro.navigateTo({ url: `/pages/exam/index?craftName=${encodeURIComponent(course?.craftName || '')}` });
          }
        }
      });
    }
  };

  const handleMarkComplete = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      appStore.updateLessonProgress(courseId, currentLesson.id);
      setCompletedLessons([...completedLessons, currentLesson.id]);
      Taro.showToast({ title: '已标记完成', icon: 'success' });
    }
  };

  const handleGoPractice = () => {
    Taro.navigateTo({
      url: `/pages/practice/index?courseId=${courseId}&craftName=${encodeURIComponent(course?.craftName || '')}`
    });
  };

  const handleGoExam = () => {
    Taro.navigateTo({
      url: `/pages/exam/index?craftName=${encodeURIComponent(course?.craftName || '')}&level=${encodeURIComponent(course?.level || '')}`
    });
  };

  const getLessonStatus = (lessonId: string) => {
    if (completedLessons.includes(lessonId)) return 'completed';
    return 'pending';
  };

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.videoArea}>
        <View className={styles.videoPlaceholder}>
          <Image
            className={styles.coverImage}
            src={course?.cover || 'https://picsum.photos/id/30/750/420'}
            mode="aspectFill"
          />
          <View className={styles.playBtn} onClick={handlePlay}>
            <Text className={styles.playIcon}>▶</Text>
          </View>
          <View className={styles.videoInfo}>
            <Text className={styles.lessonTitle}>
              第{currentLesson?.order || 1}课：{currentLesson?.title || '课程介绍'}
            </Text>
            <View className={styles.videoMeta}>
              <Text>时长：{currentLesson?.duration || '45分钟'}</Text>
              <Text>{watchProgress > 0 ? `已看 ${watchProgress}%` : '未观看'}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className={styles.currentLesson}>
        <View className={styles.lessonHeader}>
          <Text className={styles.label}>当前课时学习进度</Text>
          <Text className={styles.progress}>{completedCount}/{totalCount} 课时 完成{overallProgress}%</Text>
        </View>
        <View className={styles.progressBar}>
          <View
            className={styles.progressFill}
            style={{ width: `${overallProgress}%` }}
          />
        </View>
        <View className={styles.actionBtns}>
          <View
            className={classNames(styles.actionBtn, styles.secondary)}
            onClick={handlePrevLesson}
          >
            上一课
          </View>
          <View
            className={classNames(styles.actionBtn, styles.secondary)}
            onClick={handleMarkComplete}
          >
            {completedLessons.includes(currentLesson?.id || '') ? '✓ 已完成' : '标记完成'}
          </View>
          <View
            className={classNames(styles.actionBtn, styles.primary)}
            onClick={handleNextLesson}
          >
            {currentLessonIndex < lessons.length - 1 ? '下一课' : '完成课程'}
          </View>
        </View>
      </View>

      <View className={styles.lessonCatalog}>
        <View className={styles.catalogHeader}>
          <Text className={styles.title}>课时目录</Text>
          <Text className={styles.count}>共{totalCount}课时</Text>
        </View>
        <View className={styles.lessonList}>
          {lessons.map((lesson, index) => {
            const status = getLessonStatus(lesson.id);
            const isActive = index === currentLessonIndex;
            return (
              <View
                key={lesson.id}
                className={classNames(
                  styles.lessonItem,
                  isActive && styles.active,
                  status === 'completed' && styles.completed
                )}
                onClick={() => handleSelectLesson(index)}
              >
                <View className={styles.lessonOrder}>
                  {status === 'completed' ? '✓' : lesson.order}
                </View>
                <View className={classNames(styles.lessonContent, isActive && styles.active)}>
                  <Text className={styles.lessonTitle}>{lesson.title}</Text>
                  <View className={styles.lessonMeta}>
                    <Text className={styles.duration}>⏱ {lesson.duration}</Text>
                    {lesson.isFree && <Text className={styles.freeTag}>免费试学</Text>}
                  </View>
                </View>
                <View className={styles.lessonStatus}>
                  {isActive ? (
                    <Text className={styles.statusIcon}>▶</Text>
                  ) : status === 'completed' ? (
                    <Text className={styles.statusIcon} style={{ color: '#2E7D32' }}>✓</Text>
                  ) : (
                    <Text className={styles.statusIcon} style={{ color: '#B8A89A', opacity: 0.5 }}>○</Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {currentLesson && (
        <View className={styles.tipsSection}>
          <View className={styles.tipsTitle}>
            <Text>📝</Text>
            <Text>本课要点</Text>
          </View>
          <Text className={styles.tipsContent}>
            {currentLesson.description}
          </Text>
        </View>
      )}

      <View className={styles.quickActions}>
        <View className={styles.quickTitle}>
          <Text>🚀 学完本课时，继续下一步</Text>
        </View>
        <View className={styles.quickActionGrid}>
          <View className={styles.quickActionCard} onClick={handleGoPractice}>
            <View className={styles.quickActionIcon}>✍️</View>
            <View className={styles.quickActionText}>
              <Text className={styles.quickActionTitle}>去练习打卡</Text>
              <Text className={styles.quickActionDesc}>记录练习心得，巩固所学</Text>
            </View>
            <Text className={styles.quickActionArrow}>›</Text>
          </View>
          <View className={styles.quickActionCard} onClick={handleGoExam}>
            <View className={styles.quickActionIcon}>🏆</View>
            <View className={styles.quickActionText}>
              <Text className={styles.quickActionTitle}>参加等级考核</Text>
              <Text className={styles.quickActionDesc}>检验学习成果，获取证书</Text>
            </View>
            <Text className={styles.quickActionArrow}>›</Text>
          </View>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default VideoLessonPage;
