import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { Craft } from '@/types';

interface CraftCardProps {
  craft: Craft;
  size?: 'small' | 'medium';
}

const CraftCard: React.FC<CraftCardProps> = ({ craft, size = 'medium' }) => {
  const handleClick = () => {
    Taro.navigateTo({
      url: `/pages/craft-detail/index?id=${craft.id}`
    });
  };

  return (
    <View
      className={size === 'small' ? styles.craftCardSmall : styles.craftCard}
      onClick={handleClick}
    >
      <View className={styles.coverWrap}>
        <Image
          className={styles.cover}
          src={craft.cover}
          mode="aspectFill"
        />
        <View className={styles.levelTag}>{craft.level}</View>
      </View>
      <View className={styles.content}>
        <Text className={styles.name}>{craft.name}</Text>
        <Text className={styles.category}>{craft.category}</Text>
        {size === 'medium' && (
          <Text className={styles.description}>{craft.description}</Text>
        )}
        <View className={styles.stats}>
          <Text className={styles.stat}>
            <Text className={styles.statNum}>{craft.masterCount}</Text>
            <Text className={styles.statLabel}>位传承人</Text>
          </Text>
          <Text className={styles.stat}>
            <Text className={styles.statNum}>{craft.studentCount}</Text>
            <Text className={styles.statLabel}>名学员</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CraftCard;
