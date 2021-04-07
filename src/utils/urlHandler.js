
const detailUrl = (pid, rid) => {
  const str = `/detail/${pid}?rid=${rid}`
  return str
}
const commentUrl = (uid) => {
  const str = `/detail/${uid}?to=comment`
  return str
}

const getParams = (params) => {
  // let str = location.search.substr(1)
  let str = location.hash.split('?')[1]
  if (!str) {
    return ''
  }
  const reg = new RegExp(`($|^)${params}=([^&]+)(&|$)`, 'i')
  const arr = str.match(reg)
  if (arr == null) {
    return null
  } else {
    // 第二个括号匹配的是参数值
    return arr[2]
  }
}

export {
  detailUrl,
  commentUrl,
  getParams
}
