<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user"
         pad20>
      <div class="layui-tab layui-tab-brief"
           lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li>
            <router-link :to="{ name: 'Reg' }">注册</router-link>
          </li>
        </ul>
        <div class="layui-form layui-tab-content"
             id="LAY_ucm"
             style="padding: 20px 0">
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <validation-observer ref="form"
                                   v-slot="{ handleSubmit }">
                <form method="post"
                      @submit.prevent="handleSubmit(onSubmit)">
                  <div class="layui-form-item">
                    <label class="layui-form-label">用户名</label>
                    <validation-provider name="username"
                                         rules="required"
                                         v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input type="text"
                               name="name"
                               class="layui-input"
                               placeholder="请输入邮箱或昵称"
                               v-model="vali_username" />
                      </div>
                      <div class="input-error layui-form-mid">
                        {{ errors[0] }}
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">密码</label>
                    <validation-provider name="password"
                                         rules="required|minmax:6,16"
                                         v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input type="password"
                               name="password"
                               class="layui-input"
                               v-model="vali_password" />
                      </div>
                      <div class="input-error layui-form-mid">
                        {{ errors[0] }}
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">验证码</label>
                    <validation-provider vid="code"
                                         name="code"
                                         rules="required|length:4"
                                         v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input type="text"
                               name="code"
                               placeholder="请输入验证码"
                               class="layui-input"
                               v-model="vali_code" />
                        <div class="input-error layui-form-mid">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </validation-provider>
                    <div class="svg-captcha layui-form-mid"
                         v-html="vali_svg"
                         @click="_getCaptcha()"></div>
                  </div>
                  <div class="layui-form-item">
                    <button type="submit"
                            class="layui-btn">立即登录</button>
                    <span style="padding-left: 20px">
                      <router-link :to="{ name: 'Forget' }">忘记密码？</router-link>
                    </span>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者使用社交账号登入</span>
                    <a href=""
                       onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                       class="iconfont icon-qq"
                       title="QQ登入"></a>
                    <a href=""
                       onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                       class="iconfont icon-weibo"
                       title="微博登入"></a>
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import validate from '@/utils/localValidate'
import mixin from '@/mixin/mixin-login'
import { login } from '@/api/login'

validate()

export default {
  name: 'Login',
  mixins: [mixin],
  methods: {
    onSubmit () {
      login({
        password: this.vali_password,
        username: this.vali_username,
        code: this.vali_code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          this.vali_password = ''
          this.vali_username = ''
          this.vali_code = ''
          this.$store.commit('getUserInfo', res.data)
          this.$store.commit('getIsLogin', true)
          this.$store.commit('getToken', res.token)
          this.$store.commit('getRefresh', res.refreshToken)
          this.$router.push({ name: 'index' })
          this.$bubble(res.data.fakename, ' 欢迎回来', 'login')
        } else if (res.code === 401) {
          // 验证码错误
          this.$refs.form.setErrors({
            code: res.msg
          })
        } else if (res.code === 402) {
          // 找不到用户名
          this.$alert(res.msg)
        } else if (res.code === 404) {
          // 用户名或密码错误
          this.$alert(res.msg)
        }
      })
    }
  },
  mounted () {
    window.vue = this
  }
}
</script>
<style scoped></style>
