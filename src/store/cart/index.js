import state from './state'
import actions from './actions'
import mutations from './mutations'
export default {
  namespaced: true, // 多出的一行
  state,
  actions,
  mutations
}
