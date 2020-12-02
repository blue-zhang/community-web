<template>
  <div class="layui-container fly-marginTop add-all"
       style="margin-top: 0; border: none">
    <div class="layui-form layui-form-pane"
         style="margin-top: 0">
      <div class="layui-tab layui-tab-brief">
        <ul class="layui-tab-title">
          <router-link tag="li"
                       :to="{name: 'Add'}"
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
  </div>
</template>

<script>

export default {
  name: 'Add',
  methods: {
    // 刷新页面时，页面卸载之前，执行beforeunload回调
    onbeforeunload () {
      const post = this.$store.state.post
      localStorage.setItem('temPost', JSON.stringify({
        title: post.title,
        content: post.content,
        picUrl: post.picUrl,
        created: this.$store.state.created
      }))
    }
  },
  created () {
    // vuex在beforecreate的时候就已经有初始值了
    // 刷新父组件的时候，把编辑的内容存在localstorage中
    window.addEventListener('beforeunload', this.onbeforeunload)
    // 在刷新后，localstorage中的内容存在vuex中
    // 父组件created钩子之后子组件开始beforeCreate，因此子组件的watch不会监听到vuex的变化
    let temPost = localStorage.getItem('temPost')
    if (temPost) {
      temPost = JSON.parse(temPost)
      const data = {
        title: temPost.title,
        picUrl: temPost.picUrl,
        content: temPost.content
      }
      this.$store.commit('getPost', data)
      this.$store.commit('getCreated', temPost.created)
      // 获取内容后把localStorage设为空
      localStorage.setItem('temPost', '')
    }
  },
  beforeDestroy () {
    window.removeEventListener('beforeunload', this.onbeforeunload)
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
