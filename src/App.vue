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
.svg-captcha {
  position: relative;
  top: -17px;
  left: -13px;
  transform: scale(0.9);
}
.input-error {
  color: red;
}
// 公共样式
.pointer {
  cursor: pointer;
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
.co-gray {
  color: #999999;
}
.bg-f2 {
  background: #f2f2f2;
}
.bg-blue {
  background: #1e9fff;
}
.mr20 {
  margin-right: 20px;
}
.ml0 {
  margin-left: 0px;
}
.mt20 {
  margin-top: 20px;
}
.mt15 {
  margin-top: 15px;
}
.mb20 {
  margin-bottom: 20px;
}
.pd-tb5 {
  padding-bottom: 5px;
  padding-top: 5px;
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
  text-decoration: underline;
}

.col {
  flex-flow: column nowrap;
}
.row {
  flex-flow: row nowrap;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ft12 {
  font-size: 12px;
}
</style>
