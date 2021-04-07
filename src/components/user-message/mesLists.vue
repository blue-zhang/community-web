<template>
  <div>
    <ul v-if="mesLists.length"
        class="message-ul">
      <li v-for="(item, index) in mesLists"
          class="message-main"
          :key="index + 'com_mes'">
        <div class="message-main-left">
          <div>
            <router-link v-if="$route.name === 'UserMessage'"
                         target="_blank"
                         rel="noopener noreferrer"
                         :to="{name: 'UserHome', params: { uid: item.rcuid._id }}">
              <b class="blink font16">{{item.rcuid.fakename+' '}}</b>
            </router-link>
            <router-link v-else
                         target="_blank"
                         rel="noopener noreferrer"
                         :to="{name: 'UserHome', params: { uid: item.cuid._id }}">
              <b class="blink font16">{{item.cuid.fakename+' '}}</b>
            </router-link>
            <span v-if="$route.name === 'UserMessage'"
                  style="color: #999999"> 回复了您的评论</span>
            <span v-else
                  style="color: #999999"> 评论了文章
              <router-link v-if="$route.name === 'PostComment'"
                           target="_blank"
                           rel="noopener noreferrer"
                           :to="{path: `/detail/${item.pid._id}?cid=${item._id}`}">
                <span class="blink font16">{{item.pid.title}}</span>
              </router-link>
            </span>
          </div>
          <router-link v-if="$route.name === 'UserMessage'"
                       target="_blank"
                       rel="noopener noreferrer"
                       :to="{path: `/detail/${item.pid._id}?rid=${item._id}`}">
            <div class="replyContent pointer wrapContent link-hover"
                 v-html="item.content">
            </div>
          </router-link>
          <router-link v-else
                       target="_blank"
                       rel="noopener noreferrer"
                       :to="{path: `/detail/${item.pid._id}?cid=${item._id}`}">
            <div class="replyContent pointer wrapContent link-hover"
                 v-html="item.content">
            </div>
          </router-link>
          <p>
            <span>{{item.created | _moment}}</span>
            <router-link v-if="$route.name === 'UserMessage'"
                         target="_blank"
                         rel="noopener noreferrer"
                         :to="{path: `/detail/${item.pid._id}?rid=${item._id}`}">
              <span class="blink">回复</span>
            </router-link>
            <router-link v-else
                         target="_blank"
                         rel="noopener noreferrer"
                         :to="{path: `/detail/${item.pid._id}?cid=${item._id}`}">
              <span class="blink">回复</span>
            </router-link>
          </p>
        </div>
        <div v-if="$route.name === 'UserMessage'"
             class="message-main-right pointer wrapContent"
             v-html="item.rid? item.rid.content : item.cid.content"></div>
      </li>
    </ul>
    <div v-else
         style="textAlign:center">没有消息通知</div>
  </div>

</template>

<script>

export default {
  name: 'mesLists',
  data () {
    return {
      uid: '',
      mesLists: []
    }
  },
  props: {
    lists: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    lists: function (n, o) {
      this.mesLists = this.lists
    }
  }
}
</script>

<style lang="scss" scoped>
.message-main {
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(178, 186, 194, 0.75);
  height: auto;
  width: 100%;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  .message-main-left {
    margin-right: 10px;
    width: 80%;
    flex: 5;
    p {
      font-size: 12px;
      margin: 0 0 10px 0;
      color: #999999;
      span {
        padding: 0 10px 0 0;
      }
    }
    .replyContent {
      width: 100%;
      margin: 10px 0;
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
