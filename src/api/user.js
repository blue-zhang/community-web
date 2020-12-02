import axios from '../utils/request'

// 签到
const getSign = () => {
  return axios.get('/user/fav')
}

// 修改用户基本信息
const changeBasic = (option) => {
  return axios.post('/user/basic', option)
}
// 修改用户头像
const changePic = (option) => {
  return axios.post('/user/pic', option)
}
// 上传图片
const uploadImg = (option, type = '', uid = '') => {
  return axios.post('/user/img?' + `type=${type}&uid=${uid}`, option)
}
export { getSign, changeBasic, changePic, uploadImg }
