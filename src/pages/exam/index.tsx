import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import styles from './index.module.scss';
import classNames from 'classnames';
import { appStore } from '@/store/appStore';
import { useExamRecords } from '@/hooks/useAppStore';
import type { ExamRecord } from '@/types';

interface Question {
  id: number;
  title: string;
  options: string[];
  answer: number;
}

const examQuestionBank: Record<string, Question[]> = {
  '景德镇陶瓷': [
    { id: 1, title: '景德镇陶瓷的主要原料是什么？', options: ['高岭土', '红土', '黑土', '沙土'], answer: 0 },
    { id: 2, title: '青花瓷最早出现于哪个朝代？', options: ['唐朝', '宋朝', '元朝', '明朝'], answer: 2 },
    { id: 3, title: '以下哪种不是景德镇传统四大名瓷？', options: ['青花瓷', '粉彩瓷', '颜色釉瓷', '唐三彩'], answer: 3 },
    { id: 4, title: '拉坯时泥料的最佳含水率约为多少？', options: ['10%-15%', '20%-25%', '30%-35%', '40%-45%'], answer: 1 },
    { id: 5, title: '陶瓷烧制过程中，素烧的主要目的是什么？', options: ['增加光泽', '提高硬度便于绘画', '改变颜色', '减少收缩'], answer: 1 },
    { id: 6, title: '粉彩瓷又被称为什么？', options: ['硬彩', '软彩', '珐琅彩', '五彩'], answer: 1 },
    { id: 7, title: '以下哪种技法属于景德镇传统陶瓷装饰技法？', options: ['剪纸贴花', '青花分水', '刻划花', '以上都是'], answer: 3 },
    { id: 8, title: '陶瓷烧成温度一般在多少度以上？', options: ['500℃', '800℃', '1000℃', '1200℃'], answer: 3 },
    { id: 9, title: '"窑变"现象最常见于哪种瓷器？', options: ['青花瓷', '粉彩瓷', '颜色釉瓷', '玲珑瓷'], answer: 2 },
    { id: 10, title: '修坯的主要工具是以下哪种？', options: ['刮板', '利坯刀', '毛笔', '海绵'], answer: 1 }
  ],
  '苏绣': [
    { id: 1, title: '苏绣的四大名绣之首指的是？', options: ['苏绣', '湘绣', '粤绣', '蜀绣'], answer: 0 },
    { id: 2, title: '苏绣最具代表性的针法是？', options: ['平针', '乱针', '打籽针', '套针'], answer: 3 },
    { id: 3, title: '苏绣的发源地是？', options: ['杭州', '苏州', '南京', '扬州'], answer: 1 },
    { id: 4, title: '以下哪种线是苏绣常用绣线？', options: ['棉线', '丝线', '毛线', '金线'], answer: 1 },
    { id: 5, title: '绣制花瓣时常用哪种针法表现渐变？', options: ['戗针', '滚针', '打籽针', '接针'], answer: 0 },
    { id: 6, title: '苏绣双面绣的特点是？', options: ['只绣一面', '两面都有图案', '只绣花卉', '只绣人物'], answer: 1 },
    { id: 7, title: '苏绣"劈丝"指的是？', options: ['剪断丝线', '把一根丝线分成多股', '染色', '穿针引线'], answer: 1 },
    { id: 8, title: '传统苏绣绷架的作用是？', options: ['装饰', '固定绣布便于刺绣', '晾晒', '收纳绣线'], answer: 1 },
    { id: 9, title: '以下哪个是苏绣的代表作品？', options: ['清明上河图', '猫', '富春山居图', '千里江山图'], answer: 1 },
    { id: 10, title: '苏绣中"水墨绣"主要绣制什么题材？', options: ['花卉', '山水', '鱼虫', '人物'], answer: 1 }
  ],
  '宣纸': [
    { id: 1, title: '宣纸的原产地是？', options: ['安徽泾县', '浙江杭州', '四川成都', '江苏苏州'], answer: 0 },
    { id: 2, title: '宣纸制作的主要原料是？', options: ['青檀树皮和沙田稻草', '竹子', '棉花', '树皮'], answer: 0 },
    { id: 3, title: '宣纸被称为？', options: ['千年寿纸', '百年纸', '十年级', '万年纸'], answer: 0 },
    { id: 4, title: '宣纸中适合写意画的是？', options: ['生宣', '熟宣', '半熟宣', '蜡笺'], answer: 0 },
    { id: 5, title: '宣纸中适合工笔画的是？', options: ['生宣', '熟宣', '皮纸', '毛边纸'], answer: 1 },
    { id: 6, title: '宣纸制作工艺中"捞纸"的主要工具是？', options: ['竹帘', '渔网', '铁网', '纱布'], answer: 0 },
    { id: 7, title: '宣纸的"纸寿千年"主要得益于？', options: ['特殊原料和工艺', '涂防腐剂', '密封保存', '添加胶水'], answer: 0 },
    { id: 8, title: '宣纸按用料配比不同可分为？', options: ['棉料、皮料、净皮、特净', '大号、中号、小号', '白色、彩色', '厚纸、薄纸'], answer: 0 },
    { id: 9, title: '宣纸制作需要经过多少道工序？', options: ['18道', '50多道', '108道', '200道以上'], answer: 2 },
    { id: 10, title: '晾晒宣纸通常选择什么天气？', options: ['晴天', '阴天', '雨天', '雪天'], answer: 0 }
  ],
  '景泰蓝': [
    { id: 1, title: '景泰蓝又称？', options: ['铜胎掐丝珐琅', '青花瓷', '粉彩', '琉璃'], answer: 0 },
    { id: 2, title: '景泰蓝的"景泰"得名于？', options: ['明朝景泰年间', '一个工匠的名字', '地名', '颜色名称'], answer: 0 },
    { id: 3, title: '景泰蓝制作中"掐丝"用的材料是？', options: ['金丝', '银丝', '铜丝', '铁丝'], answer: 2 },
    { id: 4, title: '景泰蓝的传统色彩以什么为主？', options: ['蓝色', '红色', '绿色', '黄色'], answer: 0 },
    { id: 5, title: '景泰蓝点蓝使用的材料是？', options: ['颜料', '珐琅釉料', '油漆', '墨水'], answer: 1 },
    { id: 6, title: '景泰蓝烧制需要多少度左右？', options: ['300度', '500度', '800度', '1200度'], answer: 2 },
    { id: 7, title: '景泰蓝制作中"磨光"的目的是？', options: ['使表面平整光亮', '减少厚度', '改变颜色', '增加重量'], answer: 0 },
    { id: 8, title: '景泰蓝最后一道工序是？', options: ['镀金', '烧制', '点蓝', '掐丝'], answer: 0 },
    { id: 9, title: '传统景泰蓝的胎体主要是？', options: ['铜胎', '银胎', '金胎', '陶瓷胎'], answer: 0 },
    { id: 10, title: '景泰蓝"点蓝"需要点几次？', options: ['1次', '2-3次', '3-5次', '10次以上'], answer: 2 }
  ],
  '竹编': [
    { id: 1, title: '竹编常用的竹材是？', options: ['毛竹', '紫竹', '佛肚竹', '龟背竹'], answer: 0 },
    { id: 2, title: '竹编制作第一步是？', options: ['劈竹', '编织', '染色', '打磨'], answer: 0 },
    { id: 3, title: '竹编"经篾"和"纬篾"分别指？', options: ['竖线和横线', '粗线和细线', '主线和辅线', '染色和未染色'], answer: 0 },
    { id: 4, title: '传统竹编常用的编织方法是？', options: ['十字编', '人字编', '六角编', '以上都是'], answer: 3 },
    { id: 5, title: '竹编防虫处理通常用？', options: ['硫磺熏蒸', '暴晒', '水浸泡', '冷冻'], answer: 0 },
    { id: 6, title: '浙江哪里的竹编最有名？', options: ['东阳', '杭州', '宁波', '温州'], answer: 0 },
    { id: 7, title: '竹编"篾片"的厚度通常是？', options: ['1-2毫米', '5毫米', '1厘米', '2厘米'], answer: 0 },
    { id: 8, title: '竹编工艺品打磨的目的是？', options: ['去毛刺，手感光滑', '变薄', '变色', '增加光泽'], answer: 0 },
    { id: 9, title: '竹编"提花编织"主要用于？', options: ['制作图案花纹', '加固', '装饰边缘', '增加厚度'], answer: 0 },
    { id: 10, title: '竹编完成后通常涂什么保护？', options: ['清漆', '油漆', '胶水', '蜡'], answer: 0 }
  ],
  '木雕': [
    { id: 1, title: '中国四大木雕之首是？', options: ['东阳木雕', '黄杨木雕', '龙眼木雕', '金漆木雕'], answer: 0 },
    { id: 2, title: '东阳木雕的发源地是？', options: ['浙江东阳', '福建莆田', '广东潮州', '江苏苏州'], answer: 0 },
    { id: 3, title: '木雕"打坯"阶段的主要工具是？', options: ['凿子和锤', '砂纸', '锯子', '刨子'], answer: 0 },
    { id: 4, title: '适合精细雕刻的木材是？', options: ['黄杨木', '松木', '桐木', '杨木'], answer: 0 },
    { id: 5, title: '木雕"修光"工序的目的是？', options: ['细化细节，使表面光洁', '打粗形', '拼接', '上色'], answer: 0 },
    { id: 6, title: '传统木雕防止开裂的方法是？', options: ['自然风干多年', '烘干', '水煮', '以上都是'], answer: 3 },
    { id: 7, title: '木雕中"浮雕"是指？', options: ['图案凸起于表面', '凹进去雕刻', '镂空雕刻', '立体雕刻'], answer: 0 },
    { id: 8, title: '木雕完成后通常做什么处理？', options: ['打蜡或上漆', '水洗', '冷冻', '暴晒'], answer: 0 },
    { id: 9, title: '龙眼木雕主要产地是？', options: ['福建', '浙江', '广东', '江苏'], answer: 0 },
    { id: 10, title: '木雕中"透雕"也叫？', options: ['镂空雕', '圆雕', '浮雕', '浅雕'], answer: 0 }
  ]
};

