<template>
  <div>
    <navigation-bar></navigation-bar>
    <progress-bar></progress-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import ProgressBar from '@/components/ProgressBar'
export default {
  name: 'AccountBar',
  components: {
    NavigationBar,
    ProgressBar
  },
  mounted () {
  // 用户复制一个窗口，在原来的窗口退出登录，另一窗口刷新的时候，让它自动跳转到首页。
  // 刷新一个窗口，并不会执行全局导航守卫，因为路由状态没有改变
    if (this.$store.state.isLogin === false) {
      console.log('mounted强制跳转')
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
