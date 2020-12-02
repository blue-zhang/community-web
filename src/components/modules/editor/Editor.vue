<template>
  <div>
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
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
                           @close="closeFn"
                           @confirmEdit='addFace'
                           class="editor-face"></editor-face>
            </transition>
          </span>
          <span @click="show('pic')"
                title="插入图片：img[src]">
            <svg class="icon add-co"
                 aria-hidden="true">
              <use :xlink:href="'#icon-tupian'"></use>
            </svg>
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
          <span @click="show('pre')"
                title="预览">
            <svg class="icon add-co"
                 aria-hidden="true">
              <use :xlink:href="'#icon-icon_yulan'"></use>
            </svg>
          </span>
          <span class="fr"
                style="height: 60px; padding: 0 10px; margin: 0;">
            <button class="layui-btn layui-btn-sm layui-btn-radius"
                    :class='{"layui-btn-disabled": cannotSubmit}'
                    title="标题大于5个字，内容大于15个字才能提交哦"
                    @click.stop="showConfirm = true">下一步</button>
          </span>
        </div>
        <textarea :value="$store.state.post.content"
                  @input="changeContent"
                  ref="editorArea"
                  @focus="focusHandler"
                  @blur="blurHandler"
                  name="content"
                  placeholder="文章的具体内容"
                  class="layui-textarea fly-editor editor-textarea"></textarea>
      </div>
      <div ref="main">
        <transition name="opacity">
          <editor-pic v-show="currentType === 'pic'"
                      ref="pic"
                      @confirmEdit='addPic'
                      @close="closeFn"></editor-pic>
        </transition>
        <transition name="opacity">
          <editor-href v-show="currentType === 'href'"
                       ref="href"
                       @confirmEdit='addHref'
                       @close="closeFn"></editor-href>
        </transition>
        <transition name="opacity">
          <editor-code v-show="currentType === 'code'"
                       @confirmEdit='addCode'
                       :codeWidth='codeWidth'
                       :codeHeight='codeHeight'
                       ref="code"
                       @close="closeFn"></editor-code>
        </transition>
        <transition name="opacity">
          <editor-quote v-show="currentType === 'quote'"
                        @confirmEdit='addQuote'
                        :codeWidth='codeWidth'
                        :codeHeight='codeHeight'
                        ref="quote"
                        @close="closeFn"></editor-quote>
        </transition>
        <transition name="opacity">
          <editor-preview v-show="currentType === 'pre'"
                          ref="pre"
                          :content='content'
                          @close="closeFn"></editor-preview>
        </transition>
      </div>
    </div>
    <add-confirm :showConfirm='showConfirm'
                 @close-confirm='showConfirm = false'></add-confirm>
  </div>

</template>

<script>
import EditorFace from './EditorFace'
import EditorPic from './EditorPic'
import EditorHref from './EditorHref'
import EditorCode from './EditorCode'
import EditorQuote from './EditorQuote'
import EditorPreview from './EditorPreview'
import AddConfirm from '@/views/Add/AddConfirm'