const defaultQuestions: Question[] = [
  { id: 1, title: '非物质文化遗产的最大特点是？', options: ['活态传承', '有形', '不可再生', '不可复制'], answer: 0 },
  { id: 2, title: '中国"文化和自然遗产日"是每年的？', options: ['六月第二个星期六', '五月第一个星期一', '十月第一个星期日', '四月第三个星期六'], answer: 0 },
  { id: 3, title: '以下哪种属于传统手工艺类非遗？', options: ['陶瓷烧制', '京剧', '针灸', '剪纸'], answer: 0 },
  { id: 4, title: '非遗传承的主要方式是？', options: ['口传心授', '书本学习', '网络自学', '博物馆参观'], answer: 0 },
  { id: 5, title: '学徒制在非遗传承中的作用是？', options: ['技艺传承的核心方式', '只是历史形式', '已被取代', '不重要'], answer: 0 },
  { id: 6, title: '传统手工艺的核心价值是？', options: ['文化价值和技艺价值', '经济价值', '收藏价值', '装饰价值'], answer: 0 },
  { id: 7, title: '以下哪个是非遗保护的原则？', options: ['真实性、整体性、传承性', '快速开发', '商业化改造', '标准化生产'], answer: 0 },
  { id: 8, title: '传统手工艺作品与工业产品最大区别是？', options: ['手工制作的唯一性', '价格', '尺寸', '颜色'], answer: 0 },
  { id: 9, title: '非遗项目登记制度由哪个部门管理？', options: ['文化行政部门', '工商部门', '税务部门', '教育部门'], answer: 0 },
  { id: 10, title: '保护非遗的最终目的是？', options: ['传承和弘扬中华优秀传统文化', '经济利益', '个人荣誉', '收藏投资'], answer: 0 }
];

