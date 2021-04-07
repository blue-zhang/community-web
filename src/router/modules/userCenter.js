const UserCenter = () => import(/* webpackChunkName: "UserCenter" */'@/views/UserCenter')
const UserIndex = () => import(/* webpackChunkName: "UserIndex" */'@/views/user-center/UserIndex')
const HeadPic = () => import(/* webpackChunkName: "HeadPic" */'@/components/user-set/HeadPic.vue')
const MyInfo = () => import(/* webpackChunkName: "MyInfo" */'@/components/user-set/MyInfo.vue')
// 用户设置页面
const UserSet = () => import(/* webpackChunkName: "UserSet" */'@/views/user-center/UserSet')
const UserSecurty = () => import(/* webpackChunkName: "UserSecurty" */'@/components/user-set/UserSecurty')

const UserMessage = () => import(/* webpackChunkName: "UserMessage" */'@/views/user-center/UserMessage')
const UserPraise = () => import(/* webpackChunkName: "UserPraise" */'@/views/user-center/UserPraise')
const CommentPraise = () => import(/* webpackChunkName: "CommentPraise" */'@/components/user-message/CommentPraise')
const PostPraise = () => import(/* webpackChunkName: "UserPraise" */'@/components/user-message/PostPraise')
const ReplyMessage = () => import(/* webpackChunkName: "ReplyMessage" */'@/components/user-message/ReplyMessage')
const PostComment = () => import(/* webpackChunkName: "UserMessage" */'@/components/user-message/PostComment')
const UserOther = () => import(/* webpackChunkName: "UserOther" */'@/views/user-center/UserOther')
const MyChat = () => import(/* webpackChunkName: "MyChat" */'@/views/user-center/MyChat.vue')
const ChatMes = () => import(/* webpackChunkName: "ChatMes" */'@/views/user-center/ChatMes.vue')

export default [
  // 用户中心
  {
    path: '/user',
    component: UserCenter,
    meta: { requireAuthorize: true },
    children: [
      // 用户设置
      {
        path: '',
        name: 'UserIndex',
        component: UserIndex
      },
      {
        path: '/user/message',
        component: UserMessage,
        children: [
          {
            path: '',
            name: 'UserMessage',
            component: ReplyMessage
          },
          {
            path: '/user/message/comment',
            name: 'PostComment',
            component: PostComment
          }
        ]
      },
      {
        path: '/user/praise',
        component: UserPraise,
        children: [
          {
            path: '',
            name: 'PostPraise',
            component: PostPraise
          },
          {
            path: '/user/praise/comment',
            name: 'CommentPraise',
            component: CommentPraise
          }
        ]
      },
      {
        path: '/user/other',
        name: 'UserOther',
        component: UserOther
      },
      {
        path: '/user/myChat',
        component: MyChat,
        name: 'MyChat',
        children: [{
          name: 'ChatMes',
          path: '/user/myChat/:receiver',
          component: ChatMes
        }]
      },
      {
        path: '/user/set',
        component: UserSet,
        children: [
          {
            path: '',
            name: 'MyInfo',
            component: MyInfo
          },
          {
            path: '/user/set/account',
            component: UserSecurty,
            name: 'UserSecurty'
          },
          // 点击跳转到新的页面，accountBar跳转到user/set/外面，让其不显示用户中心的横向panel
          {
            path: '/user/set/head',
            name: 'HeadPic',
            component: HeadPic
          }
        ]
      }
    ]
  }

]
