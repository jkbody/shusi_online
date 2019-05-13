import * as type from './type'

const mutations = {
  [type.SET_COUNT_ADD] (state) {
    state.cartData.count++
    state.cartData.totalPrice = state.cartData.count * parseInt(state.cartData.price)
  },
  [type.SET_COUNT_MINUS] (state) {
    if (state.cartData.count > 1) {
      state.cartData.count--
    } else {
      state.cartData.count = 1
    }
    state.cartData.totalPrice = state.cartData.count * parseInt(state.cartData.price)
  },
  [type.SET_PRICE] (state, price) {
    state.cartData.price = price
  },
  [type.SET_TOTAL_PRICE] (state, price) {
    state.cartData.totalPrice = price
    console.log('SET_TOTAL_PRICE', price)
  },
  [type.SET_BOOK_ISBN] (state, isbn) {
    state.cartData.isbn = isbn
    console.log('SET_TOTAL_PRICE', isbn)
  },
  [type.SET_OPEN_ID] (state, id) {
    state.cartData.open_id = id
    console.log('SET_TOTAL_PRICE', id)
  },
  [type.RESET_CART_DATA] (state) {
    state.cartData.count = 1
    state.cartData.price = 0
    state.cartData.totalPrice = 0
    state.cartData.isbn = ''
    state.cartData.open_id = ''
    console.log('defaultCartData')
  }
}
export default mutations
