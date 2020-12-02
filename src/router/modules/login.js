const Login = () => import(/* webpackChunkName: "Login" */'@/views/Login')// 路由懒加载
const Reg = () => import(/* webpackChunkName: "Reg" */'@/views/Reg')
const Forget = () => import(/* webpackChunkName: "Forget" */'@/views/forgetPwd/Forget')
const Reset = () => import(/* webpackChunkName: "Reset" */'@/views/forgetPwd/Reset')
const Succ = () => import(/* webpackChunkName: "Succ" */'@/views/forgetPwd/Succ')
export default [
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
      if (from.path === '/login' || from.path === '/') {
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
    name: 'Reset',
    path: '/forget/reset',
    component: Reset
  },
  {
    name: 'Succ',
    path: '/forget/succ',
    component: Succ
  }
]
