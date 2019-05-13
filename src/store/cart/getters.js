const getters = {
  getTotalPrices: (state) => (obj) => {
    state.totalGoodsData.find((item) => {
      if (item.isbn === obj.isbn) {
        return item.count * parseFloat(item.price)
      }
    })
    // return 1
  }
}
export default getters
