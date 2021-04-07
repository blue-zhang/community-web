/*
 * @Author: your name
 * @Date: 2020-12-02 21:43:49
 * @LastEditTime: 2021-03-03 16:18:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\router\routers.js
 */
import userCenter from './modules/userCenter'
import userHome from './modules/userHome'
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
    ...userCenter,
    ...userHome,
    ...account,
    {
      meta: { requireAuthorize: true },
      path: '/user/add',
      component: Add,
      children: [
        {
          name: 'AddEditor',
          path: '',
          component: AddEditor
        },
        {
          name: 'PostUpdate',
          path: '/update/:updatePid',
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
