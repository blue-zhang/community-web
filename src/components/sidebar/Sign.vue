<template>
  <div class="fly-panel fly-signin">
    <dl class="fly-panel fly-list-one"
        v-show="!isLogin">
      <dt class="fly-panel-title">签到</dt>
      <dd>
        <router-link :to="{name: 'Login'}"
                     class="text-link">
          登录</router-link>后进行签到
      </dd>
    </dl>
    <div v-show="isLogin"
         class="fly-panel-title"
         style="background: #fbfbfb">
      签到
      <i class="fly-mid"></i>
      <a href="javascript:;"
         class="fly-link"
         id="LAY_signinHelp"
         @click="show()">说明</a>
      <i class="fly-mid"></i>
      <a href="javascript:;"
         class="fly-link"
         id="LAY_signinTop"
         @click="showList()">活跃榜<span class="layui-badge-dot"></span></a>
      <span class="fly-signin-days"
            style="color: #333333">已连续签到<cite>{{ count }}</cite>天</span>
    </div>
    <div v-show="isLogin"
         class="fly-panel-main fly-signin-main">
      <button class="layui-btn layui-btn-danger"
              id="LAY_signin"
              @click="sign()"
              v-if="!isSign">
        今日签到
      </button>
      <button class="layui-btn layui-btn-disabled"
              v-else>
        签到倒计时{{countTime}}
      </button>
      <span v-if="!isSign">今日可获得<cite>{{fav}}</cite>积分</span>
      <span v-else>明日可获得<cite>{{fav}}</cite>积分</span>
    </div>
    <div v-show="isShow">
      <div class="mask"
           @click="close()"></div>
      <div class="border fixcenter bg-f2">
        <div class="p20">
          <b>签到说明</b>
          <span class="layui-icon layui-icon-close fr pointer"
                @click="close()"></span>
        </div>
        <div class="p20">
          <blockquote class="layui-elem-quote"
                      style="margin: 10px 0 0 0">签到可获得积分，规则如下</blockquote>
          <table class="layui-table">
            <colgroup>
              <col width="150">
              <col width="200">
            </colgroup>
            <thead>
              <tr>
                <th>连续签到天数</th>
                <th>本次签到可获得积分</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&lt;5</td>
                <td>5</td>
              </tr>
              <tr>
                <td>≥5</td>
                <td>10</td>
              </tr>
              <tr>
                <td>≥15</td>
                <td>15</td>
              </tr>
              <tr>
                <td>≥30</td>
                <td>20</td>
              </tr>
              <tr>
                <td>≥100</td>
                <td>30</td>
              </tr>
              <tr>
                <td>≥200</td>
                <td>45</td>
              </tr>
            </tbody>
          </table>
          <p class="mt20">中间若有间隔，则连续天数重新计算</p>
        </div>
      </div>
    </div>
    <div v-show="isShowList">
      <div class="mask"
           @click="closeList()"></div>
      <div class="border fixcenter bg-f2">
        <div class="p20">
          <b>签到榜</b>
          <span class="layui-icon layui-icon-close fr pointer"
                @click="closeList()"></span>
        </div>
        <div class="layui-tab layui-tab-brief">
          <ul class="layui-tab-title"
              lay-filter="">
            <li :class="{'layui-this': type === 0}"
                @click="sort(0)"><a style="width: 70px">最新签到</a></li>
            <li :class="{'layui-this': type === 1}"
                @click="sort(1)"><a style="width: 70px">今日最快</a></li>
            <li :class="{'layui-this': type === 2}"
                @click="sort(2)"><a style="width: 70px">总签到榜</a></li>
          </ul>
          <div class="layui-tab-content">
            <ul class="layui-tab-item layui-show ft12">
              <li v-for="(item,index) in lists"
                  :key="'sign2'+index"
                  class="border-bottom list">
                <img src='/static/images/logo.png'
                     alt="">
                <span class="co-origin mr20">{{item.name}}</span>
                <span class="co-gray">{{item.created}}</span>
                <span v-show="type === 2"
                      class="fr">已连续签到<i class="co-origin">{{item.day}}</i>天</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSign } from '../../api/user'
import moment from 'dayjs'
import { countDown } from '../../utils/countDown'

export default {
  name: 'Sign',
  data () {
    return {
      isShow: false,
      isShowList: false,
      countTime: '',
      type: 0,
      lists: [
        {
          head: '/images/logo.png',
          created: '2020-10-25',
          day: 3,
          name: 'test1'
        },
        {
          head: '/images/logo.png',
          created: '2020-09-25',
          day: 6,
          name: 'test2'
        },
        {
          head: '/images/logo.png',
          created: '2020-07-25',
          day: 2,
          name: 'test3'
        },
        {
          head: '/images/logo.png',
          created: '2020-08-25',
          day: 8,
          name: 'test4'
        }
      ]
    }
  },
  computed: {
    count() {
      return this.$store.state.userInfo.count
    },
    isLogin() {
      return this.$store.state.isLogin
    },
    fav() {
      // 没签到，获得上一次count+1，计算本次可得积分
      // 签到，获得这一次count+1，计算下次可得积分
      let count = this.count + 1
      let thatFav = 5
      if (count <= 15 && count > 5) {
        thatFav = 10
      } else if (count <= 30 && count > 15) {
        thatFav = 15
      } else if (count <= 100 && count > 30) {
        thatFav = 20
      } else if (count <= 200 && count > 100) {
        thatFav = 30
      } else if (count > 200) {
        thatFav = 45
      }
      return thatFav
    },
    isSign() {
      return this.$store.state.userInfo.isSign ? this.$store.state.userInfo.isSign : false
    }
  },
  methods: {
    show () {
      this.isShow = true
    },
    close () {
      this.isShow = false
    },
    showList () {
      this.isShowList = true
    },
    closeList () {
      this.isShowList = false
    },
    sort(val) {
      this.type = val
    },
    countDown,
    sign() {
      getSign().then(res => {
        // 计算下次签到可得积分
        let userInfo = this.$store.state.userInfo
        userInfo.favs = res.favs
        userInfo.count = res.count
        userInfo.fav = res.fav
        userInfo.lastSign = res.created
        userInfo.isSign = true
        // 签到成功，开始倒计时
        this.countDown(() => {
          let userInfo = this.$store.state.userInfo
          userInfo.isSign = false
          this.$store.commit('getUserInfo', userInfo)
        })
        this.$store.commit('getUserInfo', userInfo)
      })
    }
  },
  mounted() {
    // 页面刷新会清空vuex，且mounted先于beforeEach执行，即vuex还没有获得localStorage的数据.所以此时userInfo中没有数据，执行commit后，userinfo中只有isSign属性，进而导致localStorage的userInfo只有isSign属性，导致显示错误。
    // let userInfo = this.$store.state.userInfo
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // 没有登录时，localStorage中没有数据
    const isLogin = this.$store.state.isLogin
    if (isLogin) {
      if (moment(userInfo.lastSign).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
        userInfo.isSign = true
        this.countDown(() => {
          let userInfo = this.$store.state.userInfo
          userInfo.isSign = false
          this.$store.commit('getUserInfo', userInfo)
        })
      } else {
        userInfo.isSign = false
      }
      this.$store.commit('getUserInfo', userInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.fixcenter {
  background: #ffffff;
  width: 300px;
  height: 450px;
  position: fixed;
  z-index: 20100;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -225px;
}
.layui-tab-item img {
  width: 28px;
  height: 28px;
  border-radius: 0.2;
}
.list {
  text-align: left;
  height: 30px;
  line-height: 30px;
  padding: 0 5px;
}
</style>
