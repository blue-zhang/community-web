<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo">
        <img src="../../public/static/images/logo.png" alt="layui" />
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a href="/"><i class="iconfont icon-jiaoliu"></i>交流</a>
        </li>
        <li class="layui-nav-item">
          <a><i class="iconfont icon-iconmingxinganli"></i>案例</a>
        </li>
        <li class="layui-nav-item">
          <a target="_blank"><i class="iconfont icon-ui"></i>框架</a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">
        <!-- 未登入的状态 -->
        <template v-if="!isShow">
          <li class="layui-nav-item">
            <a class="iconfont icon-touxiang layui-hide-xs"></a>
          </li>
          <li class="layui-nav-item">
            <router-link href="../user/login.html" :to="{ name: 'Login' }"
              >登入</router-link
            >
          </li>
          <li class="layui-nav-item">
            <router-link href="../user/reg.html" :to="{ name: 'Reg' }"
              >注册</router-link
            >
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
              title="QQ登入"
              class="iconfont icon-qq"
            ></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a
              onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
              title="微博登入"
              class="iconfont icon-weibo"
            ></a>
          </li>
        </template>

        <!-- 登入后的状态 -->
        <template v-else>
          <li class="layui-nav-item" @mouseover="show()" @mouseleave="hide()">
            <a class="fly-nav-avatar">
              <cite class="layui-hide-xs">{{ userInfo.fakename }}</cite>
              <i
                class="iconfont icon-renzheng layui-hide-xs"
                title="认证信息：layui 作者"
              ></i>
              <i
                class="layui-badge fly-badge-vip layui-hide-xs"
                v-if="userInfo.isVip !== '0'"
                >VIP{{ userInfo.isVip }}</i
              ><i v-else>普通用户</i>
              <img :src="userInfo.pic" />
            </a>
            <dl
              class="layui-nav-child layui-anim layui-anim-upbit"
              :class="{ 'layui-show': isHover }"
            >
              <dd>
                <router-link tag="a" :to="{ name: 'center' }"
                  ><i class="iconfont icon-ziyuan"></i>我的主页</router-link
                >
              </dd>
              <dd>
                <a><i class="iconfont icon-icon-test"></i>我的消息</a>
              </dd>
              <dd>
                <a><i class="iconfont icon-shezhi"></i>基本设置</a>
              </dd>
              <hr style="margin: 5px 0" />
              <dd>
                <a style="text-align: center">退出</a>
              </dd>
            </dl>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    isShow() {
      return this.$store.state.isLogin
    }
  },
  data() {
    return {
      isHover: false,
      hoverCtrl: {}
    }
  },
  methods: {
    /**
     * 当鼠标移入dl中，也是在li中，可以触发show()。但是this.isHover = false时，dl瞬间消失。所以令hide（）延迟执行
     * setTimeout在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。
     */
    show() {
      clearTimeout(this.hoverCtrl)
      this.isHover = true
    },
    hide() {
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false
      }, 300)
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../assets/iconfont/iconfont.css';
</style>
