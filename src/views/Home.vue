<template>
  <div>
    <div class="layui-row">
      <panel></panel>
    </div>
    <div class="layui-container">

      <div class="layui-row layui-col-space15">

        <div class="layui-col-md8">
          <router-view></router-view>
        </div>
        <div class="layui-col-md4">
          <tips />
          <sign />
          <hot-lists />
          <ads />
          <links />
        </div>
      </div>
    </div>
  </div>

</template>
<script>
import Ads from '../components/sidebar/Ads'
import Sign from '../components/sidebar/Sign'
import Links from '../components/sidebar/Links'
import HotLists from '../components/sidebar/HotLists'
import Tips from '../components/sidebar/Tips'
import Panel from '../components/Panel'

export default {
  name: 'Home',
  components: {
    Panel,
    Ads,
    Sign,
    Links,
    HotLists,
    Tips
  }
}
</script>
<style
  lang="scss"
  scoped
>
</style>
