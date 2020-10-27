<template>
  <div class="fly-panel fly-panel-user"
       pad20>
    <!--
    <div class="fly-msg" style="margin-top: 15px;">
      您的邮箱尚未验证，这比较影响您的帐号安全，<a href="activate.html">立即去激活？</a>
    </div>
    -->
    <div class="layui-tab layui-tab-brief"
         lay-filter="user">
      <ul class="layui-tab-title"
          id="LAY_mine">
        <router-link tag="li"
                     v-for="(item, index) in postLists"
                     :key="'mypost'+index"
                     :to="{name: item.name}">
          {{item.title}}（<span>{{item.num}}</span>）</router-link>
      </ul>
      <div class="layui-tab-content"
           style="padding: 20px 0;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPost',
  data() {
    return {
      postLists: [
        {
          title: '我发的贴',
          name: 'MyPost',
          num: 96
        },
        {
          title: '收藏的贴',
          name: 'PostCollection',
          num: 12
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>