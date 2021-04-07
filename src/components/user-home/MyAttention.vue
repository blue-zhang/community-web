<template>
  <div>
    <ul class="layui-tab-title">
      <router-link tag="li"
                   v-for="(item, index) in lists"
                   :key="'attention'+index"
                   :to="{name: item.name}">
        {{item.title}}</router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'MyAttention',
  data () {
    return {
      layuiThis: true,
      lists: [
        {
          title: '关注了',
          name: 'MyAttention'
        },
        {
          title: '关注者',
          name: 'Following'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
