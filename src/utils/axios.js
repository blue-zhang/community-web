import axios from 'axios'
import errorHandle from './errorHandle'
import publicConfig from '../config/config'
import { getRefresh } from '../api/refresh'
import jwt from 'jsonwebtoken'
import moment from 'dayjs'
import store from '../store/store'

const CancelToken = axios.CancelToken

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.cancel = {}
  }

  // 默认配置
  commonConfig () {
    const config = {
      baseUrl: this.baseUrl,
      timeout: 100000,
      // headers中还要加上Authorization = 'Bearer ' + token
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
    return config
  }

  // 请求配置
  requestConfig (options) {
    // 创建axios实例
    // 合并默认配置
    // 创建拦截器
    // 将配置传给axios实例并返回实例
    const instance = axios.create()
    const allConfig = Object.assign(this.commonConfig(), options)
    this.interceptors(instance)
    return instance(allConfig)
  }

  /**
   * 重复请求处理函数
   */
  removeRequest (key, isRepeat = false) {
    if (this.cancel[key]) {
      if (isRepeat) {
        // 执行key的函数, 有一个mes参数
        this.cancel[key]('取消重复请求' + key)
      } else {
        // 删除key属性
        delete this.cancel[key]
      }
    }
  }

  /**
   * 拦截器作用1: 在请求之前，对请求的配置config进行修改
   * 拦截器作用2: 在响应数据返回之前，对响应的数据进行处理
   */
  interceptors (instance) {
    // 使用decode，过期后也可以解析token
    instance.interceptors.request.use(
      config => {
        // 在获得响应之前，取消重复请求
        if (config.url !== '/refresh') {
          let key = config.url + '&' + config.method
          this.removeRequest(key, true)
          config.cancelToken = new CancelToken((c) => {
            // c是取消请求函数，cancel是对象。
            // 将key属性的值设置为取消函数。如果请求重复了，就执行key的函数
            this.cancel[key] = c
          })
        }
        // jwt鉴权
        const token = localStorage.getItem('token')
        const refreshToken = localStorage.getItem('refreshToken')
        // 判断是否为refresh请求
        if (config.url !== '/refresh') {
          let isPublic = false
          publicConfig.publicPath.map((path) => {
            isPublic = isPublic || path.test(config.url)
          })
          if (!isPublic && token) {
            config.headers.Authorization = 'Bearer ' + token
          }
        } else {
          if (refreshToken) {
            config.headers.Authorization = 'Bearer ' + refreshToken
          }
        }
        return config
      },
      // 处理请求错误
      error => {
        errorHandle('request+', error)
        return Promise.reject(error)
      }
    )
    instance.interceptors.response.use(
      response => {
        // 获得响应，取消重复请求的判定
        let key = response.config.url + '&' + response.config.method
        this.removeRequest(key)
        // 处理响应数据
        if (response.status === 200) {
          return Promise.resolve(response.data)
        } else {
          return Promise.reject(response)
        }
      },
      // 处理响应错误
      error => {
        // 返回401错误时，要发送refresh请求
        const errRes = error.response ? error.response : { status: 0 }
        if (errRes.status && errRes.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken')
          const refPayload = jwt.decode(refreshToken)
          if (refPayload && moment().isBefore(moment(refPayload.exp * 1000))) {
            getRefresh().then(res => {
              // 虽然token获取成功，但是本次请求已经失败，需要再次请求才可以
              store.commit('getToken', res.token)
              // 重新发送本次请求，但是无法统一对返回的数据进行处理
              return Promise.reject(error)
            })
          }
        } else {
          errorHandle(error)
          return Promise.reject(error)
        }
      }
    )
  }

  get (url, config) {
    const options = Object.assign(
      {
        method: 'get',
        url: url
      },
      config
    )
    return this.requestConfig(options)
  }

  post (url, data) {
    return this.requestConfig({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
