import axios from '../utils/request'
import qs from 'qs'

// 提交一次消息
const addChatMes = (params) => {
  return axios.get('/chat/addChatMes?' + qs.stringify(params))
}
// 提交退出时间
const addTime = (params) => {
  return axios.get('/chat/addTime?' + qs.stringify(params))
}
// 获取私信用户的列表
const getReceive = (params) => {
  return axios.get('/chat/getReceive?' + qs.stringify(params))
}
// 清除一个用户的所有未读消息
const clearUnread = (params) => {
  return axios.get('/chat/clearUnread?' + qs.stringify(params))
}
// 获取和一个用户的所有的私信
const getMes = (params) => {
  return axios.get('/chat/getMes?' + qs.stringify(params))
}
// 删除和一个人所有的聊天信息
const delChat = (params) => {
  return axios.get('/chat/del?' + qs.stringify(params))
}
// 删除和一个人所有的聊天信息
const incUnread = (params) => {
  return axios.get('/chat/incUnread?' + qs.stringify(params))
}
export {
  addChatMes,
  getReceive,
  clearUnread,
  addTime,
  getMes,
  delChat,
  incUnread
}
