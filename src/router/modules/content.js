const Home = () => import(/* webpackChunkName: "Home" */'@/views/Home')
const HomeChannel = () => import(/* webpackChunkName: "HomeChannel" */'@/views/channels/HomeChannel')
const HomeIndex = () => import(/* webpackChunkName: "HomeIndex" */'@/views/channels/HomeIndex')

export default [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/index/:catalog',
        name: 'channel',
        component: HomeChannel
      },
      {
        path: '/index',
        name: 'index',
        component: HomeIndex
      }
    ]
  }
]
