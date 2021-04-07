<template>
  <div style="display: flex; flex: 1">
    <div class="chatRoom"
         v-if="$route.params.receiver">
      <div :class="{mask: wait}"></div>
      <ul class="chatMain">
        <div class="ellip name_title">{{receiverInfo.fakename}}</div>
        <li v-for='(item, index) in $store.state.mesLs'
            :key="'chatMain' + index"
            :class="{ recive: item.receiver, send: item.sender }">
          <img v-if="item.receiver"
               :src="receiverInfo.pic"
               alt="wrong">
          <p class="mes wrapContent"
             v-html="item.receiver ? item.receiver : item.sender"></p>
          <img v-if="item.sender"
               :src="$store.state.userInfo.pic"
               alt="wrong">
        </li>
      </ul>
      <editor-chat @submit-mes='submitMes'></editor-chat>
    </div>
    <div v-else></div>
  </div>

</template>

<script>
import EditorChat from '@/components/modules/editor/EditorChat'
import {
  addChatMes,
  clearUnread,
  // addTime,
  getMes
} from '@/api/chat'
import { getUserInfo } from '@/api/user'
export default {
  name: 'ChatMes',
  data () {
    return {
      wait: false,
      receiverInfo: {}
    }
  },
  components: {
    EditorChat
  },
  watch: {
    $route: async function (n, o) {
      // debugger

    }
  },
  methods: {
    // 进入聊天室
    async initChatMes (val) {
      this.wait = true
      // 改变 receiver
      this.$store.commit('setReceiver', val)
      // 获取私信列表
      await this.getChatMes()
      await this.$nextTick()
      const ul = document.querySelector('.chatMain')
      ul.scrollTo(0, ul.scrollHeight)
      this.wait = false
    },
    // 加载聊天室中的数据
    async getChatMes () {
      const res = await getMes({
        receiver: this.$store.state.receiver
      })
      if (res.code === 200) {
        this.$store.commit('loadMes', res.data)
      }
    },
    // 发送一条消息
    async submitMes (mes) {
      mes = mes.trim()
      // 对方发过来的，通过 ws 监听后改变 vuex
      // 自己发送的，在这里改变 vuex
      const receiver = this.$store.state.receiver
      this.$store.commit('addMes', {
        sender: mes
      })
      this.$store.commit('setChat', {
        receiver,
        lastMes: { sender: mes }
      })
      // 把消息发送出去，由 ws 系统转发到对应用户
      this.$store.state.ws.ws.send(JSON.stringify({
        event: 'chat',
        sender: this.$store.state.userInfo._id,
        receiver: receiver,
        mes: mes
      }))
      // 消息存到数据库
      await addChatMes({
        receiver: receiver,
        mes: mes
      })
      await this.$nextTick()
      const ul = document.querySelector('.chatMain')
      ul.scrollTo(0, ul.scrollHeight)
    },
    async clearUnread () {
      const chatMes = this.$store.state.chatMes
      let mes = 0
      // 没有未读消息的，不发送请求
      for (let i = 0; i < chatMes.length; i++) {
        if (chatMes[i].receiver._id === this.$route.params.receiver) {
          mes = chatMes[i].unread
          break
        }
      }
      if (mes === 0) {
        return
      }
      const res = await clearUnread({
        receiver: this.$route.params.receiver
      })
      if (res.code === 200) {
        const reduce = res.reduce
        // 清空 receiver 的未读数
        this.$store.commit('setUnread', { receiver: this.$route.params.receiver, num: 0 })
        // 减少未读总数
        const total = this.$store.state.chatNum
        this.$store.commit('setChatUnread', total - reduce)
      }
    }
  },
  async mounted () {
    const res = await getUserInfo({ uid: this.$route.params.receiver })
    this.receiverInfo = res.data
    const receiver = this.$route.params.receiver
    if (receiver && receiver.trim()) {
      await this.initChatMes(this.$route.params.receiver)
      await this.clearUnread()
    }
  },
  async beforeRouteUpdate (to, from, next) {
    const uid = to.params.receiver
    next()
    const res = await getUserInfo({ uid })
    this.receiverInfo = res.data
    if (uid && uid.trim()) {
      await this.initChatMes(uid)
      await this.clearUnread()
    }
  }
}
</script>

<style lang="scss" scoped>
.name_title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #c2c2c2;
  width: 100px;
  color: white;
  height: 20px;
  line-height: 18px;
  text-align: center;
  border-radius: 0 0 40% 40%;
}
.chatRoom {
  height: 600px;
  position: relative;
  flex: 1;
  background-color: #fafafa;
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fafafa;
    z-index: 999;
  }
  .chatMain {
    width: 100%;
    height: 400px;
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
    // &::-webkit-scrollbar {
    //   width: 0 !important;
    // }
    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    &::-webkit-scrollbar-thumb {
      // background: -webkit-gradient(
      //   linear,
      //   left top,
      //   left bottom,
      //   from(#ff8a00),
      //   to(#e52e71)
      // );
      // background: linear-gradient(180deg, #ff8a00, #e52e71);
      background: #c2c2c2;
      border-radius: 30px;
      // box-shadow: inset 2px 2px 2px hsla(0, 0%, 100%, 0.25),
      //   inset -2px -2px 2px rgba(0, 0, 0, 0.25);
    }
    &::-webkit-scrollbar-track {
      // background: linear-gradient(
      //   90deg,
      //   #201c29,
      //   #201c29 1px,
      //   #100e17 0,
      //   #100e17
      // );
      background: #dddddd;
    }
    img {
      height: 40px;
      width: 40px;
      border-radius: 100%;
      padding-right: 5px;
    }
    .mes {
      box-sizing: border-box;
      padding: 5px;
      border-radius: 5px;
      width: 210px;
      text-align: left;
      margin: 0 5px;
    }
    .recive {
      margin: 15px 5px;
      display: flex;
      justify-content: flex-start;
      .mes {
        background-color: white;
      }
    }
    .send {
      margin: 15px 5px;
      display: flex;
      justify-content: flex-end;
      .mes {
        background-color: #5fb878;
      }
    }
  }
}
</style>
