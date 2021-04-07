<template>
  <div class="fly-panel fly-panel-user">
    <div class="layui-tab layui-tab-brief">
      <!-- <button class="layui-btn layui-btn-danger"
              id="LAY_delallmsg">清空全部消息</button> -->
      <div>
        <!--<div class="fly-none">您暂时没有最新消息</div>-->
        <mes-lists :type="'replyMessage'"
                   :lists="lists"></mes-lists>
        <page-bar v-show="total > limit"
                  :total="total"
                  :current="current"
                  :align="'left'"
                  :size="limit"
                  :hasTotal="true"
                  :hasSelect="false"
                  @changeCurrent="handleChange"></page-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserReply, clearAll } from '@/api/user'
import mesLists from '@/components/user-message/mesLists'
import PageBar from '@/components/modules/pagination/Index'

export default {
  name: 'ReplyMessage',
  components: {
    mesLists,
    PageBar
  },
  data () {
    return {
      lists: [],
      url: '',
      total: 0,
      current: 0,
      page: 0,
      limit: 8
    }
  },
  methods: {
    handleChange (val) {
      this.current = val
      this.getLists()
    },
    async getLists () {
      const res = await getUserReply({
        page: this.current,
        limit: this.limit
      })
      if (res.code === 200) {
        this.lists = res.data
        this.total = res.total
      }
    }
  },
  async mounted () {
    await this.getLists()
  },
  async beforeDestroy () {
    const res = await clearAll({ type: 'comReply' })
    if (res.code === 200) {
      const data = this.$store.state.unreadNum
      this.$store.commit('setUnreadNum', { ...data, comReply: 0 })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
