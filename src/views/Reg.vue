<template>
  <div class="layui-container fly-marginTop">
    <div
      class="fly-panel fly-panel-user"
      pad20
    >
      <div
        class="layui-tab layui-tab-brief"
        lay-filter="user"
      >
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name: 'Login'}">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0;"
        >
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label
                    class="layui-form-label"
                  >邮箱</label>
                  <validation-provider
                    name="email"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <div class="layui-input-inline">
                      <input
                        v-model="vali_email"
                        type="text"
                        name="email"
                        lay-verify="email"
                        class="layui-input"
                      >
                    </div>
                    <div class="input-error layui-form-mid">{{ errors[0] }}</div>
                  </validation-provider>
                  <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                </div>
                <div class="layui-form-item">
                  <label
                    class="layui-form-label"
                  >用户名</label>
                  <validation-provider
                    name="username"
                    rules="required|minmax:3,12"
                    v-slot="{ errors }"
                  >
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="username"
                        lay-verify="required"
                        class="layui-input"
                        v-model="vali_username"
                      >
                    </div>
                    <div class="input-error layui-form-mid">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <label
                    class="layui-form-label"
                  >密码</label>
                  <validation-provider
                    name="password"
                    rules="required|minmax:6,16"
                    v-slot="{ errors }"
                  >
                    <div class="layui-input-inline">
                      <input
                        type="password"
                        name="password"
                        class="layui-input"
                        v-model="vali_password"
                      >
                      <div class="input-error layui-form-mid">{{ errors[0] }}</div>
                    </div>
                    <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <label
                    class="layui-form-label"
                  >确认密码</label>
                  <validation-provider
                    name="confirm"
                    rules="is:@password"
                    v-slot="{ errors }"
                  >
<!--                  不同字段匹配 @anotherField-->
                    <div class="layui-input-inline">
                      <input
                        type="password"
                        name="confirm"
                        lay-verify="required"
                        class="layui-input"
                        v-model="vali_confirm"
                      >
                    </div>
                    <div class="input-error layui-form-mid">{{ errors[0] }}</div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <label
                    class="layui-form-label"
                  >验证码</label>
                  <validation-provider
                    name="code"
                    rules="required|length:4"
                    v-slot="{ errors }"
                  >
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="vertify"
                        placeholder="请输入验证码"
                        class="layui-input"
                        v-model="vali_code"
                      >
                      <div class="input-error layui-form-mid">{{ errors[0] }}</div>
                    </div>
                  </validation-provider>
                  <div class="layui-form-mid">
                    <span
                      class="svg-captcha layui-form-mid"
                      v-html="vali_svg"
                      @click="_getCaptcha()"
                    >hello</span>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button
                    class="layui-btn"
                    lay-filter="*"
                    lay-submit
                  >立即注册
                  </button>
                </div>
                <div class="layui-form-item fly-form-app">
                  <span>或者直接使用社交账号快捷注册</span>
                  <a
                    href=""
                    onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-qq"
                    title="QQ登入"
                  ></a>
                  <a
                    href=""
                    onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-weibo"
                    title="微博登入"
                  ></a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import validate from '@/api/localValidate'
import mixin from '@/api/mixin-login'

validate()
export default {
  name: 'Forget',
  mixins: [mixin]
}
</script>
<style scoped>
</style>
