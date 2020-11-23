<template>
  <div class="fly-panel fly-column">
    <div class="layui-container">
      <ul class="layui-clear">
        <router-link tag="li"
                     to="/index"
                     class="layui-hide-xs"><a href="">首页</a></router-link>
        <router-link v-for="(item, index) in lists"
                     :key="'panel' + index"
                     tag="li"
                     :to="item.path"><a href="">{{
            item.type
          }}<span v-if=item.isDot
                  class="layui-badge-dot"></span></a></router-link>
        <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
          <span class="fly-mid"></span>
        </li>
        <!-- 用户登入后显示 -->
        <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><a href="user/index.html">我发表的贴</a></li>
        <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><a href="user/index.html#collection">我收藏的贴</a></li>
      </ul>
      <div class="fly-column-right layui-hide-xs">
        <!-- 搜索按钮 -->
        <span class="fly-search"><i class="layui-icon"></i></span>
        <router-link :to="{name: 'Add'}"
                     class="layui-btn">发表新帖</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Panel',
  data () {
    return {
      lists: [
        {
          type: '提问',
          path: '/index/ask',
          isDot: false
        },
        {
          type: '建议',
          path: '/index/advise',
          isDot: false
        },
        {
          type: '交流',
          path: '/index/discuss',
          isDot: false
        },
        {
          type: '分享',
          path: '/index/share',
          isDot: false
        },
        {
          type: '动态',
          path: '/index/logs',
          isDot: false
        },
        {
          type: '公告',
          path: '/index/notice',
          isDot: false
        }
      ]
    }
  }
}
</script>
<style
  lang="scss"
  scoped
></style>
