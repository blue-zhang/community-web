import qs from 'qs'
import axios from '../utils/request'
import { uploadImg } from './user'
/**
 * @接口名称:获取内容
 * @qs:将对象转化为字符串，前面路径要加"?"
 */
const getList = (options) => {
  return axios.get('/public/list?' + qs.stringify(options))
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

// 内容部分上传图片
const uploadContentImg = ({ form, type, uid }) => {
  uploadImg(form, type, uid)
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
// type: 'last' 用来加载上次保存草稿
const getDrafts = (type = '') => {
  return axios.get('/content/getDrafts?type=' + type)
}
// 删除一个草稿, { created }
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

export {
  getList,
  getTips,
  getTop,
  getLinks,
  uploadContentImg,
  saveDrafts,
  getDrafts,
  delDrafts,
  updateDrafts,
  submitPost
}
