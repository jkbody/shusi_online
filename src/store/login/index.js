import state from './state'
import mutations from './mutations'
// import createLogger from 'vuex/dist/logger'// <---- 打印Log信息

// const debug = process.env.NODE_ENV !== 'production' // 是生产环境还是开发环境
export default {
  namespaced: true, // 多出的一行 可以用这个module名作为区分了
  state,
  mutations
}
