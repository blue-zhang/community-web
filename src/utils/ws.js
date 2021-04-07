import store from '@/store/store'
import config from '@/config/config'
import {
  incUnread
} from '@/api/chat'
class WebSocketClient {
  constructor (fig = {}) {
    const defaultConfig = {
      url: config.wsconfig.url,
      port: config.wsconfig.port,
      protocol: 'ws',
      timeInterval: 30 * 1000
    }
    const finalConfig = { ...defaultConfig, ...fig }
    this.ws = {}
    this.port = finalConfig.port
    this.url = finalConfig.url
    this.protocol = finalConfig.protocol
    this.handle = null
    this.timeInterval = finalConfig.timeInterval
  }

  init () {
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`)
    this.ws.onopen = () => this.onopen()
    this.ws.onmessage = (msg) => this.onmessage(msg)
    this.ws.onclose = () => this.onclose()
    this.ws.onerror = () => this.onerror()
  }

  onopen () {
    // 发送鉴权信息
    this.send({
      event: 'auth',
      mes: 'Bearer ' + store.state.refreshToken,
      uid: store.state.userInfo._id
    })
  }

  send (obj) {
    this.ws.send(JSON.stringify(obj))
  }

  async onmessage (event) {
    // 当用户未进入聊天室，则不接收消息
    if (this.isShow) {

    }
    // 接收服务端发送过来的消息
    const obj = JSON.parse(event.data)
    switch (obj.event) {
      case 'mes':
        break
      case 'noauth':
        // 鉴权失败
        console.log('鉴权失败')
        // 路由跳转到 /login 重新获取token
        break
      case 'heartbeat':
        this.checkServer() // timeInterval + t
        // 可以注释掉以下心跳状态，主动测试服务端是否会断开客户端的连接
        this.ws.send(JSON.stringify({
          event: 'heartbeat',
          mes: 'pong'
        }))
        break
      case 'info':
        store.commit('setUnreadNum', {
          postHand: obj.postHand,
          comHand: obj.comHand,
          postCom: obj.postCom,
          comReply: obj.comReply
        })
        store.commit('setChatUnread', obj.chatNum)
        break
      case 'chat':
        // 可以用来判断用户连接上 ws 后，是否正在聊天的情况，如果用户没有连接 ws，需要后端 ws 来增加 receiver 的未读数
        // 发送消息时，通过接口把消息存到数据库中，和 ws 解耦
        // 自己发送的消息，在接口部分修改了 vuex
        // 接收从服务端传来的对方的信息，并修改 vuex
        // 对方的 sender 是我方的 receiver
        if (obj.sender === store.state.receiver) {
          // 两者在聊天
          store.commit('addMes', {
            receiver: obj.mes
          })
        } else {
          // 两者没有在聊天, 对 recevier 增加一个未读数
          // 聊天信息已经存到了数据库，当对方打开信息列表的时候，会加载最新信息
          let unread = store.state.chatNum
          unread++
          store.commit('setChatUnread', unread)
          await incUnread({
            receiver: obj.receiver,
            sender: store.state.userInfo._id
          })
        }
        break
      case 'chat_unread':
        break
      default:
    }
  }

  onclose () {
    // 当链接 主 动 断 开 的时候触发close事件
    this.ws.close()
  }

  onerror () {
    // 当 连 接 失 败 时，触发error事件
    // 连接失败之后，1s进行断线重连！
    setTimeout(() => {
      this.init()
    }, 500)
  }

  // 客户端设置两次 ping 直接的时间差大于 timeInteral + 1000 则客户端重启链接
  // checkServer () {
  //   clearTimeout(this.handle)
  //   this.handle = setTimeout(() => {
  //     this.onclose()
  //     this.onerror()
  //   // 设置1ms的时延，调试在服务器测未及时响应时，客户端的反应
  //   }, this.timeInterval + 1000)
  // }
}

export default WebSocketClient
