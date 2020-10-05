import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: "Login" */'./views/Login')
const Reg = () => import(/* webpackChunkName: "Reg" */'./views/Reg')
const Forget = () => import(/* webpackChunkName: "Forget" */'./views/Forget')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/forget',
      name: 'Forget',
      component: Forget
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
