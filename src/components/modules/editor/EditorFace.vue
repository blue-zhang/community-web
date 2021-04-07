<template>
  <div class="layui-layer layui-layer-tips layui-edit-face"
       id="layui-layer1">
    <div class="layui-layer-content">
      <ul class="layui-clear">
        <li :title="key"
            @click="handleFaceClick(key)"
            v-for="(val, key) in faceLists"
            :key="key">
          <img :src="val"
               alt="wrong">
        </li>
      </ul>
      <i class="layui-layer-TipsG layui-layer-TipsB"></i>
    </div>
  </div>
</template>

<script>
import face from '@/assets/js/face'
export default {
  name: 'EditorFace',
  data () {
    return {
      faceLists: face
    }
  },
  methods: {
    handleFaceClick (val) {
      this.$emit('close')
      this.$emit('confirmEdit', val)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
