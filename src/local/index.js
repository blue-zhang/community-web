import { localize } from 'vee-validate'

export default () => {
  localize('zn')
  localize({
    zn: {
      names: {
        password: '密码',
        username: '用户名',
        code: '验证码',
        email: '邮箱',
        fakename: '昵称'
      },
      fields: {
        username: {
          required: '亲亲，{_field_}不能为空哦'
        },
        password: {
          required: '亲亲，密码不能为空哦',
          minmax: '{_field_}位数在{min}到{max}位之间'
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
        },
        fakename: {
          required: '亲亲，请起一个昵称',
          minmax: '{_field_}位数在{min}到{max}位之间',
          notNum: '{_field_}不能全是数字哦'
        }
      }
    }
  })
}
