import React from 'react';
import { View, Text, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import type { Master } from '@/types';

interface MasterCardProps {
  master: Master;
}

const MasterCard: React.FC<MasterCardProps> = ({ master }) => {
  const handleClick = () => {
    Taro.navigateTo({
      url: `/pages/master-detail/index?id=${master.id}`
    });
  };

  return (
    <View className={styles.masterCard} onClick={handleClick}>
      <View className={styles.avatarWrap}>
        <Image
          className={styles.avatar}
          src={master.avatar}
          mode="aspectFill"
        />
        <View className={styles.generationBadge}>第{master.generation}代</View>
      </View>
      <View className={styles.info}>
        <Text className={styles.name}>{master.name}</Text>
        <Text className={styles.title}>{master.title}</Text>
        <View className={styles.craftTag}>
          <Text className={styles.craftName}>{master.craftName}</Text>
        </View>
      </View>
    </View>
  );
};

export default MasterCard;
