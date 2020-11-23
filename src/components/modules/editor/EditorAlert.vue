<template>
  <div :class="{ 'editor-wrap': !isPre}"
       ref="container">
    <div class="editor-header">
      <div @mousedown="start"
           class="editor-header-left move">
        <span class="editor-title">{{title || 123}}</span>
      </div>
      <i class=" editor-close layui-icon layui-icon-close pointer"
         @click="close"></i>
    </div>
    <div class="editor-main">
      <slot>
        <input type="text">
      </slot>
      <div class="editor-btn"
           v-show="showAddBtn">
        <div class="editor-btn-y"
             @click="confirm">添加</div>
        <div class="editor-btn-n"
             @click="cancel">关闭</div>
      </div>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash'
export default {
  name: 'EditorAlert',
  props: {
    title: String,
    isPre: {
      type: Boolean,
      default: false
    },
    showAddBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      // 利用鼠标拖动需要的数据
      isMove: false,
      startx: 0,
      starty: 0,
      startClientx: 0,
      startClienty: 0
    }
  },
  methods: {
    confirm () {
      this.$emit('confirm-edit')
    },
    cancel () {
      this.close()
    },
    close () {
      this.$emit('close')
    },
    start (e) {
      // console.log('start -> e', e)
      if (this.isPre) {
        return
      }
      this.isMove = true
      this.startx = e.clientX - e.offsetX
      this.starty = e.clientY - e.offsetY
      this.startClientx = e.clientX
      this.startClienty = e.clientY
      this.$refs.container.addEventListener('mousemove', this.move)
      this.$refs.container.addEventListener('mouseup', this.stop)
    },
    move (e) {
      // console.log('move -> e', e)
      const container = this.$refs.container
      e.stopPropagation()
      if (this.isMove) {
        container.style.left = this.startx + e.clientX - this.startClientx + 'px'
        container.style.top = this.starty + e.clientY - this.startClienty + 'px'
      }
    },
    stop (e) {
      // console.log('stop -> e', e)
      this.isMove = false
      this.$refs.container.removeEventListener('mousemove', this.move)
      this.$refs.container.removeEventListener('mouseup', this.stop)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.editor-wrap {
  z-index: 2;
  // 使用absolute有问题，因为absolute是相对于父元素的，多级嵌套之后，父元素就很难判断
  position: fixed;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  height: auto;
  left: 40%;
  top: 40%;
}
.editor-header {
  padding: 0 15px;
  height: 42px;
  line-height: 42px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #333;
  background-color: #f8f8f8;
  border-radius: 2px 2px 0 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  .editor-header-left {
    flex: 1;
  }
  .editor-close {
    width: 60px;
    margin-right: -20px;
    font-size: 20px;
    text-align: center;
  }
}
.editor-main {
  margin: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.editor-btn {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  .editor-btn-y,
  .editor-btn-n {
    margin-left: 20px;
    color: #fff;
    height: 28px;
    line-height: 28px;
    margin: 5px 5px 0;
    padding: 0 15px;
    border: 1px solid #dedede;
    background-color: #fff;
    color: #333;
    border-radius: 2px;
    font-weight: 400;
    cursor: pointer;
    text-decoration: none;
  }
  .editor-btn-y {
    border-color: #1e9fff;
    background-color: #1e9fff;
    color: #fff;
  }
}
</style>
