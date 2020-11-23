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
  computed: {
    barLists () {
      return this.$store.state.barLists
    }
  },
  props: {
    barColor: {
      type: String,
      default: '#5FB878'
    }
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
