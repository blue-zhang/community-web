<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item, index) in items" :key="'listitem' + index">
        <a href="" class="fly-avatar">
          <!-- 所有用到了data数据的属性，前面都要加： -->
          <img :src="item.uid.pic" alt="贤心" />
        </a>
        <h2>
          <a class="layui-badge">{{ item.catalog }}</a>
          <a href="">{{ item.title }}</a>
          <a class="isreply" href="" v-if="item.isReply === '0'">不可回复</a>
        </h2>
        <div class="fly-list-info">
          <a href="" link>
            <cite>{{ item.uid.name }}</cite>
            <i
              class="layui-badge fly-badge-vip"
              v-if="item.uid.isVip !== '0'"
              >{{ 'VIP' + item.uid.isVip }}</i
            >
            <i v-else>普通用户</i>
          </a>
          <span>{{ item.created | _moment }}</span>
          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"
            ><i class="iconfont icon-kiss"></i>{{ item.fav }}</span
          >
          <span class="layui-badge fly-badge-accept layui-hide-xs">{{
            item.isEnd === '0' ? '未结' : '已结'
          }}</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i>
            {{ item.answer }}
          </span>
        </div>
        <!--
        @解释: tags是一个对象
        -->
        <div class="fly-list-badge" v-show="item.tags.length > 0">
          <span
            class="layui-badge"
            v-for="(tag, index) in item.tags"
            :key="'tag' + index"
            :class="tag.class"
            >{{ tag.name }}</span
          >
        </div>
      </li>
    </ul>
    <div style="text-align: center" v-show="isShow">
      <div class="laypage-main">
        <a
          @click.prevent="more()"
          href="jie/index.html"
          class="laypage-next"
          v-show="isShow"
          v-if="isEnd"
          >更多内容</a
        >
        <p v-else>已经到底了</p>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import moment from 'moment'
// import 'moment/locale/zh-cn'

export default {
  name: 'ListsItem',
  props: {
    lists: {
      type: Array,
      default: () => [
        {
          tags: {
            name: ''
          }
        }
      ]
    },
    /**
     * @:Top组件不需要分页按钮，传递一个false
     */
    isShow: {
      type: Boolean,
      default: true
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    more () {
      this.$emit('nextPage')
    }
  },
  computed: {
    items () {
      _.map(this.lists, (item) => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'discuss':
            item.catalog = '交流'
            break
        }
      })
      return this.lists
    }
  },
  filters: {
    _moment (val) {
      moment.locale('zh-cn')
      /**
       * @功能1: 超过7天，显示具体的创建日期
       * @功能2: 7天之内，只显示多长时间之前创建的
       * @解释1: moment()，显示当前时间
       * @解释2: form(moment())，显示 val 与现在以外的时间的相对时间
       */
      if (moment(val).isBefore(moment())) {
        return moment(val).format('lll')
      } else {
        return moment(val).from(moment())
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.isreply {
  font-size: 10px;
  color: #c2ccd0;
}
</style>
