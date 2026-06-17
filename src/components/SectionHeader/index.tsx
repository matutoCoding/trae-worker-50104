import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  moreText?: string;
  onMore?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  moreText = '更多',
  onMore
}) => {
  return (
    <View className={styles.sectionHeader}>
      <View className={styles.left}>
        <View className={styles.titleBar} />
        <Text className={styles.title}>{title}</Text>
        {subtitle && <Text className={styles.subtitle}>{subtitle}</Text>}
      </View>
      {onMore && (
        <View className={styles.more} onClick={onMore}>
          <Text className={styles.moreText}>{moreText}</Text>
          <Text className={styles.moreArrow}>›</Text>
        </View>
      )}
    </View>
  );
};

export default SectionHeader;
