import * as type from './cartTypes'

const mutations = {

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
