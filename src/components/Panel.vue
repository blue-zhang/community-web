<!--
 * @Author: your name
 * @Date: 2020-10-27 10:42:16
 * @LastEditTime: 2021-03-07 13:33:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\Panel.vue
-->
<template>
  <div id="headerPanel"
       class="fly-panel fly-column">
    <div class="layui-container">
      <ul class="layui-clear">
        <router-link tag="li"
                     to="/"
                     class="layui-hide-xs"><a href="">首页</a>
        </router-link>
        <router-link v-for="(item, index) in lists"
                     :key="'panel' + index"
                     tag="li"
                     :to="item.path"><a href="">{{
            item.type
          }}<span v-if=item.isDot
                  class="layui-badge-dot">
            </span></a>
        </router-link>
        <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
          <span class="fly-mid"></span>
        </li>
        <router-link v-for="(item, index) in favLists"
                     :key="'panelFavLists' + index"
                     tag="li"
                     :to="item.path"><a href="">{{
            item.type
          }}<span v-if=item.isDot
                  class="layui-badge-dot">
            </span></a>
        </router-link>
        <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
          <span class="fly-mid"></span>
        </li>
        <!-- 用户登入后显示 -->
        <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
          <router-link target="_blank"
                       class="ToUidHome"
                       rel="noopener noreferrer"
                       :to="{name: 'UserPost', params: { uid: $store.state.userInfo._id }}">我发表的贴
          </router-link>
        </li>
        <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block">
          <router-link target="_blank"
                       class="ToUidHome"
                       rel="noopener noreferrer"
                       :to="{name: 'PostCollection', params: { uid: $store.state.userInfo._id }}">我的收藏夹
          </router-link>
        </li>
      </ul>
      <div class="fly-column-right layui-hide-xs">
        <!-- 搜索按钮 -->
        <!-- <span class="fly-search"><i class="layui-icon"></i></span> -->
        <router-link :to="{name: 'AddEditor'}"
                     style="backgroundColor: #5fb878"
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
          type: '建议',
          path: '/index/advise',
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
      ],
      favLists: [
        {
          type: '提问',
          path: '/index/ask',
          isDot: false
        },
        {
          type: '讨论',
          path: '/index/discuss',
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
>
.fly-panel {
  position: fixed;
  top: 59px;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: top 0.3s;
}
</style>
