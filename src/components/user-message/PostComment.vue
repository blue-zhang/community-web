<template>
  <div class="fly-panel fly-panel-user">
    <div class="layui-tab layui-tab-brief">
      <!-- <button class="layui-btn layui-btn-danger"
              id="LAY_delallmsg">清空全部消息</button> -->
      <div>
        <!--<div class="fly-none">您暂时没有最新消息</div>-->
        <mes-lists :lists="lists"></mes-lists>
      </div>
    </div>
  </div>
</template>

<script>
import { getPostComment, clearAll } from '@/api/user'
import mesLists from '@/components/user-message/mesLists'
export default {
  name: 'PostComment',
  components: {
    mesLists
  },
  data () {
    return {
      lists: []
    }
  },
  async mounted () {
    const res = await getPostComment()
    if (res.code === 200) {
      this.lists = res.data
    }
  },
  async beforeDestroy () {
    const res = await clearAll({ type: 'postCom' })
    if (res.code === 200) {
      const data = this.$store.state.unreadNum
      this.$store.commit('setUnreadNum', { ...data, postCom: 0 })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
