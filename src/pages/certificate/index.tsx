import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const CertificatePage: React.FC = () => {
  return (
    <View className={styles.page}>
      <Text className={styles.icon}>📜</Text>
      <Text className={styles.title}>我的证书</Text>
      <Text className={styles.desc}>功能正在开发中...</Text>
    </View>
  );
};

export default CertificatePage;
