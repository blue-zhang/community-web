<template>
  <div>

    <div class="layui-tab layui-tab-brief">
      <ul class="layui-tab-title">
        <li>
          <router-link :to="{ name: 'Login' }">登入</router-link>
        </li>
        <li class="layui-this">重置密码</li>
      </ul>
    </div>

    <validation-observer ref="form"
                         v-slot="{ handleSubmit }">
      <form class="layui-form layui-form-pane layui-tab-item layui-show pd-tb15 flex-center-col mga"
            @submit.prevent="handleSubmit(onSubmit)">

        <div class="layui-form-item flex-center-row"
             style="margin-bottom: 15px">
          <label class="layui-form-label">邮箱</label>
          <div class="layui-input-inline ">
            <input type="text"
                   v-model="vali_account"
                   placeholder="请输入邮箱"
                   class="layui-input">
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
          <validation-provider name="password"
                               rules="required|minmax:6,16"
                               v-slot="{ errors }">
            <label class="layui-form-label">新密码</label>
            <div class="layui-input-inline">
              <input type="password"
                     v-model="vali_password"
                     placeholder="请输入新密码"
                     class="layui-input">
              <div class="input-error layui-form-mid">
                {{ errors[0] }}
              </div>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item flex-center-row">
          <validation-provider name="confirm"
                               rules="is:@password"
                               v-slot="{ errors }">
            <label class="layui-form-label">再输一次</label>
            <div class="layui-input-inline">
              <input type="password"
                     v-model="vali_confirm"
                     placeholder="请重复输入密码"
                     class="layui-input">
              <div class="input-error layui-form-mid">
                {{ errors[0] }}
              </div>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item flex-center-row ">
          <button class="layui-btn btn-veri layui-btn-radius layui-btn-normal"
                  type="submit">修改密码</button>
        </div>
      </form>
    </validation-observer>
  </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { sendEmail } from '@/api/userAccount'
import { reset } from '@/api/login'
import { durtionCountDown } from '@/utils/countDown'
import config from '@/config/config'

export default {
  name: 'Forget',
  data () {
    return {
      vali_password: '',
      vali_confirm: '',
      isSubmit: false,
      vali_code: '',
      vali_account: '',
      durtionCountTime: 60
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
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
        this.durtionCountDown(config.sendCount, 'm', () => {
          this.isSubmit = false
        })
      })
    },
    // 验证验证码
    onSubmit () {
      const key = localStorage.getItem('ac_emailCodeId')
      reset({
        password: this.vali_password,
        code: this.vali_code,
        email: this.vali_account,
        key
      }).then(res => {
        if (res.code === 200) {
          localStorage.removeItem('ac_emailCodeId')
          this.$alert(res.msg)
          this.$router.push({
            name: 'Login'
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
