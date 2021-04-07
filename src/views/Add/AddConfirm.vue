<template>
  <div>
    <transition>
      <div class="alert">
        <div class="layui-form-item">
          <div class="layui-inline">
            <label class="layui-form-label">所在专栏</label>
            <div class="layui-input-block">
              <div class="layui-unselect layui-form-select"
                   :class="{' layui-form-selected': showType}">
                <dl class="layui-anim layui-anim-upbit">
                  <dd class="layui-select-tips">请选择</dd>
                  <dd v-for="(item, index) in typeLists"
                      @click="chooseType(item)"
                      :key="'add'+item+index"
                      :class="{'layui-this': item === currentType}">{{item | _catalog }}</dd>
                </dl>
                <div class="layui-select-title"
                     @click="showType = !showType">
                  <input type="text"
                         placeholder="请选择"
                         :value="currentType | _catalog"
                         readonly
                         class="layui-input layui-unselect"><i class="layui-edge"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="layui-inline"
               v-show="showFavsInput">
            <label class="layui-form-label"
                   title="悬赏积分可以让更多的人回复帖子">悬赏积分</label>
            <div class="layui-input-block">
              <input type="text"
                     placeholder="输入 0~200 积分数"
                     v-model="favs"
                     class="layui-input layui-unselect">
            </div>

          </div>
        </div>
        <div class="alert-btn-around">
          <div class="alert-btn success pointer"
               @click="submitPost()">发布</div>
          <div class="alert-btn cancel pointer"
               @click="close">取消</div>
        </div>
      </div>
    </transition>
    <div class="mask"
         @click="close"></div>
  </div>
</template>

<script>
import { submitPost } from '@/api/content'
export default {
  name: 'AddConfirm',
  data () {
    return {
      favs: 0,
      showFavsInput: false,
      currentType: '',
      showType: false,
      typeLists: ['ask', 'advise', 'share', 'discuss', 'logs', 'notice']
    }
  },
  watch: {
    currentType: function (n, o) {
      // if (n === 'ask' || n === 'discuss') {
      //   this.showFavsInput = true
      // } else {
      //   this.showFavsInput = false
      // }
    }
  },
  methods: {
    chooseType (val) {
      this.currentType = val
      this.showType = false
    },
    close () {
      this.$emit('close-confirm')
      this.showType = false
    },
    submitPost () {
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const judge = /^(([0-9]|([1-9]\d)|(1\d\d)|(200)))$/g.test(parseInt(this.favs))
      if (!judge) {
        this.$bubble('请输入200以内数字', 'shake')
        return
      } else if (this.favs > userInfo.favs) {
        this.$bubble(`您的总积分为${userInfo.favs},积分不足`, 'shake')
        return
      }
      if (this.currentType === '') {
        this.$bubble('请选择所在专栏', 'shake')
        return
      }
      const { content, title, picUrl } = this.$store.state.post
      const catalog = this.currentType
      const submitData = {
        content,
        title,
        picUrl,
        catalog,
        favs: this.favs,
        id: this.$store.state.post.pid
      }
      submitPost(submitData).then((res) => {
        if (res.code === 200) {
          // 跳转到详情路由
          setTimeout(() => {
            this.$router.push({ name: 'index' })
            this.$bubble('文章发表成功')
          }, 500)
        } else {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
