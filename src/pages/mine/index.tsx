import React from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import { userProfile, practiceRecords } from '@/data/user';

const MinePage: React.FC = () => {
  const handleNavigate = (url: string) => {
    Taro.navigateTo({ url });
  };

  const handleSettings = () => {
    Taro.showToast({ title: '设置', icon: 'none' });
  };

  const studyMenus = [
    { icon: '📚', title: '我的课程', subtitle: `${userProfile.completedCourses}门已完成`, url: '/pages/course/index' },
    { icon: '📝', title: '练习打卡', subtitle: `已打卡${practiceRecords.length}天`, url: '/pages/practice/index' },
    { icon: '🏆', title: '等级考核', subtitle: '提升技艺等级', url: '/pages/exam/index' },
    { icon: '📜', title: '我的证书', subtitle: `${userProfile.certificates}张证书`, url: '/pages/certificate/index' }
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
          <Text className={styles.statNum}>{userProfile.completedCourses}</Text>
          <Text className={styles.statLabel}>完成课程</Text>
        </View>
      </View>

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
            <Text className={styles.num}>{userProfile.certificates}</Text>
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
    </ScrollView>
  );
};

export default MinePage;
