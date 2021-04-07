<template>
  <div class="container">
    <div class="item"
         :style="{'color': item.complete ? barColor : '#c2c2c2'}"
         v-for="(item, index) in barLists"
         :key="'progressbar' + index">
      <div class="round"
           :style="{'border-color': item.complete ? barColor : '#c2c2c2'}">{{index + 1}}</div>
      <p class="text">{{item.name}}</p>
      <div v-if="index !== barLists.length - 1"
           class="line"
           :style="{'background-color': item.complete ? barColor : '#c2c2c2'}"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ProgressBar',
  data () {
    return {
      barLists: [
        {
          name: '用户验证',
          complete: false,
          routerName: 'PwdVerify'
        },
        {
          name: '修改绑定邮箱',
          complete: false,
          routerName: ''
        },
        {
          name: '修改成功',
          complete: false,
          routerName: ''
        }
      ]
    }
  },
  watch: {
    $route: function (n, o) {
      this.event.$on('progress', this.handleProgress)
    }
  },
  methods: {
    handleProgress (val) {
      this.barLists[1].name = this.$route.query.textName
      for (let i = 0; i <= val; i++) {
        this.barLists[i].complete = true
      }
    }
  },
  props: {
    barColor: {
      type: String,
      default: '#5FB878'
    }
  },
  mounted () {
    this.event.$on('progress', this.handleProgress)
  },
  beforeDestroy () {
    this.event.$off('progress', this.handleProgress)
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/color.scss';
.container {
  margin: 20px auto 60px;
  height: 70px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  .item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    color: #c2c2c2;
  }
}
.round {
  height: 25px;
  width: 25px;
  border: 3px solid #c2c2c2;
  border-radius: 25px;
  line-height: 25px;
  text-align: center;
  margin-right: 10px;
  margin-left: 10px;
  font-size: 20px;
}
.line {
  height: 2px;
  width: 60px;
  background-color: #c2c2c2;
  margin-right: 10px;
}
.text {
  font-size: 25px;
  margin-right: 10px;
}
</style>
