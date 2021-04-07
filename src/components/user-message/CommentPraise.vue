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
              <div v-if="item.fakename.length === 1">
                <b class="blink font16"
                   @click="toHome(item.fakename[0].uid)">{{item.fakename[0].fakename}}</b>
                <span style="color: #999999"> 点赞了您在文章<b class="blink font16"
                     @click="toDetail(item.pid)">{{item.title}}</b> 下的评论</span>
              </div>
              <div v-else-if="item.fakename.length === 2">
                <b class="blink font16"
                   @click="toHome(item.fakename[0].uid)">{{item.fakename[0].fakename+'、'}}</b>
                <b class="blink font16"
                   @click="toHome(item.fakename[1].uid)">{{item.fakename[1].fakename}}</b>
                <span style="color: #999999"> 点赞了您在文章<b class="blink font16"
                     @click="toDetail(item.pid)">{{item.title}}</b> 下的评论</span>
              </div>
              <div v-else>
                <b class="blink font16"
                   @click="toHome(item.fakename[0].uid)">{{item.fakename[0].fakename+'、'}}</b>
                <b class="blink font16"
                   @click="toHome(item.fakename[1].uid)">{{item.fakename[1].fakename}}</b>
                等<b>{{item.fakename.length}}</b>人
                <span style="color: #999999"> 点赞了您在文章<b class="blink font16"
                     @click="toDetail(item.pid)">{{item.title}}</b> 下的评论</span>
              </div>
              <p style="margin:20px 0 0 0">
                {{item.created | _moment}}
              </p>
            </div>
            <div class="message-main-right pointer wrapContent"
                 v-html="item.content"
                 @click="toDetail(item.pid)"></div>
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
                     class="praiseToHome_comhand"
                     rel="noopener noreferrer"
                     :to="{name: 'UserHome', params: { uid }}">
        </router-link>
        <router-link target="_blank"
                     class="praiseToDetail_comhand"
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
import { getCommentHands, clearAll } from '@/api/user'
import PageBar from '@/components/modules/pagination/Index'
export default {
  name: 'CommentPraise',
  components: {
    PageBar
  },
  data () {
    return {
      // router-link 的动态路由为空时会有警告
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
      const doc = document.querySelector('.praiseToDetail_comhand')
      setTimeout(() => {
        doc.click()
      }, 0)
    },
    toHome (uid) {
      this.uid = uid
      debugger
      console.log(this.uid)
      const doc = document.querySelector('.praiseToHome_comhand')
      setTimeout(() => {
        doc.click()
      }, 0)
    },
    handleChange (val) {
      this.current = val
      this.getLists()
    },
    async _getLists () {
      const res = await getCommentHands({ page: this.current, limit: this.limit })
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
    const res = await clearAll({ type: 'comHand' })
    if (res.code === 200) {
      const data = this.$store.state.unreadNum
      this.$store.commit('setUnreadNum', { ...data, comHand: 0 })
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
