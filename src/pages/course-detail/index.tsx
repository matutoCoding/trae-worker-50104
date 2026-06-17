import React, { useState, useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import classNames from 'classnames';
import { getCourseById, getSchedulesByCourse } from '@/data/courses';
import type { Course, CourseSchedule } from '@/types';

interface EnrollResult {
  orderNo: string;
  courseTitle: string;
  className: string;
  amount: number;
  date: string;
}

const CourseDetailPage: React.FC = () => {
  const router = useRouter();
  const courseId = router.params.id || '1';
  const course: Course | undefined = useMemo(() => getCourseById(courseId), [courseId]);
  const schedules: CourseSchedule[] = useMemo(() => getSchedulesByCourse(courseId), [courseId]);
  
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [enrollResult, setEnrollResult] = useState<EnrollResult | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const selectedSchedule = schedules.find(s => s.id === selectedScheduleId);

  const handleSelectSchedule = (id: string) => {
    setSelectedScheduleId(id === selectedScheduleId ? '' : id);
  };

  const handleEnroll = () => {
    if (!selectedSchedule) {
      Taro.showToast({ title: '请先选择班次', icon: 'none' });
      return;
    }
    if (!course) return;

    const orderNo = 'BJ' + Date.now().toString().slice(-10);
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    setEnrollResult({
      orderNo,
      courseTitle: course.title,
      className: selectedSchedule.className,
      amount: selectedSchedule.price,
      date: dateStr
    });
    setShowModal(true);
    console.log('[Enroll] 报名成功:', { orderNo, courseId, scheduleId: selectedScheduleId });
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    Taro.showToast({ 
      title: isFavorite ? '已取消收藏' : '收藏成功', 
      icon: 'none' 
    });
  };

  const handleConsult = () => {
    Taro.showToast({ title: '客服联系中...', icon: 'none' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGoCourse = () => {
    setShowModal(false);
    Taro.navigateTo({ url: `/pages/video-lesson/index?courseId=${courseId}` });
  };

  if (!course) {
    return (
      <View className={styles.page}>
        <View style={{ padding: 100, textAlign: 'center' }}>
          <Text>课程不存在</Text>
        </View>
      </View>
    );
  }

  return (
    <View className={styles.page}>
      <ScrollView scrollY style={{ height: '100vh' }}>
        <View className={styles.cover}>
          <Image
            className={styles.coverImage}
            src={course.cover}
            mode="aspectFill"
          />
          <View className={styles.levelTag}>{course.level}</View>
        </View>

        <View className={styles.courseInfo}>
          <Text className={styles.title}>{course.title}</Text>
          <View className={styles.metaRow}>
            <View className={styles.masterInfo}>
              <Image
                className={styles.avatar}
                src="https://picsum.photos/id/64/100/100"
                mode="aspectFill"
              />
              <View>
                <Text className={styles.name}>{course.masterName}</Text>
                <Text className={styles.title}>非遗传承人 · {course.craftName}</Text>
              </View>
            </View>
            <View className={styles.rating}>
              <Text className={styles.star}>★</Text>
              <Text className={styles.num}>{course.rating}</Text>
            </View>
          </View>
          <View className={styles.stats}>
            <View className={styles.stat}>
              <Text className={styles.num}>{course.lessons}</Text>
              <Text className={styles.label}>课时数</Text>
            </View>
            <View className={styles.stat}>
              <Text className={styles.num}>{course.duration}</Text>
              <Text className={styles.label}>学习周期</Text>
            </View>
            <View className={styles.stat}>
              <Text className={styles.num}>{course.students}</Text>
              <Text className={styles.label}>学员</Text>
            </View>
          </View>
        </View>

        <View className={styles.priceSection}>
          <View className={styles.priceInfo}>
            <View className={styles.price}>
              <Text className={styles.symbol}>¥</Text>
              <Text className={styles.num}>{course.price}</Text>
              {course.originalPrice && (
                <Text className={styles.original}>¥{course.originalPrice}</Text>
              )}
            </View>
            {course.originalPrice && (
              <Text className={styles.discount}>限时优惠 省¥{course.originalPrice - course.price}</Text>
            )}
          </View>
          <Text className={styles.students}>{course.students}人已报名</Text>
        </View>

        <View className={styles.sectionCard}>
          <Text className={styles.sectionTitle}>课程介绍</Text>
          <Text className={styles.desc}>{course.description}</Text>
          <View className={styles.tags}>
            {course.tags.map((tag, i) => (
              <Text key={i} className={styles.tag}>{tag}</Text>
            ))}
          </View>
        </View>

        <View className={styles.sectionCard}>
          <Text className={styles.sectionTitle}>班次安排</Text>
          <View className={styles.scheduleList}>
            {schedules.length > 0 ? schedules.map((s) => (
              <View
                key={s.id}
                className={classNames(styles.scheduleItem, selectedScheduleId === s.id && styles.active)}
              >
                <View className={styles.scheduleHeader}>
                  <Text className={styles.className}>{s.className}</Text>
                  <Text className={styles.price}>¥{s.price}</Text>
                </View>
                <View className={styles.scheduleInfo}>
                  <View className={styles.infoRow}>
                    <Text className={styles.icon}>📅</Text>
                    <Text>{s.startDate} 至 {s.endDate}</Text>
                  </View>
                  <View className={styles.infoRow}>
                    <Text className={styles.icon}>🕐</Text>
                    <Text>{s.classTime}</Text>
                  </View>
                  <View className={styles.infoRow}>
                    <Text className={styles.icon}>📝</Text>
                    <Text>共{s.totalSessions}节课</Text>
                  </View>
                </View>
                <View className={styles.scheduleFooter}>
                  <View className={styles.slots}>
                    剩余名额：<Text className={styles.num}>{s.remainingSlots}</Text>/{s.maxSlots}人
                  </View>
                  <View
                    className={classNames(styles.selectBtn, selectedScheduleId === s.id && styles.selected)}
                    onClick={() => handleSelectSchedule(s.id)}
                  >
                    {selectedScheduleId === s.id ? '已选择' : '选择'}
                  </View>
                </View>
              </View>
            )) : (
              <View style={{ padding: 32, textAlign: 'center' }}>
                <Text style={{ color: '#8B7355' }}>暂无班次信息</Text>
              </View>
            )}
          </View>
        </View>

        <View style={{ height: 180 }} />
      </ScrollView>

      <View className={styles.bottomBar}>
        <View className={styles.consultBtn} onClick={handleConsult}>
          <Text className={styles.icon}>�</Text>
          <Text className={styles.text}>咨询</Text>
        </View>
        <View className={styles.favoriteBtn} onClick={handleFavorite}>
          <Text className={styles.icon}>{isFavorite ? '❤️' : '🤍'}</Text>
          <Text className={styles.text}>{isFavorite ? '已收藏' : '收藏'}</Text>
        </View>
        <View
          className={classNames(styles.enrollBtn, !selectedSchedule && styles.disabled)}
          onClick={handleEnroll}
        >
          {selectedSchedule ? `立即报名 ¥${selectedSchedule.price}` : '请先选择班次'}
        </View>
      </View>

      {showModal && enrollResult && (
        <View className={styles.modalMask}>
          <View className={styles.modalContent}>
            <View className={styles.successIcon}>✓</View>
            <Text className={styles.modalTitle}>报名成功</Text>
            <Text className={styles.modalDesc}>恭喜您成功报名！请按时上课哦~</Text>
            <View className={styles.orderInfo}>
              <View className={styles.infoRow}>
                <Text className={styles.label}>订单编号</Text>
                <Text className={styles.value}>{enrollResult.orderNo}</Text>
              </View>
              <View className={styles.infoRow}>
                <Text className={styles.label}>课程名称</Text>
                <Text className={styles.value}>{enrollResult.courseTitle}</Text>
              </View>
              <View className={styles.infoRow}>
                <Text className={styles.label}>报名班次</Text>
                <Text className={styles.value}>{enrollResult.className}</Text>
              </View>
              <View className={styles.infoRow}>
                <Text className={styles.label}>支付金额</Text>
                <Text className={styles.value} style={{ color: '#B85C38', fontWeight: 'bold' }}>¥{enrollResult.amount}</Text>
              </View>
              <View className={styles.infoRow}>
                <Text className={styles.label}>报名时间</Text>
                <Text className={styles.value}>{enrollResult.date}</Text>
              </View>
            </View>
            <View className={styles.modalActions}>
              <View className={classNames(styles.actionBtn, styles.secondary)} onClick={handleCloseModal}>
                返回课程
              </View>
              <View className={classNames(styles.actionBtn, styles.primary)} onClick={handleGoCourse}>
                开始学习
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CourseDetailPage;
