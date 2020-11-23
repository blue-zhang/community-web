import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'
import { getRefresh } from './api/refresh'

const Login = () => import(/* webpackChunkName: "Login" */'./views/Login')// 路由懒加载
const Reg = () => import(/* webpackChunkName: "Reg" */'./views/Reg')
const Forget = () => import(/* webpackChunkName: "Forget" */'./views/forgetPwd/Forget')
const Reset = () => import(/* webpackChunkName: "Forget" */'./views/forgetPwd/Reset')
const Succ = () => import(/* webpackChunkName: "Forget" */'./views/forgetPwd/Succ')
const Home = () => import(/* webpackChunkName: "Home" */'./views/Home')
const HomeChannel = () => import(/* webpackChunkName: "HomeChannel" */'./views/channels/HomeChannel')
const HomeIndex = () => import(/* webpackChunkName: "HomeIndex" */'./views/channels/HomeIndex')
const UserCenter = () => import(/* webpackChunkName: "UserCenter" */'./views/UserCenter')
const UserHome = () => import(/* webpackChunkName: "UserHome" */'./views/user-center/UserHome')
const UserIndex = () => import(/* webpackChunkName: "UserIndex" */'./views/user-center/UserIndex')
const HeadPic = () => import(/* webpackChunkName: "HeadPic" */'./components/user-set/HeadPic.vue')
const MyInfo = () => import(/* webpackChunkName: "MyInfo" */'./components/user-set/MyInfo.vue')
// 用户设置页面
const UserSet = () => import(/* webpackChunkName: "UserSet" */'./views/user-center/UserSet')
const UserSecurty = () => import(/* webpackChunkName: "UserSecurty" */'./components/user-set/UserSecurty')
const AccountBar = () => import(/* webpackChunkName: "AccountBar" */'./components/user-set/accountBind/AccountBar.vue')
const PwdVerify = () => import(/* webpackChunkName: "PwdVerify" */'./components/user-set/accountBind/PwdVerify.vue')
const OtherVerify = () => import(/* webpackChunkName: "OtherVerify" */'./components/user-set/accountBind/OtherVerify.vue')
const EmailChange = () => import(/* webpackChunkName: "EmailChange" */'./components/user-set/accountBind/EmailChange.vue')
const PwdChange = () => import(/* webpackChunkName: "PwdChange" */'./components/user-set/accountBind/PwdChange.vue')
const ChangeSucc = () => import(/* webpackChunkName: "ChangeSucc" */'./components/user-set/accountBind/ChangeSucc.vue')
// 我的帖子
const UserPost = () => import(/* webpackChunkName: "UserPost" */'./views/user-center/UserPost')
const MyPost = () => import(/* webpackChunkName: "MyPost" */'./components/user-post/MyPost.vue')
const PostCollection = () => import(/* webpackChunkName: "PostCollection" */'./components/user-post/PostCollection.vue')
const UserMessage = () => import(/* webpackChunkName: "UserMessage" */'./views/user-center/UserMessage')
const UserOther = () => import(/* webpackChunkName: "UserOther" */'./views/user-center/UserOther')
const NotFound = () => import(/* webpackChunkName: "NotFound" */'./views/NotFound')
// 帖子编辑页面
const Add = () => import(/* webpackChunkName: "Add" */'@/components/content/Add')
const AddDrafts = () => import(/* webpackChunkName: "AddDrafts" */'@/components/content/AddDrafts')

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/index/:catalog',
          name: 'channel',
          component: HomeChannel
        },
        {
          path: '/index',
          name: 'index',
          component: HomeIndex
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg,
      beforeEnter: (to, from, next) => {
        if (from.path === '/login' || from.path === '/') {
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    },
    {
      name: 'Reset',
      path: '/forget/reset',
      component: Reset
    },
    {
      name: 'Succ',
      path: '/forget/succ',
      component: Succ
    },
    {
      name: 'Add',
      path: '/add',
      component: Add,
      meta: { requireAuthorize: true }
    },
    {
      name: 'AddDrafts',
      path: '/drafts',
      component: AddDrafts,
      meta: { requireAuthorize: true }
    },
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
            // 点击跳转到新的页面，accountBar跳转到user/set/外面，让其不显示上面横向的panel
            {
              path: '/user/set/head',
              name: 'HeadPic',
              component: HeadPic
            }
          ]
        }
      ]
    },
    // 修改账号路由
    {
      path: '/user/accountBar',
      component: AccountBar,
      children: [
        {
          path: '',
          name: 'PwdVerify',
          component: PwdVerify
        },
        {
          path: '/user/accountBar/otherVerify',
          name: 'OtherVerify',
          component: OtherVerify
        },
        {
          path: '/user/accountBar/changeEmail',
          name: 'EmailChange',
          component: EmailChange
        },
        {
          path: '/user/accountBar/changePwd',
          name: 'PwdChange',
          component: PwdChange
        },
        {
          path: '/user/accountBar/changeSucc',
          name: 'ChangeSucc',
          component: ChangeSucc
        }
      ]
    },
    {
      path: '/notFound',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/notFound'
    }
  ]
})

// 全局导航守卫
router.beforeEach(async (to, from, next) => {
  // 只有登录后，localStorage中才有值
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
  const payload = jwt.decode(token)
  const refPayload = jwt.decode(refreshToken)
  if (refPayload && moment().isBefore(moment(refPayload.exp * 1000))) {
    if (token && moment().isBefore(moment(payload.exp * 1000))) {
      // 刷新页面的时候保存数据
      // 每次进入页面之前，就将localStorage的内容储存到vuex中，vuex的持久化
      store.commit('getUserInfo', JSON.parse(localStorage.getItem('userInfo')))
      store.commit('getToken', localStorage.getItem('token'))
      store.commit('getRefresh', localStorage.getItem('refreshToken'))
      store.commit('getIsLogin', true)
    } else {
      // 使用await， 避免路由拦截先于请求响应成功
      try {
        await getRefresh().then(res => {
          // 每次进入页面之前，就将localStorage的内容储存到vuex中，vuex的持久化
          store.commit('getUserInfo', JSON.parse(localStorage.getItem('userInfo')))
          store.commit('getToken', res.token)
          store.commit('getRefresh', localStorage.getItem('refreshToken'))
          store.commit('getIsLogin', true)
          console.log('refresh请求成功返回了')
        })
      } catch (e) {
        console.log(e)
      }
    }
  } else {
    // 用户要重新登录
    // 可以设置提示和跳转，也可以不设置
    console.log('要清除localStorage数据了')
    localStorage.clear()
  }

  // requireAuthorize检查要进入的路由是否需要守卫
  if (to.matched.some(record => record.meta.requireAuthorize)) {
    // 检查登录状态
    const isLogin = store.state.isLogin
    if (isLogin) {
      next()
    } else {
      console.log('导航守卫强制跳转')
      next('/login')
    }
  } else {
    // 要进入的路由不需要守卫，直接跳转
    next()
  }
})
export default router
