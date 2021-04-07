<template>
  <div>
    <span id="topAnchor"></span>
    <ul class="layui-fixbar">
      <li v-show="showEdit"
          class="layui-icon"
          lay-type="bar1"
          style="background-color:#009688"><i class="layui-icon layui-icon-edit"
           style="fontSize: 100%"></i></li>
      <li v-show="showTop"
          class="layui-icon layui-fixbar-top"
          lay-type="top"
          @click="toTop"
          style="background-color: rgb(0, 150, 136); display: list-item;z-index: 250">
        <i class="layui-icon layui-icon-top"
           style="fontSize: 100%">
        </i>
      </li>
    </ul>
    <a href="#topAnchor"
       class="a"></a>
    <span class="bottom"></span>
  </div>
</template>

<script>
import { scrollToElem } from '@/utils/scrollToElem'

export default {
  name: 'BaseToTop',
  data () {
    return {
      showEdit: true,
      showTop: false
    }
  },
  methods: {
    scrollTop () {
      const debounce = this._.debounce(() => {
        if (document.querySelector('.bottom').getBoundingClientRect().top < document.body.clientHeight - 150) {
          this.showTop = true
        } else {
          this.showTop = false
        }
      }, 300)
      debounce()
    },
    toTop () {
      // document.querySelector('.a').click()
      scrollToElem('.a', 500, 0, true)
    }
  },
  async mounted () {
    const list = ['AddEditor, PostUpdate']
    if (list.some((itme) => {
      return itme === this.$route.name
    })) {
      this.showEdit = false
    }
    if (!this.$router.name) {
      this.showEdit = false
    }

    await this.$nextTick()
    window.addEventListener('scroll', this.scrollTop)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.scrollTop)
  }
}
</script>

<style lang="scss" scoped>
#topAnchor {
  top: 0px;
  position: absolute;
}
</style>
