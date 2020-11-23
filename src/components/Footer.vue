<template>
  <div v-if="showFooter"
       class="fly-footer">
    <p>
      <a href="/"
         target="_blank">Imooc社区</a> 2017 &copy;
    </p>
    <p>
      <a href=""
         target="_blank">微信公众号</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      showFooter: true
    }
  },
  watch: {
    $route: function (newv, oldv) {
      let catalog = this.$route.name
      if (catalog === 'Add') {
        this.showFooter = false
      } else {
        this.showFooter = true
      }
    }
  }
}
</script>

<style scoped>
</style>
