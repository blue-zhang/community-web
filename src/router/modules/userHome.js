// 我的首页
const UserHome = () => import(/* webpackChunkName: "UserHome" */'@/views/user-center/UserHome')
const MyPost = () => import(/* webpackChunkName: "MyPost" */'@/components/user-home/MyPost.vue')
const PostCollection = () => import(/* webpackChunkName: "PostCollection" */'@/components/user-home/PostCollection.vue')
const MyActivies = () => import(/* webpackChunkName: "MyActivies" */'@/components/user-home/MyActivies.vue')
const MyQuestion = () => import(/* webpackChunkName: "MyQuestion" */'@/components/user-home/MyQuestion.vue')
const MyAttention = () => import(/* webpackChunkName: "MyAttention" */'@/components/user-home/MyAttention.vue')
const Follower = () => import(/* webpackChunkName: "MyAttention" */'@/components/user-home/attention/Follower.vue')
const Following = () => import(/* webpackChunkName: "MyAttention" */'@/components/user-home/attention/Following.vue')
const CollectionDetail = () => import(/* webpackChunkName: "CollectionDetail" */'@/components/user-home/CollectionDetail.vue')

export default [
  // 用户主页
  {
    path: '/home/:uid/collection/:colId',
    name: 'UserCollection',
    component: CollectionDetail
  },
  {
    path: '/home/:uid',
    meta: { requireAuthorize: true },
    component: UserHome,
    children: [
      {
        path: '',
        name: 'UserHome',
        component: MyActivies
      },
      {
        path: '/home/:uid/post',
        name: 'UserPost',
        component: MyPost
      },
      {
        path: '/home/:uid/post/collection',
        name: 'PostCollection',
        component: PostCollection
      },
      {
        path: '/home/:uid/myAttention',
        component: MyAttention,
        children: [{
          name: 'Following',
          component: Follower,
          path: '/home/:uid/myAttention/follower'
        }, {
          name: 'MyAttention',
          component: Following,
          path: '/home/:uid/myAttention'
        }
        ]
      },
      {
        path: '/home/:uid/myQuestion',
        name: 'MyQuestion',
        component: MyQuestion
      }
    ]
  }
]
