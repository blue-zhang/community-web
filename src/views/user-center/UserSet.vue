<template>
  <div class="fly-panel fly-panel-user"
       pad20>
    <div class="layui-tab layui-tab-brief"
         lay-filter="user">
      <ul class="layui-tab-title"
          id="LAY_mine">
        <router-link tag="li"
                     :exact-active-class="setLists.info.activeClass"
                     :to="{name: setLists.info.name}">{{setLists.info.title}}</router-link>
        <router-link tag="li"
                     :active-class="setLists.pic.activeClass"
                     :to="{name: setLists.pic.name}">{{setLists.pic.title}}</router-link>
        <router-link tag="li"
                     :active-class="setLists.security.activeClass"
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
          path: '/user/set',
          activeClass: 'layui-this'
        },
        pic: {
          title: '上传头像',
          name: 'HeadPic',
          path: '/user/set/head',
          activeClass: 'layui-this'
        },
        security: {
          title: '账号安全',
          name: 'UserSecurty',
          path: '/user/set/account',
          activeClass: 'layui-this'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
