<template>
  <div class="layui-tab layui-tab-brief">
    <ul v-if="!isLogin"
        class="layui-tab-title">
      <li>
        <router-link :to="{ name: 'Login' }">登入</router-link>
      </li>
      <li class="layui-this">重置密码</li>
    </ul>
    <div v-else
         class="mt20 mb20 ml20">
      您的位置：
      <router-link :to="{name: routerName}"
                   class="fwb">
        {{name}} </router-link><i class="layui-icon layui-icon-right"></i>
      <span>忘记密码</span>

    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      name: '',
      routerName: '',
      isLogin: this.$store.state.isLogin
    }
  },
  mounted () {
    const barLists = this.$store.state.barLists
    this.name = barLists[1].name
    this.routerName = barLists[0].routerName
  }
}
</script>

<style lang="scss" scoped>
</style>
