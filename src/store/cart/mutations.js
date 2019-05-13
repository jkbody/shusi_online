import * as type from './cartTypes'

const mutations = {
  [type.SET_COUNT_ADD] (state, obj) {
    state.totalGoodsData.find((item) => {
      if (item.isbn === obj.isbn) {
        item.count++
        item.totalPrice = item.count * parseInt(item.price)
      }
    })
  },
  [type.SET_COUNT_MINUS] (state, obj) {
    state.totalGoodsData.find((item) => {
      if (item.isbn === obj.isbn) {
        if (item.count > 1) {
          item.count--
        } else {
          item.count = 1
        }
        item.totalPrice = item.count * parseInt(item.price)
      }
    })
  },
  [type.PUSH_CART] (state, arr) {
    state.totalGoodsData.push(arr)
  },
  [type.SET_GOODS_CART] (state, obj) {
    state.totalGoodsData.forEach(v => {
      if (v.isbn === obj.isbn) {
        v.count = obj.count
        v.totalPrice = obj.totalPrice
      }
    })
  }
}
export default mutations
