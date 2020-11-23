<template>
  <div>
    <div class="layui-container fly-marginTop">
      <div class="fly-panel pd100">
        <div class="layui-form layui-form-pane">
          <div class="layui-tab layui-tab-brief"
               lay-filter="user">
            <ul class="layui-tab-title">
              <router-link tag="li"
                           :to="{name: 'Add'}"
                           class="">发表新帖
              </router-link>
              <li class="layui-this">草稿箱
              </li>
            </ul>
            <table>
              <tbody>
                <tr>
                  <td v-for="(item, index) in lists"
                      :key="'AddDrafts' + index">
                    <a class="draftItem-title"
                       href=''>{{item.title}}</a>
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
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import moment from 'moment'
import { getDrafts, delDrafts } from '@/api/content'
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
    }
  },
  filters: {
    _moment (val) {
      moment.locale('zh-cn')
      /**
       * @功能1: 超过1天，显示具体的创建日期
       * @功能2: 1天之内，只显示多长时间之前创建的
       */
      if (moment(val).isBefore(moment(moment().subtract(1, 'days')))) {
        return moment(val).format('YYYY-MM-DD')
      } else {
        return moment(val).from(moment())
      }
    }
  },
  mounted () {
    getDrafts().then(res => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
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
