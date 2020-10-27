import { getList } from '@/api/content'

const mixinHome = {
  data () {
    return {
      // Lists组件控制isEnd，tag，sort属性
      isEnd: '', // 已结未结
      tag: '', // 精华
      sort: 'answer', // 按热度，按最新排序
      page: 0,
      limit: 20,
      // Panel组件控制catalog属性
      catalog: 'index',
      // 除了置顶栏目，别的栏目都显示不置顶的帖子
      isTop: '0',
      lists: [],
      // 判断是否最后一页
      isLastPage: true,
      // 判断是否重复请求
      isWait: false
    }
  },
  methods: {
    init () {
      this.page = 0
      this.lists = []
      this.isLastPage = true
      this._getList()
    },
    _getList () {
      // 发送请求未响应，不能继续请求
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
        // 响应成功，可以继续请求
        this.isWait = false
        if (res.code === 200) {
          // 判断是否为最后一页
          if (res.data.length < this.limit) {
            this.isLastPage = true
          }
          // 不一次性返回所有数据，每次翻页返回一次数据，利用concat拼接在一起
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists.concat(res.data)
          }
        }
      })
    },
    nextPage () {
      if (this.isLastPage) return
      if (this.isWait) return
      this.page++
      this._getList()
    }
  },
  mounted () {
    // 点击panel切换页面时，自动发送请求
    this.catalog = this.$route.params.catalog ? this.$route.params.catalog : 'index'
    this._getList()
  }
}

export default mixinHome
