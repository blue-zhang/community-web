<template>
  <div class="flex-center-col">
    <div class="succ-msg">
      {{msg}}
    </div>
    <button type="button"
            @click="toIndex"
            class=" fwb layui-btn layui-btn-normal mt20 mb20">返回首页</button>
    <div class="succ-msg">{{durtionCountTime}}后自动返回首页</div>
  </div>

</template>

<script>
import { updateEmail } from '@/api/userAccount'
import { durtionCountDown } from '@/utils/countDown'
import config from '@/config/config'

export default {
  name: 'ChangeSucc',
  data () {
    return {
      msg: '',
      durtionCountTime: 5
    }
  },
  methods: {
    durtionCountDown,
    toIndex () {
      this.durtionCountDown(0, 0, true)
      this.$router.push({ name: 'index' })
    }
  },
  mounted () {
    this.event.$emit('progress', 2)

    this.msg = this.$route.query.msg
    // 修改绑定邮箱功能，是跳转到成功界面的时候执行更新邮箱的操作。
    const type = this.$route.query.type
    if (type === 'UpdateEmail') {
      const key = this.$route.query.key
      updateEmail({
        key
      }).then(res => {
        this.msg = res.msg
      })
    }
    this.durtionCountDown(config.indexCount, () => {
      if (this.$route !== 'index') {
        this.$router.push({ name: 'index' })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.succ-msg {
  text-align: center;
  font-size: 20px;
}
</style>
