import * as type from './orderTypes'

const mutations = {
  [type.SET_ORDERS] (state, obj) {
    state.vuexOrders = obj.map(v => {
      return Object.assign({}, v, {
        selectFlag: false
      })
    })
  },
  [type.SET_FLAG] (state, id) {
    state.vuexOrders.find((item) => {
      if (item.id === id) {
        item.selectFlag = !item.selectFlag
      }
    })
  },
  [type.REMOVE_ORDER] (state, index) {
    state.vuexOrders.splice(parseInt(index), 1)
  },
  [type.SET_ALL_FLAG_FALSE] (state) {
    state.vuexOrders.forEach(v => {
      if (v.selectFlag) v.selectFlag = false
    })
  },
  [type.SET_ALL_FLAG_TRUE] (state) {
    state.vuexOrders.forEach(v => {
      if (!v.selectFlag) v.selectFlag = true
    })
  },
  [type.REMOVE_FLAG_TRUE_CART] (state) {
    state.vuexOrders = state.vuexOrders.filter(v => !v.selectFlag)
    // state.vuexOrders.forEach((v, index, arr) => {
    //   if (v.flag) {
    //     arr.splice(index, 1)// 在删除的时候序号会乱，所以这样有漏网之鱼
    //   }
    // })
  }
}
export default mutations
