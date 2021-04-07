<template>
  <div class="rightContainer">
    <div :class="{'achieve-con': !fixed, 'fixedCon': fixed}"
         :style="{ 'margin-top': margin }">
      <div class="fixed-box fly-panel">
        <h3 v-if="$route.params.uid && $route.params.uid === $store.state.userInfo._id"
            class="fly-panel-title">我的成就</h3>
        <h3 v-else-if="$route.params.uid && $route.params.uid !== $store.state.userInfo._id"
            class="fly-panel-title">他的成就</h3>
        <div v-else-if="$route.params.pid">
          <div class="fly-panel-title">关于作者</div>
          <div class="ach_user">
            <router-link target="_blank"
                         rel="noopener noreferrer"
                         :to="{name: 'UserHome', params: { uid: userInfo._id }}">
              <img class="pic pointer"
                   :src="userInfo.pic">
            </router-link>
            <div class="info">
              <div style="paddingLeft: 10px">
                <router-link target="_blank"
                             rel="noopener noreferrer"
                             :to="{name: 'UserHome', params: { uid: userInfo._id }}">
                  <b class="blink"
                     :class="{ 'vip-color': userInfo.isVip !== '0'}">{{ userInfo.fakename }}</b>
                </router-link>
                <i style="fontSize:8px;paddingLeft:5px"
                   class="co-origin">{{ ' LV' + userInfo.lv }}</i>
              </div>
              <div style="paddingLeft: 10px;color: #666;width: 120px"
                   class="ellip">{{ userInfo.regmark }}</div>
            </div>
          </div>
        </div>
        <div class="achieve-statis">
          <div>文章数量 {{achLs.num}}</div>
          <div>文章获赞 {{achLs.hands}}</div>
          <div>文章被读 {{achLs.reads}}</div>
          <div>被关注 {{achLs.follower}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { achieve } from '@/api/statistics'
export default {
  name: 'MyAchieve',
  data () {
    return {
      achLs: {}

    }
  },
  props: {
    fixed: {
      type: Boolean,
      default: true
    },
    margin: {
      type: String,
      default: '0px'
    },
    userInfo: {
      type: Object,
      default: () => {
        return {
          lv: '',
          fakename: '',
          pic: '',
          isVip: '0'
        }
      }
    }
  },
  async mounted () {
    let achieves = {}
    if (this.$route.params.uid) {
      achieves = await achieve({ uid: this.$route.params.uid })
    } else {
      achieves = await achieve({ uid: this.$route.params.pid, type: 'post' })
    }
    this.achLs = achieves.data
  }
}
</script>

<style lang="scss" scoped>
.fixedCon {
  position: fixed;
}
.achieve-con {
  max-width: 200px;
  min-width: 200px;
  width: 200px;
}
.fly-panel-title {
  font-weight: bolder;
}
.fixed-box {
  width: 200px;
  display: flex;
  flex-flow: column;
  .ach_user {
    margin: 10px 0 5px;
    padding-left: 15px;
    display: flex;
    height: 50px;
    .pic {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .info {
      display: flex;
      flex-flow: column;
      justify-content: space-between;
    }
  }
  .achieve-statis {
    height: 120px;
    display: flex;
    flex-flow: column;
    justify-content: space-around;
    padding-left: 15px;
  }
}
.achieveMain {
  transition: margin-top 0.3s;
}
.opacity-enter,
.opacity-leave-to {
  opacity: 0;
}
.opacity-leave-active {
  transition: opacity 0.3s;
}
.opacity-enter-active {
  transition: opacity 0.3s;
}
</style>