const ExamPage: React.FC = () => {
  const router = useRouter();
  const paramCraftName = router.params.craftName || '';
  const paramLevel = router.params.level || '中级';

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [newCertId, setNewCertId] = useState<string | null>(null);
  const [examKey, setExamKey] = useState(0);

  const examRecords = useExamRecords();

  const questions = useMemo<Question[]>(() => {
    const bank = examQuestionBank[paramCraftName];
    const baseQuestions = bank || defaultQuestions;
    return baseQuestions.map((q, idx) => ({ ...q, id: examKey * 100 + idx + 1 }));
  }, [paramCraftName, examKey]);

  const craftRecords = useMemo(() => {
    return examRecords.filter(r =>
      r.craftName === (paramCraftName || '综合技艺') &&
      r.level === paramLevel
    );
  }, [examRecords, paramCraftName, paramLevel]);

  const examTitle = paramCraftName
    ? `${paramCraftName}技艺等级考核（${paramLevel}）`
    : '非遗技艺等级考核（综合）';

  const craftName = paramCraftName || '综合技艺';
  const totalScore = 100;
  const passScore = 60;
  const duration = '60分钟';

  const handleSelectAnswer = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [questionId]: optionIndex });
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach(q => {
      const origQId = q.id % 100;
      if (answers[q.id] !== undefined) {
        const bankQ = (examQuestionBank[paramCraftName] || defaultQuestions)[origQId - 1];
        if (bankQ && answers[q.id] === bankQ.answer) {
          correctCount++;
        }
      }
    });
    return Math.round((correctCount / questions.length) * totalScore);
  };

  const handleSubmit = () => {
    if (submitted || isSubmitting) return;

    const answeredCount = Object.keys(answers).length;
    if (answeredCount < questions.length) {
      Taro.showModal({
        title: '提示',
        content: `还有${questions.length - answeredCount}道题未作答，确定提交吗？`,
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
    if (submitted || isSubmitting) return;
    setIsSubmitting(true);

    const finalScore = calculateScore();
    const isPassed = finalScore >= passScore;
    setSubmitted(true);
    setScore(finalScore);
    setPassed(isPassed);

    const record = appStore.addExamRecord({
      examTitle,
      craftName,
      level: paramLevel,
      score: finalScore,
      totalScore,
      passScore,
      passed: isPassed,
      completedAt: new Date().toISOString().split('T')[0]
    });

    if (isPassed && record.certificateId) {
      setNewCertId(record.certificateId);
    }

    setIsSubmitting(false);
    setTimeout(() => setShowResult(true), 300);
  };

  const handleCloseResult = () => {
    setShowResult(false);
    setNewCertId(null);
  };

  const handleViewCertificate = () => {
    Taro.navigateTo({ url: '/pages/certificate/index' });
  };

  const handleRetry = () => {
    setExamKey(prev => prev + 1);
    setAnswers({});
    setSubmitted(false);
    setShowResult(false);
    setScore(0);
    setPassed(false);
    setNewCertId(null);
    setIsSubmitting(false);
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / questions.length) * 100;

  const correctCount = submitted ? questions.filter(q => {
    const origQId = q.id % 100;
    const bankQ = (examQuestionBank[paramCraftName] || defaultQuestions)[origQId - 1];
    return bankQ && answers[q.id] === bankQ.answer;
  }).length : 0;
  const wrongCount = submitted ? questions.filter(q => {
    const origQId = q.id % 100;
    const bankQ = (examQuestionBank[paramCraftName] || defaultQuestions)[origQId - 1];
    return answers[q.id] !== undefined && bankQ && answers[q.id] !== bankQ.answer;
  }).length : 0;
  const unansweredCount = submitted ? questions.length - correctCount - wrongCount : 0;

  return (
    <View className={styles.page}>
      <View className={styles.examHeader}>
        <View className={styles.examInfo}>
          <Text className={styles.examTitle}>{examTitle}</Text>
          <View className={styles.examMeta}>
            <View className={styles.metaTag}>{paramLevel}</View>
            <Text className={styles.metaText}>⏱ {duration}</Text>
            <Text className={styles.metaText}>📋 {questions.length}题</Text>
            <Text className={styles.metaText}>💯 {totalScore}分</Text>
          </View>
        </View>
        <View className={styles.progressSection}>
          <View className={styles.progressInfo}>
            <Text className={styles.progressLabel}>答题进度</Text>
            <Text className={styles.progressCount}>{answeredCount}/{questions.length}</Text>
          </View>
          <View className={styles.progressBar}>
            <View className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
          </View>
        </View>
      </View>

      {craftRecords.length > 0 && (
        <View className={styles.historySection}>
          <View className={styles.historyHeader}>
            <Text className={styles.historyTitle}>📊 历史考核记录</Text>
            <Text className={styles.historyCount}>共{craftRecords.length}次</Text>
          </View>
          <ScrollView className={styles.historyScroll} scrollX>
            {craftRecords.slice(0, 5).map((record) => (
              <View
                key={record.id}
                className={classNames(
                  styles.historyCard,
                  record.passed ? styles.passed : styles.failed
                )}
              >
                <View className={styles.historyScore}>
                  <Text className={styles.historyScoreNum}>{record.score}</Text>
                  <Text className={styles.historyScoreUnit}>分</Text>
                </View>
                <View className={styles.historyStatus}>
                  <Text className={styles.historyStatusText}>
                    {record.passed ? '✓ 通过' : '✗ 未通过'}
                  </Text>
                </View>
                <Text className={styles.historyDate}>{record.completedAt}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView scrollY style={{ height: craftRecords.length > 0 ? 'calc(100vh - 560rpx)' : 'calc(100vh - 440rpx)' }}>
        <View className={styles.questionList}>
          {questions.map((q, index) => {
            const origQId = q.id % 100;
            const bankQ = (examQuestionBank[paramCraftName] || defaultQuestions)[origQId - 1];
            const userAnswer = answers[q.id];
            const isCorrect = submitted && bankQ && userAnswer === bankQ.answer;
            return (
              <View key={q.id} className={styles.questionCard}>
                <View className={styles.questionHeader}>
                  <View className={styles.questionNum}>
                    <Text>{index + 1}</Text>
                  </View>
                  <Text className={styles.questionTitle}>{q.title}</Text>
                  {submitted && (
                    <View className={classNames(
                      styles.questionResult,
                      isCorrect ? styles.correct : styles.wrong
                    )}>
                      {isCorrect ? '✓ 正确' : userAnswer !== undefined ? '✗ 错误' : '未答'}
                    </View>
                  )}
                </View>
                <View className={styles.optionsList}>
                  {q.options.map((opt, optIndex) => {
                    const isSelected = userAnswer === optIndex;
                    const isCorrectAnswer = submitted && bankQ && optIndex === bankQ.answer;
                    const isWrongSelected = submitted && isSelected && bankQ && optIndex !== bankQ.answer;
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
                {submitted && bankQ && userAnswer !== bankQ.answer && (
                  <View className={styles.answerTip}>
                    <Text className={styles.tipLabel}>正确答案：</Text>
                    <Text className={styles.tipText}>
                      {String.fromCharCode(65 + bankQ.answer)}. {bankQ.options[bankQ.answer]}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <View style={{ height: '40rpx' }} />
      </ScrollView>

      <View className={styles.submitBar}>
        <View
          className={classNames(styles.submitBtn, (submitted || isSubmitting) && styles.disabled)}
          onClick={handleSubmit}
        >
          <Text>
            {isSubmitting ? '提交中...' : submitted ? '已提交' : '提交答卷'}
          </Text>
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
            {passed && newCertId && (
              <View className={styles.certNotice}>
                <Text className={styles.certNoticeIcon}>📜</Text>
                <Text className={styles.certNoticeText}>
                  {craftName}{paramLevel}证书已生成
                </Text>
              </View>
            )}
            <View className={styles.scoreCard}>
              <View className={styles.scoreMain}>
                <Text className={styles.scoreNum}>{score}</Text>
                <Text className={styles.scoreUnit}>分</Text>
              </View>
              <Text className={styles.scorePass}>及格线 {passScore}分</Text>
            </View>
            <View className={styles.resultStats}>
              <View className={styles.statItem}>
                <Text className={styles.statNum}>{correctCount}</Text>
                <Text className={styles.statLabel}>答对</Text>
              </View>
              <View className={styles.statItem}>
                <Text className={styles.statNum}>{wrongCount}</Text>
                <Text className={styles.statLabel}>答错</Text>
              </View>
              <View className={styles.statItem}>
                <Text className={styles.statNum}>{unansweredCount}</Text>
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
