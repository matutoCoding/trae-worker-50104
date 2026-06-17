import React, { useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classNames from 'classnames';

interface Question {
  id: number;
  title: string;
  options: string[];
  answer: number;
}

const examData = {
  title: '景德镇陶瓷技艺等级考核（中级）',
  craftName: '景德镇陶瓷',
  level: '中级',
  duration: '60分钟',
  totalScore: 100,
  passScore: 60,
  questions: [
    {
      id: 1,
      title: '景德镇陶瓷的主要原料是什么？',
      options: ['高岭土', '红土', '黑土', '沙土'],
      answer: 0
    },
    {
      id: 2,
      title: '青花瓷最早出现于哪个朝代？',
      options: ['唐朝', '宋朝', '元朝', '明朝'],
      answer: 2
    },
    {
      id: 3,
      title: '以下哪种不是景德镇传统四大名瓷？',
      options: ['青花瓷', '粉彩瓷', '颜色釉瓷', '唐三彩'],
      answer: 3
    },
    {
      id: 4,
      title: '拉坯时泥料的最佳含水率约为多少？',
      options: ['10%-15%', '20%-25%', '30%-35%', '40%-45%'],
      answer: 1
    },
    {
      id: 5,
      title: '陶瓷烧制过程中，素烧的主要目的是什么？',
      options: ['增加光泽', '提高硬度便于绘画', '改变颜色', '减少收缩'],
      answer: 1
    },
    {
      id: 6,
      title: '粉彩瓷又被称为什么？',
      options: ['硬彩', '软彩', '珐琅彩', '五彩'],
      answer: 1
    },
    {
      id: 7,
      title: '以下哪种技法属于景德镇传统陶瓷装饰技法？',
      options: ['剪纸贴花', '青花分水', '刻划花', '以上都是'],
      answer: 3
    },
    {
      id: 8,
      title: '陶瓷烧成温度一般在多少度以上？',
      options: ['500℃', '800℃', '1000℃', '1200℃'],
      answer: 3
    },
    {
      id: 9,
      title: '"窑变"现象最常见于哪种瓷器？',
      options: ['青花瓷', '粉彩瓷', '颜色釉瓷', '玲珑瓷'],
      answer: 2
    },
    {
      id: 10,
      title: '修坯的主要工具是以下哪种？',
      options: ['刮板', '利坯刀', '毛笔', '海绵'],
      answer: 1
    }
  ] as Question[]
};

const ExamPage: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const calculateScore = () => {
    let correctCount = 0;
    examData.questions.forEach(q => {
      if (answers[q.id] === q.answer) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / examData.questions.length) * examData.totalScore);
    setScore(finalScore);
    setPassed(finalScore >= examData.passScore);
    return finalScore;
  };

  const handleSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < examData.questions.length) {
      Taro.showModal({
        title: '提示',
        content: `还有${examData.questions.length - answeredCount}道题未作答，确定提交吗？`,
        success: (res) => {
          if (res.confirm) {
            doSubmit();
          }
        }
      });
    } else {
      doSubmit();
    }
  };

  const doSubmit = () => {
    calculateScore();
    setSubmitted(true);
    setTimeout(() => setShowResult(true), 300);
  };

  const handleCloseResult = () => {
    setShowResult(false);
  };

  const handleViewCertificate = () => {
    Taro.navigateTo({ url: '/pages/certificate/index' });
  };

  const handleRetry = () => {
    setAnswers({});
    setSubmitted(false);
    setShowResult(false);
    setScore(0);
    setPassed(false);
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / examData.questions.length) * 100;

  return (
    <View className={styles.page}>
      <View className={styles.examHeader}>
        <View className={styles.examInfo}>
          <Text className={styles.examTitle}>{examData.title}</Text>
          <View className={styles.examMeta}>
            <View className={styles.metaTag}>{examData.level}</View>
            <Text className={styles.metaText}>⏱ {examData.duration}</Text>
            <Text className={styles.metaText}>📋 {examData.questions.length}题</Text>
            <Text className={styles.metaText}>💯 {examData.totalScore}分</Text>
          </View>
        </View>
        <View className={styles.progressSection}>
          <View className={styles.progressInfo}>
            <Text className={styles.progressLabel}>答题进度</Text>
            <Text className={styles.progressCount}>{answeredCount}/{examData.questions.length}</Text>
          </View>
          <View className={styles.progressBar}>
            <View className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
          </View>
        </View>
      </View>

      <ScrollView scrollY style={{ height: 'calc(100vh - 440rpx)' }}>
        <View className={styles.questionList}>
          {examData.questions.map((q, index) => (
            <View key={q.id} className={styles.questionCard}>
              <View className={styles.questionHeader}>
                <View className={styles.questionNum}>
                  <Text>{index + 1}</Text>
                </View>
                <Text className={styles.questionTitle}>{q.title}</Text>
                {submitted && (
                  <View className={classNames(
                    styles.questionResult,
                    answers[q.id] === q.answer ? styles.correct : styles.wrong
                  )}>
                    {answers[q.id] === q.answer ? '✓ 正确' : '✗ 错误'}
                  </View>
                )}
              </View>
              <View className={styles.optionsList}>
                {q.options.map((opt, optIndex) => {
                  const isSelected = answers[q.id] === optIndex;
                  const isCorrectAnswer = submitted && optIndex === q.answer;
                  const isWrongSelected = submitted && isSelected && optIndex !== q.answer;
                  return (
                    <View
                      key={optIndex}
                      className={classNames(
                        styles.optionItem,
                        isSelected && !submitted && styles.selected,
                        isCorrectAnswer && styles.correctOption,
                        isWrongSelected && styles.wrongOption
                      )}
                      onClick={() => handleSelectAnswer(q.id, optIndex)}
                    >
                      <View className={styles.optionLabel}>
                        {String.fromCharCode(65 + optIndex)}
                      </View>
                      <Text className={styles.optionText}>{opt}</Text>
                      {isCorrectAnswer && <Text className={styles.optionIcon}>✓</Text>}
                      {isWrongSelected && <Text className={styles.optionIcon}>✗</Text>}
                    </View>
                  );
                })}
              </View>
              {submitted && answers[q.id] !== q.answer && (
                <View className={styles.answerTip}>
                  <Text className={styles.tipLabel}>正确答案：</Text>
                  <Text className={styles.tipText}>
                    {String.fromCharCode(65 + q.answer)}. {q.options[q.answer]}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
        <View style={{ height: '40rpx' }} />
      </ScrollView>

      <View className={styles.submitBar}>
        <View className={styles.submitBtn} onClick={handleSubmit}>
          <Text>{submitted ? '已提交' : '提交答卷'}</Text>
        </View>
      </View>

      {showResult && (
        <View className={styles.modalMask} onClick={handleCloseResult}>
          <View className={styles.resultModal} onClick={(e) => e.stopPropagation()}>
            <View className={styles.resultIcon}>
              {passed ? '🎉' : '💪'}
            </View>
            <Text className={styles.resultTitle}>
              {passed ? '恭喜通过考核！' : '继续努力！'}
            </Text>
            <View className={styles.scoreCard}>
              <View className={styles.scoreMain}>
                <Text className={styles.scoreNum}>{score}</Text>
                <Text className={styles.scoreUnit}>分</Text>
              </View>
              <Text className={styles.scorePass}>及格线 {examData.passScore}分</Text>
            </View>
            <View className={styles.resultStats}>
              <View className={styles.statItem}>
                <Text className={styles.statNum}>
                  {examData.questions.filter(q => answers[q.id] === q.answer).length}
                </Text>
                <Text className={styles.statLabel}>答对</Text>
              </View>
              <View className={styles.statItem}>
                <Text className={styles.statNum}>
                  {examData.questions.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.answer).length}
                </Text>
                <Text className={styles.statLabel}>答错</Text>
              </View>
              <View className={styles.statItem}>
                <Text className={styles.statNum}>
                  {examData.questions.filter(q => answers[q.id] === undefined).length}
                </Text>
                <Text className={styles.statLabel}>未答</Text>
              </View>
            </View>
            <View className={styles.resultActions}>
              <View className={styles.secondaryBtn} onClick={handleRetry}>
                <Text>重新考核</Text>
              </View>
              <View className={styles.primaryBtn} onClick={passed ? handleViewCertificate : handleCloseResult}>
                <Text>{passed ? '查看证书' : '我知道了'}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ExamPage;
