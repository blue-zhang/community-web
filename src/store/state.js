export default {
  showFooter: true,
  sid: '',
  userInfo: {},
  isLogin: false,
  token: '',
  refreshToken: '',
  centerLists: [
    {
      title: '我的主页',
      name: 'UserHome',
      class: 'home-ul'
    },
    {
      title: '用户中心',
      name: 'UserIndex'
    },
    {
      title: '基本设置',
      name: 'MyInfo',
      activeClass: 'layui-this'
    },
    {
      title: '我的帖子',
      name: 'MyPost',
      activeClass: 'layui-this'
    },
    {
      title: '我的消息',
      name: 'UserMessage'
    },
    {
      title: '其他设置',
      name: 'UserOther'
    }
  ],
  // ProgressBar的信息
  barLists: [
    {
      name: '用户验证',
      complete: false,
      routerName: 'PwdVerify'
    },
    {
      name: '修改绑定邮箱',
      complete: false,
      routerName: ''
    },
    {
      name: '修改成功',
      complete: false,
      routerName: ''
    }
  ]
}
