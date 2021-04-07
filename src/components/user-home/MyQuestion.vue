<template>
  <div>
    <div class="overflow">
      <lists-item :lists="lists"
                  v-if="lists.length"
                  @change-col="changeCol"
                  @change-praise="changePraise">
        <template v-slot:default="{ pid, index, item }">
          <button type="button"
                  class="layui-btn layui-btn-primary"
                  :class="{'layui-btn-disabled': item.isEnd === '1'}"
                  @click="update(pid,item)">编辑</button>
          <button type="button"
                  class="layui-btn layui-btn-primary"
                  @click="delPost(item, index)">删除</button>
        </template>
      </lists-item>
      <div v-else
           style="textAlign: center;color: #999999">还没有进行过提问</div>
    </div>
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
import { userQuestion, delPost } from '@/api/content'
import PageBar from '@/components/modules/pagination/Index'
import ListsItem from '@/components/content/ListsItem'
export default {
  name: 'MyQuestion',
  components: {
    PageBar,
    ListsItem
  },
  data () {
    return {
      lists: [1],
      total: 0,
      current: 0,
      page: 0,
      limit: 8,
      id: '',
      post: ''
    }
  },
  methods: {
    changeCol (index, val, num) {
      this.lists[index].collected = val
      this.lists[index].stars = num
    },
    // 点赞信息前端伪同步，父子组件传值
    changePraise (index, val, num) {
      this.lists[index].handed = val
      this.lists[index].hands = num
    },
    async getPost () {
      const res = await userQuestion({
        page: this.current,
        limit: this.limit,
        uid: this.$route.params.uid
      })
      if (res.code === 200) {
        this.lists = res.data
        this.total = res.total
      }
    },
    toDetail (id, post) {
      this.id = id
      this.post = post
      setTimeout(() => {
        document.querySelector('.toDetail_link').click()
      }, 0)
    },
    delPost (post, index) {
      this.$confirm('您确定要删除这篇文章吗？', () => {
        if (post.isEnd === '1') {
          this.$pop('shake', '帖子已经结贴，无法删除')
        } else {
          delPost({ pid: post._id }).then((res) => {
            this.$bubble(res.msg)
            this.lists.splice(index, 1)
          })
        }
      }, () => { })
    },
    handleChange (val) {
      this.current = val
      this.getPost()
    },
    update (updatePid, post) {
      if (post.isEnd === '1') {
        this.$pop('shake', '帖子已经结贴，无法编辑')
      } else {
        this.$router.push({ name: 'PostUpdate', params: { updatePid, post } })
      }
    }
  },
  async mounted () {
    await this.getPost()
  }
}
</script>

<style lang="scss" scoped>
.titleIntend {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover {
    color: #01aaed;
  }
}
.overflow {
  overflow-y: auto;
}
.min-cell {
  min-width: 80px;
}
.layui-table-header {
  th {
    text-align: center;
    &:first-child {
      text-align: left;
    }
  }
}
</style>
