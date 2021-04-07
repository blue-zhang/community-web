<template>
  <table>
    <tbody>
      <tr>
        <td v-show="lists.length !== 0"
            v-for="(item, index) in lists"
            :key="'AddDrafts' + index">
          <span class="draftItem-title pointer"
                @click.stop="selectPost(item._id)">{{item.title || '无标题'}}</span>
          <div class="draftItem-meta">
            <div class="draftItem-time">{{item.updated | _moment}}</div>
            <div class="draftItem-separator">·</div>
            <div>共 {{item.content.length}} 字</div>
            <div class="draftItem-separator">·</div>
            <div class="pointer del"
                 @click="delDrafts(item._id)">删除</div>
          </div>
        </td>
        <td v-show="lists.length === 0">
          <span class="draftItem-title pointer"> 您的草稿箱为空 </span>
        </td>
      </tr>
    </tbody>
  </table>

</template>

<script>
import { getDrafts, delDrafts } from '@/api/content'

export default {
  name: 'AddDrafts',
  data () {
    return {
      lists: [],
      id: ''
    }
  },
  methods: {
    delDrafts (id) {
      delDrafts({ id: id }).then(res => {
        if (res.code === 200) {
          // 获取草稿箱列表，不传参数
          getDrafts().then(res => {
            if (res.code === 200) {
              this.lists = res.data
            }
          }).then(this.$bubble('删除成功'))
        }
      })
    },
    selectPost (id) {
      this.id = id
      this.$router.push({ name: 'AddEditor', query: { pid: this.id } })
    }
  },
  mounted () {
    // 获取草稿箱列表，不传参数
    getDrafts().then(res => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  },
  async beforeRouteLeave (to, from, next) {
    if (to.name === 'AddEditor' && this.id) {
      const res = await getDrafts(this.id)
      if (res.code === 200) {
        this.$store.commit('setPost', {
          content: res.data.content,
          title: res.data.title,
          picUrl: res.data.picUrl,
          pid: res.data._id
        })
        this.id = ''
      }
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  margin-top: 15px;
  border-bottom: 1px solid #e5e9ef;
  tr {
    text-align: left;
    td {
      border-top: 1px solid #e5e9ef;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-flow: column nowrap;
      height: 90px;
      .draftItem-title {
        color: #333;
        font-size: 20px;
        text-overflow: ellipsis;
      }
      .draftItem-meta {
        color: #808080;
        margin-top: 5px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-flow: row nowrap;
        div {
          margin-right: 5px;
        }
      }
    }
  }
}
.del {
  &:hover {
    color: #333;
    font-weight: bold;
  }
}
</style>
