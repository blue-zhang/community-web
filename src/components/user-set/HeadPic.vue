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
                 @change="onChange"
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
    async onChange (e) {
      let file = e.target.files
      // console.log('changePic -> file', file)
      let formData = new FormData()
      if (file.length > 0) {
        // 键值分别是表单字段的名字和字段的值
        formData.append('file', file[0])
        this.formData = formData
      }
      const res = await uploadImg(formData, 'headPic')
      const baseUrl =
        process.env.NODE_ENV === 'production'
          ? config.baseUrl.pro
          : config.baseUrl.dev
      setTimeout(async () => {
        let userInfo = this.$store.state.userInfo
        userInfo.pic = baseUrl + res.path
        this.$store.commit('setUserInfo', userInfo)
        const data = await changePic({ pic: res.path })
        if (data.code === 200) {
          this.$alert(data.msg)
        }
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
