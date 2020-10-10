import axios from 'axios'
import errorHandle from './errorHandle'

// .request文件中传入baseUrl
class HttpRequest {
  constructor (baseUrl) {
    this.baseUrl = baseUrl
  }

  getInsideConfig () {
    const config = {
      baseUrl: this.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
    return config
  }

  interceptors (instance) {
    instance.interceptors.request.use(
      config => {
        return config
      },
      error => {
        errorHandle('request+', error)
        return Promise.reject(error)
      }
    )
    instance.interceptors.response.use(
      response => {
        if (response.status === 200) {
          return Promise.resolve(response.data)
        } else {
          return Promise.reject(response)
        }
      },
      error => {
        errorHandle(error)
        return Promise.reject(error)
      }
    )
  }

  request (options) {
    const instance = axios.create()
    // 将传递过来的options与默认axios的配置合并
    const newOptions = Object.assign(this.getInsideConfig(), options)
    // 创建拦截器
    this.interceptors(instance)
    // 用合并的配置创建请求
    return instance(newOptions)
  }

  get (url, config) {
    const options = Object.assign(
      {
        method: 'get',
        url: url
      },
      config
    )
    return this.request(options)
  }

  post (url, data) {
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default HttpRequest
