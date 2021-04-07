<template>
  <div>
    <lists-item :lists="lists"
                v-if="lists.length"
                :showActivites='"1"'
                @change-col="changeCol"
                @change-praise="changePraise">
    </lists-item>
    <page-bar v-show="total > limit"
              :total="total"
              :current="current"
              :align="'left'"
              :size="limit"
              :hasTotal="true"
              :hasSelect="false"
              @changeCurrent="handleChange"></page-bar>
  </div>
</template>

<script>
import { getActivites } from '@/api/user'
import PageBar from '@/components/modules/pagination/Index'
import ListsItem from '@/components/content/ListsItem'
export default {
  name: 'MyActivites',
  components: {
    PageBar,
    ListsItem
  },
  data () {
    return {
      total: 0,
      current: 0,
      page: 0,
      limit: 12,
      lists: [1]
    }
  },
  methods: {
    async getLists () {
      const res = await getActivites({
        limit: this.limit,
        page: this.current,
        uid: this.$route.params.uid
      })
      if (res.code === 200) {
        this.lists = res.data
        this.total = res.total
      }
    },
    handleChange (val) {
      this.current = val
      this.getLists()
    },
    // 收藏信息前端伪同步，父子组件传值
    changeCol (index, val, num) {
      this.lists[index].collected = val
      this.lists[index].stars = num
    },
    // 点赞信息前端伪同步，父子组件传值
    changePraise (index, val, num) {
      this.lists[index].handed = val
      this.lists[index].hands = num
    }
  },
  async mounted () {
    await this.getLists()
  }
}
</script>

<style lang="scss" scoped>
.isreply {
  font-size: 10px;
  color: #c2ccd0;
}
.activites {
  padding: 10px;
  color: #8a9aa9;
}
.lsItemLi {
  border: 1px solid rgba(178, 186, 194, 0.15);
  padding: 10px 10px 0px 10px;
  height: auto;
  display: flex;
  flex-flow: row;
  justify-content: center;
  .lsItemMain {
    flex: 1;
    padding-bottom: 5px;
    .lsItemTop {
      font-size: 12px;
      color: #999999;
      a {
        margin-left: 5px;
      }
    }
    h2 {
      font-size: 18px;
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
    ::v-deep .layui-btn-group {
      border: none;
      .layui-btn {
        width: 65px;
        border: 1px #eeeeee solid;
        color: #b2bac2;
        height: 30px;
        line-height: 30px;
        padding-left: 3px;
      }
      .layui-btn:nth-child(4) {
        border: none;
        color: #999999;
      }
      .layui-btn:nth-child(5) {
        border: none;
        color: #ff5722;
      }
    }
  }
  .picRegin {
    width: 100px;
    height: 75px;
    img {
      height: 75px;
      width: 100px;
    }
  }

  .handed {
    color: #ff5722 !important;
  }
}
</style>
