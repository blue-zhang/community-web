<!--
 * @Author: your name
 * @Date: 2020-10-27 10:42:17
 * @LastEditTime: 2021-03-07 10:35:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\views\UserCenter.vue
-->
<template>
  <div class="layui-container fly-marginTop fly-user-main">
    <transition name="show">
      <ul class="layui-nav layui-nav-tree layui-inline"
          v-show="showSide"
          key="sideBar"
          :class="{ 'home-ul': $route.name === 'UserHome' || $route.name === 'UserCollection'}">
        <router-link tag="li"
                     class="layui-nav-item"
                     :class="[navItemed]"
                     v-for="(item, index) in lists"
                     :key="'center' + index"
                     :to="{name: item.name, params: { uid: $store.state.userInfo._id}}"
                     :active-class="item.activeClass">
          <a>{{ item.title }}</a>
        </router-link>
        <div v-show="mesNum"
             class="css-ybodb mespos">{{mesNum}}</div>
        <div v-show="handNum"
             class="css-ybodb handpos">{{handNum}}</div>
        <div v-show="chatNum"
             class="css-ybodb chatpos">{{chatNum}}</div>
      </ul>
    </transition>
    <router-view :class='{ "displaySide": !showSide }'></router-view>
    <div class="xianshi ctrlBtn"
         key="xianshi"
         v-show="!showSide && $route.name !== 'UserHome' && $route.name !== 'UserCollection'"
         title="点击显示侧边栏"><i @click="xianshi"
         class="layui-icon layui-icon-next pointer"></i></div>
    <div class="yincang ctrlBtn"
         key="yincang"
         v-show="showSide && $route.name !== 'UserHome'&& $route.name !== 'UserCollection'"
         title="点击隐藏侧边栏"><i @click="yincang"
         class="layui-icon layui-icon-prev pointer yincang"></i></div>

  </div>
</template>

<script>
export default {
  name: 'UserCenter',
  data () {
    return {
      showType: 'home',
      showSide: true,
      navItemed: 'layui-nav-itemed',
      lists: [
        {
          title: '我的主页',
          name: 'UserHome',
          class: 'home-ul'
        },
        {
          title: '用户中心',
          name: 'UserIndex'
        },
        {
          title: '基本设置',
          name: 'MyInfo',
          activeClass: 'layui-this'
        },
        {
          title: '我的私信',
          name: 'MyChat',
          activeClass: 'layui-this'
        },
        {
          title: '回复我的',
          name: 'UserMessage',
          activeClass: 'layui-this'
        },
        {
          title: '收到的赞',
          name: 'PostPraise',
          activeClass: 'layui-this'
        },
        {
          title: '其他设置',
          name: 'UserOther'
        }
      ]
    }
  },
  computed: {
    mesNum: function () {
      const num = this.$store.state.unreadNum
      return num.postCom + num.comReply
    },
    handNum: function () {
      const num = this.$store.state.unreadNum
      return num.postHand + num.comHand
    },
    chatNum: function () {
      return this.$store.state.chatNum
    }
  },
  methods: {
    yincang () {
      this.showSide = false
    },
    xianshi () {
      this.showSide = true
    }
  },
  mounted () {
    // 用户复制一个窗口，在原来的窗口退出登录，另一窗口刷新的时候，让它自动跳转到首页。
    // 刷新一个窗口，并不会执行全局导航守卫，因为路由状态没有改变
    if (this.$store.state.isLogin === false) {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/iconfont/iconfont.css";
@import "../assets/scss/color.scss";
.home-ul {
  display: none;
}
::v-deep .layui-nav-tree {
  width: 130px;
}
::v-deep .layui-nav-item {
  width: 130px;
  a {
    padding: 0;
    display: block;
    height: 60px;
    line-height: 60px;
    text-align: left;
    padding-left: 16px;
    font-size: 16px;
    .iconfont {
      font-size: 20px;
      margin-right: 4px;
    }
  }
}

@media screen and (max-width: 770px) {
  .ctrlBtn {
    display: none;
  }
}

.yincang {
  left: 195px;
  width: 20px;
  height: 40px !important;
  padding: 11px 0 0 0 !important;
  i {
    font-size: 20px !important;
  }
}
.ctrlBtn {
  height: 49px;
  position: absolute;
  top: 50%;

  margin: 0 !important;
  padding: 0;
  color: #858484;
  margin-left: 17px;
  font-size: 25px !important;
  &:hover {
    color: #c2c2c2;
  }
}
.xianshi {
  left: -20px;
  width: 20px;
  i {
    position: absolute;
    top: 12px;
    font-size: 20px !important;
  }
}
.displaySide {
  margin-left: 0;
}
.show-enter-active,
.show-leave-active {
  transition: all 0.3s;
}
.show-enter,
.show-leave-to {
  opacity: 0;
}
.mespos {
  bottom: 318px;
  left: 85px;
}
.handpos {
  bottom: 258px;
  left: 85px;
}
.chatpos {
  bottom: 378px;
  left: 85px;
}
</style>
