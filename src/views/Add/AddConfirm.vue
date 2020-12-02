<template>
  <div>
    <transition :name="'scale'">
      <div class="alert"
           v-show="isShow">
        <div class="layui-form-item">
          <div class="layui-inline">
            <label class="layui-form-label">所在专栏</label>
            <div class="layui-input-block">
              <div class="layui-unselect layui-form-select"
                   :class="{' layui-form-selected': showType}">
                <dl class="layui-anim layui-anim-upbit">
                  <dd class="layui-select-tips">请选择</dd>
                  <dd v-for="(item, index) in typeLists"
                      @click="chooseType(item.name)"
                      :key="'add'+item.type+index"
                      :class="{'layui-this': item.name === currentType}">{{item.name}}</dd>
                </dl>
                <div class="layui-select-title"
                     @click="showTypeLists">
                  <input type="text"
                         placeholder="请选择"
                         :value="currentType"
                         readonly
                         class="layui-input layui-unselect"><i class="layui-edge"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="layui-inline">
            <label class="layui-form-label"
                   title="悬赏积分可以让更多的人回答问题">悬赏积分</label>
            <div class="layui-input-block">
              <div class="layui-unselect layui-form-select"
                   :class="{' layui-form-selected': showFavs && showFavsInput}">
                <dl class="layui-anim layui-anim-upbit">
                  <dd class="layui-select-tips">请选择</dd>
                  <dd v-for="(item, index) in favsLists"
                      @click="chooseFavs(item)"
                      :key="'add'+item+index"
                      :class="{'layui-this': item === currentFavs}">{{item}}</dd>
                </dl>
                <div class="layui-select-title"
                     @click="showFavsLists">
                  <input type="text"
                         placeholder="请选择"
                         :value="currentFavs"
                         readonly
                         class="layui-input layui-unselect"
                         :class="{'layui-disabled': !showFavsInput}"><i :class="{'layui-edge': showFavsInput}"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="alert-btn-around">
          <div class="alert-btn success pointer"
               @click="submitPost()">发布</div>
          <div class="alert-btn cancel pointer"
               @click="$emit('close-confirm')">取消</div>
        </div>
      </div>
    </transition>
    <div v-show="isShow"
         class="mask"
         @click="closeMask()"></div>
  </div>
</template>

<script>
import { submitPost } from '@/api/content'
export default {
  name: 'AddConfirm',
  props: {
    showConfirm: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isShow: this.showConfirm,
      showFavsInput: false,
      currentType: '',
      currentFavs: '提问专栏才能悬赏积分',
      showType: false,
      showFavs: false,
      typeLists: [
        {
          type: 'ask',
          name: '提问'
        },
        {
          type: 'advise',
          name: '建议'
        },
        {
          type: 'discuss',
          name: '交流'
        },
        {
          type: 'share',
          name: '分享'
        },
        {
          type: 'logs',
          name: '动态'
        },
        {
          type: 'notice',
          name: '公告'
        }
      ],
      favsLists: [0, 20, 40, 70, 120, 1000]
    }
  },
  watch: {
    showConfirm: function (n, o) {
      this.isShow = n
    },
    currentType: function (n, o) {
      if (n === '提问') {
        this.showFavsInput = true
        this.currentFavs = 0
      } else {
        this.showFavsInput = false
        this.currentFavs = '提问专栏才能悬赏积分'
      }
    }
  },
  methods: {
    showTypeLists () {
      this.showType = !this.showType
    },
    chooseType (val) {
      this.currentType = val
      this.showType = false
    },
    showFavsLists () {
      this.showFavs = !this.showFavs
    },
    chooseFavs (val) {
      this.currentFavs = val
      this.showFavs = false
    },
    submitPost () {
      debugger
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const { content, title, picUrl, created } = this.$store.state.post
      const catalog = this.currentType
      let fav = this.currentFavs
      if (fav > userInfo.favs) {
        this.$bubble(`您的总积分为${userInfo.favs},积分不足`, 'shake')
        return
      }
      if (typeof fav === 'string') {
        fav = 0
      }
      const submitData = {
        content,
        title,
        picUrl,
        catalog,
        fav,
        created
      }
      submitPost(submitData).then(res => {
        // delDrafts({ created })
      })
      this.close()
    },
    closeMask () {
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
