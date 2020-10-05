import { localize } from 'vee-validate'
import zn from 'vee-validate/dist/locale/zh_CN.json'

export default () => {
  localize('zn', zn)
  localize({
    zn: {
      names: {
        password: '密码',
        username: '用户名',
        code: '验证码',
        email: '邮箱'
      },
      fields: {
        username: {
          required: '亲亲，用户名不能为空哦',
          email: '亲亲，用户名应为邮箱格式',
          minmax: '用户名位数在3到12位之间'
        },
        password: {
          required: '亲亲，密码不能为空哦',
          minmax: '密码位数在6到16位之间'
        },
        code: {
          required: '亲亲，请填写验证码哦',
          length: '验证码的长度为4'
        },
        email: {
          required: '亲亲，请填写邮箱哦',
          email: '亲亲，邮箱格式不对哦'
        },
        confirm: {
          is: '两次密码输入不一致'
        }
      }
    }
  })
}
