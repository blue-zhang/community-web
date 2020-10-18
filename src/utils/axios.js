import axios from 'axios'
import errorHandle from './errorHandle'

const CancelToken = axios.CancelToken

// .request文件中传入baseUrl
class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
    this.cancel = {}
  }

  // 默认配置
  getInsideConfig () {
    const config = {
      baseUrl: this.baseUrl,
      timeout: 100000,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    }
    return config
  }

  /**
   * 函数作用: 重复请求处理函数
   */
  removePending (key, isRequest = false) {
    if (this.cancel[key]) {
      if (isRequest) {
        this.cancel[key]('取消重复请求')
      } else {
        delete this.cancel[key]
      }
    }
  }

  /**
   * 拦截器作用1: 在请求之前，对请求的配置config进行修改
   * 拦截器作用2: 在响应数据返回之前，对响应的数据进行处理
   */
  interceptors (instance) {
    instance.interceptors.request.use(
      config => {
        /**
         * 函数作用: 请求没成功的时候，防止重复请求
         * @params {key} string: 用于匹配请求是否为同一个
         * @params {true} : 用于确定是否取消请求
         */
        let key = config.url + '&' + config.method
        this.removePending(key, true)
        config.cancelToken = new CancelToken((c) => {
          this.cancel[key] = c
        })
        return config
      },
      error => {
        errorHandle('request+', error)
        return Promise.reject(error)
      }
    )
    instance.interceptors.response.use(
      response => {
        /**
         * 函数作用: 请求成功了，可以再次请求。
         * @params{key} string: 用来确定是之前的请求，this.cancel[key] = cy
         * 不传true，则删除this.cancel[key]
         */
        let key = response.config.url + '&' + response.config.method
        this.removePending(key)
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

  /**
   * @函数作用: 用于合并axios默认配置和特定请求方式的配置，发送请求
   * @param {options} options: 接受特定请求方法的参数
   */
  request (options) {
    // 创建axios实例
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
