<template>
  <div>
    <ul class="fly-list">
      <li v-for="(item, index) in lists"
          :key="'listitem' + index">
        <a href=""
           class="fly-avatar">
          <img class="pic"
               :src="item.uid.pic" />
        </a>
        <h2>
          <a class="layui-badge">{{ item.catalog | _catalog}}</a>
          <a href="">{{ item.title }}</a>
          <a class="isreply"
             href=""
             v-if="item.isReply === '0'">不可回复</a>
          <a class="layui-badge fly-badge-accept layui-hide-xs">{{
            item.isEnd === '0' ? '未结' : '已结'
          }}</a>
        </h2>
        <div class="fly-list-info">
          <a href=""
             link
             class="username">
            <cite>{{ item.uid.fakename }}</cite>
            <i class="co-origin"
               v-if="item.uid.isVip !== '0'">{{ 'VIP' + item.uid.isVip }}</i>
            <i v-else></i>
          </a>
          <span>发布于{{ item.created | _moment }}</span>
          <span>{{ item.reads }}次阅读</span>
          <span class="fly-list-kiss layui-hide-xs"
                title="悬赏积分"><i class="layui-icon layui-icon-praise"></i>{{ item.fav }}</span>
          <span class="fly-list-kiss layui-hide-xs"
                title="收藏数"><i class="layui-icon layui-icon-rate"></i>{{ item.star }}</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1"
               title="回答"></i>
            回复数：{{ item.answer }}
          </span>
        </div>
        <div class="fly-list-badge"
             v-show="item.tags.length > 0">
          <span class="layui-badge"
                v-for="(tag, index) in item.tags"
                :key="'tag' + index"
                :class="tag.class">{{ tag.name }}</span>
        </div>
      </li>
    </ul>
    <div style="text-align: center"
         v-show="isShow">
      <div class="laypage-main">
        <a @click.prevent="more()"
           class="laypage-next"
           v-if="!isLastPage">更多内容</a>
        <p v-else>已经到底了</p>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'

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
    // 判断是否显示分页按钮
    // Top组件不需要分页按钮，传递一个false
    isShow: {
      type: Boolean,
      default: true
    },
    // 判断是否显示  显示更多
    isLastPage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    more () {
      this.$emit('nextPage')
    }
  },
  filters: {
    _moment (val) {
      moment.locale('zh-cn')
      /**
       * @功能1: 超过7天，显示具体的创建日期
       * @功能2: 7天之内，只显示多长时间之前创建的
       */
      if (moment(val).isBefore(moment(moment().subtract(7, 'days')))) {
        return moment(val).format('YYYY-MM-DD')
      } else {
        return moment(val).from(moment())
      }
    },
    _catalog (val) {
      switch (val) {
        case 'ask':
          val = '提问'
          break
        case 'share':
          val = '分享'
          break
        case 'logs':
          val = '动态'
          break
        case 'notice':
          val = '公告'
          break
        case 'advise':
          val = '建议'
          break
        case 'discuss':
          val = '交流'
          break
      }
      return val
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
