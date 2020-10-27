import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'
import { getRefresh } from './api/refresh'

const Login = () => import(/* webpackChunkName: "Login" */'./views/Login')// 路由懒加载
const Reg = () => import(/* webpackChunkName: "Reg" */'./views/Reg')
const Forget = () => import(/* webpackChunkName: "Forget" */'./views/Forget')
const Home = () => import(/* webpackChunkName: "Home" */'./views/Home')
const HomeChannel = () => import(/* webpackChunkName: "HomeChannel" */'./views/channels/HomeChannel')
const HomeIndex = () => import(/* webpackChunkName: "HomeIndex" */'./views/channels/HomeIndex')
const Center = () => import(/* webpackChunkName: "Center" */'./views/Center')
const UserHome = () => import(/* webpackChunkName: "UserHome" */'./views/user-center/UserHome')
const UserIndex = () => import(/* webpackChunkName: "UserIndex" */'./views/user-center/UserIndex')
// 用户设置页面
const UserSet = () => import(/* webpackChunkName: "UserSet" */'./views/user-center/UserSet')
const AccountBind = () => import(/* webpackChunkName: "AccountBind" */'./components/user-set/AccountBind.vue')
const ChangePwd = () => import(/* webpackChunkName: "ChangePwd" */'./components/user-set/ChangePwd.vue')
const HeadPic = () => import(/* webpackChunkName: "HeadPic" */'./components/user-set/HeadPic.vue')
const MyInfo = () => import(/* webpackChunkName: "MyInfo" */'./components/user-set/MyInfo.vue')
// 我的帖子
const UserPost = () => import(/* webpackChunkName: "UserPost" */'./views/user-center/UserPost')
const MyPost = () => import(/* webpackChunkName: "MyPost" */'./components/user-post/MyPost.vue')
const PostCollection = () => import(/* webpackChunkName: "PostCollection" */'./components/user-post/PostCollection.vue')

const UserMessage = () => import(/* webpackChunkName: "UserMessage" */'./views/user-center/UserMessage')
const UserOther = () => import(/* webpackChunkName: "UserOther" */'./views/user-center/UserOther')

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
    // 路由守卫
    {
      path: '/reg',
      name: 'Reg',
      component: Reg,
      beforeEnter: (to, from, next) => {
        if (from.path === '/login' || from.path === '/') {
          // 执行下一个钩子，正常跳转
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
      path: '/user',
      component: Center,
      meta: { requireAuthorize: true },
      children: [
        {
          path: '/user/home',
          name: 'UserHome',
          component: UserHome
        },
        {
          path: '/user/index',
          name: 'UserIndex',
          component: UserIndex
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
          path: '/user/set',
          component: UserSet,
          linkActiveClass: 'layui-this',
          children: [
            {
              path: '',
              name: 'MyInfo',
              component: MyInfo
            },
            {
              path: '/user/set/account',
              name: 'AccountBind',
              component: AccountBind
            },
            {
              path: '/user/set/pwd',
              name: 'ChangePwd',
              component: ChangePwd
            },
            {
              path: '/user/set/head',
              name: 'HeadPic',
              component: HeadPic
            }
          ]
        },
        {
          path: '/user/other',
          name: 'UserOther',
          component: UserOther
        }
      ]
    }
  ]
})

// 全局导航守卫
router.beforeEach((to, from, next) => {
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
      const uid = refPayload._id
      getRefresh(uid).then(res => {
        // 刷新页面的时候保存数据
        // 每次进入页面之前，就将localStorage的内容储存到vuex中，vuex的持久化
        store.commit('getUserInfo', JSON.parse(localStorage.getItem('userInfo')))
        store.commit('getToken', res.token)
        store.commit('getRefresh', localStorage.getItem('refreshToken'))
        store.commit('getIsLogin', true)
        console.log('refresh请求成功返回了')
      })
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
    if (store.state.isLogin) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    // 要进入的路由不需要守卫，直接跳转
    next()
  }
})
export default router
