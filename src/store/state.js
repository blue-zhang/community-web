export default {
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
  setLists: [
    {
      title: '修改资料',
      name: 'MyInfo'
    },
    {
      title: '上传头像',
      name: 'HeadPic'

    },
    {
      title: '密码设置',
      name: 'ChangePwd'
    },
    {
      title: '账号绑定',
      name: 'AccountBind'

    }
  ]
}