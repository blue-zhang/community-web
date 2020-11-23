<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user"
         pad20>
      <forget-bar></forget-bar>
      <pwd-change :toName='"Succ"'></pwd-change>
    </div>
  </div>
</template>
<script>
import PwdChange from '@/components/user-set/accountBind/PwdChange'
import ForgetBar from './ForgetBar'
export default {
  name: 'Reset',
  data () {
    return {
    }
  },
  components: {
    PwdChange,
    ForgetBar
  }
}
</script>
<style scoped>
</style>
