import Vue from 'vue'
import Router from 'vue-router'
import routers from './routers'
import store from '@/store/store'
import moment from 'dayjs'
import jwt from 'jsonwebtoken'
import { instance } from '../utils/errorHandle'
Vue.use(Router)

const router = new Router(routers)

// 全局导航守卫
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
  const payload = jwt.decode(token)
  const refPayload = jwt.decode(refreshToken)
  if (refPayload && moment().isBefore(moment(refPayload.exp * 1000))) {
    if (token && moment().isBefore(moment(payload.exp * 1000))) {
      // token 存在且没有过期
      // 刷新页面的时候保存数据
      // 每次进入页面之前，就将localStorage的内容储存到vuex中，vuex的持久化
      store.commit('setUserInfo', JSON.parse(localStorage.getItem('userInfo')))
      store.commit('setToken', localStorage.getItem('token'))
      store.commit('setRefresh', localStorage.getItem('refreshToken'))
      store.commit('setIsLogin', true)
    } else {
      // refreshToken 没过期，token 过期
      instance.post('/login/refresh', null, {
        headers: {
          Authorization: 'Bearer ' + refreshToken
        }
      }).then(res => {
        store.commit('setToken', res.data.token)
      })
    }
    store.commit('setUserInfo', JSON.parse(localStorage.getItem('userInfo')))
    store.commit('setRefresh', localStorage.getItem('refreshToken'))
    store.commit('setIsLogin', true)
    if (!store.state.ws) {
      store.commit('initWs', {})
    }
  } else {
    // 用户要重新登录
    localStorage.clear()
    store.commit('setToken', '')
    store.commit('setUserInfo', {})
    store.commit('setIsLogin', false)
  }

  // 一个路由匹配到的所有路由记录会暴露为 $route 对象 (还有在导航守卫中的路由对象) 的 $route.matched 数组。因此，我们需要遍历 $route.matched 来检查路由记录中的 meta 字段。
  if (to.matched.some(record => record.meta.requireAuthorize)) {
    // 检查登录状态
    const isLogin = store.state.isLogin
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
