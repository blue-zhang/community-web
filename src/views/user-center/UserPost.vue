<!--
 * @Author: your name
 * @Date: 2020-10-27 10:42:17
 * @LastEditTime: 2021-03-07 10:33:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\views\user-center\UserPost.vue
-->
<template>
  <div class="fly-panel fly-panel-user"
       pad20>
    <div class="layui-tab layui-tab-brief">
      <ul class="layui-tab-title">
        <router-link tag="li"
                     v-for="(item, index) in postLists"
                     :key="'mypost'+index"
                     :to="{name: item.name}">
          {{item.title}}</router-link>
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
  data () {
    return {
      postLists: [
        {
          title: '我的文章',
          name: 'MyPost'
        },
        {
          title: '收藏夹',
          name: 'PostCollection'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
