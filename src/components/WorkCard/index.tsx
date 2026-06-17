import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { Work } from '@/types';

interface WorkCardProps {
  work: Work;
}

const WorkCard: React.FC<WorkCardProps> = ({ work }) => {
  const handleClick = () => {
    Taro.navigateTo({
      url: `/pages/work-detail/index?id=${work.id}`
    });
  };

  return (
    <View className={styles.workCard} onClick={handleClick}>
      <View className={styles.coverWrap}>
        <Image
          className={styles.cover}
          src={work.cover}
          mode="aspectFill"
        />
        {work.isMasterWork && (
          <View className={styles.masterTag}>大师作品</View>
        )}
        {work.isForSale && work.price && (
          <View className={styles.priceTag}>
            <Text className={styles.priceSymbol}>¥</Text>
            <Text className={styles.priceNum}>{work.price}</Text>
          </View>
        )}
      </View>
      <View className={styles.content}>
        <Text className={styles.title}>{work.title}</Text>
        <View className={styles.authorInfo}>
          <Image
            className={styles.authorAvatar}
            src={work.authorAvatar}
            mode="aspectFill"
          />
          <Text className={styles.authorName}>{work.authorName}</Text>
        </View>
        <View className={styles.stats}>
          <View className={styles.stat}>
            <Text className={styles.statIcon}>♥</Text>
            <Text className={styles.statNum}>{work.likes}</Text>
          </View>
          <View className={styles.stat}>
            <Text className={styles.statIcon}>💬</Text>
            <Text className={styles.statNum}>{work.comments}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkCard;
