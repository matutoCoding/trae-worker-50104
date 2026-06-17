import React from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classNames from 'classnames';
import { userProfile, practiceRecords } from '@/data/user';
import { useEnrolledCourses, useExamRecords, useCertificates } from '@/hooks/useAppStore';
import { getLessonsByCourse } from '@/data/courses';

const tabBarPages = ['/pages/home/index', '/pages/course/index', '/pages/works/index', '/pages/mine/index'];

const MinePage: React.FC = () => {
  const { enrolledCourses } = useEnrolledCourses();
  const examRecords = useExamRecords();
  const certificates = useCertificates();

  const handleNavigate = (url: string) => {
    if (tabBarPages.includes(url)) {
      Taro.switchTab({ url });
    } else {
      Taro.navigateTo({ url });
    }
  };

  const handleSettings = () => {
    Taro.showToast({ title: '设置', icon: 'none' });
  };

  const handleContinueStudy = (courseId: string) => {
    Taro.navigateTo({ url: `/pages/video-lesson/index?courseId=${courseId}` });
  };

  const handleGoCourseDetail = (courseId: string) => {
    Taro.navigateTo({ url: `/pages/course-detail/index?id=${courseId}` });
  };

  const learningCourses = enrolledCourses.filter(ec => ec.status === 'learning');
  const completedCourses = enrolledCourses.filter(ec => ec.status === 'completed');

  const studyMenus = [
    { icon: '📚', title: '我的课程', subtitle: `${enrolledCourses.length}门已报名`, url: '/pages/course/index' },
    { icon: '📝', title: '练习打卡', subtitle: `已打卡${practiceRecords.length}天`, url: '/pages/practice/index' },
    { icon: '🏆', title: '等级考核', subtitle: examRecords.length > 0 ? `已考${examRecords.length}次` : '提升技艺等级', url: '/pages/exam/index' },
    { icon: '📜', title: '我的证书', subtitle: `${certificates.length}张证书`, url: '/pages/certificate/index' }
  ];

  const orderMenus = [
    { icon: '🛒', title: '我的订单', subtitle: '查看全部订单', url: '' },
    { icon: '🎨', title: '我的作品', subtitle: `${userProfile.works}件作品`, url: '' },
    { icon: '📦', title: '定制订单', subtitle: '查看定制进度', url: '/pages/custom-order/index' },
    { icon: '💬', title: '作品点评', badge: 2, url: '' }
  ];

  const otherMenus = [
    { icon: '👨‍🏫', title: '师承谱系', subtitle: '查看传承脉络', url: '/pages/lineage/index' },
    { icon: '👥', title: '学员社群', subtitle: '与同好交流', url: '/pages/community/index' },
    { icon: '❓', title: '帮助中心', subtitle: '常见问题解答', url: '' },
    { icon: '📞', title: '联系我们', subtitle: '客服与反馈', url: '' }
  ];

  return (
    <ScrollView className={styles.minePage} scrollY>
      <View className={styles.userHeader}>
        <View className={styles.userInfo}>
          <Image
            className={styles.avatar}
            src={userProfile.avatar}
            mode="aspectFill"
          />
          <View className={styles.info}>
            <Text className={styles.name}>{userProfile.name}</Text>
            <View className={styles.levelBadge}>{userProfile.level}</View>
            <Text className={styles.points}>积分：{userProfile.points}</Text>
          </View>
          <Text className={styles.settingsIcon} onClick={handleSettings}>⚙</Text>
        </View>
      </View>

      <View className={styles.statsCard}>
        <View className={styles.statItem}>
          <Text className={styles.statNum}>{userProfile.studyDays}</Text>
          <Text className={styles.statLabel}>学习天数</Text>
        </View>
        <View className={styles.divider} />
        <View className={styles.statItem}>
          <Text className={styles.statNum}>{userProfile.totalHours}</Text>
          <Text className={styles.statLabel}>学习时长</Text>
        </View>
        <View className={styles.divider} />
        <View className={styles.statItem}>
          <Text className={styles.statNum}>{completedCourses.length}</Text>
          <Text className={styles.statLabel}>完成课程</Text>
        </View>
      </View>

      {enrolledCourses.length > 0 && (
        <View className={styles.myCoursesSection}>
          <View className={styles.sectionHeaderRow}>
            <Text className={styles.sectionTitle}>学习中的课程</Text>
            <Text className={styles.sectionMore} onClick={() => handleNavigate('/pages/course/index')}>
              全部 ›
            </Text>
          </View>
          <View className={styles.myCoursesList}>
            {learningCourses.slice(0, 3).map((ec) => {
              const totalLessons = getLessonsByCourse(ec.courseId).length;
              return (
                <View
                  key={ec.id}
                  className={styles.myCourseCard}
                  onClick={() => handleGoCourseDetail(ec.courseId)}
                >
                  <Image
                    className={styles.myCourseCover}
                    src={ec.courseCover}
                    mode="aspectFill"
                  />
                  <View className={styles.myCourseInfo}>
                    <Text className={styles.myCourseTitle}>{ec.courseTitle}</Text>
                    <Text className={styles.myCourseMeta}>{ec.className}</Text>
                    <View className={styles.myCourseProgressRow}>
                      <View className={styles.myCourseProgressBar}>
                        <View
                          className={styles.myCourseProgressFill}
                          style={{ width: `${ec.progress}%` }}
                        />
                      </View>
                      <Text className={styles.myCourseProgressText}>
                        {ec.completedLessons.length}/{totalLessons}课
                      </Text>
                    </View>
                  </View>
                  <View
                    className={styles.myCourseBtn}
                    onClick={(e) => { e.stopPropagation(); handleContinueStudy(ec.courseId); }}
                  >
                    <Text>继续</Text>
                  </View>
                </View>
              );
            })}
            {learningCourses.length === 0 && enrolledCourses.length > 0 && (
              <View className={styles.noLearningCourse}>
                <Text className={styles.noLearningText}>暂无学习中的课程</Text>
                <Text className={styles.noLearningSub}>已完成{completedCourses.length}门课程</Text>
              </View>
            )}
          </View>
        </View>
      )}

      {examRecords.length > 0 && (
        <View className={styles.examRecordsSection}>
          <View className={styles.sectionHeaderRow}>
            <Text className={styles.sectionTitle}>最近考核</Text>
            <Text className={styles.sectionMore} onClick={() => handleNavigate('/pages/exam/index')}>
              去考核 ›
            </Text>
          </View>
          <View className={styles.examRecordsList}>
            {examRecords.slice(0, 2).map((record) => (
              <View key={record.id} className={styles.examRecordCard}>
                <View className={styles.examRecordHeader}>
                  <Text className={styles.examRecordTitle}>{record.examTitle}</Text>
                  <View className={classNames(
                    styles.examRecordStatus,
                    record.passed ? styles.passed : styles.failed
                  )}>
                    {record.passed ? '✓ 通过' : '✗ 未通过'}
                  </View>
                </View>
                <View className={styles.examRecordInfo}>
                  <Text className={styles.examRecordScore}>
                    <Text className={styles.scoreNum}>{record.score}</Text>
                    <Text className={styles.scoreTotal}>/{record.totalScore}分</Text>
                  </Text>
                  <Text className={styles.examRecordDate}>{record.completedAt}</Text>
                </View>
                {record.passed && record.certificateId && (
                  <View
                    className={styles.viewCertBtn}
                    onClick={() => handleNavigate('/pages/certificate/index')}
                  >
                    <Text>📜 查看证书</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      <View className={styles.studyReport}>
        <View className={styles.reportHeader}>
          <Text className={styles.reportTitle}>学习报告</Text>
          <Text className={styles.reportLink}>查看详情 ›</Text>
        </View>
        <View className={styles.reportStats}>
          <View className={styles.reportItem}>
            <Text className={styles.num}>{userProfile.studyDays}</Text>
            <Text className={styles.label}>连续学习</Text>
          </View>
          <View className={styles.reportItem}>
            <Text className={styles.num}>Top 10%</Text>
            <Text className={styles.label}>超越学员</Text>
          </View>
          <View className={styles.reportItem}>
            <Text className={styles.num}>{certificates.length}</Text>
            <Text className={styles.label}>获得证书</Text>
          </View>
        </View>
      </View>

      <View className={styles.menuSection}>
        <Text className={styles.sectionTitle}>学习中心</Text>
        <View className={styles.menuCard}>
          {studyMenus.map((item, index) => (
            <View
              key={index}
              className={styles.menuItem}
              onClick={() => item.url && handleNavigate(item.url)}
            >
              <View className={styles.menuIcon}>{item.icon}</View>
              <View className={styles.menuContent}>
                <Text className={styles.menuTitle}>{item.title}</Text>
                {item.subtitle && <Text className={styles.menuSubtitle}>{item.subtitle}</Text>}
              </View>
              <Text className={styles.menuArrow}>›</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.menuSection}>
        <Text className={styles.sectionTitle}>订单与作品</Text>
        <View className={styles.menuCard}>
          {orderMenus.map((item, index) => (
            <View
              key={index}
              className={styles.menuItem}
              onClick={() => item.url && handleNavigate(item.url)}
            >
              <View className={styles.menuIcon}>{item.icon}</View>
              <View className={styles.menuContent}>
                <Text className={styles.menuTitle}>
                  {item.title}
                  {item.badge && <Text className={styles.badge}>{item.badge}</Text>}
                </Text>
                {item.subtitle && <Text className={styles.menuSubtitle}>{item.subtitle}</Text>}
              </View>
              <Text className={styles.menuArrow}>›</Text>
            </View>
          ))}
        </View>
      </View>

      <View className={styles.menuSection}>
        <Text className={styles.sectionTitle}>其他服务</Text>
        <View className={styles.menuCard}>
          {otherMenus.map((item, index) => (
            <View
              key={index}
              className={styles.menuItem}
              onClick={() => item.url && handleNavigate(item.url)}
            >
              <View className={styles.menuIcon}>{item.icon}</View>
              <View className={styles.menuContent}>
                <Text className={styles.menuTitle}>{item.title}</Text>
                {item.subtitle && <Text className={styles.menuSubtitle}>{item.subtitle}</Text>}
              </View>
              <Text className={styles.menuArrow}>›</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ height: 60 }} />
    </ScrollView>
  );
};

export default MinePage;
