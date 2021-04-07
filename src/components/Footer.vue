<template>
  <div v-if="showFooter"
       class="fly-footer">
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
      if (catalog === 'AddEditor') {
        this.showFooter = false
      } else {
        this.showFooter = true
      }
      let path = this.$route.path
      if (path.includes('/user')) {
        this.showFooter = false
      }
    }
  }
}
</script>

<style scoped>
</style>
