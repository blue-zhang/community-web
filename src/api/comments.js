/*
 * @Author: your name
 * @Date: 2021-02-24 23:13:47
 * @LastEditTime: 2021-03-04 15:01:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\api\comments.js
 */
import axios from '../utils/request'
import qs from 'qs'

// 提交评论
const submitComments = (options) => {
  return axios.post('/comments/submit', {
    ...options
  })
}

const getCommentsLs = (params) => {
  return axios.get('/comments/lists?' + qs.stringify(params))
}

const delComments = (options) => {
  return axios.post('/comments/del', { ...options })
}

// 点赞回复和评论
const praiseComments = (params) => {
  return axios.get('/comments/hand?' + qs.stringify(params))
}
// 改用户在文章下点赞的评论列表
const getHandsPid = (params) => {
  return axios.get('/comments/handPL?' + qs.stringify(params))
}

// ------------------------------------  回复接口

// 提交回复
const submitReply = (options) => {
  return axios.post('/comments/submitReply', {
    ...options
  })
}
// 获取回复列表
const getReplyLs = (params) => {
  return axios.get('/comments/replyLs?' + qs.stringify(params))
}
// 删除回复
const delReply = (options) => {
  return axios.post('/comments/delReply', { ...options })
}

export {
  submitComments,
  getCommentsLs,
  delComments,
  praiseComments,
  getHandsPid,
  submitReply,
  getReplyLs,
  delReply
}
