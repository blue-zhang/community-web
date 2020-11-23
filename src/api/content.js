import qs from 'qs'
import axios from '../utils/request'

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

// 保存草稿
const saveDrafts = (options) => {
  return axios.post('/content/drafts', {
    ...options
  })
}
// 获取草稿列表
const getDrafts = () => {
  return axios.get('/content/getDrafts')
}
// 删除一个草稿
const delDrafts = (options) => {
  return axios.post('/content/delDrafts', {
    ...options
  })
}

export {
  getList,
  getTips,
  getTop,
  getLinks,
  saveDrafts,
  getDrafts,
  delDrafts
}
