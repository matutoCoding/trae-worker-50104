export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/course/index',
    'pages/works/index',
    'pages/mine/index',
    'pages/craft-detail/index',
    'pages/lineage/index',
    'pages/course-detail/index',
    'pages/video-lesson/index',
    'pages/practice/index',
    'pages/work-detail/index',
    'pages/work-upload/index',
    'pages/exam/index',
    'pages/certificate/index',
    'pages/custom-order/index',
    'pages/master-detail/index',
    'pages/community/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#B85C38',
    navigationBarTitleText: '非遗工坊',
    navigationBarTextStyle: 'white',
    backgroundColor: '#FAF6F0'
  },
  tabBar: {
    color: '#8B7355',
    selectedColor: '#B85C38',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/course/index',
        text: '课程'
      },
      {
        pagePath: 'pages/works/index',
        text: '作品'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
