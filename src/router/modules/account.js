const AccountBar = () => import(/* webpackChunkName: "AccountBar" */'@/components/user-set/accountBind/AccountBar.vue')
const PwdVerify = () => import(/* webpackChunkName: "PwdVerify" */'@/components/user-set/accountBind/PwdVerify.vue')
const OtherVerify = () => import(/* webpackChunkName: "OtherVerify" */'@/components/user-set/accountBind/OtherVerify.vue')
const EmailChange = () => import(/* webpackChunkName: "EmailChange" */'@/components/user-set/accountBind/EmailChange.vue')
const PwdChange = () => import(/* webpackChunkName: "PwdChange" */'@/components/user-set/accountBind/PwdChange.vue')
const ChangeSucc = () => import(/* webpackChunkName: "ChangeSucc" */'@/components/user-set/accountBind/ChangeSucc.vue')
export default [
  {
    path: '/user/accountBar',
    component: AccountBar,
    children: [
      {
        path: '',
        name: 'PwdVerify',
        component: PwdVerify
      },
      {
        path: '/user/accountBar/otherVerify',
        name: 'OtherVerify',
        component: OtherVerify
      },
      {
        path: '/user/accountBar/changeEmail',
        name: 'EmailChange',
        component: EmailChange
      },
      {
        path: '/user/accountBar/changePwd',
        name: 'PwdChange',
        component: PwdChange
      },
      {
        path: '/user/accountBar/changeSucc',
        name: 'ChangeSucc',
        component: ChangeSucc
      }
    ]
  }
]
