import { ValidationProvider } from 'vee-validate'
import { getCaptcha } from '@/api/apiLogin'

const mixin = {
  components: {
    ValidationProvider
  },
  data () {
    return {
      vali_email: '',
      vali_username: '',
      vali_password: '',
      vali_confirm: '',
      vali_code: '',
      vali_svg: ''
    }
  },
  methods: {
    _getCaptcha () {
      getCaptcha().then(res => {
        if (res.code === 200) {
          this.vali_svg = res.result
        } else {
          console.log('err')
        }
      })
    }
  },
  mounted () {
    this._getCaptcha()
  }
}
export default mixin
