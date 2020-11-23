<template>
  <editor-alert @close="$emit('close')"
                @confirm-edit='confirmEdit'
                :title="'插入引用'">
    <textarea v-model="quote"
              name="desc"
              ref="quote"
              placeholder="请输入内容"
              :style="{width: codeWidth + 'px', height: codeHeight + 'px', minHeight: '150px', minWidth: '402px'}"></textarea>
  </editor-alert>
</template>

<script>
import EditorAlert from './EditorAlert'
export default {
  name: 'EditorQuote',
  components: {
    EditorAlert
  },
  props: ['codeWidth', 'codeHeight'],
  data () {
    return {
      quote: ''
    }
  },
  methods: {
    confirmEdit () {
      if (!this.quote) {
        this.$refs.quote.focus()
        this.$bubble('请插入引用', 'shake')
      } else {
        this.$emit('confirmEdit', this.quote)
        setTimeout(() => {
          this.quote = ''
        }, 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
