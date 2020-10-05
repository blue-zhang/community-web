import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import local from '@/local/index'
export default function () {
  local()
  Object.keys(rules).forEach(rule => {
    extend(rule, {
      ...rules[rule]// copies rule configuration
      // message: messages[rule] // 会覆盖本地化设置
    })
  })
  extend('minmax', {
    validate (value, args) {
      const length = value.length
      return length >= args.min && length <= args.max
    },
    params: ['min', 'max']
  })
}
