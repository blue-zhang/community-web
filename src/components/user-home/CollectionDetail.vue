<template>
  <div class="middle-container2">
    <div class="seat"></div>
    <div class="mainContainer"
         style="margin: 0 20px">
      <div class="fly-home fly-panel">
        <h1>
          {{name}}
        </h1>
        <router-link :to="{ name: 'PostCollection',  params: { uid: $route.params.uid }}">
          <span style="marginTop: 20px"
                class="layui-btn">返回更多收藏</span>
        </router-link>
      </div>
      <lists-item :lists="lists"
                  @change-col="changeCol"
                  @change-praise="changePraise">
        <template v-slot:default="{ pid, index }">
          <button v-if="$store.state.userInfo._id === $route.params.uid"
                  type="button"
                  @click="cancelPost(pid, index)"
                  class="layui-btn layui-btn-primary">
            移除
          </button>
        </template>
      </lists-item>
    </div>
    <div class="rightContainer"></div>
    <div class="seat"></div>
  </div>
</template>

<script>
import { getPostLists, cancelPost } from '@/api/postCollect'
import ListsItem from '@/components/content/ListsItem'
export default {
  name: 'CollectionDetail',
  data () {
    return {
      lists: [],
      name: '',
      user: ''
    }
  },
  components: {
    ListsItem
  },
  methods: {
    // 收藏信息前端伪同步，父子组件传值
    changeCol (index, val, num) {
      this.lists[index].collected = val
      this.lists[index].stars = num
    },
    // 点赞信息前端伪同步，父子组件传值
    changePraise (index, val, num) {
      this.lists[index].handed = val
      this.lists[index].hands = num
    },
    async cancelPost (pid, index) {
      const res = await cancelPost({ pid, colId: this.$route.params.colId })
      if (res.code === 200) {
        this.$bubble(res.msg)
        this.lists.splice(index, 1)
      }
    }
  },
  async mounted () {
    console.log(this.$route.params.colId)
    const res = await getPostLists({ colId: this.$route.params.colId, uid: this.$route.params.uid })
    if (res.code === 200) {
      this.lists = res.data
      this.name = res.name
      this.user = res.user
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layui-btn-group {
  border: none;
  .layui-btn {
    border: 1px #eeeeee solid;
    color: #b2bac2;
    height: 30px;
    line-height: 30px;
    padding: 0 7px;
  }
  .layui-btn:nth-child(2) {
    padding: 0 7px;
  }
  .layui-btn:nth-child(3) {
    padding: 0 7px;
  }
}

.isreply {
  font-size: 10px;
  color: #c2ccd0;
}
.lsItemLi {
  border: 1px solid rgba(178, 186, 194, 0.15);
  padding: 10px 10px 0px 10px;
  height: auto;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  .lsItemMain {
    width: 85%;
    padding-bottom: 5px;
  }
  .lsItemTop {
    font-size: 12px;
    color: #999999;
    a {
      margin-left: 5px;
    }
  }
  .picRegin {
    flex: 0 0 auto;
    min-width: 75px;
    height: 75px;
    img {
      height: 75px;
      width: 75px;
    }
  }
  h2 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 10px;
    &:hover {
      transform: scale(1.05, 1.05);
      // color: #175199;
      color: #01aaed;
    }
    transition: transform 0.5s, color 0.5s;
    transform-origin: left;
  }
  .handed {
    color: #ff5722;
  }
}
</style>
