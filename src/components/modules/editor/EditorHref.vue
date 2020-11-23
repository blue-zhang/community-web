<template>
  <editor-alert @close="$emit('close')"
                @confirm-edit='confirmEdit'
                :title="'插入合法链接'">
    <input type="text"
           placeholder="给链接起一个名字"
           title="如果不指定，名字就是链接本身"
           v-model="name"
           class="layui-input">
    <input type="text"
           ref="link"
           placeholder="输入链接地址"
           v-model="href"
           class="layui-input">
  </editor-alert>
</template>

<script>
import EditorAlert from './EditorAlert'
export default {
  name: 'EditorHref',
  data () {
    return {
      href: '',
      name: ''
    }
  },
  components: {
    EditorAlert
  },
  methods: {
    confirmEdit () {
      if (!this.href) {
        this.$refs.link.focus()
        this.$bubble('请输入合法链接', 'shake')
      } else {
        if (this.name === '') {
          this.name = this.href
        }
        this.$emit('confirmEdit', this.href, this.name)
        setTimeout(() => {
          this.href = ''
          this.name = ''
        }, 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  margin-top: 10px;
  width: 250px !important;
}
</style>
