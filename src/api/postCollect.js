/*
 * @Author: your name
 * @Date: 2021-03-05 16:44:43
 * @LastEditTime: 2021-03-06 15:36:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\api\postCollect.js
 */
import qs from 'qs'
import axios from '../utils/request'
// 新建收藏夹
const createCol = (params) => {
  return axios.get('/collect/createCol?' + qs.stringify(params))
}
// 收藏文章
const doCol = (options) => {
  return axios.post('/collect/doCol', { ...options })
}
// 弹出窗口的列表初始化
const getColLists = (params) => {
  return axios.get('/collect/getLists_col?' + qs.stringify(params))
}
// 获取用户收藏夹列表
const getUserLists = (params) => {
  return axios.get('/collect/getUserLists_col?' + qs.stringify(params))
}
// 删除收藏夹
const delCol = (params) => {
  return axios.get('/collect/delCol?' + qs.stringify(params))
}
// 收藏夹重新命名
const rename = (params) => {
  return axios.get('/collect/rename?' + qs.stringify(params))
}
// 文章取消收藏
const cancelPost = (params) => {
  return axios.get('/collect/cancelPost?' + qs.stringify(params))
}
// 获取一个收藏夹内的文章列表
const getPostLists = (params) => {
  return axios.get('/collect/getPostLists?' + qs.stringify(params))
}
export {
  getUserLists,
  getColLists,
  createCol,
  doCol,
  delCol,
  rename,
  cancelPost,
  getPostLists
}
