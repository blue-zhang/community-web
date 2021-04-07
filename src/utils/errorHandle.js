import axios from 'axios'
import request from '@/utils/request'
import router from '@/router/index'
import store from '@/store/store'
import config from '@/config/config'

const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

export const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: 10000
})

const errorHandle = async (err) => {
  if (err.response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken')
    // token已经过期
    // 需要请求refreshToken接口
    try {
      const res = await instance.post('/login/refresh', null, {
        headers: {
          Authorization: 'Bearer ' + refreshToken
        }
      })
      if (res.data.code === 200) {
        store.commit('setToken', res.data.token)
        // token成功返回--重新发送本次请求
        return request.requestConfig(err.config)
      }
    } catch (error) {
      localStorage.clear()
      store.commit('setToken', '')
      store.commit('setUserInfo', {})
      store.commit('setIsLogin', false)
      router.push({ path: '/login' })
    }
  } else {
    console.log('errorHandle ->', err.stack)
  }
}

export default errorHandle
