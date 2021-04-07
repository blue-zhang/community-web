/*
 * @Author: your name
 * @Date: 2021-03-02 08:53:16
 * @LastEditTime: 2021-03-02 10:51:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\mixin\mixin-load.js
 */

const mixinLoad = {
  data () {
    return {
      isLastPage: true,
      // 判断是否重复请求
      isWait: false
    }
  },
  methods: {
    nextPage () {
      if (this.isLastPage) return
      if (this.isWait) return
      this.page++
      this._getList()
    },
    loadMore () {
      const debounce = this._.debounce(() => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
        const distance = scrollHeight - (scrollTop + clientHeight)
        if (Math.floor(distance) <= 50) {
          this.nextPage()
        }
      }, 100)
      debounce()
    }
  },
  async mounted () {
    await this.$nextTick()
    window.addEventListener('scroll', this.loadMore)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.loadMore)
  }
}

export default mixinLoad
