const UserCenter = () => import(/* webpackChunkName: "UserCenter" */'@/views/UserCenter')
const UserHome = () => import(/* webpackChunkName: "UserHome" */'@/views/user-center/UserHome')
const UserIndex = () => import(/* webpackChunkName: "UserIndex" */'@/views/user-center/UserIndex')
const HeadPic = () => import(/* webpackChunkName: "HeadPic" */'@/components/user-set/HeadPic.vue')
const MyInfo = () => import(/* webpackChunkName: "MyInfo" */'@/components/user-set/MyInfo.vue')
// 用户设置页面
const UserSet = () => import(/* webpackChunkName: "UserSet" */'@/views/user-center/UserSet')
const UserSecurty = () => import(/* webpackChunkName: "UserSecurty" */'@/components/user-set/UserSecurty')

// 我的帖子
const UserPost = () => import(/* webpackChunkName: "UserPost" */'@/views/user-center/UserPost')
const MyPost = () => import(/* webpackChunkName: "MyPost" */'@/components/user-post/MyPost.vue')
const PostCollection = () => import(/* webpackChunkName: "PostCollection" */'@/components/user-post/PostCollection.vue')
const UserMessage = () => import(/* webpackChunkName: "UserMessage" */'@/views/user-center/UserMessage')
const UserOther = () => import(/* webpackChunkName: "UserOther" */'@/views/user-center/UserOther')
export default [
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
      // 用户主页
      {
        path: '/user/home',
        name: 'UserHome',
        component: UserHome
      },
      {
        path: '/user/Message',
        name: 'UserMessage',
        component: UserMessage
      },
      {
        path: '/user/post',
        component: UserPost,
        children: [
          {
            path: '',
            name: 'MyPost',
            component: MyPost
          },
          {
            path: '/user/post/collection',
            name: 'PostCollection',
            component: PostCollection
          }
        ]
      },
      {
        path: '/user/other',
        name: 'UserOther',
        component: UserOther
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
