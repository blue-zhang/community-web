<template>
  <div class="notfound">
    <img src="../assets/images/404.png"
         alt="">
    <router-link tag="button"
                 :to="{name: 'index'}"
                 type="button"
                 class="layui-btn layui-btn-fluid layui-btn-normal">
      返回首页
    </router-link>

  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.notfound {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
</style>
