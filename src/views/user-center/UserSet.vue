<template>
  <div class="fly-panel fly-panel-user"
       pad20>
    <div class="layui-tab layui-tab-brief"
         lay-filter="user">
      <ul class="layui-tab-title"
          id="LAY_mine">
        <router-link tag="li"
                     :to="{name: item.name}"
                     v-for="(item, index) in setLists"
                     :key="'user-set-tab'+index">{{item.title}}</router-link>
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
      setLists: this.$store.state.setLists
    }
  }
}
</script>

<style lang="scss" scoped>
</style>