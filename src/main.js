import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Alert from './components/modules/alert/index'
// import layui from 'vue-layui'
// import 'vue-layui/lib/vue-layui.css'

Vue.config.productionTip = false
Vue.use(Alert)
// Vue.use(layui)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
