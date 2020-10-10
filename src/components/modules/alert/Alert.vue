<template>
  <div v-show="isShow">
    <div class="alert">
      <p class="alert-msg">{{ msg }}</p>
      <div v-if="type === 'alert'">
        <div class="alert-btn success" @click="close()">确定</div>
      </div>
      <div v-else class="alert-btn-around">
        <div class="alert-btn success" @click="successEvent()">确定</div>
        <div class="alert-btn cancel" @click="cancelEvent()">取消</div>
      </div>
    </div>
    <div class="mask" @click="closeMask()"></div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'alert'
    },
    success: {
      type: Function,
      default: () => console.log('点击了确定')
    },
    cancel: {
      type: Function,
      default: () => console.log('点击了取消')
    }
  },
  methods: {
    close () {
      // 单向数据流，不能修改父组件传来的值，此处偷懒
      this.isShow = false
    },
    closeMask () {
      if (this.type === 'alert') {
        this.close()
      }
    },
    successEvent () {
      this.success()
      this.close()
    },
    cancelEvent () {
      this.cancel()
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
$btn-main: #009688;
$btn-dark: darken($btn-main, 5%);
$btn-cancel: #ededed;
.alert {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 150px;
  margin-left: -150px;
  margin-top: -75px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 20px 10px;
  box-shadow: 0 5px 8px rgba($color: #000000, $alpha: 0.5);
  background: #fff;
  border-radius: 6px;
  z-index: 3000;
}
.alert-msg {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.alert-btn {
  width: 105px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 6px;
  background: $btn-main;
  &.cancel {
    background: $btn-cancel;
    color: #333;
  }
  &.success {
    background: $btn-main;
    color: #fff;
    &:hover {
      background: $btn-dark;
    }
  }
}
.alert-btn-around {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 10px;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  z-index: 2000;
}
</style>
