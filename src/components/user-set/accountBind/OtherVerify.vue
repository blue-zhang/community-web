<template>
  <validation-observer ref="form"
                       v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(onSubmit)"
          class="layui-form layui-form-pane pd-tb15 flex-center-col mga">
      <div class="layui-form-item flex-center-row"
           style="margin-bottom: 15px">
        <validation-provider name="email"
                             rules="required|email"
                             v-slot="{ errors }">
          <label class="layui-form-label">邮箱</label>
          <div class="layui-input-inline ">
            <input type="text"
                   v-model="vali_account"
                   placeholder="请输入邮箱"
                   class="layui-input">
            <div class="input-error layui-form-mid">
              {{ errors[0] }}
            </div>
          </div>

          <div class="layui-form-item flex-center-row"
               style="margin-bottom: 15px">
            <div class="layui-input-inline ">
              <input type="code"
                     v-model="vali_code"
                     placeholder="请输入验证码"
                     class="layui-input">
            </div>
            <div class="layui-btn layui-btn-primary"
                 :disabled='isSubmit'
                 @click="sendEmail"
                 :class="{ 'layui-btn-disabled': isSubmit }">{{ isSubmit ? durtionCountTime + '秒后重发' : '获取验证码'}}</div>
          </div>

          <div class="layui-form-item flex-center-row">
            <button type="submit"
                    class="layui-btn btn-veri layui-btn-radius layui-btn-normal">验证身份</button>
          </div>

        </validation-provider>
      </div>
    </form>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { otherVerify, sendEmail } from '@/api/userAccount'
import { durtionCountDown } from '@/utils/countDown'
import config from '@/config/config'

export default {
  name: 'OtherVerify',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      isSubmit: false,
      vali_code: '',
      vali_account: '',
      durtionCountTime: 60
    }
  },
  methods: {
    durtionCountDown,
    // 往邮箱发送验证码
    sendEmail () {
      sendEmail({
        email: this.vali_account
      }).then(res => {
        if (res.code === 200) {
          this.$alert(res.msg)
          localStorage.setItem('ac_emailCodeId', res.key)
        } else {
          this.$alert(res.msg)
        }
        this.isSubmit = true
        this.durtionCountDown(config.sendCount, () => {
          this.isSubmit = false
        })
      })
    },
    // 验证验证码
    onSubmit () {
      const key = localStorage.getItem('ac_emailCodeId')
      otherVerify({
        code: this.vali_code,
        key
      }).then(res => {
        if (res.code === 200) {
          localStorage.removeItem('ac_emailCodeId')
          this.$alert(res.msg)
          this.$router.push({
            name: this.$route.query.comName,
            query: { comName: this.$route.query.comName, textName: this.$route.query.textName }
          })
        } else {
          this.$alert(res.msg)
        }
      })
    }
  },
  mounted () {
    this.event.$emit('progress', 0)

    const countTime = Number(localStorage.getItem('countTime'))

    if (countTime) {
      this.durtionCountDown(countTime, () => {
        this.isSubmit = false
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    localStorage.removeItem('countTime')
    next()
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
