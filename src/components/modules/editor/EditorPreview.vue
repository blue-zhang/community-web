<template>
  <editor-alert @close="$emit('close')"
                :showAddBtn='false'
                :isPre='true'
                :title="'预览'"
                class="editor-wrap-pre">
    <div class="preview"
         v-html="pre"></div>
  </editor-alert>
</template>

<script>
import EditorAlert from './EditorAlert'

import paraphraseHtml from '@/utils/paraphraseHtml'
export default {
  name: 'EditorPreview',
  components: {
    EditorAlert
  },
  data () {
    return {
    }
  },
  props: {
    content: String
  },
  computed: {
    pre: function () {
      if (typeof this.content === 'undefined' && this.content.trim() === '') {
        return ''
      } else {
        return paraphraseHtml(this.content)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep body {
  overflow-y: hidden !important;
}
.editor-wrap-pre {
  z-index: 20000;
  position: fixed;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 1px 1px 50px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  overflow-x: hidden;
}
.preview {
  width: 100%;
  height: auto;
  min-height: 100%;
  max-width: 90%;
  margin: 0 auto;
  overflow-y: auto;
}
::v-deep a {
  color: #01aaed;
  &:hover {
    color: #5fb878;
  }
}
::v-deep img {
  max-width: 80%;
  margin: 10px auto;
}
</style>
