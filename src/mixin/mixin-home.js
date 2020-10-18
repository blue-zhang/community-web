import { getList } from '@/api/content'

const mixinHome = {
  data () {
    return {
      isEnd: '',
      tag: '',
      sort: 'answer',
      page: 0,
      limit: 20,
      catalog: 'index',
      isTop: '0',
      lists: [],
      isLastPage: false,
      /**
       * @ 判断是否重复请求
       */
      isWait: false
    }
  },
  methods: {
    init () {
      this.page = 0
      this.lists = []
      this.isLastPage = false
      this._getList()
    },
    _getList () {
      console.log('发送请求')
      this.isWait = true
      let option = {
        isEnd: this.isEnd,
        isTop: this.isTop,
        tag: this.tag,
        sort: this.sort,
        page: this.page,
        limit: this.limit,
        catalog: this.catalog
      }
      getList(option).then(res => {
        // @:响应成功，可以继续请求
        this.isWait = false
        if (res.code === 200) {
          // 判断是否为最后一页
          if (res.data.length < this.limit) {
            this.isLastPage = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
            console.log(this.lists)
          } else {
            this.lists.concat(res.data)
          }
        }
      })
    },
    nextPage () {
      if (this.isLastPage) return
      /**
       * @this.isWait === true ,说明等待响应，不能继续请求
       */
      if (this.isWait) return
      this.page++
      this._getList()
    }
  },
  mounted () {
    // 页面挂载的时候，route并不会变化，且catalog默认为'index'，因此要在挂载的时候赋值
    this.catalog = this.$route.params.catalog ? this.$route.params.catalog : 'index'
    this._getList()
  }
}

export default mixinHome
