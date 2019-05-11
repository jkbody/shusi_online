import * as types from './type' // 引入常量

const mutations = {
  [types.SET_USERINFO] (state, v) {
    state.userInfo = v
  }
}
export default mutations
