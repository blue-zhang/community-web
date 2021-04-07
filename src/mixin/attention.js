import { addAttention, delAttention } from '@/api/user'

const follow = async (uid, attention) => {
  const res = await addAttention({ uid, attention })
  if (res.code === 200) {
    this.$bubble('关注成功')
  }
}
const delFollow = async (uid, attention) => {
  const res = await delAttention({ uid, attention })
  if (res.code === 200) {
    this.$bubble('取消关注成功')
  }
}

export {
  follow, delFollow
}
