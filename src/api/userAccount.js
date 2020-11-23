import axios from '../utils/request'

// 密码验证身份
const pwdVerify = (option) => {
  return axios.post('/user/pwdVerify', option)
}
// 修改已绑定的邮箱，发送邮件的接口
const changeEmail = (option) => {
  return axios.post('/user/changeEmail', option)
}
// 修改已绑定的邮箱，点击邮件后更新邮箱的接口
const updateEmail = (option) => {
  return axios.post('/user/updateEmail', option)
}
// 修改密码
const changePwd = (option) => {
  return axios.post('/user/changePwd', option)
}
export { pwdVerify, changeEmail, updateEmail, changePwd }
