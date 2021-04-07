<template>
  <div class="layui-container fly-marginTop add-all"
       style="margin-top: 0; border: none">
    <div class="layui-form layui-form-pane"
         style="margin-top: 0">
      <div class="layui-tab layui-tab-brief">
        <ul class="layui-tab-title"
            v-show='!$route.params.updatePid'
            style="minWidth: 700px;maxWidth: 700px">
          <router-link tag="li"
                       :to="{name: 'AddEditor'}"
                       :active-class='"layui-this"'>发表新帖
          </router-link>
          <router-link tag="li"
                       :to="{name: 'AddDrafts'}"
                       :active-class="'layui-this'">草稿箱
          </router-link>
        </ul>
        <router-view></router-view>
      </div>
    </div>
    <base-to-top></base-to-top>
  </div>
</template>

<script>

export default {
  name: 'Add',
  computed: {
    post: function () {
      return this.$store.state.post
    }
  },
  // 刷新不执行 destory 钩子，离开路由会执行
  // 离开编辑页面路由后，再次进入，编辑页面的内容清空，用户要从草稿箱中找到之前的帖子
  beforeDestroy () {
    this.$store.commit('setPost', {
      content: '',
      title: '',
      picUrl: '',
      created: ''
    })
  }
}
</script>
<style lang="scss" scoped>
.add-all {
  background-color: #ffffff;
  width: 100%;
  padding: 20px 20%;
}
</style>
