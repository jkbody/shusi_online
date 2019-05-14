const getters = {
  getTotalPrices: (state) => (obj) => {
    state.totalGoodsData.find((item) => {
      if (item.isbn === obj.isbn) {
        return item.count * parseFloat(item.price)
      }
    })
    // return 1
  },
  getCartTotalPrices: (state) => {
    let count = 0
    state.totalGoodsData.forEach(v => {
      if (v.flag) {
        count += parseFloat(v.totalPrice)
      }
    })
    // console.log(count)
    return count
  },
  getSubData: (state) => {
    return state.totalGoodsData.filter(v => v.flag)
  },
  hasCarts: (state) => {
    console.log(state.totalGoodsData)
    return state.totalGoodsData.some(v => v.flag)
  }
}
export default getters
