import Vue from 'vue'
import Vuex from 'vuex'

import login from './login'
import cart from './cart'
import shoppingCart from './shoppingCart'
import orders from './orders'
// import state from './login/state'
// import mutations from './login/mutations'
import createLogger from 'vuex/dist/logger'// <---- 打印Log信息
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' // 是生产环境还是开发环境
export default new Vuex.Store({
  modules: {
    login,
    cart,
    shoppingCart,
    orders
  },
  // strict: debug, // 严格模式： 此模式下所有状态的变更且不是由mutation函数引起，将会抛出错误。
  plugins: debug ? [createLogger(), createPersistedState({
    storage: {
      getItem: key => wx.getStorageSync(key),
      setItem: (key, value) => wx.setStorageSync(key, value),
      removeItem: key => {}
    }
  })] : [] // 在开发环境下，配置日志插件。
  // plugins: [createPersistedState({
  //   storage: {
  //     getItem: key => wx.getStorageSync(key),
  //     setItem: (key, value) => wx.setStorageSync(key, value),
  //     removeItem: key => {}
  //   }
  // })]
})
