/*
 * @Author: your name
 * @Date: 2020-10-27 10:42:16
 * @LastEditTime: 2021-03-07 13:14:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\api\content.js
 */
import qs from 'qs'
import axios from '../utils/request'

const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
}
const getListLogin = (options) => {
  return axios.get('/content/list?' + qs.stringify(options))
}

// 温馨提醒
const getTips = () => {
  return axios.get('/public/tips')
}

// 本周热议
const getTop = () => {
  return axios.get('/public/topWeek')
}

// 友情链接
const getLinks = () => {
  return axios.get('/public/links')
}

// 保存草稿
const saveDrafts = (options) => {
  return axios.post('/content/drafts', {
    ...options
  })
}
// 更新草稿
const updateDrafts = (options) => {
  return axios.post('/content/updateDrafts', {
    ...options
  })
}
// 获取草稿列表
const getDrafts = (type = '') => {
  return axios.get('/content/getDrafts?type=' + type)
}
// 删除一个草稿
const delDrafts = (options) => {
  return axios.post('/content/delDrafts', {
    ...options
  })
}
// 提交文章
const submitPost = (options) => {
  return axios.post('/content/submit', {
    ...options
  })
}

// 获取文章详情
const getDetail = (pid) => {
  return axios.get('/content/detail?pid=' + pid)
}
// 删除文章
const delPost = (options) => {
  return axios.post('/content/delPost', {
    ...options
  })
}
// 点赞文章
const praisePost = (params) => {
  return axios.get('/content/handPost?' + qs.stringify(params))
}

// 重新编辑文章
const updatePost = (options) => {
  return axios.post('/content/updatePost', {
    ...options
  })
}
// 增加阅读数
const incReads = (params) => {
  return axios.get('/content/incReads?' + qs.stringify(params))
}

// 从后端加载上次没有编辑完的文章
const loadUpdate = (pid) => {
  return axios.get('/content/loadUpdate?pid=' + pid)
}
// 提交文章更新
const submitUpdate = (options) => {
  return axios.post('/content/submitUpdate', {
    ...options
  })
}
// 获取用户文章列表
const userPost = (params) => {
  return axios.get('/content/userPost?' + qs.stringify(params))
}
// 获取用户提问列表
const userQuestion = (params) => {
  return axios.get('/content/userQuestion?' + qs.stringify(params))
}
export {
  getList,
  getListLogin,
  getTips,
  getTop,
  getLinks,
  getDetail,
  userPost,
  saveDrafts,
  getDrafts,
  delDrafts,
  updateDrafts,
  submitPost,
  delPost,
  updatePost,
  submitUpdate,
  incReads,
  loadUpdate,
  praisePost,
  userQuestion
}
