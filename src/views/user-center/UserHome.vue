<template>
  <div>
    <div class="fly-home fly-panel">
      <img :src="userInfo.pic"
           alt="">
      <h1>
        {{userInfo.fakename}}
        <i class="iconfont icon-nan"></i>
        <!-- <i class="iconfont icon-nv"></i>  -->
        <i class="layui-badge">LV {{userInfo.lv}}</i>
        <i v-if="userInfo.isVip !== '0'"
           class="layui-badge fly-badge-vip">VIP</i>
      </h1>
      <p class="fly-home-info">
        <i class="iconfont icon-kiss"
           title="积分"></i><span style="color: #FF7200;">{{userInfo.favs}} 积分</span>
        <i class="iconfont icon-shijian"></i><span>{{ userInfo.created | _time }} 加入</span>
        <!-- <i class="iconfont icon-chengshi"></i><span>来自杭州</span> -->
      </p>
      <p class="fly-home-sign">{{userInfo.regmark}}</p>
      <div class="fly-sns">
        <a v-show="($route.params.uid !== $store.state.userInfo._id) && isFollowed === '0'"
           @click="follow($route.params.uid, $store.state.userInfo._id)"
           class="layui-btn layui-btn-normal fly-imActive">关注</a>
        <a v-show="($route.params.uid !== $store.state.userInfo._id) && isFollowed === '1'"
           class="layui-btn layui-btn-primary fly-imActive"
           @click="delFollow($route.params.uid, $store.state.userInfo._id)">取消关注</a>
        <a v-show="$route.params.uid !== $store.state.userInfo._id"
           @click="toChatMes($route.params.uid)"
           class="layui-btn layui-btn-primary layui-border-green">私信</a>
      </div>
    </div>

    <div class="middle-container2">
      <div class="seat"></div>
      <div class="layui-tab layui-tab-brief fly-panel mainContainer">
        <div v-show="showHeader"
             style="overflow:hidden">
          <div id="headerPanel"
               class="layui-tab layui-tab-brief fly-panel fixedPanel">
            <ul class="layui-tab-title">
              <router-link tag="li"
                           class="layui-nav-item"
                           v-for="(item, index) in mainLists"
                           :key="'userhome'+index"
                           :to="{name: item.name}">
                {{item.title}}</router-link>
              <router-link tag="li"
                           :class="{'layui-this': layuiThis}"
                           :key="'userhome-atten'"
                           :to="{name: 'MyAttention'}">
                关注</router-link>
            </ul>
          </div>
        </div>
        <ul class="layui-tab-title anchorPanel">
          <router-link tag="li"
                       v-for="(item, index) in mainLists"
                       :key="'userhome'+index"
                       :to="{name: item.name}">
            {{item.title}}</router-link>
          <router-link tag="li"
                       :class="{'layui-this': layuiThis}"
                       :key="'userhome-atten'"
                       :to="{name: 'MyAttention'}">
            关注</router-link>
        </ul>
        <div class="layui-tab-content"
             style="padding: 20px 0;">
          <router-view></router-view>
        </div>
      </div>
      <myAchieve :fixed='fixed'
                 :margin='margin' />
      <div class="seat"></div>
    </div>
  </div>
</template>

<script>
import { getUserInfo, isAttention, addAttention, delAttention } from '@/api/user'
import MyAchieve from '@/components/user-home/MyAchieve'

export default {
  name: 'UserHome',
  components: {
    MyAchieve
  },
  data () {
    return {
      userInfo: {},
      showHeader: false,
      offset: 0,
      margin: '0px',
      fixed: false,
      isFollowed: '0',
      layuiThis: false,
      mainLists: [
        {
          title: '动态',
          name: 'UserHome'
        },
        {
          title: '文章',
          name: 'UserPost'
        },
        {
          title: '提问',
          name: 'MyQuestion'
        },

        {
          title: '收藏',
          name: 'PostCollection'
        }
      ]
    }
  },
  watch: {
    $route: function (n, o) {
      if (n.name === 'Following' || n.name === 'MyAttention') {
        this.layuiThis = true
      } else {
        this.layuiThis = false
      }
      console.log('watch', this.layuiThis)
    }
  },
  methods: {
    toChatMes (id) {
      // this.$store.commit('setReceiver', id)
      // this.$router.push({ name: 'ChatMes', params: { receiver: id } })
      ///

      if (id === this.$store.state.receiver) {
        return
      }
      this.$store.commit('setReceiver', id)
      this.$router.push({ name: 'ChatMes', params: { receiver: id } })
    },
    scrollHandler (e) {
      const debounce = this._.debounce(() => {
        this.offset = window.pageYOffset
      }, 100)
      debounce()
    },
    async follow (attention, uid) {
      const res = await addAttention({ uid, attention })
      if (res.code === 200) {
        this.isFollowed = res.data
        this.$bubble('关注成功')
      }
    },
    async delFollow (attention, uid) {
      const res = await delAttention({ uid, attention })
      if (res.code === 200) {
        this.isFollowed = res.data
        this.$bubble('取消关注成功')
      }
    }
  },
  async mounted () {
    const res = await getUserInfo({ uid: this.$route.params.uid })
    if (res.code === 200) {
      this.userInfo = res.data
    }

    // 进入的是别人的主页，查看对方是否被我关注
    if (this.$route.params.uid !== this.$store.state.userInfo._id) {
      const res = await isAttention({
        uid: this.$store.state.userInfo._id,
        attention: this.$route.params.uid
      })
      if (res.code === 200) {
        this.isFollowed = res.data
      }
    }
    if (this.$route.name === 'Following' || this.$route.name === 'MyAttention') {
      this.layuiThis = true
    }
    await this.$nextTick()
    window.addEventListener('scroll', this.scrollHandler)
    this.$watch('offset', function (n, o) {
      if (n > 380 && n > o) {
        this.showHeader = true
        this.fixed = true
        this.margin = '-282px'
      } else if (n > 380 && n < o) {
        this.showHeader = true
        this.fixed = true
        this.margin = '-212px'
      } else {
        this.showHeader = false
        this.fixed = false
        this.margin = '0px'
      }
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollHandler)
  }
}
</script>

<style lang="scss" scoped>
.mainContainer {
  min-height: 200px;
  width: 700px;
  min-width: 500px;
  max-width: 700px;
  padding: 0 20px;
  margin: 0 20px;
}
.fixedPanel {
  border-bottom: #c2c2c2 solid 1px;
  margin: 0;
  position: fixed;
  top: 59px;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: top 0.3s;
  .fixed-li {
    padding: 5px 0;
    li {
      margin: 5px 0;
    }
  }
}

.anchorPanel {
  li {
    padding: 0;
  }
}
.rightContainer {
  width: 200px;
  min-width: 200px;
  max-width: 200px;
}
</style>
