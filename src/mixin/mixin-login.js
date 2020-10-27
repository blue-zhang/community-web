import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { getCaptcha } from '@/api/login'
import uuid from 'uuid/v4'

const mixin = {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      vali_email: '',
      vali_username: '',
      vali_fakename: '',
      vali_password: '',
      vali_confirm: '',
      vali_code: '',
      vali_svg: ''
    }
  },
  methods: {
    // 因为有点击验证码发送请求的需要，所以设置这个方法
    _getCaptcha () {
      const sid = this.$store.state.sid
      getCaptcha(sid).then(res => {
        if (res.code === 200) {
          this.vali_svg = res.data
        } else {
          console.log(' return captcha has err')
        }
      })
    }
  },
  mounted () {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuid()
      localStorage.setItem('sid', sid)
    }
    this.$store.commit('setSid', sid)
    this._getCaptcha()
  }
}
export default mixin
