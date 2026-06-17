import React, { useState } from 'react';
import { View, Text, Input, Textarea, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classNames from 'classnames';
import { craftList } from '@/data/crafts';

const WorkUploadPage: React.FC = () => {
  const [images, setImages] = useState<string[]>([
    'https://picsum.photos/id/225/400/400'
  ]);
  const [title, setTitle] = useState('');
  const [selectedCraftId, setSelectedCraftId] = useState('');
  const [description, setDescription] = useState('');
  const [isForSale, setIsForSale] = useState(false);
  const [price, setPrice] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const craftOptions = craftList.map(c => ({ id: c.id, name: c.name }));

  const handleAddImage = () => {
    const newId = Math.floor(Math.random() * 1000);
    setImages([...images, `https://picsum.photos/id/${newId % 100 + 200}/400/400`]);
    Taro.showToast({ title: '添加图片', icon: 'none' });
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (images.length === 0) {
      Taro.showToast({ title: '请上传作品图片', icon: 'none' });
      return;
    }
    if (!title.trim()) {
      Taro.showToast({ title: '请填写作品名称', icon: 'none' });
      return;
    }
    if (!selectedCraftId) {
      Taro.showToast({ title: '请选择技艺类别', icon: 'none' });
      return;
    }
    if (!description.trim()) {
      Taro.showToast({ title: '请填写作品描述', icon: 'none' });
      return;
    }
    if (isForSale && (!price || Number(price) <= 0)) {
      Taro.showToast({ title: '请填写有效价格', icon: 'none' });
      return;
    }

    console.log('[WorkUpload] 提交作品:', {
      images, title, craftId: selectedCraftId, description, isForSale, price
    });

    setShowSuccess(true);
  };

  const handleGoWorks = () => {
    setShowSuccess(false);
    Taro.switchTab({ url: '/pages/works/index' });
  };

  const handleContinue = () => {
    setShowSuccess(false);
    setImages([]);
    setTitle('');
    setSelectedCraftId('');
    setDescription('');
    setIsForSale(false);
    setPrice('');
  };

  return (
    <View className={styles.page}>
      <View className={styles.formCard}>
        <View className={styles.formGroup}>
          <Text className={styles.label}>
            <Text className={styles.required}>*</Text>作品图片（最多9张）
          </Text>
          <View className={styles.uploadArea}>
            {images.map((img, index) => (
              <View key={index} className={styles.imageItem}>
                <Image className={styles.image} src={img} mode="aspectFill" />
                <View className={styles.removeBtn} onClick={() => handleRemoveImage(index)}>×</View>
              </View>
            ))}
            {images.length < 9 && (
              <View className={styles.uploadItem} onClick={handleAddImage}>
                <Text className={styles.icon}>+</Text>
                <Text className={styles.text}>添加图片</Text>
              </View>
            )}
          </View>
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.label}>
            <Text className={styles.required}>*</Text>作品名称
          </Text>
          <View className={styles.inputWrap}>
            <Input
              className={styles.input}
              placeholder="请输入作品名称"
              placeholderTextColor="#B8A89A"
              value={title}
              onInput={(e) => setTitle(e.detail.value)}
              maxlength={30}
            />
          </View>
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.label}>
            <Text className={styles.required}>*</Text>技艺类别
          </Text>
          <View className={styles.selectWrap}>
            <View className={styles.selectOptions}>
              {craftOptions.map((c) => (
                <View
                  key={c.id}
                  className={classNames(styles.optionItem, selectedCraftId === c.id && styles.active)}
                  onClick={() => setSelectedCraftId(c.id)}
                >
                  {c.name}
                </View>
              ))}
            </View>
          </View>
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.label}>
            <Text className={styles.required}>*</Text>作品描述
          </Text>
          <View className={styles.textAreaWrap}>
            <Textarea
              className={styles.textArea}
              placeholder="请详细描述作品的创作灵感、工艺特点、尺寸规格等信息..."
              placeholderTextColor="#B8A89A"
              value={description}
              onInput={(e) => setDescription(e.detail.value)}
              maxlength={500}
            />
          </View>
          <Text className={styles.wordCount}>{description.length}/500</Text>
        </View>

        <View className={styles.formGroup}>
          <Text className={styles.label}>作品义卖</Text>
          <View className={styles.switchRow} onClick={() => setIsForSale(!isForSale)}>
            <View>
              <Text className={styles.label}>参与作品义卖</Text>
              <View className={styles.desc}>开启后其他用户可购买您的作品</View>
            </View>
            <View className={classNames(styles.switchWrap, isForSale && styles.active)} />
          </View>
          {isForSale && (
            <View style={{ marginTop: 16 }} className={styles.priceRow}>
              <Text className={styles.symbol}>¥</Text>
              <Input
                className={styles.priceInput}
                type="digit"
                placeholder="请输入售价"
                placeholderTextColor="#B8A89A"
                value={price}
                onInput={(e) => setPrice(e.detail.value)}
              />
              <Text style={{ fontSize: 24, color: '#8B7355' }}>元</Text>
            </View>
          )}
        </View>

        <View className={styles.submitBtn} onClick={handleSubmit}>
          提交作品
        </View>
      </View>

      {showSuccess && (
        <View className={styles.successModal}>
          <View className={styles.modalContent}>
            <View className={styles.icon}>✓</View>
            <Text className={styles.title}>提交成功</Text>
            <Text className={styles.desc}>
              作品已成功提交！等待传承人点评审核后将在作品广场展示~
            </Text>
            <View className={styles.actions}>
              <View className={classNames(styles.btn, styles.secondary)} onClick={handleContinue}>
                继续上传
              </View>
              <View className={classNames(styles.btn, styles.primary)} onClick={handleGoWorks}>
                查看作品
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default WorkUploadPage;
