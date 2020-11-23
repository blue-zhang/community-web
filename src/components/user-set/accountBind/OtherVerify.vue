<template>
  <form class="layui-form layui-form-pane pd-tb15 flex-center-col mga">
    <div class="layui-form-item flex-center-row mb20">
      <label class="layui-form-label">手机/邮箱</label>
      <div class="layui-input-inline ">
        <input type="text"
               v-model="vali_verify"
               placeholder="请输入邮箱/手机号"
               class="layui-input">
      </div>
    </div>
    <div class="layui-form-item flex-center-row mb20">
      <div class="layui-input-inline ">
        <input type="code"
               v-model="vali_code"
               placeholder="请输入验证码"
               class="layui-input">
      </div>
      <div class="layui-btn layui-btn-primary"
           :disabled='isSubmit'
           @click="sendCode"
           :class="{ 'layui-btn-disabled': isSubmit }">{{ isSubmit ? durtionCountTime + '后重发' : '获取验证码'}}</div>
    </div>
    <div class="layui-form-item flex-center-row">
      <button @click="submit"
              class="layui-btn btn-veri layui-btn-radius layui-btn-normal">验证身份</button>
    </div>
  </form>
</template>

<script>
import { otherVerify, sendCode } from '@/api/login'
import { durtionCountDown } from '@/utils/countDown'
import config from '@/config/config'
export default {
  name: 'OtherVerify',
  data () {
    return {
      isSubmit: false,
      vali_code: '',
      vali_verify: '',
      durtionCountTime: '1分10秒'
    }
  },
  props: {
    toName: {
      type: String,
      default: ''
    }
  },
  methods: {
    durtionCountDown,
    // 发送验证码
    sendCode () {
      sendCode({
        verify: this.vali_verify
      }).then(res => {
        if (res.code === 200) {
          localStorage.setItem('forgetCodeId', res.key)
          // 获取userkey，在跳转路由时使用
          localStorage.setItem('forgetUserId', res.userkey)
        } else {
          this.$alert(res.msg)
        }
        this.isSubmit = true
        this.durtionCountDown(config.sendCount, 'm', () => {
          this.isSubmit = false
        })
      })
    },
    // 验证验证码
    submit () {
      const userkey = localStorage.getItem('forgetUserId')
      const key = localStorage.getItem('forgetCodeId')
      otherVerify({
        code: this.vali_code,
        key
      }).then(res => {
        if (res.code === 200) {
          localStorage.removeItem('forgetUserId')
          this.$alert(res.msg)
          const barLists = JSON.parse(localStorage.getItem('barLists'))
          if (this.toName) {
            this.$router.push({
              name: this.toName,
              query: {
                userkey
              }
            })
          } else {
            this.$router.push({
              name: barLists[1].routerName
            })
          }
        } else {
          this.$alert(res.msg)
        }
      })
    }
  },
  mounted () {
    if (!this.toName) {
      // 用户中心对Progress的状态进行初始化
      let barLists = JSON.parse(localStorage.getItem('barLists'))
      barLists[1].name = this.$route.query.link ? this.$route.query.link : barLists[1].name
      barLists[1].complete = false
      barLists[2].complete = false
      barLists[0].complete = true
      this.$store.commit('getBarLists', barLists)
    }
    this.durtionCountTime = '秒'
    const countTime = localStorage.getItem('countTime')
    if (countTime !== '0s' && countTime !== null) {
      this.durtionCountDown(countTime, 'm', () => {
        this.isSubmit = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-form-item {
  margin: 0px;
  .layui-input-inline {
    margin: 0px;
  }
}
.btn-veri {
  width: 300px;
}
</style>
