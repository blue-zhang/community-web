<template>
  <div key="editorReply">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect editor-panel"
             :class="{'editor-panel-top': fixed, 'comments-panel': comments}"
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
          <span title="插入图片：img[src]"
                v-if="!comments"
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
          </span>
          <span @click="show('href')"
                title="超链接格式：a(href)[text]">
            <svg class="icon add-co"
                 aria-hidden="true">
              <use :xlink:href="'#icon-lianjie'"></use>
            </svg>
          </span>
          <span @click="show('code')"
                title="插入代码">
            <svg class="icon add-co"
                 aria-hidden="true">
              <use :xlink:href="'#icon-code'"></use>
            </svg>
          </span>
          <span @click="show('quote')"
                title="插入引用">
            <i class="add-co">“ ”</i>
          </span>
          <span @click='addHr'
                title="插入水平线">
            <i class="add-co">hr</i>
          </span>
          <span class="fr"
                style="height: 60px; padding: 0 10px; margin: 0;">
            <button v-if="comments"
                    type="button"
                    class="layui-btn layui-btn-sm layui-btn-radius"
                    @click.stop="$emit('submitComments')">回复</button>
            <button v-else
                    type="button"
                    class="layui-btn layui-btn-radius"
                    :class="{ 'layui-btn-disabled': $store.state.post.content.length <= 10 || $store.state.post.title.length <= 3}"
                    @click.stop="showConfirmFn">发表</button>
          </span>
        </div>
        <span class="panel"></span>
        <div ref="editorAreaReply"
             id="editorAreaReply"
             @input="onInput"
             :data-placeholder="placeHolder"
             contenteditable="true"
             :class="{'comments-editor': comments, 'editor-textarea': !comments}"
             class="layui-textarea fly-editor contentbg">
        </div>
      </div>
      <div ref="main">
        <transition name="opacity">
          <editor-href v-if="currentType === 'href'"
                       ref="href"
                       @close="closeFn"
                       @confirmEdit='addHref'></editor-href>
        </transition>
        <transition name="opacity">
          <editor-code v-if="currentType === 'code'"
                       @confirmEdit='addCode'
                       @close="closeFn"
                       :codeWidth='codeWidth'
                       :codeHeight='codeHeight'
                       ref="code"></editor-code>
        </transition>
        <transition name="opacity">
          <editor-quote v-if="currentType === 'quote'"
                        @confirmEdit='addQuote'
                        @close="closeFn"
                        :codeWidth='codeWidth'
                        :codeHeight='codeHeight'
                        ref="quote"></editor-quote>
        </transition>
      </div>
    </div>
  </div>

</template>

