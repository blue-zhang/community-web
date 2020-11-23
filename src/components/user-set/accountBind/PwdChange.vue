<template>
  <validation-observer ref="form"
                       v-slot="{ handleSubmit }">
    <form class="layui-form layui-form-pane layui-tab-item layui-show pd-tb15 flex-center-col mga"
          @submit.prevent="handleSubmit(onSubmit)">
      <div class="layui-form-item flex-center-row">
        <validation-provider name="password"
                             rules="required|minmax:6,16"
                             v-slot="{ errors }">
          <label class="layui-form-label">新密码</label>
          <div class="layui-input-inline">
            <input type="password"
                   :disabled="isSubmit"
                   v-model="vali_password"
                   placeholder="请输入新密码"
                   class="layui-input">
            <div class="input-error layui-form-mid">
              {{ errors[0] }}
            </div>
          </div>
        </validation-provider>
      </div>
      <div class="layui-form-item flex-center-row">
        <validation-provider name="confirm"
                             rules="is:@password"
                             v-slot="{ errors }">
          <label class="layui-form-label">确认密码</label>
          <div class="layui-input-inline">
            <input type="password"
                   :disabled="isSubmit"
                   v-model="vali_confirm"
                   placeholder="请重复输入密码"
                   class="layui-input">
            <div class="input-error layui-form-mid">
              {{ errors[0] }}
            </div>
          </div>
        </validation-provider>
      </div>
      <div class="layui-form-item flex-center-row ">
        <button class="layui-btn btn-veri layui-btn-radius layui-btn-normal"
                type="submit"
                :class="{ 'layui-btn-disabled': isSubmit}">修改密码</button>
      </div>
    </form>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { changePwd } from '@/api/userAccount'
import { reset } from '@/api/login'

export default {
  name: 'PwdChange',
  data () {
    return {
      vali_password: '',
      vali_confirm: '',
      isSubmit: false
    }
  },
  props: {
    toName: {
      type: String,
      default: ''
    }
  },
  methods: {
    onSubmit () {
      if (this.toName) {
        const userkey = this.$route.query.userkey
        reset({
          userkey,
          password: this.vali_password
        }).then(res => {
          if (res.code === 200) {
            this.isSubmit = true
            this.$alert(res.msg)
            this.$router.push({
              name: this.toName
            })
          } else {
            this.$alert(res.msg)
          }
        })
      } else {
        changePwd({
          password: this.vali_password
        }).then(res => {
          if (res.code === 200) {
            this.isSubmit = true
            this.$alert(res.msg)
            this.$router.push({ name: 'ChangeSucc', query: { type: 'PwdChange', msg: '您的密码修改成功' } })
          } else {
            this.$alert(res.msg)
          }
        })
      }
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    // 改变progressbar的显示
    // 如果是忘记密码功能，跳转到重置密码页面
    if (!this.toName) {
      let barLists = JSON.parse(localStorage.getItem('barLists'))
      barLists[1].complete = true
      this.$store.commit('getBarLists', barLists)
    }
  }
}
</script>

<style lang="scss" scoped>
.layui-form-item {
  margin: 0px;
  .layui-input-inline {
    margin: 0px;
  }
}
.btn-veri {
  width: 300px;
}
</style>
