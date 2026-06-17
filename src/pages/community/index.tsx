import React, { useState } from 'react';
import { View, Text, Image, ScrollView, Textarea, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classNames from 'classnames';

interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userLevel: string;
  content: string;
  images?: string[];
  craftTag?: string;
  createdAt: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const initialPosts: CommunityPost[] = [
  {
    id: 'p1',
    userId: 'u1',
    userName: '陶瓷爱好者小王',
    userAvatar: 'https://picsum.photos/id/1012/100/100',
    userLevel: '进阶学员',
    content: '今天终于完成了人生第一件青花瓷作品！虽然还有很多瑕疵，但从揉泥、拉坯、修坯到绘画、上釉、烧制，每一步都充满了期待。感谢王大师的耐心指导！分享给大家看看~',
    images: [
      'https://picsum.photos/id/30/400/400',
      'https://picsum.photos/id/31/400/400',
      'https://picsum.photos/id/32/400/400'
    ],
    craftTag: '景德镇陶瓷',
    createdAt: '2小时前',
    likes: 56,
    comments: 12,
    isLiked: false
  },
  {
    id: 'p2',
    userId: 'u2',
    userName: '绣娘李姐',
    userAvatar: 'https://picsum.photos/id/1027/100/100',
    userLevel: '高级学员',
    content: '分享一个苏绣针法小技巧：绣花瓣时用戗针，从花瓣边缘向中心层层推进，颜色由深到浅渐变，这样绣出来的花朵会更有立体感。大家可以试试看！',
    craftTag: '苏绣',
    createdAt: '5小时前',
    likes: 89,
    comments: 23,
    isLiked: true
  },
  {
    id: 'p3',
    userId: 'u3',
    userName: '竹艺新人',
    userAvatar: 'https://picsum.photos/id/1025/100/100',
    userLevel: '入门学员',
    content: '刚开始学竹编，手指都被划破好几次了😭 编出来的篮子也是歪歪扭扭的。请问各位前辈，初学者有什么好的练习方法吗？',
    craftTag: '竹编',
    createdAt: '昨天',
    likes: 34,
    comments: 45,
    isLiked: false
  },
  {
    id: 'p4',
    userId: 'u4',
    userName: '剪纸张师傅',
    userAvatar: 'https://picsum.photos/id/1074/100/100',
    userLevel: '传承人',
    content: '今天教大家剪一个简单的"囍"字，步骤：1.红纸对折两次；2.画出半个喜字的轮廓；3.沿着线条剪；4.展开就是完整的囍字啦！适合婚礼装饰用~',
    images: [
      'https://picsum.photos/id/106/400/400'
    ],
    craftTag: '剪纸',
    createdAt: '2天前',
    likes: 128,
    comments: 36,
    isLiked: false
  }
];

const postTags = ['全部', '景德镇陶瓷', '苏绣', '宣纸', '景泰蓝', '竹编', '木雕', '剪纸', '紫砂壶'];

const CommunityPage: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(initialPosts);
  const [activeTag, setActiveTag] = useState('全部');
  const [showPostModal, setShowPostModal] = useState(false);
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newImages, setNewImages] = useState<string[]>([]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
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

    const newPost: CommunityPost = {
      id: 'np' + Date.now(),
      userId: 'me',
      userName: '非遗学员',
      userAvatar: 'https://picsum.photos/id/1005/100/100',
      userLevel: '进阶学员',
      content: newContent.trim(),
      images: newImages.length > 0 ? newImages : undefined,
      craftTag: newTag || undefined,
      createdAt: '刚刚',
      likes: 0,
      comments: 0,
      isLiked: false
    };

    setPosts([newPost, ...posts]);
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
    : posts.filter(post => post.craftTag === activeTag);

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
                    src={post.userAvatar}
                    mode="aspectFill"
                  />
                  <View className={styles.userInfo}>
                    <View className={styles.userNameRow}>
                      <Text className={styles.userName}>{post.userName}</Text>
                      <View className={styles.levelBadge}>{post.userLevel}</View>
                    </View>
                    <Text className={styles.postTime}>{post.createdAt}</Text>
                  </View>
                  {post.craftTag && (
                    <View className={styles.craftTag}>
                      <Text>{post.craftTag}</Text>
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
