<template>
  <div>
    <p class="adding-tag">{{saveAlert}}</p>
    <div class="layui-form layui-tab-content"
         style="padding: 20px 0;">
      <div class="layui-tab-item layui-show">
        <form>
          <div class="layui-row layui-form-item pic-container"
               ref="wrapContainer">
            <div v-if="!picUrl"
                 class="pic-area pointer"
                 @click="uploadPic"
                 @mouseover="showText = true"
                 @mouseout="showText = false"
                 ref="container"
                 :style="{ paddingBottom: `${countH}`, background: `#f6f6f6 url(${picUrl}) left top no-repeat`, backgroundSize: `${containerW}px ${countH}`}">
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
                 :style="{ paddingBottom: `${countH}`, background: `#f6f6f6 url(${picUrl}) left top no-repeat`, backgroundSize: `${containerW}px ${countH}`}">
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
                      :value="title"
                      @input="changeTitle"
                      placeholder="请输入标题[最多40字符]"
                      class="fly-editor title-area" />
          </div>
          <editor>
          </editor>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import config from '@/config/config'
import { uploadImg } from '@/api/user'
import { saveDrafts, getDrafts, updateDrafts } from '@/api/content'
// import _ from 'lodash'
export default {
  name: 'Add',
  components: {
    Editor: () => import('@/components/modules/editor/Editor')
  },
  data () {
    return {
      post: this.$store.state.post,
      // 控制图片图标下文字的显示
      showText: false,
      // 显示正在保存还是已自动保存
      saveTag: '',
      // 是否正在编辑
      adding: false,
      // 正在自动保存的提示语
      saveAlert: '',
      picUrl: '',
      // 用来保存setTimeOut
      time: 0,
      // 图片原始高宽比
      radio: 0.4,
      // 图片高度通过计算得到
      countH: '',
      containerW: ''
    }
  },
  computed: {
    title () {
      return this.$store.state.post.title
    },
    imgUrl () {
      return this.$store.state.post.picUrl
    }
  },
  watch: {
    imgUrl (n, o) {
      this.adding = true
      // imageUrl改变时，给picUrl赋值，计算高宽比
      setTimeout(async () => {
        if (n !== '') {
          await this.countSize()
        }
      }, 500)
    },
    // 通过监听vuex中的post对象的变化，来决定是否发送请求
    post: {
      handler (n, o) {
        this.adding = true
        if (this.time) {
          clearTimeout(this.time)
        }
        this.time = setTimeout(() => {
          this.time = 0
          this.addContent()
          this.adding = false
        }, 1000)
      },
      deep: true
    },
    adding (n, o) {
      this.saveAlert = n ? '正在自动保存' : '已保存到草稿箱'
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
          this.post.picUrl = baseUrl + res.path
        }
      })
    },
    uploadPic () {
      this.$refs.file.click()
    },
    // 宽度为容器宽度，宽高比为图片宽高比
    countSize () {
      // 获取图片高宽比
      if (!this.$refs.pic) {
        // created钩子中，vuex的值可能会发生改变触发这个函数，页面没有渲染，要直接返回
        return
      }
      let width = this.$refs.pic.naturalWidth
      let height = this.$refs.pic.naturalHeight
      this.radio = height / width
      // 在获得高宽比之后，为图片设置初始高宽
      this.containerW = this.$refs.container.offsetWidth
      this.countH = `${parseInt(this.containerW * this.radio)}px`
      this.picUrl = this.imgUrl
      window.addEventListener('resize', this.resizeHandler)
    },
    resizeHandler () {
      try {
        this.containerW = this.$refs.wrapContainer.offsetWidth
      } catch (error) {
      }
      this.countH = `${parseInt(this.containerW * this.radio)}px`
    },
    // 删除图片
    deletePic () {
      this.$store.state.post.picUrl = ''
      this.picUrl = ''
      // 必须一样，前面设置了debounce，这里也要用debounce
      window.removeEventListener('resize', this.resizeHandler)
      this.countH = '30%'
    },
    // 把title改变的值储存在store中
    changeTitle (e) {
      Object.assign(this.post, {
        title: e.target.value
      })
    },
    // 编辑内容改变时触发的回调
    addContent () {
      if (this.$store.state.created) {
        this.updateDrafts({ ...this.post, created: this.$store.state.created })
      } else {
        this.saveDrafts(this.post)
      }
    },
    // 更新草稿，如果草稿箱被删除，则保存一个新的草稿
    updateDrafts (data) {
      console.log('更新')
      updateDrafts(data).then(res => {
        this.adding = false
        this.$store.commit('getCreated', res.created)
        if (res.code === 401) {
          this.saveDrafts(data)
        }
      })
    },
    // 保存新草稿
    saveDrafts (data) {
      console.log('保存')
      saveDrafts(data).then(res => {
        if (res.code === 200) {
          this.adding = false
          this.$store.commit('getCreated', res.created)
        }
      })
    },
    submitPost () {

    }
  },
  async mounted () {
    /**
     * 保险措施，无论图片是否变化，都要执行，不然会不显示图片
     */
    if (this.$route.params.type) {
      const res = await getDrafts(this.$route.params.type)
      if (res.code === 200) {
        Object.assign(this.post, {
          picUrl: res.data.picUrl,
          title: res.data.title,
          content: res.data.content
        })
        this.$store.commit('getCreated', res.data.created)
      }
    }
    await this.$nextTick()
    console.log('判断前', this.post.picUrl)
    if (this.post.picUrl !== '') {
      console.log('判断后', this.post.picUrl)
      setTimeout(async () => {
        await this.countSize()
      }, 200)
    }
    this.$refs.titleTextarea.focus()
    this.$store.state.showFooter = false
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'AddDrafts') {
      next()
    } else {
      this.$store.commit('getCreated', '')
      this.$store.commit('getPost', {
        content: '',
        title: '',
        picUrl: ''
      })
      next()
    }
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
      line-height: 70px;
      text-align: center;
    }
  }
  .del-icon {
    top: auto;
    left: auto;
    right: 0;
    bottom: 40px;
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
.adding-tag {
  z-index: 2000000;
  position: fixed;
  font-weight: bold;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  top: 100px;
  left: 1%;
  color: rgba($color: #000000, $alpha: 0.5);
}
</style>
