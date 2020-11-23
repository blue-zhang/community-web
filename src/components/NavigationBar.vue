<template>
  <div class="mt20 mb20 ml20">
    您的位置：
    <router-link :to="{name: 'index'}"
                 class="fwb">
      首页 </router-link><i class="layui-icon layui-icon-right"></i>
    <router-link :to="{name: 'UserIndex'}"
                 class="fwb">
      用户中心 </router-link><i class="layui-icon layui-icon-right"></i>
    <router-link :to="{name: 'UserSecurty'}"
                 class="fwb">
      账号安全 </router-link><i class="layui-icon layui-icon-right"></i>
    <span>{{barName}}</span>

  </div>
</template>

<script>

export default {
  name: 'NavigationBar',
  data () {
    return {
      barName: ''
    }
  },
  methods: {
    naviHandler () {
      this.barName = '忘记密码'
    }
  },
  mounted () {
    let barLists = JSON.parse(localStorage.getItem('barLists'))
    // 以progressbar的第二步骤的名字作为导航栏最后一栏
    this.barName = barLists[1].name
  }
}
</script>

<style lang="scss" scoped>
</style>
