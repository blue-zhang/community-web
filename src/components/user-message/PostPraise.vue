<template>
  <div class="fly-panel fly-panel-user">
    <div class="layui-tab layui-tab-brief">
      <div v-if="lists.length">
        <ul v-if="lists.length"
            class="message-ul">
          <li v-for="(item, key) in lists"
              class="message-main"
              :key="key + 'com_mes'">
            <div class="message-main-left">
              <div v-if="item.uid.length === 1">
                <b class="blink font16"
                   @click="toHome(item.uid[0].uid)">{{item.uid[0].fakename}}</b>
                <span style="color: #999999"> 赞了文章<b class="blink font16"
                     @click="toDetail(item.pid._id)">{{item.pid.title}}</b></span>
              </div>
              <div v-else-if="item.uid.length === 2">
                <b class="blink font16"
                   @click="toHome(item.uid[0].uid)">{{item.uid[0].fakename+'、'}}</b>
                <b class="blink font16"
                   @click="toHome(item.uid[1].uid)">{{item.uid[1].fakename}}</b>
                <span style="color: #999999"> 赞了文章<b class="blink font16"
                     @click="toDetail(item.pid._id)">{{item.pid.title}}</b></span>
              </div>
              <div v-else>
                <b class="blink font16"
                   @click="toHome(item.uid[0].uid)">{{item.uid[0].fakename+'、'}}</b>
                <b class="blink font16"
                   @click="toHome(item.uid[1].uid)">{{item.uid[1].fakename}}</b>
                等<b>{{item.uid.length}}</b>人
                <span style="color: #999999"> 赞了文章<b class="blink font16"
                     @click="toDetail(item.pid._id)">{{item.pid.title}}</b></span>
              </div>
              <p style="margin:20px 0 0 0">
                {{item.created | _moment}}
              </p>
            </div>
          </li>
        </ul>
        <page-bar v-show="total > limit"
                  :total="total"
                  :current="current"
                  :align="'left'"
                  :size="limit"
                  :hasTotal="true"
                  :hasSelect="false"
                  @changeCurrent="handleChange"></page-bar>
        <router-link target="_blank"
                     class="praiseToHome_posthand"
                     rel="noopener noreferrer"
                     :to="{name: 'UserHome', params: { uid }}">
        </router-link>
        <router-link target="_blank"
                     class="praiseToDetail_posthand"
                     rel="noopener noreferrer"
                     :to="{name: 'detail', params: { pid }}">
        </router-link>
      </div>
      <div v-else
           style="textAlign:center">没有消息通知</div>
    </div>
  </div>
</template>

<script>
import { getPostHands, clearAll } from '@/api/user'
import PageBar from '@/components/modules/pagination/Index'
export default {
  name: 'PostPraise',
  components: {
    PageBar
  },
  data () {
    return {
      uid: '1',
      pid: '1',
      lists: [],
      total: 0,
      current: 0,
      page: 0,
      limit: 8
    }
  },
  methods: {
    toDetail (pid) {
      this.pid = pid
      const doc = document.querySelector('.praiseToDetail_posthand')
      setTimeout(() => {
        doc.click()
      }, 0)
    },
    toHome (uid) {
      this.uid = uid
      console.log(this.uid)
      const doc = document.querySelector('.praiseToHome_posthand')
      setTimeout(() => {
        doc.click()
      }, 0)
    },
    handleChange (val) {
      this.current = val
      this.getLists()
    },
    async _getLists () {
      const res = await getPostHands({
        page: this.current,
        limit: this.limit
      })
      console.log(res)
      if (res.code === 200) {
        this.lists = res.data
        this.total = res.total
      }
    }
  },
  async mounted () {
    await this._getLists()
  },
  async beforeDestroy () {
    const res = await clearAll({ type: 'postHand' })
    if (res.code === 200) {
      const data = this.$store.state.unreadNum
      this.$store.commit('setUnreadNum', { ...data, postHand: 0 })
    }
  }
}
</script>

<style lang="scss" scoped>
.message-main {
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(178, 186, 194, 0.75);
  height: auto;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  .message-main-left {
    margin-right: 10px;
    width: 80%;
    p {
      font-size: 12px;
      margin: 0 0 20px 0;
      color: #999999;
      span {
        color: #999999;
        padding: 0 10px 0 0;
      }
    }
    .replyContent {
      width: 100%;
      margin: 10px 0;
      height: 100px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .message-main-right {
    width: 15%;
    max-width: 150px;
    height: 60px;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    font-size: 14px;
    line-height: 15px;
    text-align: left;
    max-height: 4.285714285714286em;
    border: 1px solid rgba(178, 186, 194, 0.35);
    &:hover {
      border: 1px solid rgba(51, 51, 51);
      color: black;
      transition: border 1s, color 1s;
    }
  }
}
.fly-delete {
  text-align: none;
}
</style>
