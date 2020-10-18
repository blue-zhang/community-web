import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const Login = () => import(/* webpackChunkName: "Login" */'./views/Login')
const Reg = () => import(/* webpackChunkName: "Reg" */'./views/Reg')
const Forget = () => import(/* webpackChunkName: "Forget" */'./views/Forget')
const Home = () => import(/* webpackChunkName: "Home" */'./views/Home')
const HomeChannel = () => import(/* webpackChunkName: "HomeChannel" */'./views/channels/HomeChannel')
const HomeIndex = () => import(/* webpackChunkName: "HomeIndex" */'./views/channels/HomeIndex')
const Center = () => import(/* webpackChunkName: "Center" */'./views/Center')

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'index/:catalog',
          name: 'channel',
          component: HomeChannel
        },
        {
          path: '/',
          name: 'index',
          component: HomeIndex
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg,
      beforeEnter: (to, from, next) => {
        if (from.path === '/login') {
          // 执行下一个钩子，正常跳转
          next()
        } else {
          next({ path: '/login' })
        }
      }
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    },
    {
      path: '/center',
      name: 'center',
      component: Center
    }
  ]
})
