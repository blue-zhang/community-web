import user from './modules/user'
import login from './modules/login'
import account from './modules/account'
import content from './modules/content'

const NotFound = () => import(/* webpackChunkName: "NotFound" */'@/views/NotFound')
// 帖子编辑页面
const Add = () => import(/* webpackChunkName: "Add" */'@/views/Add/Add')
const AddDrafts = () => import(/* webpackChunkName: "AddDrafts" */'@/views/Add/AddDrafts')
const AddEditor = () => import(/* webpackChunkName: "AddEditor" */'@/views/Add/AddEditor')

export default {
  linkExactActiveClass: 'layui-this',
  routes: [
    ...content,
    ...login,
    ...user,
    ...account,
    {
      path: '/add',
      component: Add,
      meta: { requireAuthorize: true },
      children: [
        {
          name: 'Add',
          path: '',
          component: AddEditor
        },
        {
          name: 'AddDrafts',
          path: '/drafts',
          component: AddDrafts
        }
      ]
    },
    {
      path: '/notFound',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '*',
      redirect: '/notFound'
    }
  ]
}
