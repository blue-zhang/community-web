import BubbleComponent from './Bubble.vue'

const Bubble = {}

Bubble.install = function (Vue) {
  const BubbleConstructor = Vue.extend(BubbleComponent)
  const instance = new BubbleConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$bubble = function (user, mes, type) {
    instance.type = type
    instance.isShow = true
    instance.user = user
    instance.mes = mes
  }
}

export default Bubble