export default {
  name: 'Editor',
  components: {
    EditorFace,
    EditorPic,
    EditorHref,
    EditorCode,
    EditorQuote,
    EditorPreview,
    AddConfirm
  },
  data () {
    return {
      post: this.$store.state.post,
      currentType: '',
      codeWidth: 400,
      codeHeight: 120,
      // pos是包括空格在内的光标的位置，以数字表示
      pos: 0,
      showConfirm: false,
      // 禁止提交按钮
      cannotSubmit: true,
      // 检测内容是否变化
      time: 0,
      lists: {
        pic: {
          name: 'editor-pic'
        },
        href: {
          name: 'editor-href'
        },
        face: {
          name: 'editor-face'
        },
        code: {
          name: 'editor-code'
        },
        quote: {
          name: 'editor-quote'
        },
        pre: {
          name: 'editor-preview'
        }
      }
    }
  },
  computed: {
    content () {
      return this.$store.state.post.content
    }
  },
  // 关闭之后将编辑框返回到默认位置
  watch: {
    currentType: function (n, o) {
      if (n === '' && n !== o && o !== 'face' && o !== 'pre') {
        setTimeout(() => {
          this.$refs[o].$el.style.left = '40%'
          this.$refs[o].$el.style.top = '40%'
        }, 250)
      }
    },
    post: {
      handler (n, o) {
        // 刷新页面时不会执行
        if (n.title.length < 5 || n.content.length < 15) {
          this.cannotSubmit = true
        } else {
          this.cannotSubmit = false
        }
      },
      deep: true
    }
  },
  methods: {
    // 改变内容
    changeContent (e) {
      const data = this.$store.state.post
      data.content = e.target.value
      this.$store.commit('getPost', data)
    },
    // 点击图标，关闭或打开编辑弹框
    show (val) {
      if (this.currentType === val) {
        this.currentType = ''
        this.$refs.editorArea.focus()
        return
      }
      this.currentType = val
    },
    // 关闭编辑弹框
    closeFn () {
      if (this.currentType === '') {
        return
      }
      this.currentType = ''
      this.$refs.editorArea.focus()
    },
    // 点击空白区域关闭弹出框
    bodyClose (e) {
      // 事件在body中被监听，防止继续冒泡
      e.stopPropagation()
      // 点击表情图标时也不能触发关闭，要触发show，不然一直点不开
      if (this.$refs.icon.contains(e.target) && !this.$refs.face.$el.contains(e.target)) { return }
      // 点击组件本身不能触发关闭事件！，但是点击表情后要关闭
      if (!this.$refs.main.contains(e.target)) { this.closeFn() }
    },
    // 把编辑器和表情中的内容添加到文本框中
    addContent (val) {
      let arr = this.content.split('')
      // 根据光标位置决定插入位置
      arr.splice(this.pos, 0, val)
      this.content = arr.join('').trim()
    },
    addCode (val) {
      const insert = ` \n[pre]\n${val}\n[/pre]`
      this.addContent(insert)
      this.pos += insert.length
    },
    addQuote (val) {
      const insert = ` \n[quote]\n${val}\n[/quote]`
      this.addContent(insert)
      this.pos += insert.length
    },
    addHref (href, name) {
      const insert = ` a(${name})[${href}]`
      this.addContent(insert)
      this.pos += insert.length
    },
    addPic (val) {
      const insert = ` 图片[${val}]`
      this.addContent(insert)
      this.pos += insert.length
    },
    addFace (val) {
      const insert = ` 表情${val}`
      this.addContent(insert)
      this.pos += insert.length
    },
    addHr () {
      const insert = ' \n[分割线]'
      this.addContent(insert)
      this.pos += 6
      this.$refs.editorArea.focus()
    },
    // codeEditor大小随窗口改变的侦听器
    resizeHandler () {
      this.codeWidth = this.$refs.editorArea.offsetWidth - 300
      this.codeHeight = this.$refs.editorArea.offsetHeight - 350
    },
    blurHandler () {
      this.getPos()
    },
    focusHandler () {
      this.getPos()
    },
    // 计算光标的当前位置
    getPos () {
      let cursorPos = 0
      let textDom = this.$refs.editorArea
      if (document.selection) {
        // IE Support
        var selectRange = document.selection.createRange()
        selectRange.moveStart('character', -textDom.value.length)
        cursorPos = selectRange.text.length
      } else if (textDom.selectionStart || textDom.selectionStart === 0) {
        cursorPos = textDom.selectionStart
      }
      this.pos = cursorPos
    }
  },
  async mounted () {
    if (this.post.title.length < 5 || this.post.content.length < 15) {
      this.cannotSubmit = true
    } else {
      this.cannotSubmit = false
    }
    await this.$nextTick()
    document.querySelector('body').addEventListener('click', this.bodyClose)
    // 让code，quote编辑器的大小随页面变化
    this.codeWidth = this.$refs.editorArea.offsetWidth - 300
    this.codeHeight = this.$refs.editorArea.offsetHeight - 350
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy () {
    document.querySelector('body').removeEventListener('click', this.bodyClose)
    window.removeEventListener('resize', this.resizeHandler)
  }
}
</script>

<style lang="scss" scoped>
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
  height: 60px;
  line-height: 60px;
  border: none;
  background-color: #ffffff;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  box-shadow: 0 1px 3px rgba(18, 18, 18, 0.1);
  span {
    font-size: 25px;
    padding: 7px;
  }
}
.editor-textarea {
  font-size: 16px;
  outline: none;
  resize: none;
  border: none;
  min-height: 600px !important;
}
</style>
