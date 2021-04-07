import moment from 'dayjs'

/**
 * 需要在data中设置一个countTime属性
 * 指定一个结束时间点进行倒计时，作为一个方法，添加到method中
 * format('YYYY-MM-DD')把时间定格在0点
 * @param {String} type 是否取消定时
 * @param {*} callback 倒计时stop后的回调
 * @param {moment} end 几点钟结束计时，默认是明天0点
 */
function countDown (callback = () => { }, end = moment().add(1, 'd').format('YYYY-MM-DD')) {
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
}

function durtionCountDown (time, cb, nowStop) {
  if (nowStop) {
    stop()
  }
  let count = () => {
    this.durtionCountTime = time
    // console.log(this.durtionCountTime)
    time--
    localStorage.setItem('countTime', this.durtionCountSecond)
    if (time === 0) {
      stop()
      cb()
    }
  }
  const myCount = setInterval(count, 1000)
  function stop () {
    clearInterval(myCount)
  }
}

/**
 * 需要在data中设置一个durtionCountTime
 * 指定一个时间段进行倒计时，作为一个方法，添加到method中
 * @param {Number} time 时间值，包括单位，单位和moment一样
 * @param {String} unit 和moment一样
 * @param {String} type 显示时间的汉化格式，暂时支持's'，'m'，'mm', 'hh'
 * @param {*} callback 倒计时stop后的回调
 * @param {*} callback2 每次计时时的回调
 */
function cplDurtionCountDown (timeValue, type = 's', callback = () => { }) {
  // 使用正则表达式来拆分时间值和单位
  let value = Number(timeValue.replace(/\D/, ''))
  let unit = timeValue.replace(/[0-9]*/, '').toLowerCase()
  if (unit !== 's') {
    if (unit === 'm') {
      value = value * 60
    } else if (unit === 'h') {
      value = value * 3600
    } else {
      return
    }
  }
  const base = moment('1990-1-1')
  let count = () => {
    value--
    this.durtionCountSecond = `${value}s`
    let time = base.add(value, 's')
    localStorage.setItem('countTime', this.durtionCountSecond)
    switch (type) {
      case 'hh':
        this.durtionCountTime = time.format('HH:mm:ss')
        break
      case 'mm':
        this.durtionCountTime = time.format('mm:ss')
        break
      case 'm':
        {
          const v = time.format('m:s').split(':')
          if (v[0] !== '0') {
            this.durtionCountTime = v[0].concat('分') + v[1].concat('秒')
          } else {
            this.durtionCountTime = v[1].concat('秒')
          }
        }
        break
      case 's':
        this.durtionCountTime = time.format('s').concat('秒')
        break
    }
    if (value === 0) {
      stop()
      callback()
    }
  }
  const myCount = setInterval(count, 1000)
  function stop () {
    clearInterval(myCount)
  }
}

export { countDown, durtionCountDown, cplDurtionCountDown }
