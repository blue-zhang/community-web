import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from './store/store'
import Alert from './components/modules/alert/index'
import Bubble from './components/modules/bubble/index'
// 使用彩色iconfont需要进行设置
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// 引入并执行veevalidate本地化设置
import '@/utils/localValidate'

Vue.config.productionTip = false

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components/baseItem',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})

Vue.use(Alert)
Vue.use(Bubble)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
