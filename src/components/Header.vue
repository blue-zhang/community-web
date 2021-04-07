<template>
  <transition name="top">
    <div class="fly-header bg-img mb20"
         v-show="showHeader">
      <div class="layui-container">
        <ul class="layui-nav fly-nav layui-hide-xs ml0">
          <li class="layui-nav-item layui-this">
            <router-link :to="{ name: 'index' }"><i class="iconfont icon-jiaoliu"></i>主站</router-link>
          </li>
        </ul>

        <ul class="layui-nav fly-nav-user">
          <!-- 未登入的状态 -->
          <template v-if="!isShow">
            <li class="layui-nav-item">
              <a class="iconfont icon-touxiang layui-hide-xs"></a>
            </li>
            <li class="layui-nav-item">
              <router-link href="../user/login.html"
                           :to="{ name: 'Login' }">登入</router-link>
            </li>
            <li class="layui-nav-item">
              <router-link href="../user/reg.html"
                           :to="{ name: 'Reg' }">注册</router-link>
            </li>
            <!-- <li class="layui-nav-item layui-hide-xs">
            <a onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
               title="QQ登入"
               class="iconfont icon-qq"></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
               title="微博登入"
               class="iconfont icon-weibo"></a>
          </li> -->
          </template>

          <!-- 登入后的状态 -->
          <template v-else>
            <li class="layui-nav-item">
              <div class="header-nav">
                <router-link class="svg"
                             :title='"您有"+mesNum+"条点赞及回复消息"'
                             :to="{name: 'UserMessage'}">
                  <svg fill="currentColor"
                       class="hover"
                       width="22"
                       height="22">
                    <path d="M4.523 15.076l.804-6.757a6.753 6.753 0 0 1 4.945-5.7 1.823 1.823 0 0 1 3.623 0 6.753 6.753 0 0 1 4.945 5.7l.804 6.757a2.293 2.293 0 0 0 1.712 2.108 1.093 1.093 0 0 1-.297 2.15H3.108a1.093 1.093 0 0 1-.297-2.15 2.293 2.293 0 0 0 1.712-2.108zM12.083 23a2.758 2.758 0 0 1-2.753-2.509.229.229 0 0 1 .232-.24h5.043a.229.229 0 0 1 .232.24 2.759 2.759 0 0 1-2.753 2.51z"></path>
                  </svg>
                </router-link>
                <div v-show="chatNum"
                     class="css-ybodb css-ybodb1">{{chatNum | limit99}}</div>

                <router-link class="svg"
                             :title='"您有"+chatNum+"条未读私信"'
                             :to="{name: 'MyChat'}">
                  <svg fill="currentColor"
                       class="hover"
                       width="22"
                       height="22">
                    <path d="M11 2c5.571 0 9 4.335 9 8 0 6-6.475 9.764-11.481 8.022-.315-.07-.379-.124-.78.078-1.455.54-2.413.921-3.525 1.122-.483.087-.916-.25-.588-.581 0 0 .677-.417.842-1.904.064-.351-.14-.879-.454-1.171A8.833 8.833 0 0 1 2 10c0-3.87 3.394-8 9-8zm10.14 9.628c.758.988.86 2.009.86 3.15 0 1.195-.619 3.11-1.368 3.938-.209.23-.354.467-.308.722.12 1.073.614 1.501.614 1.501.237.239-.188.562-.537.5-.803-.146-1.495-.42-2.546-.811-.29-.146-.336-.106-.563-.057-2.043.711-4.398.475-6.083-.927 5.965-.524 8.727-3.03 9.93-8.016z"
                          fill-rule="evenodd"></path>
                  </svg>
                </router-link>
                <div v-show="mesNum"
                     class="css-ybodb css-ybodb2">{{mesNum | limit99}}</div>
                <a @mouseover="show()"
                   @mouseleave="hide()"
                   class="fly-nav-avatar">
                  <img :src="userInfo.pic" />
                </a>
              </div>
              <dl @mouseover="show()"
                  @mouseleave="hide()"
                  class="layui-nav-child layui-anim layui-anim-upbit"
                  :class="{ 'layui-show': isHover }">
                <dd>
                  <router-link target="_blank"
                               class="praiseToHome"
                               rel="noopener noreferrer"
                               :to="{name: 'UserHome', params: { uid: $store.state.userInfo._id }}"><i class="iconfont icon-ziyuan"></i>我的主页</router-link>
                </dd>
                <dd>
                  <router-link tag="a"
                               :to="{ name: 'UserMessage' }">
                    <i class="iconfont icon-icon-test"></i>我的消息
                  </router-link>
                </dd>
                <dd>
                  <router-link tag="a"
                               :to="{ name: 'MyInfo' }">
                    <i class="iconfont icon-shezhi"></i>基本设置
                  </router-link>
                </dd>
                <hr style="margin: 5px 0" />
                <dd>
                  <a style="text-align: center"
                     @click="logout()">退出</a>
                </dd>
              </dl>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'Header',
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    isShow () {
      return this.$store.state.isLogin
    },
    mesNum: function () {
      const num = this.$store.state.unreadNum
      return num.postHand + num.comHand + num.postCom + num.comReply
    },
    chatNum: function () {
      return this.$store.state.chatNum
    }
  },
  data () {
    return {
      isHover: false,
      hoverCtrl: {},
      offset: 0,
      showHeader: true
    }
  },
  methods: {
    /**
     * 当鼠标移入dl中，也是在li中，可以触发show()。但是this.isHover = false时，dl瞬间消失。所以令hide（）延迟执行
     * setTimeout在"任务队列"的尾部添加一个事件，因此要等到同步任务和"任务队列"现有的事件都处理完，才会得到执行。
     */
    show () {
      clearTimeout(this.hoverCtrl)
      this.isHover = true
    },
    hide () {
      // setTimeout返回一个数字，利用这个数字，来取消定时
      this.hoverCtrl = setTimeout(() => {
        this.isHover = false
      }, 300)
    },
    logout () {
      this.$confirm(
        '你确定要退出吗？',
        () => {
          localStorage.clear()
          this.$store.commit('setToken', '')
          this.$store.commit('setRefresh', '')
          this.$store.commit('setUserInfo', {})
          this.$store.commit('setIsLogin', false)
          this.$store.state.ws = null
          if (this.$store.name === 'index') {
            this.$router.push({ name: 'index' }, () => { })
          } else {
            window.location.reload()
          }
        },
        () => { }
      )
    },
    handler (e) {
      const debounce = this._.debounce(() => {
        this.offset = window.pageYOffset
      }, 100)
      debounce()
    }
  },
  async mounted () {
    await this.$nextTick()
    window.addEventListener('scroll', this.handler)
    this.$watch('offset', function (n, o) {
      const clientHeight = 180
      const panel = document.getElementById('headerPanel')
      if (n > o && o > clientHeight) {
        if (panel) {
          panel.style.top = 0
        }
        this.showHeader = false
      } else if (n < o) {
        if (panel) {
          panel.style.top = '59px'
        }
        this.showHeader = true
      }
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handler)
  }
}
</script>

<style lang='scss' scoped>
.fly-header {
  position: fixed;
}
.fly-header .fly-nav-user .layui-nav-child {
  right: -25px;
}
li dd {
  cursor: pointer;
}
.bg-img {
  background-image: url("../../src/assets/images/header.jpg");
  background-clip: content-box;
  // background-color: white;
  // border-bottom: #f2f2f2 solid 1px;
}
.layui-nav {
  .layui-nav-item {
    .layui-nav-child {
      a {
        color: #333 !important;
      }
    }
    a {
      color: #ffffff !important;
      cursor: pointer;
    }
  }
}
.header-nav {
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: row nowrap;
  .svg {
    font-size: 40px;
    padding-right: 20px;
  }
}
.hover {
  color: #f0f0f0;
  &:hover {
    color: #c2c2c2c2;
  }
}
.css-ybodb1 {
  bottom: 50%;
  left: 60px;
}
.css-ybodb2 {
  bottom: 50%;
  left: 20px;
}
</style>
