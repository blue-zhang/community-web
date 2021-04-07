<template>
  <div class="fly-panel fly-panel-user">
    <div class="layui-tab layui-tab-brief"
         lay-filter="message">
      <div class="chat">
        <ul class="mychat">
          <li v-for="(item, index) in $store.state.chatMes"
              class="pointer"
              :class="{linkBg: $route.params.receiver === item.receiver._id}"
              @click="enterChatMes(item.receiver._id)"
              :key="'mychat' + index">
            <div class="chatLi">
              <div class="chatLeft">
                <img :src="item.receiver.pic"
                     alt="wrong">
                <div v-show="item.unread"
                     class="css-ybodb pos">{{item.unread | limit99}}</div>
                <div class="main">
                  <div class="chatHeader">
                    <b style="fontSize: 12px"
                       :class="{ 'vip-color': item.receiver.isVip !== '0'}">
                      {{ item.receiver.fakename }}
                    </b>
                    <div style="padding: 0 2px; color: #999; fontSize: 10px">{{item.updated | _moment}}</div>
                    <div class="del">
                      <span @click="delChat(item.receiver._id)">删除</span>
                    </div>
                  </div>
                  <p class="message-main-right pointer wrapContent"
                     v-html="item.lastMes.receiver ? item.lastMes.receiver : item.lastMes.sender">
                  </p>
                </div>
              </div>
            </div>
          </li>
          <div v-show="$store.state.chatMes.length > 12"
               style="height: 25px; lineHeight: 25px; textAlign: center">到底了~~~</div>
        </ul>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getReceive,
  // clearUnread,
  // addTime,
  delChat
} from '@/api/chat'
export default {
  name: 'MyChat',
  methods: {
    // 进入聊天室
    async enterChatMes (val) {
      if (val === this.$store.state.receiver) {
        return
      }
      this.$store.commit('setReceiver', val)
      this.$router.push({ name: 'ChatMes', params: { receiver: val } })
    },
    async delChat (receiver, index) {
      debugger
      this.$confirm('聊天记录删除后不可恢复', async () => {
        const res = await delChat({ receiver })
        if (res.code === 200) {
          this.$bubble(res.mes)
          // const ls = this.$store.state.chatMes
          this.$store.state.chatMes.splice(index, 1)
          this.$router.push({ name: 'MyChat' })
        }
      }, () => {

      })
    }
  },
  async mounted () {
    // 获取私信列表
    const res = await getReceive({ receiver: this.$store.state.receiver })
    if (res.code === 200) {
      this.$store.commit('loadChat', res.data)
    }
  },
  beforeDestroy () {
    this.$store.commit('setReceiver', '')
  }
}
</script>

<style lang="scss" scoped>
.chat {
  display: flex;
}
.linkBg {
  background-color: #f2f2f2;
}
.mychat {
  padding-top: 5px;
  position: relative;
  // border-top: 1px #eeeeee solid;
  border-right: 1px #eeeeee solid;
  background-color: white;
  width: 300px;
  height: 600px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  .chatLi {
    flex: 1;
    // border-bottom: 1px #eeeeee solid;
    padding: 5px 0;
    margin-left: 5px;
    .chatLeft {
      position: relative;
      display: flex;
      flex-flow: row nowrap;
      .pos {
        left: 27px;
        top: -3px;
        height: 18px;
        width: 18px;
        line-height: 18px;
        padding-left: 1px;
        padding-right: 1px;
      }
      img {
        height: 40px;
        width: 40px;
        border-radius: 100%;
        padding-right: 8px;
      }
      .main {
        flex: 1;
        display: flex;
        flex-flow: column;
        .chatHeader {
          flex: 1;
          display: flex;
          font-size: 14px;
          height: 20px;
          line-height: 20px;
          padding-bottom: 5px;
          text-align: center;
          .del {
            flex: 1;
            text-align: right;
            color: #666;
            span {
              padding-right: 10px;
              &:hover {
                color: #ff5722;
              }
            }
          }
        }
        .message-main-right {
          border: none;
          width: 200px;
          height: 20px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          line-height: 15px;
        }
      }
    }
  }
}
</style>
