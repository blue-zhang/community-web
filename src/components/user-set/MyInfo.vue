<template>
  <form class="layui-form layui-form-pane layui-tab-item  layui-show pd-tb15">
    <div class="layui-form-item">
      <label class="layui-form-label">昵称</label>
      <div class="layui-input-inline">
        <input type="text"
               v-model="info.fakename"
               class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">性别</label>
      <div class="gender-btn-container">
        <button type="button"
                class="gender-btn"
                :class="{'gender-btn-click': info.gender === '0'}"
                @click="genderSelect('0')">男</button>
        <button type="button"
                class="gender-btn"
                @click="genderSelect('1')"
                :class="{'gender-btn-click': info.gender === '1'}">女</button>
        <button type="button"
                class="gender-btn"
                @click="genderSelect('2')"
                :class="{'gender-btn-click': info.gender === '2'}">保密</button>
      </div>

    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">签名</label>
      <div class="layui-input-block">
        <textarea placeholder="随便写些什么刷下存在感"
                  class="layui-textarea"
                  v-model="info.regmark"
                  style="height: 70px;"></textarea>
      </div>
    </div>
    <!-- <div class="layui-form-item">
      <label class="layui-form-label">城市</label>
      <div class="layui-input-inline">
        <input type="text"
               placeholder="有待开发"
               v-model="info.location"
               class="layui-input">
      </div>
    </div> -->
    <div class="layui-form-item">
      <label class="layui-form-label">出生日期</label>
      <div class="layui-input-inline">
        <input type="text"
               id="test1"
               readonly
               v-model="info.birthday"
               class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <button type="button"
              class="layui-btn"
              :class="{ 'layui-btn-disabled': notSubmit}"
              @click="submit()">确认修改</button>
    </div>
  </form>
</template>

<script>
import { changeBasic } from '../../api/user'
export default {
  name: 'MyInfo',
  data () {
    return {
      unwatch: '',
      notSubmit: true,
      info: {
        gender: '',
        location: '',
        birthday: '',
        regmark: '',
        fakename: ''
      }
    }
  },
  methods: {

    genderSelect (val) {
      this.info.gender = val
    },
    submit () {
      changeBasic({ ...this.info }).then(res => {
        // this.unwatch()
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        userInfo.fakename = res.result.fakename
        userInfo.birthday = res.result.birthday
        userInfo.location = res.result.location
        userInfo.regmark = res.result.regmark
        userInfo.gender = res.result.gender
        // this.info = res.result
        this.$store.commit('setUserInfo', userInfo)
        this.$alert(res.msg)
        this.notSubmit = true
        // this.unwatch = this.$watch('info', function () {
        //   console.log('watch')
        //   this.notSubmit = false
        // }, {
        //   deep: true
        // })
      })
    }
  },
  created () {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // 这里不适合解构赋值，因为 info 对象每个属性对应的值不是变量
    this.info.fakename = userInfo.fakename
    this.info.birthday = userInfo.birthday
    this.info.location = userInfo.location
    this.info.regmark = userInfo.regmark
    this.info.gender = userInfo.gender
    const _this = this
    window.layui.use('laydate', function () {
      var laydate = window.layui.laydate
      laydate.render({
        elem: '#test1',
        done: function (value, date, endDate) {
          _this.info.birthday = value
        }
      })
    })
  },
  mounted () {
    this.unwatch = this.$watch('info', function () {
      this.notSubmit = false
    }, {
      deep: true
    })
  }
}
</script>

<style lang="scss" scoped>
.gender-btn-container {
  display: flex;
  width: 190px;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}
.gender-btn {
  width: 50px;
  height: 38px;
  border: 1px solid;
  border-radius: 5px !important;
  background: #f4f4f4;
  color: #717171;
  text-align: center;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
}
.gender-btn-click {
  background: #5fb878;
  color: #ffffff;
}
</style>
