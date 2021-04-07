<template>
  <div class="fly-panel">
    <div class="fly-panel-title fly-filter">
      <a>置顶</a>
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
  data () {
    return {
      limit: 15,
      catalog: 'index',
      // 置顶页面设置为1
      isTop: '1'
    }
  },
  // 用来初始化时显示置顶部分内容
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
