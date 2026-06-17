import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classNames from 'classnames';
import WorkCard from '@/components/WorkCard';
import { workList } from '@/data/works';

const tabs = [
  { key: 'all', label: '全部作品' },
  { key: 'master', label: '大师作品' },
  { key: 'student', label: '学员作品' },
  { key: 'sale', label: '作品义卖' }
];

const categories = [
  '全部', '陶瓷', '苏绣', '宣纸', '景泰蓝', '竹编', '木雕', '剪纸', '紫砂'
];

const categoryToCraftMap: Record<string, string> = {
  '陶瓷': '景德镇陶瓷',
  '苏绣': '苏绣',
  '宣纸': '宣纸',
  '景泰蓝': '景泰蓝',
  '竹编': '竹编',
  '木雕': '木雕',
  '剪纸': '剪纸',
  '紫砂': '紫砂壶'
};

const WorksPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeCategory, setActiveCategory] = useState('全部');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleUpload = () => {
    Taro.navigateTo({ url: '/pages/work-upload/index' });
  };

  const handleCustomOrder = () => {
    Taro.navigateTo({ url: '/pages/custom-order/index' });
  };

  const handleCharity = () => {
    Taro.showToast({ title: '公益义卖', icon: 'none' });
  };

  const filteredWorks = workList.filter(work => {
    if (activeTab === 'master' && !work.isMasterWork) return false;
    if (activeTab === 'student' && work.isMasterWork) return false;
    if (activeTab === 'sale' && !work.isForSale) return false;

    if (activeCategory !== '全部') {
      const targetCraft = categoryToCraftMap[activeCategory];
      if (!work.craftName.includes(targetCraft)) return false;
    }

    return true;
  });

  return (
    <View className={styles.worksPage}>
      <View className={styles.pageHeader}>
        <Text className={styles.headerTitle}>非遗作品</Text>
        <Text className={styles.headerSubtitle}>匠心独运，传世之作</Text>
        <View className={styles.actionBar}>
          <View className={styles.uploadBtn} onClick={handleUpload}>
            <Text className={styles.btnIcon}>📷</Text>
            <Text>上传作品</Text>
          </View>
          <View className={styles.customBtn} onClick={handleCustomOrder}>
            <Text>定制订单</Text>
          </View>
        </View>
      </View>

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

      <ScrollView scrollY style={{ height: 'calc(100vh - 420rpx)' }}>
        <View className={styles.bannerSection}>
          <View className={styles.bannerCard} onClick={handleCharity}>
            <View className={styles.bannerContent}>
              <Text className={styles.bannerTitle}>作品义卖</Text>
              <Text className={styles.bannerDesc}>支持非遗传承，购买心仪作品</Text>
            </View>
            <View className={styles.bannerAction}>去看看</View>
          </View>
        </View>

        <ScrollView className={styles.categoryScroll} scrollX>
          {categories.map((cat) => (
            <Text
              key={cat}
              className={classNames(styles.categoryItem, activeCategory === cat && styles.active)}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </Text>
          ))}
        </ScrollView>

        {filteredWorks.length > 0 ? (
          <View className={styles.worksGrid}>
            {filteredWorks.map((work) => (
              <View key={work.id} className={styles.workItem}>
                <WorkCard work={work} />
              </View>
            ))}
          </View>
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>🎨</Text>
            <Text className={styles.emptyText}>暂无作品</Text>
          </View>
        )}

        <Text className={styles.noMore}>— 没有更多了 —</Text>
      </ScrollView>
    </View>
  );
};

export default WorksPage;
