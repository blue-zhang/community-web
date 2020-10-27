<template>
  <div class="fly-panel"
       style="margin-bottom: 0">
    <div class="fly-panel-title fly-filter">
      <a href=""
         :class="{ 'layui-this': isEnd === '' && tag === '' }"
         @click.prevent="search(0)">综合</a>
      <span class="fly-mid"></span>
      <a href=""
         :class="{ 'layui-this': isEnd === '0' && tag === '' }"
         @click.prevent="search(1)">未结</a>
      <span class="fly-mid"></span>
      <a href=""
         :class="{ 'layui-this': isEnd === '1' && tag === '' }"
         @click.prevent="search(2)">已结</a>
      <span class="fly-mid"></span>
      <a href=""
         :class="{ 'layui-this': tag === '精华' }"
         @click.prevent="search(3)">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a href=""
           :class="{ 'layui-this': sort === 'created' }"
           @click.prevent="search(4)">按最新</a>
        <span class="fly-mid"></span>
        <a href=""
           :class="{ 'layui-this': sort === 'answer' }"
           @click.prevent="search(5)">按热议</a>
      </span>
    </div>
    <lists-item :lists="lists"
                @nextPage="nextPage()"
                :isLastPage="isLastPage">
    </lists-item>
  </div>
</template>
<script>
import ListsItem from '@/components/content/ListsItem'
import mixinHome from '@/mixin/mixin-home'

export default {
  name: 'Lists',
  components: {
    ListsItem
  },
  mixins: [mixinHome],
  data() {
    return {
      // 防止点击菜单多次发送请求
      current: 0,
      isEnd: '',
      tag: '',
      sort: 'answer',
      page: 0,
      limit: 20,
      catalog: 'index',
      isTop: '0'
    }
  },
  watch: {
    current (newv, oldv) {
      this.init()
    },
    '$route' (newv, oldv) {
      let catalog = this.$route.params.catalog
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.init()
    }
  },
  methods: {
    search (val) {
      /**
       * @: 防止重复请求
       */
      if (this.current === val) {
        return
      }
      this.current = val
      switch (val) {
        case 0:
          this.isEnd = ''
          this.tag = ''
          break
        case 1:
          this.isEnd = '0'
          this.tag = ''
          break
        case 2:
          this.isEnd = '1'
          this.tag = ''
          break
        case 3:
          this.isEnd = ''
          this.tag = '精华'
          break
        case 4:
          this.sort = 'created'
          break
        case 5:
          this.sort = 'answer'
          break
      }
    }
  }
}
</script>
<style
  lang="scss"
  scoped
>
</style>
