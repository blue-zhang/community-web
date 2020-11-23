<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree layui-inline "
        :class="{ 'home-ul': $route.path === '/user/home' }"
        lay-filter="user">
      <router-link tag="li"
                   class="layui-nav-item"
                   v-for="(item, index) in lists"
                   :key="'center' + index"
                   :to="{name: item.name}"
                   :active-class="item.activeClass">
        <a>{{ item.title }}
          <!-- <span class="layui-badge-dot" /> -->
        </a>
      </router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'UserCenter',
  data () {
    return {
      showType: 'home',
      lists: this.$store.state.centerLists
    }
  },
  mounted () {
  // 用户复制一个窗口，在原来的窗口退出登录，另一窗口刷新的时候，让它自动跳转到首页。
  // 刷新一个窗口，并不会执行全局导航守卫，因为路由状态没有改变
    if (this.$store.state.isLogin === false) {
      console.log('axb')
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/iconfont/iconfont.css';
@import '../assets/scss/color.scss';
.home-ul {
  display: none;
}
::v-deep .layui-nav-tree {
  width: 150px;
}
::v-deep .layui-nav-item {
  width: 150px;
  a {
    padding: 0;
    display: block;
    height: 60px;
    line-height: 60px;
    text-align: left;
    padding-left: 16px;
    font-size: 16px;
    .iconfont {
      font-size: 20px;
      margin-right: 4px;
    }
  }
}
</style>
