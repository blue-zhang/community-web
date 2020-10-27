import moment from 'dayjs'

// 作为一个方法，添加到method中
/**
 * 需要在data中设置一个countTime属性
 * @param {String} type 是否取消定时
 * @param {*} callback 倒计时stop后的回调
 * @param {moment} end 倒计时结束的时间，默认是明天0点
 */
function countDown (callback = () => { }, type = '', end = moment().add(1, 'd').format('YYYY-MM-DD')) {
  let count = () => {
    const now = moment(moment().format('YYYY-MM-DD HH:mm:ss')).unix() * 1000
    const endTime = moment(end).unix() * 1000
    const base = moment(moment().add(1, 'd').format('YYYY-MM-DD')).unix() * 1000
    const time = moment(base + endTime - now).format('HH:mm:ss')
    this.countTime = time
    if (endTime - now === 0) {
      stop()
      callback()
    }
  }
  const myCount = setInterval(count, 1000)
  function stop () {
    clearInterval(myCount)
  }
  if (type === 'cancel') {
    stop()
    callback()
  }
}
export default countDown