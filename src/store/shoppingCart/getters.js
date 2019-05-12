const getters = {
  getTotalCartLength: (state) => {
    return state.carts.length
  },
  getTotalPrices: (state) => {
    return state.cartData.count * parseFloat(state.cartData.price)
    // return 1
  }
}
export default getters
