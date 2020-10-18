import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sid: '',
    userInfo: [],
    isLogin: false
  },
  mutations: {
    setSid (state, val) {
      state.sid = val
    },
    getUserInfo (state, val) {
      state.userInfo = val
    },
    getIsLogin (state, val) {
      state.isLogin = val
    }
  },
  actions: {}
})
