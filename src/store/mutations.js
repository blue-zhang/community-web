// import _ from 'lodash'
export default {
  setSid (state, val) {
    state.sid = val
  },
  getUserInfo (state, val) {
    if (val === '') return
    // state.userInfo = _.assign(state.userInfo, val)
    state.userInfo = val
    // localStorage只能储存字符串
    localStorage.setItem('userInfo', JSON.stringify(val))
  },
  getToken (state, val) {
    state.token = val
    localStorage.setItem('token', val)
  },
  getRefresh (state, val) {
    state.refreshToken = val
    localStorage.setItem('refreshToken', val)
  },
  getIsLogin (state, val) {
    state.isLogin = val
  },
  getBarLists (state, val) {
    state.barLists = val
    localStorage.setItem('barLists', JSON.stringify(val))
  }
}
