import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import SectionHeader from '@/components/SectionHeader';
import CraftCard from '@/components/CraftCard';
import MasterCard from '@/components/MasterCard';
import { craftList } from '@/data/crafts';
import { masterList } from '@/data/masters';

const HomePage: React.FC = () => {

  const handleQuickEntry = (type: string) => {
    switch (type) {
      case 'course':
        Taro.switchTab({ url: '/pages/course/index' });
        break;
      case 'works':
        Taro.switchTab({ url: '/pages/works/index' });
        break;
      case 'lineage':
        Taro.navigateTo({ url: '/pages/lineage/index' });
        break;
      case 'community':
        Taro.navigateTo({ url: '/pages/community/index' });
        break;
      case 'exam':
        Taro.navigateTo({ url: '/pages/exam/index' });
        break;
      case 'certificate':
        Taro.navigateTo({ url: '/pages/certificate/index' });
        break;
      default:
        break;
    }
  };

  const handleMoreCrafts = () => {
    Taro.showToast({ title: '更多技艺', icon: 'none' });
  };

  const handleMoreMasters = () => {
    Taro.showToast({ title: '更多传承人', icon: 'none' });
  };

  const quickEntries = [
    { icon: '📚', text: '课程报名', type: 'course' },
    { icon: '🎨', text: '作品展示', type: 'works' },
    { icon: '👨‍🏫', text: '师承谱系', type: 'lineage' },
    { icon: '🏆', text: '等级考核', type: 'exam' },
    { icon: '📜', text: '结业证书', type: 'certificate' },
    { icon: '👥', text: '学员社群', type: 'community' }
  ];

  const featuredCrafts = craftList.slice(0, 6);
  const featuredMasters = masterList.slice(0, 4);

  return (
    <ScrollView className={styles.homePage} scrollY>
      <View className={styles.banner}>
        <Image
          className={styles.bannerImage}
          src="https://picsum.photos/id/106/750/420"
          mode="aspectFill"
        />
        <View className={styles.bannerOverlay}>
          <Text className={styles.bannerTitle}>传承千年技艺</Text>
          <Text className={styles.bannerSubtitle}>匠心独运，薪火相传</Text>
        </View>
      </View>

      <View className={styles.quickEntry}>
        {quickEntries.map((entry) => (
          <View
            key={entry.type}
            className={styles.entryItem}
            onClick={() => handleQuickEntry(entry.type)}
          >
            <View className={styles.entryIcon}>{entry.icon}</View>
            <Text className={styles.entryText}>{entry.text}</Text>
          </View>
        ))}
      </View>

      <View className={styles.sectionWrap}>
        <View className={styles.statsBar}>
          <View className={styles.statItem}>
            <Text className={styles.statNum}>58</Text>
            <Text className={styles.statLabel}>非遗项目</Text>
          </View>
          <View className={styles.divider} />
          <View className={styles.statItem}>
            <Text className={styles.statNum}>268</Text>
            <Text className={styles.statLabel}>传承人</Text>
          </View>
          <View className={styles.divider} />
          <View className={styles.statItem}>
            <Text className={styles.statNum}>12000+</Text>
            <Text className={styles.statLabel}>学员</Text>
          </View>
        </View>
      </View>

      <View className={styles.sectionWrap}>
        <SectionHeader
          title="非遗技艺"
          subtitle="Discover Intangible Heritage"
          moreText="查看全部"
          onMore={handleMoreCrafts}
        />
      </View>

      <ScrollView className={styles.craftScroll} scrollX>
        {featuredCrafts.map((craft) => (
          <View key={craft.id} className="scroll-x-item">
            <CraftCard craft={craft} size="small" />
          </View>
        ))}
      </ScrollView>

      <View className={styles.sectionWrap}>
        <SectionHeader
          title="传承人风采"
          subtitle="Masters of Heritage"
          moreText="更多"
          onMore={handleMoreMasters}
        />
        <View className={styles.masterList}>
          {featuredMasters.map((master) => (
            <MasterCard key={master.id} master={master} />
          ))}
        </View>
      </View>

      <View className={styles.sectionWrap}>
        <SectionHeader title="热门类别" subtitle="Popular Categories" />
        <View className={styles.tagCloud}>
          <View className={styles.tagList}>
            <Text className={styles.tag}>陶瓷艺术</Text>
            <Text className={styles.tag}>刺绣织锦</Text>
            <Text className={styles.tag}>雕刻工艺</Text>
            <Text className={styles.tag}>编织技艺</Text>
            <Text className={styles.tag}>金属工艺</Text>
            <Text className={styles.tag}>文房四宝</Text>
            <Text className={styles.tag}>传统服饰</Text>
            <Text className={styles.tag}>民间美术</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;
