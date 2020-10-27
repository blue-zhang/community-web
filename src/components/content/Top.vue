<template>
  <div class="fly-panel">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
      <a href="#signin"
         class="layui-hide-sm layui-show-xs-block fly-right"
         id="LAY_goSignin"
         style="color: #ff5722">去签到</a>
    </div>
    <lists-item :lists="lists"
                :isShow="false"></lists-item>
  </div>
</template>
<script>
import ListsItem from '@/components/content/ListsItem'
import mixinHome from '@/mixin/mixin-home'

export default {
  name: 'Top',
  data() {
    return {
      isEnd: '',
      tag: '',
      sort: 'answer',
      page: 0,
      limit: 20,
      catalog: 'index',
      // 置顶页面设置为1
      isTop: '1'
    }
  },
  mixins: [mixinHome],
  components: {
    ListsItem
  }
}
</script>
<style
  lang="scss"
  scoped
>
</style>
