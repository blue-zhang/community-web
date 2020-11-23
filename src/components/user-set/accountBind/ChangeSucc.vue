<template>
  <div class="flex-center-col">
    <div class="succ-msg">
      {{msg}}
    </div>
    <!-- 加一个自动跳转的功能 -->
    <router-link :to="{name: 'index'}"
                 class="fwb">
      <button class="layui-btn layui-btn-normal mt20 mb20">返回首页</button>
    </router-link>
    <div class="succ-msg">{{durtionCountTime}}后自动返回首页</div>
  </div>

</template>

<script>
import { updateEmail } from '@/api/userAccount'
import { durtionCountDown } from '@/utils/countDown'
import config from '@/config/config'
export default {
  name: 'ChangeSucc',
  data () {
    return {
      msg: '',
      durtionCountTime: '6秒'
    }
  },
  methods: {
    durtionCountDown
  },
  mounted () {
    let barLists = JSON.parse(localStorage.getItem('barLists'))
    barLists[2].complete = true
    barLists[1].complete = true
    barLists[0].complete = true
    this.$store.commit('getBarLists', barLists)
    // 修改绑定邮箱功能，是跳转到成功界面的时候执行更新邮箱的操作。
    const type = this.$route.query.type
    this.msg = this.$router.query.msg
    if (type === 'UpdateEmail') {
      const key = this.$route.query.key
      updateEmail({
        key
      }).then(res => {
        this.msg = res.msg
      })
    }
    this.durtionCountDown(config.indexCount, 's', () => {
      this.$router.push({ name: 'index' })
    })
  }
}
</script>

<style lang="scss" scoped>
.succ-msg {
  text-align: center;
  font-size: 20px;
}
</style>
