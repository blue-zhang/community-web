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
@import '../public/static/layui/css/layui.css';
@import '../public/static/css/global.css';
@import '../public/static/layui/css/modules/layer/default/layer.css';
.svg-captcha {
  position: relative;
  top: -17px;
  left: -13px;
  transform: scale(0.9);
}
.input-error {
  color: red;
}
</style>
