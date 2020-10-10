const strengthValidate = (value) => {
  let mode = 0
  let strength = '0'
  let text = '弱'
  // 正则表达式验证符合要求的
  if (value.length < 6) {
    return mode
  } else {
    if (/\d/.test(value)) mode++ // 数字
    if (/[a-z]/.test(value)) mode++ // 小写
    if (/[A-Z]/.test(value)) mode++ // 大写
    if (/\W/.test(value)) mode++ // 特殊字符
    if (value.length > 11) mode++
  }

  if (mode > 0 && mode < 2) {
    strength = '33%'
    text = '弱'
  } else if (mode >= 2 && mode < 4) {
    strength = '66%'
    text = '中'
  } else if (mode >= 4 && mode < 6) {
    strength = '100%'
    text = '强'
  }
  return { strength, text }
}
export default strengthValidate
