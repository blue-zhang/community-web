/*
 * @Author: your name
 * @Date: 2020-12-02 21:45:38
 * @LastEditTime: 2021-03-04 09:05:50
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \front\src\router\modules\content.js
 */
const Home = () => import(/* webpackChunkName: "Home" */'@/views/Home')
const HomeChannel = () => import(/* webpackChunkName: "HomeChannel" */'@/views/channels/HomeChannel')
const HomeIndex = () => import(/* webpackChunkName: "HomeIndex" */'@/views/channels/HomeIndex')
const Detail = () => import(/* webpackChunkName: "Detail" */'@/components/content/Detail')

export default [
  {
    path: '/detail/:pid',
    name: 'detail',
    component: Detail
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'index',
        component: HomeIndex
      },
      {
        path: '/index/:catalog',
        name: 'channel',
        component: HomeChannel
      }
    ]
  }
]
