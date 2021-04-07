// 已废弃，不同窗口同步数据，情况过多，而且打开两个浏览器多进程情况下不可能做到，难度过大，还有安全性问题，没有必要，postMessage open
// 别人不写这个功能是有原因的，不要鸡蛋碰石头，别和时间过不去
class PraiseSubject {
  constructor() {
    this.itemLists = []
    this.detailLists = []
    this.state = '0'
  }

  attachItem (observer) {
    this.itemLists.push(observer)
  }

  attachDetail (observer) {
    this.detailLists.push(observer)
  }

  notifyObservers (state, _this) {
    this.detailLists.forEach((item) => {
      item.change(state, _this)
    })
    this.itemLists.forEach((item) => {
      item.change(state, _this)
    })
  }

  setState (val, _this) {
    this.state = val
    this.notifyObservers(this.state, _this)
  }
}

PraiseSubject.getInstance = (function () {
  let instance
  return function () {
    if (!instance) {
      instance = new PraiseSubject()
    }
    return instance
  }
})()

// ListsItem 组件下
// class ItemObserver {
//   constructor(s) {
//     s.attach(this)
//   }

//   change (state, _this) {
//     console.log(_this)
//     if (state === '1') {
//       _this.$emit('change-praise', _this.index, '1', 1)
//     } else if (state === '0') {
//       _this.$emit('change-praise', _this.index, '0', -1)
//     }
//   }
// }

// Detail 组件下
// class DetailObserver {
//   constructor(s) {
//     s.attach(this)
//   }

//   change (state, _this) {
//     console.log(_this)
//     if (state === '1') {
//       _this.detail.handed = '1'
//       _this.detail.hands++
//     } else if (state === '0') {
//       _this.detail.handed = '0'
//       _this.detail.hands++
//     }
//   }
// }

export { PraiseSubject }
