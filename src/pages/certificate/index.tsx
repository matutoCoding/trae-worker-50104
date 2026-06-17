import React, { useState, useMemo } from 'react';
import { View, Text, Image, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import classNames from 'classnames';
import { useCertificates } from '@/hooks/useAppStore';

const CertificatePage: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const certificates = useCertificates();

  const stats = useMemo(() => {
    const primaryCount = certificates.filter(c => c.level === '初级').length;
    const middleCount = certificates.filter(c => c.level === '中级').length;
    const highCount = certificates.filter(c => c.level === '高级').length;
    return { primaryCount, middleCount, highCount };
  }, [certificates]);

  const handleViewDetail = (index: number) => {
    setSelectedCert(index);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  const handleDownload = () => {
    Taro.showToast({ title: '证书已保存到相册', icon: 'success' });
  };

  const handleShare = () => {
    Taro.showToast({ title: '分享功能', icon: 'none' });
  };

  const handleVerify = () => {
    Taro.showToast({ title: '证书已验证，真实有效', icon: 'success' });
  };

  return (
    <View className={styles.page}>
      <View className={styles.pageHeader}>
        <Text className={styles.headerTitle}>我的证书</Text>
        <Text className={styles.headerDesc}>技艺传承的见证与荣誉</Text>
        <View className={styles.statsBar}>
          <View className={styles.statItem}>
            <Text className={styles.statNum}>{certificates.length}</Text>
            <Text className={styles.statLabel}>已获得</Text>
          </View>
          <View className={styles.divider} />
          <View className={styles.statItem}>
            <Text className={styles.statNum}>{stats.primaryCount}</Text>
            <Text className={styles.statLabel}>初级</Text>
          </View>
          <View className={styles.divider} />
          <View className={styles.statItem}>
            <Text className={styles.statNum}>{stats.middleCount}</Text>
            <Text className={styles.statLabel}>中级</Text>
          </View>
          <View className={styles.divider} />
          <View className={styles.statItem}>
            <Text className={styles.statNum}>{stats.highCount}</Text>
            <Text className={styles.statLabel}>高级</Text>
          </View>
        </View>
      </View>

      <ScrollView scrollY style={{ height: 'calc(100vh - 360rpx)' }}>
        <View className={styles.certList}>
          {certificates.map((cert, index) => (
            <View
              key={cert.id}
              className={styles.certCard}
              onClick={() => handleViewDetail(index)}
            >
              <View className={styles.certBorder}>
                <View className={styles.certInner}>
                  <View className={styles.certCornerTL} />
                  <View className={styles.certCornerTR} />
                  <View className={styles.certCornerBL} />
                  <View className={styles.certCornerBR} />

                  <View className={styles.certHeader}>
                    <View className={styles.sealIcon}>🏛️</View>
                    <View className={styles.certHeaderText}>
                      <Text className={styles.certOrg}>非遗技艺传承认证中心</Text>
                      <Text className={styles.certSubtitle}>INTANGIBLE CULTURAL HERITAGE</Text>
                    </View>
                  </View>

                  <View className={styles.certTitle}>
                    <Text className={styles.certTitleText}>{cert.title}</Text>
                  </View>

                  <View className={styles.certDivider}>
                    <View className={styles.dividerLine} />
                    <View className={styles.dividerDiamond} />
                    <View className={styles.dividerLine} />
                  </View>

                  <View className={styles.certBody}>
                    <View className={styles.certRow}>
                      <Text className={styles.certLabel}>持证人</Text>
                      <Text className={styles.certValue}>非遗学员</Text>
                    </View>
                    <View className={styles.certRow}>
                      <Text className={styles.certLabel}>技艺类别</Text>
                      <Text className={styles.certValue}>{cert.craftName}</Text>
                    </View>
                    <View className={styles.certRow}>
                      <Text className={styles.certLabel}>等级</Text>
                      <View className={styles.levelTag}>{cert.level}</View>
                    </View>
                    <View className={styles.certRow}>
                      <Text className={styles.certLabel}>指导老师</Text>
                      <Text className={styles.certValue}>{cert.masterName}</Text>
                    </View>
                  </View>

                  <View className={styles.certFooter}>
                    <View className={styles.certFooterLeft}>
                      <Text className={styles.certDateLabel}>发证日期</Text>
                      <Text className={styles.certDate}>{cert.issueDate}</Text>
                    </View>
                    <View className={styles.certSeal}>
                      <Text>📜</Text>
                    </View>
                    <View className={styles.certFooterRight}>
                      <Text className={styles.certNoLabel}>证书编号</Text>
                      <Text className={styles.certNo}>{cert.certificateNo}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className={styles.certActions}>
                <View className={styles.actionBtn} onClick={(e) => { e.stopPropagation(); handleViewDetail(index); }}>
                  <Text>查看详情</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {certificates.length === 0 && (
          <View className={styles.emptyState}>
            <Text className={styles.emptyIcon}>📜</Text>
            <Text className={styles.emptyTitle}>暂无证书</Text>
            <Text className={styles.emptyDesc}>完成课程学习并通过考核即可获得证书</Text>
            <View className={styles.emptyBtn} onClick={() => Taro.switchTab({ url: '/pages/course/index' })}>
              <Text>去学习</Text>
            </View>
          </View>
        )}

        <View style={{ height: '60rpx' }} />
      </ScrollView>

      {showDetail && selectedCert !== null && (
        <View className={styles.modalMask} onClick={handleCloseDetail}>
          <View className={styles.detailModal} onClick={(e) => e.stopPropagation()}>
            <View className={styles.detailCert}>
              <View className={styles.detailCertBorder}>
                <View className={styles.detailCertInner}>
                  <View className={styles.detailCornerTL} />
                  <View className={styles.detailCornerTR} />
                  <View className={styles.detailCornerBL} />
                  <View className={styles.detailCornerBR} />

                  <View className={styles.detailCertHeader}>
                    <View className={styles.detailSealIcon}>🏛️</View>
                    <Text className={styles.detailCertOrg}>非遗技艺传承认证中心</Text>
                    <Text className={styles.detailCertSubtitle}>CERTIFICATE OF ACHIEVEMENT</Text>
                  </View>

                  <View className={styles.detailCertTitle}>
                    <Text className={styles.detailCertTitleText}>{certificates[selectedCert].title}</Text>
                  </View>

                  <View className={styles.detailCertDivider}>
                    <View className={styles.detailDividerLine} />
                    <View className={styles.detailDividerDiamond} />
                    <View className={styles.detailDividerLine} />
                  </View>

                  <View className={styles.detailCertBody}>
                    <Text className={styles.detailCertIntro}>兹证明</Text>
                    <Text className={styles.detailCertName}>非遗学员</Text>
                    <Text className={styles.detailCertDesc}>
                      已完成{certificates[selectedCert].craftName}技艺{certificates[selectedCert].level}课程学习，
                      并通过等级考核，特发此证。
                    </Text>
                  </View>

                  <View className={styles.detailCertInfo}>
                    <View className={styles.infoCol}>
                      <Text className={styles.infoLabel}>技艺类别</Text>
                      <Text className={styles.infoValue}>{certificates[selectedCert].craftName}</Text>
                    </View>
                    <View className={styles.infoCol}>
                      <Text className={styles.infoLabel}>等级</Text>
                      <Text className={styles.infoValue}>{certificates[selectedCert].level}</Text>
                    </View>
                    <View className={styles.infoCol}>
                      <Text className={styles.infoLabel}>指导老师</Text>
                      <Text className={styles.infoValue}>{certificates[selectedCert].masterName}</Text>
                    </View>
                  </View>

                  <View className={styles.detailCertFooter}>
                    <View className={styles.detailFooterLeft}>
                      <Text className={styles.detailDateLabel}>发证日期</Text>
                      <Text className={styles.detailDate}>{certificates[selectedCert].issueDate}</Text>
                    </View>
                    <View className={styles.detailCertStamp}>
                      <View className={styles.stampCircle}>
                        <Text className={styles.stampText}>认证</Text>
                      </View>
                    </View>
                    <View className={styles.detailFooterRight}>
                      <Text className={styles.detailNoLabel}>证书编号</Text>
                      <Text className={styles.detailNo}>{certificates[selectedCert].certificateNo}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View className={styles.detailActions}>
              <View className={styles.detailSecondaryBtn} onClick={handleVerify}>
                <Text>🔍 验证证书</Text>
              </View>
              <View className={styles.detailSecondaryBtn} onClick={handleDownload}>
                <Text>💾 下载证书</Text>
              </View>
              <View className={styles.detailPrimaryBtn} onClick={handleShare}>
                <Text>分享</Text>
              </View>
            </View>

            <View className={styles.detailClose} onClick={handleCloseDetail}>
              <Text>关闭</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CertificatePage;
