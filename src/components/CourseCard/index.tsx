import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { Course } from '@/types';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const handleClick = () => {
    Taro.navigateTo({
      url: `/pages/course-detail/index?id=${course.id}`
    });
  };

  const getLevelTag = (level: string) => {
    const colorMap: Record<string, string> = {
      '入门': '#2E7D32',
      '进阶': '#F57C00',
      '高级': '#D32F2F'
    };
    return colorMap[level] || '#B85C38';
  };

  return (
    <View className={styles.courseCard} onClick={handleClick}>
      <View className={styles.coverWrap}>
        <Image
          className={styles.cover}
          src={course.cover}
          mode="aspectFill"
        />
        <View className={styles.levelTag} style={{ background: getLevelTag(course.level) }}>
          {course.level}
        </View>
        <View className={styles.durationTag}>
          <Text className={styles.durationIcon}>⏱</Text>
          <Text>{course.duration}</Text>
        </View>
      </View>
      <View className={styles.content}>
        <Text className={styles.title}>{course.title}</Text>
        <View className={styles.meta}>
          <View className={styles.masterInfo}>
            <Image
              className={styles.masterAvatar}
              src="https://picsum.photos/id/64/100/100"
              mode="aspectFill"
            />
            <Text className={styles.masterName}>{course.masterName}</Text>
          </View>
          <View className={styles.rating}>
            <Text className={styles.star}>★</Text>
            <Text className={styles.ratingNum}>{course.rating}</Text>
          </View>
        </View>
        <View className={styles.footer}>
          <View className={styles.price}>
            <Text className={styles.priceSymbol}>¥</Text>
            <Text className={styles.priceNum}>{course.price}</Text>
            {course.originalPrice && (
              <Text className={styles.originalPrice}>¥{course.originalPrice}</Text>
            )}
          </View>
          <Text className={styles.studentCount}>{course.students}人已学</Text>
        </View>
      </View>
    </View>
  );
};

export default CourseCard;
