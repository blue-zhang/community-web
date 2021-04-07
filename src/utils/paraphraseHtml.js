import face from '@/assets/js/face'

export default function (content = '') {
  if (content === '') {
    return
  }
  let pre = content
  const faceReg = /\s表情\[[\u4E00-\u9FA5]+\]/g
  const picReg = /\s图片\[\S+\]/g
  const hrReg = /\s\n\[分割线\]/g
  // 链接中有/.这种字符，不能用/w, /S匹配非空白字符
  const linkReg = /\sa\(\S+\]/g
  // 匹配表情
  if (faceReg.test(pre)) {
    let arr = pre.match(faceReg)
    arr.map(item => {
      const key = item.match(/\[[\u4E00-\u9FA5]+\]/g)
      pre = pre.replace(item, `<img src="${face[key]}" alt=wrong />`)
    })
  }
  // 匹配图片
  if (picReg.test(pre)) {
    let arr = pre.match(picReg)
    arr.map(item => {
      pre = pre.replace(item, `</br> <img src="${item.substr(4, item.length - 5)}" />`)
    })
  }
  // 匹配hr
  if (hrReg.test(pre)) {
    pre = pre.replace(hrReg, '<hr>')
  }

  // 匹配链接
  if (linkReg.test(pre)) {
    let arr = pre.match(linkReg)
    arr.map(item => {
      const name = item.match(/\((.+)\)/)
      const href = item.match(/\[(.+)\]/)
      pre = pre.replace(item, `<a href="${href[1]}" title=${href[1]}>${name[1]}</a>`)
    })
  }
  // 匹配引用
  // 匹配代码
  return pre
}
