import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Textarea, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classNames from 'classnames';
import { appStore } from '@/store/appStore';
import { useCommunityPosts } from '@/hooks/useAppStore';
import type { CommunityPost } from '@/types';

const postTags = ['全部', '景德镇陶瓷', '苏绣', '宣纸', '景泰蓝', '竹编', '木雕', '剪纸', '紫砂壶'];

const CommunityPage: React.FC = () => {
  const [activeTag, setActiveTag] = useState('全部');
  const [showPostModal, setShowPostModal] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newImages, setNewImages] = useState<string[]>([]);

  const posts = useCommunityPosts();

  const handleLike = (postId: string) => {
    appStore.updatePostLikes(postId);
  };

  const handleComment = (postId: string) => {
    Taro.showToast({ title: '评论功能', icon: 'none' });
  };

  const handleShare = (postId: string) => {
    Taro.showToast({ title: '分享功能', icon: 'none' });
  };

  const handleOpenPost = () => {
    setShowPostModal(true);
  };

  const handleClosePost = () => {
    setShowPostModal(false);
    setNewContent('');
    setNewTag('');
    setNewImages([]);
  };

  const handleSubmitPost = () => {
    if (!newContent.trim()) {
      Taro.showToast({ title: '请输入内容', icon: 'none' });
      return;
    }

    appStore.addCommunityPost({
      title: '',
      content: newContent.trim(),
      authorId: 'me',
      authorName: '非遗学员',
      authorAvatar: 'https://picsum.photos/id/1005/100/100',
      images: newImages,
      category: newTag || ''
    });

    Taro.showToast({ title: '发布成功', icon: 'success' });
    handleClosePost();
  };

  const handleAddImage = () => {
    if (newImages.length >= 9) {
      Taro.showToast({ title: '最多9张图片', icon: 'none' });
      return;
    }
    const mockImages = [
      'https://picsum.photos/id/110/400/400',
      'https://picsum.photos/id/111/400/400',
      'https://picsum.photos/id/112/400/400',
      'https://picsum.photos/id/113/400/400',
      'https://picsum.photos/id/114/400/400'
    ];
    const randomImg = mockImages[Math.floor(Math.random() * mockImages.length)];
    setNewImages([...newImages, randomImg]);
  };

  const handleRemoveImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const filteredPosts = activeTag === '全部'
    ? posts
    : posts.filter(post => post.category === activeTag);

  return (
    <View className={styles.page}>
      <View className={styles.pageHeader}>
        <View className={styles.headerContent}>
          <Text className={styles.headerTitle}>学员社群</Text>
          <Text className={styles.headerDesc}>与同道中人交流技艺心得</Text>
        </View>
        <View className={styles.postBtn} onClick={handleOpenPost}>
          <Text className={styles.postBtnIcon}>✏️</Text>
          <Text>发帖</Text>
        </View>
      </View>

      <ScrollView className={styles.tagScroll} scrollX>
        {postTags.map((tag) => (
          <View
            key={tag}
            className={classNames(styles.tagItem, activeTag === tag && styles.tagActive)}
            onClick={() => setActiveTag(tag)}
          >
            <Text>{tag}</Text>
          </View>
        ))}
      </ScrollView>

      <ScrollView scrollY style={{ height: 'calc(100vh - 280rpx)' }}>
        <View className={styles.postList}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <View key={post.id} className={styles.postCard}>
                <View className={styles.postHeader}>
                  <Image
                    className={styles.avatar}
                    src={post.authorAvatar}
                    mode="aspectFill"
                  />
                  <View className={styles.userInfo}>
                    <View className={styles.userNameRow}>
                      <Text className={styles.userName}>{post.authorName}</Text>
                      <View className={styles.levelBadge}>进阶学员</View>
                    </View>
                    <Text className={styles.postTime}>{post.createdAt}</Text>
                  </View>
                  {post.category && (
                    <View className={styles.craftTag}>
                      <Text>{post.category}</Text>
                    </View>
                  )}
                </View>

                <View className={styles.postContent}>
                  <Text className={styles.contentText}>{post.content}</Text>
                </View>

                {post.images && post.images.length > 0 && (
                  <View className={classNames(
                    styles.postImages,
                    post.images.length === 1 && styles.singleImage,
                    post.images.length === 2 && styles.twoImages,
                    post.images.length >= 4 && styles.multiImages
                  )}>
                    {post.images.map((img, index) => (
                      <View
                        key={index}
                        className={classNames(
                          styles.imageWrap,
                          post.images!.length === 1 && styles.singleWrap
                        )}
                      >
                        <Image
                          className={styles.postImage}
                          src={img}
                          mode="aspectFill"
                        />
                      </View>
                    ))}
                  </View>
                )}

                <View className={styles.postFooter}>
                  <View
                    className={classNames(styles.actionItem, post.isLiked && styles.liked)}
                    onClick={() => handleLike(post.id)}
                  >
                    <Text className={styles.actionIcon}>{post.isLiked ? '❤️' : '🤍'}</Text>
                    <Text>{post.likes}</Text>
                  </View>
                  <View className={styles.actionItem} onClick={() => handleComment(post.id)}>
                    <Text className={styles.actionIcon}>💬</Text>
                    <Text>{post.comments}</Text>
                  </View>
                  <View className={styles.actionItem} onClick={() => handleShare(post.id)}>
                    <Text className={styles.actionIcon}>↗️</Text>
                    <Text>分享</Text>
                  </View>
                </View>
              </View>
            ))
          ) : (
            <View className={styles.emptyState}>
              <Text className={styles.emptyIcon}>👥</Text>
              <Text className={styles.emptyTitle}>暂无帖子</Text>
              <Text className={styles.emptyDesc}>快来发布第一篇帖子吧</Text>
            </View>
          )}
          <View style={{ height: '40rpx' }} />
        </View>
      </ScrollView>

      <View className={styles.fabBtn} onClick={handleOpenPost}>
        <Text className={styles.fabIcon}>+</Text>
      </View>

      {showPostModal && (
        <View className={styles.modalMask} onClick={handleClosePost}>
          <View className={styles.postModal} onClick={(e) => e.stopPropagation()}>
            <View className={styles.modalHeader}>
              <Text className={styles.modalCancel} onClick={handleClosePost}>取消</Text>
              <Text className={styles.modalTitle}>发布帖子</Text>
              <View
                className={classNames(styles.modalPublish, newContent.trim() && styles.active)}
                onClick={handleSubmitPost}
              >
                <Text>发布</Text>
              </View>
            </View>

            <ScrollView scrollY style={{ height: 'calc(80vh - 100rpx)' }}>
              <View className={styles.postForm}>
                <View className={styles.formAvatarRow}>
                  <Image
                    className={styles.formAvatar}
                    src="https://picsum.photos/id/1005/100/100"
                    mode="aspectFill"
                  />
                  <View className={styles.formUserInfo}>
                    <Text className={styles.formUserName}>非遗学员</Text>
                    <View className={styles.formLevelBadge}>进阶学员</View>
                  </View>
                </View>

                <View className={styles.textareaSection}>
                  <Textarea
                    className={styles.postTextarea}
                    placeholder="分享你的技艺心得、作品、问题..."
                    placeholderTextColor="#8B7355"
                    value={newContent}
                    onInput={(e) => setNewContent(e.detail.value)}
                    maxlength={500}
                    autoHeight
                  />
                  <Text className={styles.charCount}>{newContent.length}/500</Text>
                </View>

                <View className={styles.imageSection}>
                  <View className={styles.imageGrid}>
                    {newImages.map((img, index) => (
                      <View key={index} className={styles.formImageWrap}>
                        <Image
                          className={styles.formImage}
                          src={img}
                          mode="aspectFill"
                        />
                        <View
                          className={styles.removeImgBtn}
                          onClick={() => handleRemoveImage(index)}
                        >
                          <Text>×</Text>
                        </View>
                      </View>
                    ))}
                    {newImages.length < 9 && (
                      <View className={styles.addImageBtn} onClick={handleAddImage}>
                        <Text className={styles.addIcon}>+</Text>
                        <Text className={styles.addText}>添加图片</Text>
                        <Text className={styles.addLimit}>{newImages.length}/9</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View className={styles.tagSection}>
                  <Text className={styles.sectionLabel}>选择话题（选填）</Text>
                  <View className={styles.tagGroup}>
                    {postTags.slice(1).map((tag) => (
                      <View
                        key={tag}
                        className={classNames(styles.formTag, newTag === tag && styles.tagActive)}
                        onClick={() => setNewTag(newTag === tag ? '' : tag)}
                      >
                        <Text>#{tag}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default CommunityPage;
