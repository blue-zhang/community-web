<template>
  <div class="fly-panel fly-panel-user"
       pad20>
    <div class="layui-tab layui-tab-brief"
         lay-filter="user">
      <ul class="layui-tab-title"
          id="LAY_mine">
        <router-link tag="li"
                     :to="{name: setLists.info.name}">{{setLists.info.title}}</router-link>
        <router-link tag="li"
                     :to="{name: setLists.pic.name}">{{setLists.pic.title}}</router-link>
        <router-link tag="li"
                     :to="{name: setLists.security.name}">{{setLists.security.title}}</router-link>
      </ul>
      <router-view></router-view>
      <div class="layui-tab-content"
           style="padding: 20px 0;">
        <div class="layui-form layui-form-pane layui-tab-item layui-show">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserSet',
  data() {
    return {
      setLists: {
        info: {
          title: '修改资料',
          name: 'MyInfo',
          path: '/user/set'
        },
        pic: {
          title: '上传头像',
          name: 'HeadPic',
          path: '/user/set/head'
        },
        security: {
          title: '账号安全',
          name: 'UserSecurty',
          path: '/user/set/account'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
