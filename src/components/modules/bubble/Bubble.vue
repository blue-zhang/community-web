<template>
  <!-- type由插件函数传递过来 -->
  <transition :name="type">
    <div class="bubble"
         ref="bubble"
         v-show="isShow">
      <div><span class="co-origin">{{user}}</span><span class="mes">{{mes}}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Bubble',
  props: {
    user: {
      type: String,
      default: ''
    },
    mes: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    type: {
      type: String
    }
  },
  watch: {
    isShow: function(n, o) {
      if (n !== o && n === true) {
        let height = this.$refs.bubble.clientHeight
        let width = this.$refs.bubble.clientWidth
        // + 操作符类型装换
        this.$refs.bubble.style.marginLeft = -width / 2 + 'px'
        this.$refs.bubble.style.marginTop = -height / 2 + 'px'
        setTimeout(() => {
          this.isShow = false
        }, 2200)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-enter-active,
.login-leave-active {
  transition: transform 1.2s, opacity 0.5s;
}
.login-enter,
.login-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(-50px);
  opacity: 0;
}

.shake-enter-active {
  transition: opacity 0.5s;
  animation: shake 0.8s;
}
.shake-leave-active {
  transition: opacity 0.2s;
}
.shake-enter,
.shake-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@keyframes shake {
  0%,
  100% {
    transform-origin: 50% 50%;
    transform: rotate(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform-origin: 50% 50%;
    transform: rotate(4deg);
  }
  20%,
  40%,
  60%,
  80% {
    transform-origin: 50% 50%;
    transform: rotate(-4deg);
  }
}

.bubble {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 30000;
  div {
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    padding: 10px 15px;
    border-radius: 6px;
  }
}
</style>
