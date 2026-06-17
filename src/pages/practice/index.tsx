import React, { useState } from 'react';
import { View, Text, Input, Textarea, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classNames from 'classnames';
import { practiceRecords as initialRecords } from '@/data/user';
import type { PracticeRecord } from '@/types';

const quickTags = ['拉坯', '修坯', '绘画', '雕刻', '编织', '刺绣', '看视频', '线下课程'];

const PracticePage: React.FC = () => {
  const [content, setContent] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [records, setRecords] = useState<PracticeRecord[]>(initialRecords);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const isTodayChecked = records.some(r => r.date === todayStr);
  const totalMinutes = records.reduce((sum, r) => sum + r.duration, 0);
  const totalHours = Math.floor(totalMinutes / 60);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      Taro.showToast({ title: '请填写练习内容', icon: 'none' });
      return;
    }
    if (!duration || Number(duration) <= 0) {
      Taro.showToast({ title: '请填写有效时长', icon: 'none' });
      return;
    }

    const finalContent = selectedTags.length > 0
      ? `${selectedTags.map(t => `#${t}`).join(' ')} ${content}`.trim()
      : content;

    const newRecord: PracticeRecord = {
      id: 'p' + Date.now(),
      date: todayStr,
      content: finalContent,
      duration: Number(duration),
      notes: notes || undefined
    };

    setRecords([newRecord, ...records]);
    setContent('');
    setDuration('');
    setNotes('');
    setSelectedTags([]);

    console.log('[Practice] 打卡成功:', newRecord);
    Taro.showToast({ title: '打卡成功！', icon: 'success' });
  };

  return (
    <ScrollView className={styles.page} scrollY>
      <View className={styles.headerCard}>
        <View className={styles.headerRow}>
          <View className={styles.statItem}>
            <Text className={styles.num}>{records.length}</Text>
            <Text className={styles.label}>累计打卡</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.num}>{totalHours}</Text>
            <Text className={styles.label}>练习小时</Text>
          </View>
          <View className={styles.statItem}>
            <Text className={styles.num}>7</Text>
            <Text className={styles.label}>连续打卡</Text>
          </View>
        </View>
        <View className={styles.todayCard}>
          <View className={styles.todayInfo}>
            <Text className={styles.label}>今日打卡状态</Text>
            <Text className={styles.date}>{todayStr}</Text>
          </View>
          <View
            className={styles.statusBadge}
            style={{ background: isTodayChecked ? '#2E7D32' : 'rgba(255,255,255,0.95)', color: isTodayChecked ? '#fff' : '#B85C38' }}
          >
            {isTodayChecked ? '✓ 已打卡' : '未打卡'}
          </View>
        </View>
      </View>

      <View className={styles.formSection}>
        <Text className={styles.formTitle}>
          <Text>📝</Text>
          <Text>今日练习打卡</Text>
        </Text>

        <View className={styles.formGroup}>
          <Text className={styles.label}>
            <Text className={styles.required}>*</Text>练习内容
          </Text>
          <View className={styles.quickTags}>
            {quickTags.map((tag) => (
              <Text
                key={tag}
                className={classNames(styles.tag, selectedTags.includes(tag) && styles.active)}
                onClick={() => handleTagClick(tag)}
              >
                {tag}
              </Text>
            ))}
          </View>
          <View style={{ marginTop: 16 }} className={styles.inputWrap}>
            <Input
              className={styles.input}
              placeholder="请详细描述今天练习了什么..."
              placeholderTextColor="#B8A89A"
              value={content}
              onInput={(e) => setContent(e.detail.value)}
            />
          </View>
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.label}>
            <Text className={styles.required}>*</Text>练习时长
          </Text>
          <View className={styles.inputWrap}>
            <Input
              className={styles.input}
              type="number"
              placeholder="请输入练习时长"
              placeholderTextColor="#B8A89A"
              value={duration}
              onInput={(e) => setDuration(e.detail.value)}
            />
            <Text className={styles.unit}>分钟</Text>
          </View>
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.label}>练习心得（选填）</Text>
          <View className={styles.textAreaWrap}>
            <Textarea
              className={styles.textArea}
              placeholder="记录今天的练习心得、遇到的问题、收获等..."
              placeholderTextColor="#B8A89A"
              value={notes}
              onInput={(e) => setNotes(e.detail.value)}
              maxlength={500}
            />
          </View>
          <Text className={styles.wordCount}>{notes.length}/500</Text>
        </View>

        <View className={styles.submitBtn} onClick={handleSubmit}>
          提交打卡
        </View>
      </View>

      <View className={styles.recordsSection}>
        <View className={styles.sectionHeader}>
          <Text className={styles.title}>打卡记录</Text>
          <Text className={styles.count}>共{records.length}条</Text>
        </View>

        {records.length > 0 ? (
          <View className={styles.recordList}>
            {records.map((record) => (
              <View key={record.id} className={styles.recordCard}>
                <View className={styles.recordHeader}>
                  <Text className={styles.date}>{record.date}</Text>
                  <View className={styles.badge}>已完成</View>
                </View>
                <Text className={styles.recordContent}>{record.content}</Text>
                {record.notes && (
                  <View style={{ 
                    background: '#F5EFE6', 
                    padding: 16, 
                    borderRadius: 12, 
                    marginBottom: 16,
                    fontSize: 24,
                    color: '#5C4B3D',
                    lineHeight: 1.6
                  }}>
                    <Text style={{ fontWeight: 500 }}>💡 心得：</Text>
                    <Text>{record.notes}</Text>
                  </View>
                )}
                <View className={styles.recordMeta}>
                  <View className={styles.metaItem}>
                    <Text className={styles.icon}>⏱</Text>
                    <Text>{record.duration}分钟</Text>
                  </View>
                  <View className={styles.metaItem}>
                    <Text className={styles.icon}>🔥</Text>
                    <Text>坚持第{records.filter((_, i) => records.indexOf(record) <= i).length}天</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className={styles.emptyState}>
            <Text className={styles.icon}>📭</Text>
            <Text className={styles.text}>暂无打卡记录，快来完成第一次打卡吧~</Text>
          </View>
        )}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

export default PracticePage;
