import axios from '../utils/request'

/**
 * 获取验证码接口
 * @param {*} sid 唯一标识
 */
const getCaptcha = sid => {
  // 封装了基础的request方法
  // axios.request({
  //  method: 'get',
  //  url: '/getCaptcha'
  // })
  return axios.get('/public/captcha', {
    params: {
      sid
    }
  })
}

// 重置密码
const reset = option => {
  return axios.post('/login/reset', {
    ...option
  })
}
// 登录
const login = option => {
  return axios.post('/login/login', {
    ...option
  })
}

// 注册
const register = option => {
  return axios.post('/login/register', {
    ...option
  })
}
export { getCaptcha, login, register, reset }
