<template>
  <div class="fly-panel  lsCon"
       style="margin-bottom: 0">
    <div class="fly-panel-title fly-filter">
      <!-- <a href=""
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
         @click.prevent="search(3)">精华</a> -->
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
                @change-col="changeCol"
                @change-praise="changePraise"
                :isLastPage="isLastPage">
    </lists-item>
  </div>
</template>
<script>
import ListsItem from '@/components/content/ListsItem'
import mixinHome from '@/mixin/mixin-home'
import mixinLoad from '@/mixin/mixin-load'

export default {
  name: 'Lists',
  components: {
    ListsItem
  },
  mixins: [mixinHome, mixinLoad],
  data () {
    return {
      current: 0,
      isEnd: '',
      tag: '',
      sort: 'answer',
      page: 0,
      limit: 15,
      catalog: 'index',
      isTop: '0'
    }
  },
  watch: {
    current (newv, oldv) {
      this.init()
    },
    $route (newv, oldv) {
      let catalog = this.$route.params.catalog
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.init()
    }
  },
  methods: {
    // 收藏信息前端伪同步，父子组件传值
    changeCol (index, val, num) {
      console.log(num)
      this.lists[index].collected = val
      this.lists[index].stars = num
    },
    // 点赞信息前端伪同步，父子组件传值
    changePraise (index, val, num) {
      this.lists[index].handed = val
      this.lists[index].hands = num
    },
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
