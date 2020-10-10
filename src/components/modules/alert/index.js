import AlertComponent from './Alert.vue'

const Alert = {}

Alert.install = function (Vue) {
  const AlertConstructor = Vue.extend(AlertComponent)
  const instance = new AlertConstructor()
  const node = document.createElement('div')
  document.body.appendChild(node)
  instance.$mount(node)

  // 添加实例方法
  Vue.prototype.$alert = function (msg) {
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
  }
  Vue.prototype.$confirm = function (msg, success, cancel) {
    instance.type = 'confirm'
    instance.msg = msg
    instance.isShow = true
    if (typeof success !== 'undefined') {
      instance.success = success
    }
    if (typeof cancel !== 'undefined') {
      instance.cancel = cancel
    }
  }
}

export default Alert
