<template>
  <div class="fly-panel fly-panel-user"
       pad20>
    <div class="container">
      <div class="layui-col-md12"
           style="margin: 10px 0 2.5px 0"><b>Hi,你已经是我们的正式会员了</b></div>

      <div class="info layui-row layui-col-space15">
        <div class="layui-col-sm12 layui-col-md6">
          <div class="border">
            <p>我的会员信息</p>
            <div class="vip-mes">
              <div>经验积分：{{favs}}</div>
              <div>您当前为：<span class="layui-badge fly-badge-vip layui-hide-xs"
                      v-if="isVip !== '0'">VIP{{ isVip }}</span><span v-else>普通用户</span></div>
            </div>
          </div>
        </div>
        <div class="layui-col-sm12 layui-col-md6">
          <sign class="border"></sign>
        </div>
      </div>

      <div class="border layui-row layui-col-md12">
        <p>快捷方式</p>
        <ul class="layui-row layui-col-space10"
            style="padding: 10px">
          <router-link tag="li"
                       to="/"
                       class="layui-col-xs4 layui-col-sm3"
                       style="  cursor: pointer;">
            <div class="layui-icon layui-icon-set link-icon"></div>
            <div class="link-mes">修改密码</div>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Sign from '../../components/sidebar/Sign'
export default {
  name: 'UserIndex',
  components: {
    Sign
  },
  data () {
    return {
      lists: this.$store.state.setLists
    }
  },
  computed: {
    favs() {
      return this.$store.state.userInfo.favs
    },
    isVip() {
      return this.$store.state.userInfo.isVip
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/color.scss';
.container {
  font-size: 16px;
  .info {
    .vip-mes {
      height: 86px;
      margin-left: 15px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-around;
    }
  }
}
p {
  background: #fbfbfb;
  line-height: 50px;
  text-align: center;
  height: 50px;
  border-bottom: 1px solid $gray-border;
}

li {
  margin: 10px 0;
  transition: width 0.2s;
  &:hover {
    .link-mes {
      color: $green-hover;
    }
    .link-icon {
      background-color: $green-hover;
    }
  }
}
.link-mes {
  height: 20px;
  line-height: 20px;
  width: 100%;
  text-align: center;
  font-size: 16px;
}
.link-icon {
  background-color: $green-bgcolor;
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  font-size: 40px;
}
</style>