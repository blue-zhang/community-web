import { extend } from 'vee-validate'
import { required, email, is, length } from 'vee-validate/dist/rules'
import local from '@/local'

export default function () {
  local()
  extend('email', email)
  extend('is', is)
  extend('required', required)
  extend('length', length)
  extend('minmax', {
    validate (value, args) {
      const length = value.length
      return length >= args.min && length <= args.max
    },
    params: ['min', 'max']
  })
  extend('notNum', {
    validate: value => {
      return !(/^\d{1,}$/).test(value)
    }
  })
}
