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
          <label class="layui-form-label">再输一次</label>
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
  components: {
    ValidationProvider,
    ValidationObserver
  },
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
        // 忘记密码，不需要知道原来的密码。需要 OtherVerify
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
        // 更换密码，使用 PwdVerify
        changePwd({
          password: this.vali_password
        }).then(res => {
          if (res.code === 200) {
            this.isSubmit = true
            this.$alert(res.msg)
            this.$router.push({ name: 'ChangeSucc', query: { msg: '您的密码修改成功', textName: '修改密码' } })
          } else {
            this.$alert(res.msg)
          }
        })
      }
    }
  },
  mounted () {
    this.event.$emit('progress', 1)
  },
  beforeRouteEnter (to, from, next) {
    const arr = ['PwdVerify', 'OtherVerify', 'PwdChange']
    if (arr.every((name) => {
      return from.name !== name
    })) {
      next({ path: '/' })
    } else {
      next()
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
