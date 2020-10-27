<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <ul class="layui-nav layui-nav-tree layui-inline layui-bg-black"
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
  name: 'Center',
  data() {
    return {
      showType: 'home',
      lists: this.$store.state.centerLists
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/iconfont/iconfont.css';
@import '../assets/scss/color.scss';
.home-ul {
  transform: translate(-100px, 0);
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
    font-size: 18px;
    .iconfont {
      font-size: 20px;
      margin-right: 4px;
    }
  }
}
.user-home-container {
}
</style>