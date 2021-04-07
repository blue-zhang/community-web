<!--
 * @Author: your name
 * @Date: 2021-03-05 10:04:40
 * @LastEditTime: 2021-03-05 22:53:11
 * @Lastselalerts: Please set Lastselalerts
 * @Description: In User Settings Edit
 * @FilePath: \front\src\components\modules\alert\SelectAlert.vue
-->
<template>
  <div>
    <div class="shadowBox alert"
         style="maxHeight: 600px; height: auto; padding: 10px 0; width: 350px">
      <div class="selalert-header">
        <div></div>
        <div class="selalert-header-left move">
          <span class="selalert-title">收藏夹</span>
        </div>
        <i class=" selalert-close layui-icon layui-icon-close pointer"
           @click="close"></i>
      </div>
      <div class="selalert-main">
        <slot name="lists">
        </slot>
      </div>
      <slot name="btn">
      </slot>
    </div>
    <div class="mask"
         @click="close"></div>
  </div>
</template>

<script>
export default {
  name: 'selectAlert',
  data () {
    return {
      // 利用鼠标拖动需要的数据
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  mounted () {
    const doc = document.querySelector('.input-item')
    if (doc) { doc.focus() }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.selalert-header {
  width: 350px;
  margin-top: -20px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #333;
  background-color: #f8f8f8;
  border-radius: 2px 2px 0 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  div {
    flex: 1;
  }
  .selalert-close {
    width: 60px;
    margin-right: 0px;
    font-size: 20px;
    text-align: center;
  }
}

.selalert-main {
  width: 100%;
  margin-top: 10px;
  padding: 0 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
</style>
