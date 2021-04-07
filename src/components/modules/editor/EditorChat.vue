<template>
  <div class="editorReply">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block"
           style="marginLeft: 0">
        <div class="layui-unselect editor-panel"
             ref='icon'>
          <span @click="show('face')"
                title="插入表情">
            <svg class="icon add-co"
                 aria-hidden="true">
              <use :xlink:href="'#icon-biaoqing'"></use>
            </svg>
            <transition name="opacity">
              <!-- face组件要定位在表情图标中 -->
              <editor-face v-show="currentType === 'face'"
                           ref="face"
                           @confirmEdit='addFace'
                           class="editor-face"></editor-face>
            </transition>
          </span>
          <!-- <span title="插入图片：img[src]"
                @click="$refs.editor_img.click()">
            <svg class="icon add-co"
                 aria-hidden="true">
              <use :xlink:href="'#icon-tupian'"></use>
            </svg>
            <input type="file"
                   accept="image/png, image/jpg, image/gif"
                   @change="addPic"
                   ref="editor_img"
                   style="display: none"
                   name="file">
          </span> -->
          <span class="fr"
                style="height: 60px; padding: 0 10px; margin: 0;">
            <button type="button"
                    class="layui-btn layui-btn-sm layui-btn-radius"
                    @click.stop="submit">回复</button>
          </span>
        </div>
        <div class="editorCon">
          <div id="editorAreaReply"
               class="editor wrapContent"
               ref="editorAreaReply"
               contenteditable="true"
               @input="onInput">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import face from '@/assets/js/face'
import { uploadImg } from '@/api/user'
import config from '@/config/config'
import paste from '@/utils/contenteditable/paste'
export default {
  name: 'EditorChat',
  components: {
    EditorFace: () => import('@/components/modules/editor/EditorFace')
  },
  data () {
    return {
      currentType: '',
      pos: 0,
      showConfirm: false,
      // 检测内容是否变化
      time: 0,
      ranges: [],
      picUrl: '',
      html: ''
    }
  },
  methods: {
    onInput (e) {
      this.html = e.target.innerHTML
    },
    submit () {
      const html = document.querySelector('#editorAreaReply').innerHTML
      if (html.trim()) {
        this.$emit('submit-mes', html)
        document.querySelector('#editorAreaReply').innerHTML = ''
      }
    },
    // 把光标设置在添加的 dom 的后面
    restoreSelection (dom) {
      let selection = window.getSelection()
      let range = document.createRange()
      range.selectNode(dom)
      if (dom) {
        try {
          selection.removeAllRanges()
        } catch (e) {
          /* IE */
          document.body.createTextRange().select()
          document.selection.empty()
        }
        selection.addRange(range)
        selection.collapseToEnd()
      }
    },
    // 点击图标，关闭或打开编辑弹框
    show (val) {
      let type = this.currentType
      type === val ? this.closeFn() : this.currentType = val
    },
    closeFn () {
      const type = this.currentType
      if (type !== 'face' && type !== '') {
        this.$refs[type].$el.style.display = 'none'
        this.$refs[type].$el.style.left = '40%'
        this.$refs[type].$el.style.top = '40%'
      }
      this.currentType = ''
    },
    // 点击空白区域关闭弹出框
    bodyClose (e) {
      // 事件在body中被监听，防止继续冒泡
      e.stopPropagation()
      // 如果没有弹出框需要关闭，禁止这个功能
      if (this.currentType === '' || this.currentType === 'pre') return
      // 点击表情图标时也不能触发关闭，要触发show，不然一直点不开
      if (this.$refs.icon.contains(e.target) && !this.$refs.face.$el.contains(e.target)) { return }
      this.closeFn()
    },
    addPic (e) {
      let file = e.target.files
      let formData = new FormData()
      if (file.length > 0) {
        formData.append('file', file[0])
      }
      uploadImg(formData, 'postPic', this.$store.state.post.pid).then(res => {
        if (res.code === 200) {
          this.$refs.editor_img.value = ''
          const baseUrl =
            process.env.NODE_ENV === 'production'
              ? config.baseUrl.pro
              : config.baseUrl.dev
          this.picUrl = baseUrl + res.path
        }
      })
      setTimeout(() => {
        const id = new Date().getTime()
        const picUrl = this.picUrl
        document.execCommand('insertHTML', false, `<img rel="prefetch" style="margin: 0 auto;max-width:100%; display: block;" class=__pic${id} src=${picUrl} alt=wrong/><br>`)
        this.restoreSelection(document.querySelector(`.__pic${id}`))
      }, 500)
    },
    addFace (val) {
      const id = new Date().getTime()
      document.execCommand('insertHTML', false, `<img class="__face${id}" src="${face[val]}" alt="wrong" />`)
    },
    pasteHandler (event) {
      paste(event)
      this.html = document.querySelector('#editorAreaReply').innerHTML
    }
  },
  async mounted () {
    await this.$nextTick()
    document.querySelector('#editorAreaReply').addEventListener('paste', this.pasteHandler)
    document.querySelector('body').addEventListener('click', this.bodyClose)
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.bodyClose)
  }
}

</script>

<style lang="scss" scoped>
// .editorCon {
//   width: 100%;
//   height: 160px;
//   max-height: 160px;

// }
.editor {
  width: 100%;
  height: 140px;
  max-height: 140px;
  outline: none !important;
  overflow-y: auto;
}
.editor-face {
  position: absolute;
  z-index: 10;
  top: -200px;
  left: 20px;
  line-height: 0;
}
.opacity-enter,
.opacity-leave-to {
  opacity: 0;
}
.opacity-leave-active {
  transition: opacity 0.3s;
}
.opacity-enter-active {
  animation: scale 0.3s;
  transition: opacity 0.3s;
}
@keyframes scale {
  0% {
    transform: scale(0);
  }
  20% {
    transform: scale(0.2);
  }
  40% {
    transform: scale(0.4);
  }
  60% {
    transform: scale(0.6);
  }
  80% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}
.editor-panel {
  box-sizing: border-box;
  position: relative;
  height: 40px;
  line-height: 40px;
  border: none;
  background-color: #ffffff;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #f7f4f4;
  box-shadow: 0 1px 3px rgba(18, 18, 18, 0.1);
  span {
    font-size: 25px;
    padding: 7px;
  }
}
.editorReply {
  width: 100%;
  height: 200px;
  border-top: 1px #eeeeee solid;
  background-color: white;
}
</style>
