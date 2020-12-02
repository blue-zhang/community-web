<template>
  <div>
    <transition :name="'scale'">
      <div class="alert"
           v-show="isShow">
        <p class="alert-msg">{{ msg }}</p>
        <div v-if="type === 'alert'">
          <div class="alert-btn success pointer"
               @click="close()">确定</div>
        </div>
        <div v-else
             class="alert-btn-around">
          <div class="alert-btn success pointer"
               @click="successEvent()">确定</div>
          <div class="alert-btn cancel pointer"
               @click="cancelEvent()">取消</div>
        </div>
      </div>
    </transition>
    <div v-show="isShow"
         class="mask"
         @click="closeMask()"></div>
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
.alert-msg {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
