<template>
  <validation-observer ref="form"
                       v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)"
          class="layui-form layui-form-pane pd-tb15 flex-center-col mga">
      <div class="layui-form-item flex-center-row">
        <validation-provider name="email"
                             rules="required|email"
                             v-slot="{ errors }">
          <!-- <label class="layui-form-label">新邮箱</label> -->
          <div class="layui-input-inline ">
            <input type="text"
                   :disabled="isSubmit"
                   v-model="vali_email"
                   placeholder="请输入要绑定邮箱"
                   class="layui-input">
            <div class="input-error layui-form-mid">
              {{ errors[0] }}
            </div>
          </div>
          <button class="layui-btn"
                  type="submit"
                  :class="{ 'layui-btn-disabled': isSubmit,  'layui-btn-normal': !isSubmit}">{{ isSubmit ? durtionCountTime + '后重新发送' : '发送验证邮件'}}</button>
        </validation-provider>
      </div>
      <div class="layui-word-aux flex-center-row">将对新邮箱发送验证邮件，点击验证邮件的链接，即可绑定新邮箱<a href="activate.html"
           style="font-size: 12px; color: #4f99cf;"></a>。</div>
    </form>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { durtionCountDown } from '@/utils/countDown'
import { changeEmail } from '@/api/userAccount'
import config from '@/config/config'

export default {
  name: 'EmailChange',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      vali_email: '',
      isSubmit: false,
      // 设置默认值，因为定时器有点延迟
      durtionCountTime: '1分30秒'
    }
  },
  methods: {
    durtionCountDown,
    onSubmit () {
      this.isSubmit = true
      this.durtionCountDown(config.sendCount, 'm', () => {
        this.isSubmit = false
      })
      changeEmail({
        newEmail: this.vali_email
      }).then(res => {
        if (res.code === 200) {
          this.$alert(res.msg)
        } else {
          this.$alert(res.msg)
        }
      })
    }
  },
  mounted () {
    // 改变progressbar的显示
    let barLists = JSON.parse(localStorage.getItem('barLists'))
    barLists[1].complete = true
    this.$store.commit('getBarLists', barLists)
    // 刷新页面后的定时器
    this.durtionCountTime = '秒'
    const countTime = localStorage.getItem('countTime')
    if (countTime !== '0s' && countTime !== null) {
      this.isSubmit = true
      this.durtionCountDown(countTime, 'm', () => {
        this.isSubmit = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
