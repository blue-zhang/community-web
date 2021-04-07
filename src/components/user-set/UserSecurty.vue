<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show pd-tb15">
    <div>您的账号安全状态</div>
    <table>
      <tbody>
        <tr v-for="(item, index) in lists"
            :key="'acountbind'+index">
          <td>
            <div>
              <svg class="icon"
                   aria-hidden="true">
                <use v-if="current[item.type] === true"
                     :xlink:href="'#icon-tongguo1'"></use>
                <use v-else
                     :xlink:href="'#icon-icon-test1'"></use>
              </svg>
              <p>{{item.title}}</p>
            </div>
          </td>

          <td>{{current[item.type] === true ? item.ok.title : item.notok.title}}</td>

          <!-- query.name用于修改页面的导航；query.link显示在navigationBar中 -->
          <td v-if="item.type !== 'qq' && item.type !== 'weixin'">
            <router-link v-if="current[item.type] === true"
                         class="text-link pointer"
                         :to="{ name: 'PwdVerify', query: {textName: item.ok.link, comName: item.ok.name}}">{{item.ok.link}}</router-link>
            <router-link v-else
                         class="text-link pointer"
                         :to="{ name: 'PwdVerify', query: {textName: item.notok.link, comName: item.notok.name} }">{{item.notok.link}}</router-link>
          </td>

          <!-- qq和微信，取消绑定直接弹出一个提示，就自动取消，不用向后面导航 -->
          <td v-else>
            <div class="text-link pointer"
                 v-if="current[item.type] === true"
                 @click="cancelBind(item.type)">{{item.ok.link}}</div>
            <router-link v-else
                         class="text-link pointer"
                         :to="{ name: 'PwdVerify', query: {textName: item.notok.link, comName: item.notok.name} }">{{item.notok.link}}</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserSecurty',
  data () {
    return {
      current: {
        password: true,
        email: true,
        mobile: false,
        qq: false,
        weixin: false
      },
      // link 是按钮和 ProgressBar 中显示的文字
      // name 是进入修改页面后第二个组件的 name
      lists: [
        {
          type: 'password',
          title: '设置密码',
          ok: {
            title: '已设置密码',
            link: '修改密码',
            name: 'PwdChange'
          },
          // 修改密码功能，只有一种，不存在没有绑定密码的情况。
          notok: {
            title: '已设置密码',
            link: '修改密码',
            name: 'PwdChange'
          }
        },
        {
          type: 'email',
          title: '绑定邮箱',
          ok: {
            title: '已绑定邮箱',
            link: '更改绑定邮箱',
            name: 'EmailChange'
          },
          notok: {
            title: '未绑定邮箱',
            link: '绑定邮箱',
            name: 'EmailChange'
          }
        },
        {
          type: 'mobile',
          title: '绑定手机号',
          ok: {
            title: '已绑定手机号',
            link: '更改绑定手机号',
            name: 'MobileChange'
          },
          notok: {
            title: '未绑定手机号',
            link: '绑定手机号',
            name: 'MobileBind'
          }
        },
        {
          type: 'qq',
          title: '绑定qq账号',
          ok: {
            title: '已绑定qq账号',
            link: '解除绑定'
          },
          notok: {
            title: '未绑定qq账号',
            link: '绑定qq账号',
            name: 'QqBind'
          }
        },
        {
          type: 'weixin',
          name: 'WeixinBind',
          title: '绑定微信',
          ok: {
            title: '已绑定微信',
            link: '解除绑定'
          },
          notok: {
            title: '未绑定微信',
            link: '绑定微信',
            name: 'WeixinBind'
          }
        }
      ]
    }
  },
  methods: {
    cancelBind (val) {
      this.$alert('暂未开发')
    },
    getType (link, name) {
      this.$route.query.comName = name
      this.$route.query.textName = link
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  margin-top: 15px;
  border-bottom: 1px solid #e5e9ef;
  tr {
    text-align: center;
    border-top: 1px solid #e5e9ef;
    td:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 90px;
      div {
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          width: 30%;
          text-align: right;
        }
        p {
          font-size: 17px;
          width: 70%;
          padding-left: 5px;
          text-align: left;
        }
      }
    }
  }
}
</style>
