// import _ from 'lodash'
import WebSocketClient from '@/utils/ws'
export default {
  setSid (state, val) {
    state.sid = val
  },
  setSign (state, val) {
    state.userInfo.isSign = val
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
  },
  setUserInfo (state, val) {
    state.userInfo = val
    localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
  },
  setToken (state, val) {
    state.token = val
    localStorage.setItem('token', state.token)
  },
  setRefresh (state, val) {
    state.refreshToken = val
    localStorage.setItem('refreshToken', state.refreshToken)
  },
  setIsLogin (state, val) {
    state.isLogin = val
  },

  // 帖子内容相关的内容
  setPost (state, val) {
    state.post = val
    localStorage.setItem('temPost', JSON.stringify(state.post))
  },
  setPostPic (state, val) {
    state.post = { ...state.post, picUrl: val }
    localStorage.setItem('temPost', JSON.stringify(state.post))
  },
  setPostContent (state, val) {
    state.post = { ...state.post, content: val }
    localStorage.setItem('temPost', JSON.stringify(state.post))
  },
  setPostPid (state, val) {
    state.post = { ...state.post, pid: val }
    localStorage.setItem('temPost', JSON.stringify(state.post))
  },

  setComments (state, val) {
    state.comments = val
  },

  initWs (state, config) {
    state.ws = new WebSocketClient(config)
    state.ws.init()
  },

  setMessgae (state, val) {
    state.chatMes = JSON.stringify(val)
  },
  setUnreadNum (state, val) {
    state.unreadNum = val
  },

  // 私信相关
  incChatMes (state, receiver, val) {
    // 自己发送的没有 isread
    state.chatMes[receiver].push({
      send: val
    })
  },
  loadChat (state, arr) {
    state.chatMes = arr
  },

  loadMes (state, arr) {
    state.mesLs = arr
  },
  setChat (state, val) {
    const arr = [...state.chatMes] // 新数组
    arr.forEach((item) => {
      if (item.receiver._id === val.receiver) {
        item.lastMes = val.lastMes
      }
    })
    state.chatMes = arr
  },
  // 接收自己发的消息，已经对方发送的已读消息
  // 改变 mesLs
  addMes (state, obj) {
    const arr = [...state.mesLs]
    arr.push(obj)
    state.mesLs = arr
  },
  // 接收对方发出来的离线消息
  // 改变 chatMes
  addMes_unread (state, obj) {
    // 修改
    const receiver = obj.sender
    const sender = obj.receiver
    const mes = obj.mes
    const arr = [...state.chatMes]
    arr.forEach((item) => {
      if (item.sender === sender && item.receiver === receiver) {
        item.unread++
        item.lastMes = {
          receiver: mes
        }
      }
    })
    arr.push(obj)
    state.chatMes = arr
  },
  // 设置总未读数
  setChatUnread (state, val) {
    state.chatNum = val
  },
  // 设置某个 receiver 的未读数
  setUnread (state, val) {
    const arr = [...state.chatMes]
    arr.forEach((item) => {
      if (item.receiver._id === val.receiver) {
        item.unread = val.num
      }
    })
    state.chatMes = arr
  },
  setReceiver (state, val) {
    state.receiver = val
  }
}
