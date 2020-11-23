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
               @click="close()">取消</div>
        </div>
      </div>
    </transition>
    <div v-show="isShow"
         class="mask"
         @click="closeMask()"></div>
  </div>
</template>

<script>
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
      favsLists: [20, 40, 70, 120]
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
    close () {
      // 单向数据流，不能修改父组件传来的值，此处偷懒
      this.$emit('close')
    },
    submitPost () {
      if (this.showFavsInput) {

      } else {

      }
      this.close()
    },
    closeMask () {
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
$btn-main: #009688;
$btn-dark: darken($btn-main, 5%);
$btn-cancel: #ededed;
.scale-leave-active {
  transition: transform 0.3s, opacity 0.2s;
}
.scale-enter-active {
  transition: transform 0.3s;
}
.scale-enter /* .fade-leave-active below version 2.1.8 */ {
  transform: scale(0.3);
}
.scale-leave-to {
  transform: translateY(-60px);
  opacity: 0;
}

.alert {
  position: fixed;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 150px;
  margin-left: -150px;
  margin-top: -75px;
  padding: 20px 10px;
  box-shadow: 0 5px 8px 0 rgba($color: #000000, $alpha: 0.5);
  background: #fff;
  border-radius: 6px;
  z-index: 3000;
}
.alert-btn {
  width: 105px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 6px;
  background: $btn-main;
  &.cancel {
    background: $btn-cancel;
    color: #333;
  }
  &.success {
    background: $btn-main;
    color: #fff;
    &:hover {
      background: $btn-dark;
    }
  }
}
.alert-btn-around {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 10px;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  left: 0;
  top: 0;
  z-index: 2000;
}
</style>
