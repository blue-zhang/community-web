<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" >
@import '../public/static/css/global.css';
// 使用彩色iconfont需要进行设置
html body {
  box-sizing: border-box;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
// 验证码的样式
.svg-captcha {
  position: relative;
  top: -17px;
  left: -13px;
  transform: scale(0.9);
}
// veevalidate错误信息的样式
.input-error {
  color: red;
}
// 公共样式
.pointer {
  cursor: pointer;
}
.move {
  cursor: move;
}
.border {
  border: 1px solid #e9e9e9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.border-bottom {
  border-bottom: 1px solid #e9e9e9;
}
.mask {
  background: rgba(0, 0, 0, 0.7);
  z-index: 20000;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.co-origin {
  color: #ff5722;
}
.co-blue {
  color: #00a1d6;
}
.co-black {
  color: #222222 !important;
}
.co-gray {
  color: #999999;
}
.bg-f2 {
  background: #f2f2f2;
}
.bg-blue {
  background-color: #00a1d7;
}
.bg-gray-low {
  background: #e2e2e2;
}
.add-co {
  color: #999999;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: rgb(0, 0, 0);
  }
  &:active {
    color: #009688;
  }
}
.mr20 {
  margin-right: 20px;
}
.mr15 {
  margin-right: 15px;
}
.ml0 {
  margin-left: 0px;
}
.ml20 {
  margin-left: 20px;
}
.mt20 {
  margin-top: 20px;
}
.mt200 {
  margin-top: 200px;
}
.mt15 {
  margin-top: 15px;
}
.mb20 {
  margin-bottom: 20px;
}
.mga {
  margin: 0 auto;
}
.pd-tb5 {
  padding-bottom: 5px;
  padding-top: 5px;
}
.pd-tb15 {
  padding-bottom: 15px;
  padding-top: 15px;
}
.pd100 {
  padding: 20px 100px;
}
.lr20 {
  padding: 0 20px;
}
.p20 {
  padding: 10px 20px;
}
.fr {
  float: right;
}
.text-center {
  text-align: center;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-link {
  color: #01aaed;
  &:hover {
    color: #1e9fff;
  }
  // text-decoration: underline;
}
.col {
  flex-flow: column nowrap;
}
.row {
  flex-flow: row nowrap;
}
.middle {
  margin: 0 auto;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-center-row {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  flex-flow: row nowrap !important;
}
.flex-start-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: row nowrap;
}
.flex-center-col {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  flex-flow: column nowrap !important;
}
.flex-start-col {
  display: flex !important;
  justify-content: flex-start !important;
  align-items: center !important;
  flex-flow: column nowrap !important;
}
.ft12 {
  font-size: 12px;
}
.fwb {
  font-weight: bold;
}
// 弹出框部分，不知道插件里怎么用slot??
$btn-main: #009688;
$btn-dark: darken($btn-main, 5%);
$btn-cancel: #ededed;
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  z-index: 2000;
}
.alert {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 150px;
  margin-left: -150px;
  margin-top: -75px;
  padding: 20px 10px;
  box-shadow: 0 5px 8px 0 rgba($color: #000000, $alpha: 0.5);
  background: #fff;
  border-radius: 6px;
  z-index: 3000;
  display: flex;
  flex-flow: column nowrap;
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

.scale-leave-active {
  transition: transform 0.3s, opacity 0.2s;
}
.scale-enter-active {
  transition: transform 0.3s;
}
.scale-enter /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0.3);
}
.scale-leave-to {
  transform: translateY(-60px);
  opacity: 0;
}
</style>
