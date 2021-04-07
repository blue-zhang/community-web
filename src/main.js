/*
 * @Author: your name
 * @Date: 2020-10-27 10:42:16
 * @LastEditTime: 2021-03-03 10:59:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from './store/store'
import Alert from './components/modules/alert/index'
import Bubble from './components/modules/bubble/index'
// 使用彩色iconfont需要进行设置
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'
// import upperFirst from 'lodash/upperFirst'
// import camelCase from 'lodash/camelCase'
// 引入并执行veevalidate本地化设置
import '@/utils/localValidate'
import _ from 'lodash'
import newvue from '@/utils/newvue'
import moment from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

moment.extend(relativeTime)

Vue.config.productionTip = false

// 自动化全局注册
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
  const componentName = _.upperFirst(
    _.camelCase(
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

// 自定义事件
Vue.prototype.event = newvue
Vue.prototype._ = _

Vue.filter('_moment', function (val) {
  moment.locale('zh-cn')
  /**
   * @功能1: 超过7天，显示具体的创建日期
   * @功能2: 7天之内，只显示多长时间之前创建的
   */
  if (moment(val).isBefore(moment(moment().subtract(7, 'days')))) {
    return moment(val).format('YYYY-MM-DD')
  } else {
    return moment(val).locale('zh-cn').from(moment())
  }
})
Vue.filter('_time', function (val) {
  moment.locale('zh-cn')
  return moment(val).format('YYYY-MM-DD')
})
Vue.filter('limit99', function (val) {
  if (val <= 99) {
    return val
  } else {
    return '99.'
  }
})
Vue.filter('_catalog', function (val) {
  switch (val) {
    case 'ask':
      val = '提问'
      break
    case 'share':
      val = '分享'
      break
    case 'logs':
      val = '动态'
      break
    case 'notice':
      val = '公告'
      break
    case 'advise':
      val = '建议'
      break
    case 'discuss':
      val = '讨论'
      break
  }
  return val
})
Vue.use(Alert)
Vue.use(Bubble)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
