<template>
  <div style="minWidth: 700px;maxWidth: 700px">
    <p class="adding-tag">{{saveAlert}}</p>
    <div class="layui-form layui-tab-content"
         style="padding: 20px 0;">
      <div class="layui-tab-item layui-show">
        <form>
          <div class="layui-row layui-form-item pic-container"
               ref="wrapContainer">
            <div v-show="!post.picUrl"
                 class="pic-area pointer"
                 @click="$refs.file.click()"
                 @mouseover="showText = true"
                 @mouseout="showText = false"
                 :style="{ paddingBottom: `${countH}px`, background: `#f6f6f6`}">
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
            </div>
            <div v-show="post.picUrl"
                 class="pic-area"
                 id="AddImgCon"
                 :style="{ paddingBottom: `${countH}px`}">
              <div @click.stop="deletePic"
                   id="AddDel"
                   class=" pic-icon del-icon flex-start-col pointer"
                   title="删除图片">
                <i class="layui-icon layui-icon-delete "></i>
              </div>
            </div>
            <textarea type="text"
                      maxlength="40"
                      ref="titleTextarea"
                      :value="post.title"
                      @input="changeTitle"
                      placeholder="请输入标题[最多40字符]"
                      class="fly-editor title-area" />
          </div>
          <editor :update='update'>
          </editor>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import config from '@/config/config'
import { uploadImg } from '@/api/user'
import { saveDrafts, updateDrafts, updatePost, loadUpdate } from '@/api/content'
import Editor from '@/components/modules/editor/Editor'
import selectionToEnd from '@/utils/contenteditable/selectToEnd'
// import _ from 'lodash'
export default {
  name: 'AddEditor',
  components: {
    Editor
  },
  data () {
    return {
      // 控制图片图标下文字的显示
      showText: false,
      // 显示正在保存还是已自动保存
      saveTag: '',
      // 是否正在编辑
      adding: false,
      // 正在自动保存的提示语
      saveAlert: '',
      // 用来保存setTimeOut
      time: 0,
      // 图片原始高宽比，计算后的图片宽高
      radio: 0.4,
      countH: '',
      temPath: '', // 记录图片的路径
      update: false // 判断是否是在更新已存在的帖子
    }
  },
  computed: {
    post: function () {
      return this.$store.state.post
    }
  },
  watch: {
    adding (n, o) {
      this.saveAlert = n ? '正在自动保存' : '已保存到草稿箱'
    }
  },
  methods: {
    // 文章内容变化的时候，watch 的回调
    handleWatch (n, o) {
      this.adding = true
      if (this.time) {
        clearTimeout(this.time)
      }
      if (!this.$route.params.updatePid) {
        // 更新草稿箱
        this.time = setTimeout(() => {
          this.time = 0
          this.updateDrafts(this.post)
          this.adding = false
        }, 500)
      } else {
        // 更新已发表的文章
        this.time = setTimeout(() => {
          this.time = 0
          this.updatePost(this.post)
          this.adding = false
        }, 500)
      }
    },
    changePic (e) {
      let file = e.target.files
      let formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
      }
      this.formData = formData
      uploadImg(this.formData, 'postPic', this.post.pid).then(res => {
        if (res.code === 200) {
          const baseUrl =
            process.env.NODE_ENV === 'production'
              ? config.baseUrl.pro
              : config.baseUrl.dev
          this.temPath = baseUrl + res.path
        }
      })
      setTimeout(() => {
        this.$store.commit('setPostPic', this.temPath)
        this.countSize()
      }, 500)
    },
    // 宽度为容器宽度，宽高比为图片宽高比
    countSize () {
      const img = new Image()
      img.src = this.post.picUrl
      img.onload = () => {
        img.id = 'AddImg'
        this.radio = img.naturalHeight / img.naturalWidth
        // 在获得高宽比之后，为图片设置初始高宽
        img.width = this.$refs.wrapContainer.offsetWidth
        this.countH = img.width * this.radio
        img.height = this.countH
        document.getElementById('AddImgCon').insertBefore(img, document.getElementById('AddDel'))
        window.addEventListener('resize', this.resizeHandler)
      }
      img.onerror = function () {
      }
    },
    resizeHandler () {
      // 有莫名其妙的错误
      const img = document.getElementById('AddImg')
      try {
        img.width = this.$refs.wrapContainer.offsetWidth
      } catch (error) {
      }
      this.countH = img.width * this.radio
      img.height = this.countH
    },
    // 删除图片
    deletePic () {
      this.$store.commit('setPostPic', '')
      // 必须一样，前面设置了debounce，这里也要用debounce
      window.removeEventListener('resize', this.resizeHandler)
      document.getElementById('AddImgCon').removeChild(document.getElementById('AddImg'))
      this.countH = 250
    },
    // 把title改变的值储存在store中
    changeTitle (e) {
      this.$store.commit('setPost', { ...this.post, title: e.target.value })
    },
    // 更新已有草稿
    updateDrafts (data) {
      updateDrafts(data).then(res => {
        this.adding = false
        // 编辑过程中，如果原来的草稿箱被删除，则调用saveDrafts创保一个新的草稿
        if (res.code === 410) {
          this.saveDrafts(data)
        }
      })
    },
    // 创建新草稿, 返回 pid
    saveDrafts (data) {
      saveDrafts(data).then(res => {
        if (res.code === 200) {
          this.adding = false
          this.$store.commit('setPostPid', res.pid)
        }
      })
    },
    // 更新已有文章
    updatePost (data) {
      updatePost(data).then(res => {
        this.adding = false
      })
    }
  },
  async mounted () {
    if (this.$route.params.updatePid) {
      // 更新已发布的帖子
      this.update = true
      // post 是发表的文章的内容，如果不是第一次更新，不能使用 post
      const { updatePid, post } = this.$route.params
      const res = await loadUpdate(updatePid)
      if (res.code === 200) {
        // 帖子更新没发表，下次更新的时候，从后端获取数据
        this.$store.commit('setPost', {
          content: res.data.content,
          title: res.data.title,
          picUrl: res.data.picUrl,
          pid: res.data.pid
        })
      } else if (updatePid && post) {
        // 第 1 次更新帖子
        this.$store.commit('setPost', {
          content: post.content,
          title: post.title,
          picUrl: post.picUrl,
          pid: updatePid
        })
      } else {
        // 第 1 次更新帖子时刷新他妈的页面时！
        // 刷新之后，动态路由参数存在，post不存在
        let temPost = localStorage.getItem('temPost')
        this.$store.commit('setPost', JSON.parse(temPost))
      }
    } else {
      // 编辑帖子
      let temPost = localStorage.getItem('temPost')
      if (JSON.parse(temPost)) {
        this.$store.commit('setPost', JSON.parse(temPost))
      } else {
        this.$store.commit('setPost', {
          content: '',
          title: '',
          picUrl: '',
          pid: ''
        })
      }
    }

    document.querySelector('#editorArea').innerHTML = this.$store.state.post.content
    selectionToEnd('#editorArea')

    await this.$nextTick()
    if (this.$store.state.post.picUrl !== '') {
      this.countSize()
    }
    this.$watch('post.content', this.handleWatch)
    this.$watch('post.title', this.handleWatch)
    this.$watch('post.picUrl', this.handleWatch)

    this.$store.state.showFooter = false
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler)
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
    padding-bottom: 250px;
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
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  top: 100px;
  left: 1%;
  color: rgba($color: #000000, $alpha: 0.5);
}
</style>
