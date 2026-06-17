import React, { useState } from 'react';
import { View, Text, Input, Textarea, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classNames from 'classnames';
import { appStore } from '@/store/appStore';
import { useCustomOrders } from '@/hooks/useAppStore';
import type { CustomOrder } from '@/types';

const craftOptions = ['景德镇陶瓷', '苏绣', '宣纸', '景泰蓝', '竹编', '木雕', '剪纸', '紫砂壶'];

const budgetOptions = [
  { label: '1000元以下', value: '1000以下', range: '1000元以下' },
  { label: '1000-3000元', value: '1000-3000', range: '1000-3000元' },
  { label: '3000-5000元', value: '3000-5000', range: '3000-5000元' },
  { label: '5000-10000元', value: '5000-10000', range: '5000-10000元' },
  { label: '10000元以上', value: '10000以上', range: '10000元以上' }
];

const statusMap: Record<string, { label: string; className: string }> = {
  pending: { label: '待确认', className: 'pending' },
  quoted: { label: '已报价', className: 'quoted' },
  in_progress: { label: '制作中', className: 'progress' },
  completed: { label: '已完成', className: 'completed' },
  cancelled: { label: '已取消', className: 'cancelled' }
};

const CustomOrderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'list'>('new');
  const [craftName, setCraftName] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [deadline, setDeadline] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [newOrderNo, setNewOrderNo] = useState('');

  const orders = useCustomOrders();

  const handleSelectBudget = (opt: { label: string; value: string; range: string }) => {
    setBudget(opt.value);
    setBudgetRange(opt.range);
  };

  const handleSubmit = () => {
    if (!craftName) {
      Taro.showToast({ title: '请选择技艺类别', icon: 'none' });
      return;
    }
    if (!description.trim()) {
      Taro.showToast({ title: '请填写定制需求', icon: 'none' });
      return;
    }
    if (!contactPhone) {
      Taro.showToast({ title: '请填写联系电话', icon: 'none' });
      return;
    }

    const orderNo = 'DZ' + Date.now().toString().slice(-10);
    const budgetValue = budget ? Number(budget.replace(/[^0-9]/g, '').split('-')[1] || budget.replace(/[^0-9]/g, '')) : 0;

    appStore.addCustomOrder({
      orderNo,
      craftName,
      description: description.trim(),
      budget: budgetValue,
      budgetRange: budgetRange || '面议',
      deadline: deadline || '待定'
    });

    setNewOrderNo(orderNo);
    setShowSuccess(true);

    setCraftName('');
    setDescription('');
    setBudget('');
    setBudgetRange('');
    setDeadline('');
    setContactName('');
    setContactPhone('');
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setActiveTab('list');
  };

  const handleViewOrder = (order: CustomOrder) => {
    Taro.showModal({
      title: `订单 ${order.orderNo}`,
      content: `技艺：${order.craftName}\n需求：${order.description}\n预算：${order.budgetRange || order.budget + '元'}\n截止：${order.deadline}\n状态：${statusMap[order.status]?.label || order.status}`,
      showCancel: false
    });
  };

  return (
    <View className={styles.page}>
      <View className={styles.tabBar}>
        <View
          className={classNames(styles.tabItem, activeTab === 'new' && styles.active)}
          onClick={() => setActiveTab('new')}
        >
          <Text className={styles.tabIcon}>✏️</Text>
          <Text>发布定制</Text>
        </View>
        <View
          className={classNames(styles.tabItem, activeTab === 'list' && styles.active)}
          onClick={() => setActiveTab('list')}
        >
          <Text className={styles.tabIcon}>📋</Text>
          <Text>我的订单</Text>
          {orders.length > 0 && <View className={styles.tabBadge}>{orders.length}</View>}
        </View>
      </View>

      {activeTab === 'new' ? (
        <ScrollView scrollY style={{ height: 'calc(100vh - 200rpx)' }}>
          <View className={styles.formSection}>
            <View className={styles.sectionCard}>
              <Text className={styles.sectionTitle}>🎯 定制信息</Text>

              <View className={styles.formItem}>
                <Text className={styles.formLabel}>技艺类别 <Text className={styles.required}>*</Text></Text>
                <View className={styles.tagGroup}>
                  {craftOptions.map((craft) => (
                    <View
                      key={craft}
                      className={classNames(styles.tagItem, craftName === craft && styles.tagActive)}
                      onClick={() => setCraftName(craft)}
                    >
                      <Text>{craft}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className={styles.formItem}>
                <Text className={styles.formLabel}>定制需求 <Text className={styles.required}>*</Text></Text>
                <View className={styles.textareaWrap}>
                  <Textarea
                    className={styles.textarea}
                    placeholder="请详细描述您的定制需求，如：作品类型、尺寸、风格、用途、特殊要求等..."
                    placeholderTextColor="#8B7355"
                    value={description}
                    onInput={(e) => setDescription(e.detail.value)}
                    maxlength={500}
                    autoHeight
                  />
                </View>
                <Text className={styles.charCount}>{description.length}/500</Text>
              </View>

              <View className={styles.formItem}>
                <Text className={styles.formLabel}>参考图片</Text>
                <View className={styles.uploadGroup}>
                  <View className={styles.uploadItem}>
                    <Text className={styles.uploadIcon}>+</Text>
                    <Text className={styles.uploadText}>添加图片</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className={styles.sectionCard}>
              <Text className={styles.sectionTitle}>💰 预算与时间</Text>

              <View className={styles.formItem}>
                <Text className={styles.formLabel}>预算范围</Text>
                <View className={styles.tagGroup}>
                  {budgetOptions.map((opt) => (
                    <View
                      key={opt.value}
                      className={classNames(styles.tagItem, styles.tagSmall, budget === opt.value && styles.tagActive)}
                      onClick={() => handleSelectBudget(opt)}
                    >
                      <Text>{opt.label}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View className={styles.formItem}>
                <Text className={styles.formLabel}>期望截止日期</Text>
                <View className={styles.inputWrap}>
                  <Input
                    className={styles.input}
                    placeholder="例如：2026-08-30（选填）"
                    placeholderTextColor="#8B7355"
                    value={deadline}
                    onInput={(e) => setDeadline(e.detail.value)}
                  />
                </View>
              </View>
            </View>

            <View className={styles.sectionCard}>
              <Text className={styles.sectionTitle}>📞 联系方式</Text>

              <View className={styles.formItem}>
                <Text className={styles.formLabel}>联系人</Text>
                <View className={styles.inputWrap}>
                  <Input
                    className={styles.input}
                    placeholder="请输入联系人姓名（选填）"
                    placeholderTextColor="#8B7355"
                    value={contactName}
                    onInput={(e) => setContactName(e.detail.value)}
                  />
                </View>
              </View>

              <View className={styles.formItem}>
                <Text className={styles.formLabel}>联系电话 <Text className={styles.required}>*</Text></Text>
                <View className={styles.inputWrap}>
                  <Input
                    className={styles.input}
                    type="number"
                    placeholder="请输入手机号码"
                    placeholderTextColor="#8B7355"
                    value={contactPhone}
                    onInput={(e) => setContactPhone(e.detail.value)}
                  />
                </View>
              </View>
            </View>

            <View className={styles.tipCard}>
              <Text className={styles.tipIcon}>💡</Text>
              <View className={styles.tipContent}>
                <Text className={styles.tipTitle}>温馨提示</Text>
                <Text className={styles.tipText}>提交后，传承人将在24小时内与您联系确认需求细节，确认报价后开始制作。</Text>
              </View>
            </View>

            <View className={styles.submitBar}>
              <View className={styles.submitBtn} onClick={handleSubmit}>
                <Text>提交定制需求</Text>
              </View>
            </View>

            <View style={{ height: '40rpx' }} />
          </View>
        </ScrollView>
      ) : (
        <ScrollView scrollY style={{ height: 'calc(100vh - 200rpx)' }}>
          <View className={styles.orderList}>
            {orders.length > 0 ? (
              orders.map((order) => (
                <View key={order.id} className={styles.orderCard} onClick={() => handleViewOrder(order)}>
                  <View className={styles.orderHeader}>
                    <View className={styles.orderNo}>
                      <Text className={styles.orderNoLabel}>订单号</Text>
                      <Text className={styles.orderNoValue}>{order.orderNo}</Text>
                    </View>
                    <View className={classNames(styles.orderStatus, styles[statusMap[order.status]?.className || ''])}>
                      <Text>{statusMap[order.status]?.label || order.status}</Text>
                    </View>
                  </View>

                  <View className={styles.orderBody}>
                    <View className={styles.orderCraft}>
                      <Text className={styles.craftIcon}>🎨</Text>
                      <Text className={styles.craftName}>{order.craftName}</Text>
                    </View>
                    <Text className={styles.orderDesc}>
                      {order.description.length > 50 ? order.description.slice(0, 50) + '...' : order.description}
                    </Text>
                    <View className={styles.orderMeta}>
                      <View className={styles.metaItem}>
                        <Text className={styles.metaIcon}>💰</Text>
                        <Text>预算 {order.budgetRange || order.budget + '元'}</Text>
                      </View>
                      <View className={styles.metaItem}>
                        <Text className={styles.metaIcon}>⏰</Text>
                        <Text>截止 {order.deadline}</Text>
                      </View>
                    </View>
                  </View>

                  <View className={styles.orderFooter}>
                    <Text className={styles.orderDate}>{order.createdAt} 提交</Text>
                    <View className={styles.orderActions}>
                      <View className={styles.actionBtn}>查看详情</View>
                      {order.status === 'pending' && (
                        <View className={classNames(styles.actionBtn, styles.primary)}>联系传承人</View>
                      )}
                      {order.status === 'quoted' && (
                        <View className={classNames(styles.actionBtn, styles.primary)}>确认报价</View>
                      )}
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View className={styles.emptyState}>
                <Text className={styles.emptyIcon}>📦</Text>
                <Text className={styles.emptyTitle}>暂无定制订单</Text>
                <Text className={styles.emptyDesc}>发布您的第一个定制需求吧</Text>
                <View className={styles.emptyBtn} onClick={() => setActiveTab('new')}>
                  <Text>去定制</Text>
                </View>
              </View>
            )}
          </View>
          <View style={{ height: '40rpx' }} />
        </ScrollView>
      )}

      {showSuccess && (
        <View className={styles.modalMask} onClick={handleCloseSuccess}>
          <View className={styles.successModal} onClick={(e) => e.stopPropagation()}>
            <View className={styles.successIcon}>🎉</View>
            <Text className={styles.successTitle}>提交成功！</Text>
            <Text className={styles.successDesc}>您的定制需求已提交</Text>
            <View className={styles.successOrder}>
              <Text className={styles.successOrderLabel}>订单号</Text>
              <Text className={styles.successOrderNo}>{newOrderNo}</Text>
            </View>
            <Text className={styles.successTip}>传承人将在24小时内与您联系</Text>
            <View className={styles.successActions}>
              <View className={styles.successSecondaryBtn} onClick={handleCloseSuccess}>
                <Text>查看我的订单</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CustomOrderPage;
