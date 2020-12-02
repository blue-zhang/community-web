<template>
  <table>
    <tbody>
      <tr>
        <td v-for="(item, index) in lists"
            :key="'AddDrafts' + index">
          <span class="draftItem-title pointer"
                @click.stop="selectPost(item.created)">{{item.title || '无标题'}}</span>
          <div class="draftItem-meta">
            <div class="draftItem-time">{{item.created | _moment}}</div>
            <div class="draftItem-separator">·</div>
            <div>共 {{item.content.length}} 字</div>
            <div class="draftItem-separator">·</div>
            <div class="pointer del"
                 @click="delDrafts(item.created)">删除</div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

</template>

<script>
import { getDrafts, delDrafts } from '@/api/content'
import moment from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
moment.extend(relativeTime)

export default {
  name: 'AddDrafts',
  data () {
    return {
      lists: []
    }
  },
  methods: {
    delDrafts (val) {
      delDrafts({ created: val }).then(res => {
        if (res.code === 200) {
          getDrafts().then(res => {
            if (res.code === 200) {
              this.lists = res.data
            }
          }).then(this.$bubble('删除成功'))
        }
      })
    },
    selectPost (created) {
      this.$router.push({ name: 'Add', params: { type: created } })
    }
  },
  filters: {
    _moment (val) {
      moment.locale('zh-cn')
      if (moment(val).isBefore(moment(moment().subtract(1, 'days')))) {
        return moment(val).format('YYYY-MM-DD')
      } else {
        return moment(val).locale('zh-cn').from(moment())
      }
    }
  },
  mounted () {
    getDrafts().then(res => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'Add') {
      next()
    } else {
      this.$store.commit('getCreated', '')
      this.$store.commit('getPost', {
        content: '',
        title: '',
        picUrl: ''
      })
      next()
    }
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
