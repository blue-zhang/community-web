<template>
  <validation-observer ref="form"
                       v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)"
          class="layui-form layui-form-pane pd-tb15 flex-center-col mga">
      <div class="layui-form-item flex-center-row">
        <validation-provider name="email"
                             rules="required|email"
                             v-slot="{ errors }">
          <label class="layui-form-label">新邮箱</label>
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
                  :class="{ 'layui-btn-disabled': isSubmit,  'layui-btn-normal': !isSubmit}">{{ isSubmit ? durtionCountTime + '秒后重新发送' : '发送验证邮件'}}</button>
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
      email: '',
      vali_email: '',
      isSubmit: false,
      // 设置默认值，因为定时器有点延迟
      durtionCountTime: 60
    }
  },
  methods: {
    durtionCountDown,
    onSubmit () {
      this.isSubmit = true
      this.durtionCountDown(config.sendCount, () => {
        this.isSubmit = false
      })
      changeEmail({
        newEmail: this.vali_email
      }).then(res => {
        if (res.code === 200) {
          // 通过邮件链接跳转到 Succ 页面，不在这里设置
          this.$alert(res.msg)
        } else {
          this.$alert(res.msg)
        }
      })
    }
  },
  mounted () {
    this.event.$emit('progress', 1)
    // 刷新页面后的定时器
    const countTime = Number(localStorage.getItem('countTime'))

    if (countTime) {
      this.durtionCountDown(countTime, () => {
        this.isSubmit = false
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    const arr = ['PwdVerify', 'OtherVerify', 'EmailChange']
    if (arr.every((name) => {
      return from.name !== name
    })) {
      next({ path: '/' })
    } else {
      next()
    }
  },
  beforeRouteLeave (to, from, next) {
    localStorage.removeItem('countTime')
    next()
  }
}
</script>

<style lang="scss" scoped>
</style>
