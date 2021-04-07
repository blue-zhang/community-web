import axios from '../utils/request'
import qs from 'qs'

// 签到
const getSign = () => {
  return axios.get('/user/sign')
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
const uploadImg = (option, type, pid) => {
  return axios.post('/user/img?' + `type=${type}&pid=${pid}`, option)
}
// 获取用户被回复的数据
const getUserReply = (params) => {
  return axios.get('/user/getUserReply?' + qs.stringify(params))
}
// 获取用户文章被回复的数据
const getPostComment = (params) => {
  return axios.get('/user/getPostComment?' + qs.stringify(params))
}
// 获取用户回复被点赞的数据
const getCommentHands = (params) => {
  return axios.get('/user/getCommentHands?' + qs.stringify(params))
}
// 获取用户文章被点赞的数据
const getPostHands = (params) => {
  return axios.get('/user/getPostHands?' + qs.stringify(params))
}
// 获取用户主页信息
const getUserInfo = (params) => {
  return axios.get('/user/getUserInfo?' + qs.stringify(params))
}
// 获取用户动态
const getActivites = (params) => {
  return axios.get('/user/activites?' + qs.stringify(params))
}
// 获取用户关注
const getAttentions = (params) => {
  return axios.get('/user/attentions?' + qs.stringify(params))
}
// 获取关注用户的
const attentionsMe = (params) => {
  return axios.get('/user/attentionsMe?' + qs.stringify(params))
}
// 关注
const addAttention = (params) => {
  return axios.get('/user/addAttention?' + qs.stringify(params))
}
// 删除关注
const delAttention = (params) => {
  return axios.get('/user/delAttention?' + qs.stringify(params))
}
// 判断对方是否被关注
const isAttention = (params) => {
  return axios.get('/user/isAttention?' + qs.stringify(params))
}
// 清空消息
const clearAll = (params) => {
  return axios.get('/user/clearInfo?' + qs.stringify(params))
}
export {
  getSign, changeBasic, changePic, uploadImg, getUserReply, getCommentHands, getUserInfo, getPostComment, getPostHands, clearAll, getActivites, getAttentions, addAttention, delAttention, attentionsMe, isAttention
}
