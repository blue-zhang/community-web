<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user"
         pad20>
      <forget-bar></forget-bar>
      <other-verify :toName='"Reset"'></other-verify>
    </div>
  </div>
</template>
<script>
import OtherVerify from '@/components/user-set/accountBind/OtherVerify'
import ForgetBar from './ForgetBar'
export default {
  name: 'Forget',
  data () {
    return {
    }
  },
  components: {
    OtherVerify,
    ForgetBar
  }
}
</script>
<style scoped>
</style>
