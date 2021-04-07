<template>
  <editor-alert @close="$emit('close')"
                @confirm-edit='confirmEdit'
                :title="'插入代码或文本'">
    <textarea v-model="code"
              name="desc"
              class="editor-alert"
              ref="text"
              placeholder="请输入内容"
              :style="{width: codeWidth + 'px', height: codeHeight + 'px', minHeight: '150px', minWidth: '402px'}"></textarea>
  </editor-alert>
</template>

<script>
import EditorAlert from './EditorAlert'
export default {
  name: 'EditorCode',
  components: {
    EditorAlert
  },
  props: ['codeWidth', 'codeHeight'],
  data () {
    return {
      code: ''
    }
  },
  methods: {
    confirmEdit () {
      if (!this.code) {
        this.$refs.text.focus()
        this.$bubble('请输入代码', 'shake')
      } else {
        this.$emit('confirmEdit', this.code)
        setTimeout(() => {
          this.code = ''
        }, 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
