import React, { useState } from 'react';
import { View, Text, Input, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classNames from 'classnames';
import CourseCard from '@/components/CourseCard';
import SectionHeader from '@/components/SectionHeader';
import { courseList } from '@/data/courses';
import { useEnrolledCourses } from '@/hooks/useAppStore';

const tabs = [
  { key: 'all', label: '全部' },
  { key: 'beginner', label: '入门' },
  { key: 'intermediate', label: '进阶' },
  { key: 'advanced', label: '高级' }
];

const sortOptions = [
  { key: 'recommend', label: '推荐' },
  { key: 'newest', label: '最新' },
  { key: 'popular', label: '人气' },
  { key: 'price', label: '价格' }
];

const CoursePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeSort, setActiveSort] = useState('recommend');
  const [searchText, setSearchText] = useState('');

  const { enrolledCourses } = useEnrolledCourses();
  const hasEnrolledCourses = enrolledCourses.length > 0;

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleSortChange = (key: string) => {
    setActiveSort(key);
  };

  const handleContinueStudy = (courseId: string) => {
    Taro.navigateTo({ url: `/pages/video-lesson/index?courseId=${courseId}` });
  };

  const handleFilter = () => {
    Taro.showToast({ title: '筛选功能', icon: 'none' });
  };

  const handleGoCourseDetail = (courseId: string) => {
    Taro.navigateTo({ url: `/pages/course-detail/index?id=${courseId}` });
  };

  const isCourseEnrolled = (courseId: string) => {
    return enrolledCourses.some(ec => ec.courseId === courseId);
  };

  const getEnrolledInfo = (courseId: string) => {
    return enrolledCourses.find(ec => ec.courseId === courseId);
  };

  const filteredCourses = courseList.filter(course => {
    if (activeTab === 'beginner' && course.level !== '入门') return false;
    if (activeTab === 'intermediate' && course.level !== '进阶') return false;
    if (activeTab === 'advanced' && course.level !== '高级') return false;

    if (searchText.trim()) {
      const keyword = searchText.trim();
      const matchTitle = course.title.includes(keyword);
      const matchMaster = course.masterName.includes(keyword);
      const matchCraft = course.craftName.includes(keyword);
      if (!matchTitle && !matchMaster && !matchCraft) return false;
    }

    return true;
  });

  return (
    <View className={styles.coursePage}>
      <View className={styles.searchBar}>
        <View className={styles.searchBox}>
          <Text className={styles.searchIcon}>🔍</Text>
          <Input
            className={styles.searchInput}
            placeholder="搜索课程、老师、技艺..."
            placeholderTextColor="#8B7355"
            value={searchText}
            onInput={(e) => setSearchText(e.detail.value)}
          />
        </View>
      </View>

      <ScrollView scrollY style={{ height: 'calc(100vh - 152rpx)' }}>
        {hasEnrolledCourses && (
          <View className={styles.studyProgressSection}>
            <SectionHeader title="我的课程" showMore={false} />
            <ScrollView className={styles.enrolledScroll} scrollX>
              {enrolledCourses.map((ec) => (
                <View
                  key={ec.id}
                  className={styles.enrolledCard}
                  onClick={() => handleGoCourseDetail(ec.courseId)}
                >
                  <Image
                    className={styles.enrolledCover}
                    src={ec.courseCover}
                    mode="aspectFill"
                  />
                  <View className={styles.enrolledInfo}>
                    <Text className={styles.enrolledTitle}>{ec.courseTitle}</Text>
                    <Text className={styles.enrolledMeta}>{ec.className}</Text>
                    <View className={styles.enrolledProgress}>
                      <View className={styles.progressBar}>
                        <View
                          className={styles.progressFill}
                          style={{ width: `${ec.progress}%` }}
                        />
                      </View>
                      <Text className={styles.progressText}>{ec.progress}%</Text>
                    </View>
                  </View>
                  <View
                    className={styles.continueBtn}
                    onClick={(e) => { e.stopPropagation(); handleContinueStudy(ec.courseId); }}
                  >
                    <Text>继续学习</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {hasEnrolledCourses && enrolledCourses.some(ec => ec.completedLessons.length > 0) && (
          <View className={styles.studyProgressSection}>
            <View className={styles.progressCard}>
              <View className={styles.progressHeader}>
                <Text className={styles.progressTitle}>继续学习</Text>
                {enrolledCourses[0] && (
                  <View
                    className={styles.continueBtnSmall}
                    onClick={() => handleContinueStudy(enrolledCourses[0].courseId)}
                  >
                    继续学习
                  </View>
                )}
              </View>
              <View className={styles.progressBar}>
                <View
                  className={styles.progressFill}
                  style={{
                    width: enrolledCourses[0]
                      ? `${enrolledCourses[0].progress}%`
                      : '25%'
                  }}
                />
              </View>
              <View className={styles.progressInfo}>
                <Text>
                  {enrolledCourses[0]
                    ? enrolledCourses[0].courseTitle
                    : '景德镇陶瓷入门课程'
                  }
                </Text>
                <Text>
                  {enrolledCourses[0]
                    ? `${enrolledCourses[0].completedLessons.length}/12课`
                    : '3/12课'
                  }
                </Text>
              </View>
            </View>
          </View>
        )}

        <View className={styles.tabBar}>
          {tabs.map((tab) => (
            <Text
              key={tab.key}
              className={classNames(styles.tabItem, activeTab === tab.key && styles.active)}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.label}
            </Text>
          ))}
        </View>

        <View className={styles.filterBar}>
          <View className={styles.sortOptions}>
            {sortOptions.map((option) => (
              <Text
                key={option.key}
                className={classNames(styles.sortItem, activeSort === option.key && styles.active)}
                onClick={() => handleSortChange(option.key)}
              >
                {option.label}
              </Text>
            ))}
          </View>
          <View className={styles.filterBtn} onClick={handleFilter}>
            <Text className={styles.filterIcon}>⚙</Text>
            <Text>筛选</Text>
          </View>
        </View>

        <View className={styles.courseList}>
          {filteredCourses.map((course) => (
            <View key={course.id} className={styles.courseItemWrapper}>
              {isCourseEnrolled(course.id) && (
                <View className={styles.enrolledBadge}>
                  <Text>✓ 已报名</Text>
                </View>
              )}
              <CourseCard course={course} />
              {isCourseEnrolled(course.id) && getEnrolledInfo(course.id) && (
                <View className={styles.courseItemActions}>
                  <View className={styles.actionRow}>
                    <Text className={styles.actionText}>
                      进度：{getEnrolledInfo(course.id)!.progress}% · {getEnrolledInfo(course.id)!.className}
                    </Text>
                    <View
                      className={styles.learnBtn}
                      onClick={() => handleContinueStudy(course.id)}
                    >
                      <Text>{getEnrolledInfo(course.id)!.progress > 0 ? '继续学习' : '开始学习'}</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        <Text className={styles.noMore}>— 没有更多了 —</Text>
      </ScrollView>
    </View>
  );
};

export default CoursePage;
