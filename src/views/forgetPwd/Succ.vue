<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user"
         pad20>
      <forget-bar></forget-bar>
      <div class="flex-center-col">
        <div class="succ-msg">
          您的密码已经重置
        </div>
        <router-link :to="{name: routerName}"
                     class="fwb">
          <button class="layui-btn layui-btn-normal mt20 mb20">返回{{name}}界面</button>
        </router-link>
        <div class="succ-msg">{{durtionCountTime}}后自动返回{{name}}界面</div>
      </div>
    </div>
  </div>
</template>
<script>
import { durtionCountDown } from '@/utils/countDown'
import config from '@/config/config'
import ForgetBar from './ForgetBar'
export default {
  name: 'Succ',
  components: {
    ForgetBar
  },
  data () {
    return {
      routerName: '',
      name: '',
      durtionCountTime: '6秒'
    }
  },
  methods: {
    durtionCountDown
  },
  mounted () {
    if (!this.$store.state.isLogin) {
      this.routerName = 'Login'
      this.name = '登录'
    } else {
      const barLists = this.$store.state.barLists
      this.name = barLists[1].name
      this.routerName = barLists[0].routerName
    }
    this.durtionCountDown(config.indexCount, 's', () => {
      this.$router.push({ name: this.routerName })
    })
  }
}
</script>
<style scoped>
</style>
