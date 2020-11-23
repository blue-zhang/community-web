<template>
  <div>
    <div class="layui-container fly-marginTop">
      <div class="fly-panel pd100">
        <div class="layui-form layui-form-pane">
          <div class="layui-tab layui-tab-brief"
               lay-filter="user">
            <ul class="layui-tab-title">
              <li class="layui-this">发表新帖
              </li>
              <router-link tag="li"
                           :to="{name: 'AddDrafts'}"
                           class="">草稿箱
              </router-link>
            </ul>
            <div class="layui-form layui-tab-content"
                 style="padding: 20px 0;">
              <div class="layui-tab-item layui-show">
                <validation-observer ref="form"
                                     v-slot="{ handleSubmit }">
                  <form method="post"
                        @submit.prevent="handleSubmit(onSubmit)">
                    <div class="layui-row layui-form-item pic-container"
                         ref="wrapContainer">
                      <div v-if="!showDel"
                           class="pic-area pointer"
                           @click="uploadPic"
                           @mouseover="showText = true"
                           @mouseout="showText = false"
                           ref="container"
                           :style="{ paddingBottom: `${countH}px`, background: `#f6f6f6 url(${picUrl}) left top no-repeat`, backgroundSize: `${containerW}px ${countH}px`}">
                        <div class=" pic-icon flex-start-col"><i class="layui-icon layui-icon-camera"></i>
                          <transition name="opacity">
                            <span v-show="showText">点击上传图片</span>
                          </transition>
                        </div>
                        <input type="file"
                               name="file"
                               ref="file"
                               @change="changePic"
                               accept="image/png, image/jpg, image/gif"
                               style="display: none">
                        <img :src="imgUrl ? imgUrl : 'http://localhost:3000/img/logo.png'"
                             ref="pic"
                             style="display: none">
                      </div>
                      <div v-else
                           class="pic-area"
                           :style="{ paddingBottom: `${countH}px`, background: `#f6f6f6 url(${picUrl}) left top no-repeat`, backgroundSize: `${containerW}px ${countH}px`}">
                        <div @click.stop="deletePic"
                             class=" pic-icon del-icon flex-start-col pointer"
                             title="删除图片">
                          <i class="layui-icon layui-icon-delete "></i>
                        </div>
                      </div>
                      <textarea type="text"
                                maxlength="40"
                                ref="titleTextarea"
                                name="title"
                                v-model="title"
                                placeholder="请输入标题[最多40字符]"
                                class="fly-editor title-area" />
                    </div>
                    <editor @add-content='addContent'
                            :lastContent='currentContent'
                            @drafts='saveDrafts'></editor>
                  </form>
                </validation-observer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import Editor from '@/components/modules/editor/Editor'
import codeMixin from '@/mixin/mixin-login'
import config from '@/config/config'
import { uploadImg } from '@/api/user'
import { saveDrafts } from '@/api/content'
export default {
  name: 'Add',
  mixins: [codeMixin],
  components: {
    Editor
  },
  data () {
    return {
      // 控制图片图标下文字的显示
      showText: false,
      // 控制图片图标和删除图标的显示
      showDel: false,
      title: '',
      currentContent: '',
      // img元素获取的url
      imgUrl: '',
      // background获取的url
      picUrl: '',
      // 图片原始高宽比
      radio: 0.4,
      // 图片高度通过计算得到
      countH: '',
      containerW: ''
    }
  },
  watch: {
    title (n, o) {
      if (n !== o) {
        this.addContent(this.currentContent)
      }
    },
    imgUrl (n, o) {
      if (n !== o) {
        setTimeout(async () => {
          if (n !== '') {
            await this.countSize()
            // 在图片的大小被设置好之后，再显示删除图片页面
            this.showDel = true
          }
          this.addContent(this.currentContent)
        }, 500)
      }
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
          this.imgUrl = baseUrl + res.path
        }
      })
    },
    uploadPic () {
      this.$refs.file.click()
    },
    // 宽度为容器宽度，宽高比为图片宽高比
    countSize () {
      // 获取图片高宽比
      let width = this.$refs.pic.naturalWidth
      let height = this.$refs.pic.naturalHeight
      this.radio = height / width
      // 在获得高宽比之后，为图片设置初始高宽
      this.containerW = this.$refs.container.offsetWidth
      this.countH = parseInt(this.containerW * this.radio)
      window.addEventListener('resize', this.resizeHandler)
      // 显示图片背景
      this.picUrl = this.imgUrl
    },
    resizeHandler () {
      this.containerW = this.$refs.wrapContainer.offsetWidth
      this.countH = parseInt(this.containerW * this.radio)
    },
    // 删除图片
    deletePic () {
      debugger
      this.showDel = false
      this.imgUrl = ''
      this.picUrl = ''
      window.removeEventListener('resize', this.resizeHandler)
      this.countH = parseInt(this.containerW * 0.3)
    },
    saveDrafts () {
      let savePost = {
        content: this.currentContent,
        title: this.title,
        picUrl: this.imgUrl
      }
      saveDrafts(savePost).then(res => {
        if (res.code === 200) {
          this.$bubble(res.msg)
        }
      })
    },
    onSubmit () {
    },
    addContent (val) {
      this.currentContent = val
      let lastSavePost = {
        content: this.currentContent,
        title: this.title,
        pic: this.imgUrl
      }
      if (this.title.trim() !== '' || this.currentContent.trim() !== '' || this.imgUrl.trim() !== '') {
        localStorage.setItem('lastSavePost', JSON.stringify(lastSavePost))
      } else {
        localStorage.setItem('lastSavePost', '')
      }
    }
  },
  async mounted () {
    // 在页面渲染之前，加载上次自动保存的数据
    let saveData = localStorage.getItem('lastSavePost')
    if (saveData) {
      saveData = JSON.parse(saveData)
      this.$confirm('是否自动加载上次未保存的内容?', () => {
        this.currentContent = saveData.content
        this.title = saveData.title
        this.imgUrl = saveData.pic
      }, () => {
        localStorage.setItem('lastSavePost', '')
      })
    }
    await this.$nextTick()
    this.$refs.titleTextarea.focus()
    this.$store.state.showFooter = false
  }
}
</script>

<style lang="scss" scoped>
.pic-container {
  height: auto;
  color: grey;
  .title-area {
    display: block;
    padding: 0;
    margin: 10px auto;
    border: none;
    font-size: 31px;
    line-height: 40px;
    width: 70%;
    resize: none;
    background: none;
  }
  .pic-area {
    padding: 0;
    position: relative;
    width: 100%;
    height: 0;
    overflow: hidden;
    padding-bottom: 30%;
  }
  .pic-icon {
    height: 100px;
    width: 100px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    i {
      font-size: 70px;
      line-height: 100px;
      text-align: center;
    }
  }
  .del-icon {
    top: auto;
    left: auto;
    right: 0;
    bottom: 0;
    margin: 0;
    &:active {
      background-color: #333;
      color: #ffffff;
    }
  }
  .opacity-leave-active,
  .opacity-enter-active {
    transition: opacity 0.2s;
  }
  .opacity-enter,
  .opacity-leave-to {
    opacity: 0;
  }
}
</style>
