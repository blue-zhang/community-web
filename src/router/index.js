import Vue from 'vue'
import Router from 'vue-router'
import routers from './routers'
import store from '@/store/store'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'
import { getRefresh } from '@/api/refresh'
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
      // 刷新页面的时候保存数据
      // 每次进入页面之前，就将localStorage的内容储存到vuex中，vuex的持久化
      store.commit('getUserInfo', JSON.parse(localStorage.getItem('userInfo')))
      store.commit('getToken', localStorage.getItem('token'))
      store.commit('getRefresh', localStorage.getItem('refreshToken'))
      store.commit('getIsLogin', true)
    } else {
      // 使用await， 避免路由拦截先于请求响应成功
      await getRefresh().then(res => {
        store.commit('getUserInfo', JSON.parse(localStorage.getItem('userInfo')))
        store.commit('getToken', res.token)
        store.commit('getRefresh', localStorage.getItem('refreshToken'))
        store.commit('getIsLogin', true)
      })
    }
  } else {
    // 用户要重新登录
    localStorage.clear()
    store.commit('getToken', '')
    store.commit('getRefresh', '')
    store.commit('getUserInfo', {})
    store.commit('getIsLogin', false)
  }
  // requireAuthorize检查要进入的路由是否需要守卫
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
