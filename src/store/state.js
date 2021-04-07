export default {
  // 是否显示 Footer 组件
  showFooter: true,
  // 图像验证码的 sid
  sid: '',
  // 用户基本信息
  userInfo: {},
  // 是否登录
  isLogin: false,
  // token
  token: '',
  // refreshToken
  refreshToken: '',
  // 当前AddEditor路由下的编辑内容
  post: {
    content: '',
    title: '',
    picUrl: '',
    pid: ''
  },
  comments: '',
  msg: '',
  // 该用户客户端 ws 对象
  ws: null,
  // 消息未读数
  unreadNum: {
    postHand: 0,
    comHand: 0,
    postCom: 0,
    comReply: 0
  },
  // 私信未读数
  chatNum: 0,
  chatMes: [],
  // 和某个人具体的对话消息
  mesLs: [],
  receiver: ''
}
