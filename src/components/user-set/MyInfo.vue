<template>
  <form class="layui-form layui-form-pane layui-tab-item  layui-show pd-tb15">
    <div class="layui-form-item">
      <label class="layui-form-label">昵称</label>
      <div class="layui-input-inline">
        <input type="text"
               v-model="fakename"
               class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">性别</label>
      <div class="gender-btn-container">
        <button class="gender-btn"
                :class="{'gender-btn-click': gender === '0'}"
                @click="genderSelect('0')">男</button>
        <button class="gender-btn"
                @click="genderSelect('1')"
                :class="{'gender-btn-click': gender === '1'}">女</button>
        <button class="gender-btn"
                @click="genderSelect('2')"
                :class="{'gender-btn-click': gender === '2'}">保密</button>
      </div>

    </div>
    <div class="layui-form-item layui-form-text">
      <label class="layui-form-label">签名</label>
      <div class="layui-input-block">
        <textarea placeholder="随便写些什么刷下存在感"
                  class="layui-textarea"
                  v-model="regmark"
                  style="height: 70px;"></textarea>
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">城市</label>
      <div class="layui-input-inline">
        <input type="text"
               placeholder="有待开发"
               v-model="location"
               class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <label class="layui-form-label">出生日期</label>
      <div class="layui-input-inline">
        <input type="text"
               id="test1"
               readonly
               v-model="birthday"
               class="layui-input">
      </div>
    </div>
    <div class="layui-form-item">
      <button class="layui-btn"
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
      gender: '',
      location: '',
      birthday: '',
      regmark: '',
      fakename: ''
    }
  },
  methods: {
    genderSelect (val) {
      this.gender = val
    },
    submit () {
    // 用户id由后端从token中获取
      const option = {
        fakename: this.fakename,
        birthday: this.birthday,
        location: this.location,
        regmark: this.regmark,
        gender: this.gender
      }
      changeBasic(option).then(res => {
        console.log('submit -> res', res)
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        userInfo.fakename = res.fakename
        userInfo.birthday = res.birthday
        userInfo.location = res.location
        userInfo.regmark = res.regmark
        userInfo.gender = res.gender
        this.$store.commit('getUserInfo', userInfo)
        this.$alert(res.msg)
      })
    }
  },
  mounted () {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.fakename = userInfo.fakename
    this.birthday = userInfo.birthday
    this.location = userInfo.location
    this.regmark = userInfo.regmark
    this.gender = userInfo.gender
    const _this = this
    window.layui.use('laydate', function () {
      var laydate = window.layui.laydate
      laydate.render({
        elem: '#test1',
        done: function (value, date, endDate) {
          _this.birthday = value
        }
      })
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
