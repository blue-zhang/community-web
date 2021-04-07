import axios from 'axios'
import errorHandle from './errorHandle'
import publicConfig from '../config/config'

const CancelToken = axios.CancelToken

class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
    this.cancel = {}
  }

  // 默认配置
  commonConfig () {
    const config = {
      baseURL: this.baseUrl,
      timeout: 100000,
      // headers中还要加上Authorization = 'Bearer ' + token
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
    return config
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

  interceptors (instance) {
    // 在请求之前，对请求的配置config进行修改
    instance.interceptors.request.use(
      config => {
        // 在获得响应之前，取消重复请求
        let key = config.url + '&' + config.method
        this.removeRequest(key, true)
        config.cancelToken = new CancelToken((c) => {
          // c是取消请求函数，cancel是对象。
          // 将key属性的值设置为取消函数。如果请求重复了，就执行key的函数
          this.cancel[key] = c
        })
        // jwt鉴权
        const token = localStorage.getItem('token')
        let isPublic = false
        publicConfig.publicPath.map((path) => {
          isPublic = isPublic || path.test(config.url)
        })
        if (!isPublic && token) {
          config.headers.Authorization = 'Bearer ' + token
        }
        return config
      },
      error => {
        errorHandle(error)
        return Promise.reject(error)
      }
    )
    // 在响应数据返回之前，对响应的数据进行处理
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
      async error => {
        const result = await errorHandle(error)
        return result ? Promise.resolve(result) : Promise.reject(error)
      }
    )
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
