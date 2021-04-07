<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user"
         pad20>
      <div class="layui-tab layui-tab-brief"
           lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{ name: 'Login' }">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
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
                    <label class="layui-form-label">邮箱</label>
                    <validation-provider name="email"
                                         vid="email"
                                         rules="required|email"
                                         v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input v-model="vali_email"
                               type="text"
                               name="email"
                               lay-verify="email"
                               class="layui-input"
                               placeholder="请输入邮箱" />
                      </div>
                      <div class="input-error layui-form-mid">
                        {{ errors[0] }}
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">昵称</label>
                    <validation-provider name="fakename"
                                         vid="fakename"
                                         rules="required|minmax:1,15|notNum"
                                         v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input type="text"
                               name="fakename"
                               lay-verify="required"
                               class="layui-input"
                               placeholder="请起一个昵称"
                               v-model="vali_fakename" />
                      </div>
                      <div class="input-error layui-form-mid">
                        {{ errors[0] }}
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">密码</label>
                    <validation-provider name="password"
                                         vid="password"
                                         rules="required|minmax:6,18"
                                         v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input type="password"
                               name="password"
                               class="layui-input"
                               placeholder="请输入密码"
                               v-model="vali_password" />
                      </div>
                      <div class="input-error layui-form-mid">
                        {{ errors[0] }}
                      </div>
                    </validation-provider>
                  </div>
                  <!-- 密码强度 -->
                  <div class="process">
                    <div class="layui-progress layui-progress-big process-line"
                         lay-filter="demo"
                         style="margin: -2px 0 12px 0; width: 300px">
                      <div class="layui-progress-bar layui-bg-red layui-input-inline"></div>
                    </div>
                    <div style="
                        line-height: 18px;
                        height: 18px;
                        text-align: center;
                        padding-left: 2px;
                      "
                         class="process-msg">
                      密码强度:{{ strength }}
                    </div>
                  </div>
                  <!-- <lay-progress
                    :percentage="percentage"
                    theme="red"
                    size="big"
                    show-text
                  /> -->
                  <div class="layui-form-item">
                    <label class="layui-form-label">确认密码</label>
                    <validation-provider name="confirm"
                                         rules="is:@password"
                                         v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input type="password"
                               name="confirm"
                               lay-verify="required"
                               class="layui-input"
                               v-model="vali_confirm" />
                      </div>
                      <div class="input-error layui-form-mid">
                        {{ errors[0] }}
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">验证码</label>
                    <validation-provider name="code"
                                         vid="code"
                                         rules="required|length:4"
                                         v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input type="text"
                               name="vertify"
                               placeholder="请输入验证码"
                               class="layui-input"
                               v-model="vali_code" />
                        <div class="input-error layui-form-mid">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </validation-provider>
                    <div class="layui-form-mid">
                      <span class="svg-captcha layui-form-mid"
                            v-html="vali_svg"
                            @click="_getCaptcha()">hello</span>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn"
                            type="submit">立即注册</button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
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
import mixin from '@/mixin/mixin-login'
import { register } from '@/api/login'
import strengthValidate from '@/utils/stengthValidate'

export default {
  name: 'Forget',
  mixins: [mixin],
  data () {
    return {
      strength: ''
    }
  },
  methods: {
    onSubmit () {
      register({
        password: this.vali_password,
        fakename: this.vali_fakename,
        email: this.vali_email,
        code: this.vali_code,
        sid: this.$store.state.sid
      }).then(res => {
        if (res.code === 200) {
          this.vali_password = ''
          this.vali_fakename = ''
          this.vali_email = ''
          this.vali_code = ''
          this.$alert(res.msg)
          setTimeout(this.$router.push({ path: '/login' }), 1000)
        } else {
          this.$refs.form.setErrors({
            code: res.msg
          })
        }
      })
    }
  },
  watch: {
    vali_password: function (val) {
      let result = strengthValidate(val)
      this.strength = result.text
      window.layui.use(['element'], function () {
        const element = window.layui.element
        element.progress('demo', result.strength)
      })
    }
  }
}
</script>
<style
  lang="scss"
  scoped
>
.process {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  width: 380px;
}
</style>
