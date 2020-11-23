<template>
  <validation-observer ref="form"
                       v-slot="{ handleSubmit }">
    <form class="layui-form layui-form-pane layui-show pd-tb15 flex-center-row"
          @submit.prevent="handleSubmit(onSubmit)">
      <div class="pwd-item"></div>
      <div class="pwd-item">
        <div class="layui-form-item flex-center-row">
          <validation-provider rules="required|minmax:6,16"
                               v-slot="{ errors }">
            <label class="layui-form-label">密码</label>
            <div class="layui-input-inline ">
              <input type="password"
                     name="password"
                     placeholder="请输入您的密码"
                     v-model="vali_password"
                     class="layui-input">
              <div class="input-error layui-form-mid">
                {{ errors[0] }}
              </div>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item flex-center-row">
          <validation-provider name="code"
                               rules="required|length:4"
                               v-slot="{ errors }">
            <label class="layui-form-label">验证码</label>
            <div class="layui-input-inline">
              <input type="text"
                     name="code"
                     v-model="vali_code"
                     placeholder="输入您的验证码"
                     class="layui-input">
              <div class="input-error layui-form-mid">
                {{ errors[0] }}
              </div>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item flex-center-row">
          <button type="submit"
                  class="layui-btn btn-veri layui-btn-radius layui-btn-normal">验证身份</button>
        </div>
      </div>

      <div class="flex-start-col pwd-item pwd-item-other">
        <div style="padding-left: 10px">
          <router-link :to='{name: "Forget"}'>忘记密码</router-link>
        </div>

        <div style="padding-left: 10px">
          <router-link :to='{name: "OtherVerify"}'>其他验证方式</router-link>
        </div>
        <div class="svg-captcha layui-form-mid"
             v-html="vali_svg"
             @click="_getCaptcha()"></div>
      </div>
    </form>
  </validation-observer>
</template>

<script>
import mixin from '@/mixin/mixin-login'
import { pwdVerify } from '@/api/userAccount'

export default {
  name: 'PwdVerify',
  mixins: [mixin],
  methods: {
    onSubmit () {
      pwdVerify({
        password: this.vali_password,
        code: this.vali_code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          this.$alert(res.msg)
          // 跳转
          const barLists = JSON.parse(localStorage.getItem('barLists'))
          this.$router.push({
            name: barLists[1].routerName
          })
        } else {
          this.$alert(res.msg)
        }
      })
    }
  },
  mounted () {
    let barLists = JSON.parse(localStorage.getItem('barLists'))
    barLists[1].name = this.$route.query.link ? this.$route.query.link : barLists[1].name
    barLists[1].complete = false
    barLists[2].complete = false
    barLists[2].name = '修改成功'
    barLists[0].complete = true
    this.$store.commit('getBarLists', barLists)
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
.pwd-item {
  width: 300px;
  height: 150px;
}
.pwd-item-other {
  padding-left: 5px;
  .svg-captcha {
    margin-top: 18px;
  }
}
</style>
