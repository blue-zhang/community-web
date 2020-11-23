<template>
  <div class="layui-form layui-form-pane layui-tab-item  layui-show pd-tb15">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，需要小于2M</p>
        <button type="button"
                class="layui-btn upload-img pointer">
          <i class="layui-icon mr15">&#xe67c;</i>
          <label for="file"
                 class="pointer">上传头像</label>
          <input type="file"
                 name="file"
                 accept="image/png, image/jpg, image/gif"
                 @change="changePic"
                 style="display: none"
                 id="file">
        </button>
        <img :src="$store.state.userInfo.pic">
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg, changePic } from '@/api/user'
import config from '@/config/config'
export default {
  name: 'HeadPic',
  data () {
    return {
      formData: ''
    }
  },
  methods: {
    changePic (e) {
      let file = e.target.files
      // console.log('changePic -> file', file)
      let formData = new FormData()
      if (file.length > 0) {
        // 键值分别是表单字段的名字和字段的值
        formData.append('file', file[0])
        this.formData = formData
        // console.log('changePic -> this.formData', this.formData.get('file'))
      }
      uploadImg(formData).then(res => {
        if (res.code === 200) {
          let userInfo = this.$store.state.userInfo
          const baseUrl =
            process.env.NODE_ENV === 'production'
              ? config.baseUrl.pro
              : config.baseUrl.dev
          userInfo.pic = baseUrl + res.path
          this.$store.commit('getUserInfo', userInfo)
          changePic({ pic: res.path }).then(res => {
            console.log(this.$store.state.userInfo.pic)
            this.$alert(res.msg)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