<script>
import face from '@/assets/js/face'
import { uploadImg } from '@/api/user'
import config from '@/config/config'
import selectionToEnd from '@/utils/contenteditable/selectToEnd'
import paste from '@/utils/contenteditable/paste'
export default {
  name: 'EditorReply',
  components: {
    EditorFace: () => import('@/components/modules/editor/EditorFace'),
    EditorHref: () => import('@/components/modules/editor/EditorHref'),
    EditorCode: () => import('@/components/modules/editor/EditorCode'),
    EditorQuote: () => import('@/components/modules/editor/EditorQuote')
  },
  data () {
    return {
      currentType: '',
      codeWidth: 400,
      codeHeight: 120,
      pos: 0,
      showConfirm: false,
      // 检测内容是否变化
      time: 0,
      fixed: false,
      ranges: [],
      picUrl: '',
      // 接收父组件传来的preContent
      placeHolder: ''
    }
  },
  props: {
    comments: {
      type: Boolean
    },
    preContent: {
      type: String,
      default: ''
    }
  },
  // 评论后，清空富文本内容
  watch: {
    '$store.state.comments' (n, o) {
      if (n === '' && this.comments) {
        this.$refs.editorAreaReply.innerHTML = ''
      }
      if (n !== '') {
        this.placeHolder = ''
      } else {
        this.placeHolder = this.preContent
      }
    }
  },
  methods: {
    showConfirmFn () {
      if (this.$store.state.post.content.length > 10 && this.$store.state.post.title.length > 3) {
        this.showConfirm = true
      }
    },
    submitComments () {
      if (this.$store.state.comments.length > 10) {
        this.$emit('submitComments')
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
      let selection = ''
      let type = this.currentType
      type === val ? this.closeFn() : this.currentType = val

      const list = ['href', 'quote', 'code']
      if (list.some((item) => {
        return item === this.currentType
      })) {
        selection = document.getSelection()
        let arr = []
        for (let i = 0; i < selection.rangeCount; i++) {
          arr.push(selection.getRangeAt(i))
        }
        this.ranges = arr
      }
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
      // 如果没有弹出框需要关闭，禁止这个功能
      if (this.currentType === '' || this.currentType === 'pre') return
      // 事件在body中被监听，防止继续冒泡
      e.stopPropagation()
      // 点击表情图标时也不能触发关闭，要触发show，不然一直点不开
      if (this.$refs.icon.contains(e.target) && !this.$refs.face.$el.contains(e.target)) { return }
      // 点击组件本身不能触发关闭事件！
      if (!this.$refs.main.contains(e.target) && !this.$refs.editorAreaReply.contains(e.target)) {
        this.closeFn()
      }
    },
    onInput (e) {
      this.$store.commit('setComments', e.target.innerHTML)
    },
    addContent () {
      this.$store.commit('setComments', this.$refs.editorAreaReply.innerHTML)
    },
    addCode (html) {
      let temp = document.createElement('div')
      temp.textContent !== undefined ? (temp.textContent = html) : (temp.innerText = html)
      const id = new Date().getTime()
      const div = document.createElement('div')
      div.className = `__code${id}`
      div.innerHTML = `<br><pre style="margin: 0">${temp.innerHTML}</pre><br>`
      this.ranges[this.ranges.length - 1].insertNode(div)
      this.restoreSelection(document.querySelector(`.__code${id}`))
      this.addContent()
      this.closeFn()
    },
    addQuote (val) {
      const id = new Date().getTime()
      const div = document.createElement('div')
      div.className = `__quote${id}`
      div.innerHTML = `<br><blockquote style="margin: 0" class="layui-elem-quote layui-quote-nm">${val}</blockquote><br>`
      this.ranges[this.ranges.length - 1].insertNode(div)
      this.restoreSelection(document.querySelector(`.__quote${id}`))
      this.addContent()
      this.closeFn()
    },
    addHref (href, name) {
      const id = new Date().getTime()
      const span = document.createElement('span')
      span.className = `__href${id}`
      span.innerHTML = `<a style="color: green" href="${href}" title=链接：${href}>${name}</a>`
      this.ranges[this.ranges.length - 1].insertNode(span)
      this.restoreSelection(document.querySelector(`.__href${id}`))
      this.addContent()
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
    addHr () {
      document.execCommand('insertHTML', true, '<hr style="height: 2px">')
    },
    // codeEditor大小随窗口改变的侦听器
    resizeHandler () {
      this.codeWidth = this.$refs.editorAreaReply.offsetWidth - 300
      this.codeHeight = this.$refs.editorAreaReply.offsetHeight - 350
    },
    scrollHandler () {
      if (!this.comments) {
        const panel = document.querySelector('.panel')
        const debounce = this._.debounce(() => {
          if (panel.getBoundingClientRect().y <= 0) {
            this.fixed = true
          } else {
            this.fixed = false
          }
        }, 30)
        debounce()
      }
    },
    pasteHandler (event) {
      paste(event)
      this.addContent()
    }
  },
  async mounted () {
    // if (this.preContent) {
    //   document.querySelector('#editorAreaReply')
    // }
    this.placeHolder = this.preContent
    await this.$nextTick()
    // 对于评论，自动获取焦点
    // 对于文章，在父组件设置焦点
    if (this.comments) {
      selectionToEnd('#editorAreaReply')
    }
    document.querySelector('body').addEventListener('click', this.bodyClose)
    this.codeWidth = this.$refs.editorAreaReply.offsetWidth - 300
    this.codeHeight = this.$refs.editorAreaReply.offsetHeight - 350
    window.addEventListener('resize', this.resizeHandler)
    window.addEventListener('scroll', this.scrollHandler)
    document.querySelector('#editorAreaReply').addEventListener('paste', this.pasteHandler)
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.bodyClose)
    window.removeEventListener('resize', this.resizeHandler)
    window.removeEventListener('scroll', this.scrollHandler)
  }
}
</script>

<style lang="scss" scoped>
.contentbg {
  background: rgba(254, 254, 254, 0.6);
  border: 1px solid rgba(200, 200, 200, 0.8);
  box-shadow: 0px 0 3px rgba(0, 0, 0, 0.1);
}
.editor-face {
  position: absolute;
  z-index: 10;
  top: 60px;
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
  position: relative;
  height: 60px;
  line-height: 60px;
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
.comments-panel {
  height: 35px;
  line-height: 35px;
}
.editor-panel-top {
  z-index: 6000000;
  position: fixed;
  width: 700px;
  top: 0;
}
.editor-textarea {
  font-size: 16px;
  outline: none;
  resize: none;
  border: none;
  padding: 12px 0;
  min-height: 500px !important;
}
.comments-editor {
  border: 1px #ebebeb solid;
  min-height: 40px !important;
}
.pre {
  position: relative;
  margin: 10px 0;
  padding: 15px;
  line-height: 20px;
  background: #f2f2f2;
  color: #333;
  font-family: "Courier New", Courier, monospace, serif;
  font-size: 12px;
  border: none;
  border-left: 5px solid #ddd;
}

#editorAreaReply:empty:before {
  content: attr(data-placeholder);
  color: gray;
}
</style>
