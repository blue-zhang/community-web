<template>
  <editor-alert @close="$emit('close')"
                @confirm-edit='confirmEdit'
                ref="editorPic"
                :title="'插入图片'">
    <div class="editor-pic">
      <label class="layui-form-label">图片地址</label>
      <input type="text"
             id="text"
             placeholder="支持直接粘贴远程图片地址"
             v-model="picUrl"
             class="layui-input">
      <button type="button"
              class="layui-btn layui-btn-primary upload-img pointer ml20">
        <i class="layui-icon mr15">&#xe67c;</i>
        <label for="file"
               class="pointer">上传头像</label>
        <input type="file"
               name="file"
               ref="file"
               accept="image/png, image/jpg, image/gif"
               @change="changePic"
               style="display: none"
               id="file">
      </button>

    </div>
    <p>可以直接把桌面的图片拖拽到内容区域</p>
  </editor-alert>
</template>

<script>
import EditorAlert from './EditorAlert'
import { uploadImg } from '@/api/user'
import config from '@/config/config'
export default {
  name: 'EditorPic',
  components: {
    EditorAlert
  },
  data () {
    return {
      picUrl: '',
      formData: ''
    }
  },
  methods: {
    changePic (e) {
      let file = e.target.files
      let formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
      }
      this.formData = formData
      uploadImg(this.formData).then(res => {
        if (res.code === 200) {
          const baseUrl =
            process.env.NODE_ENV === 'production'
              ? config.baseUrl.pro
              : config.baseUrl.dev
          this.picUrl = baseUrl + res.path
        }
      })
    },
    confirmEdit () {
      if (!this.picUrl) {
        // 没有链接也没有发送
        document.querySelector('#text').focus()
        this.$bubble('请上传图片', 'shake')
      } else {
        this.$emit('confirmEdit', this.picUrl)
        setTimeout(() => {
          this.picUrl = ''
          // 触发change事件
          this.$refs.file.value = ''
        }, 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-pic {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;

  label {
    width: 100px !important;
  }
  input {
    width: 250px !important;
  }
}
</style>
