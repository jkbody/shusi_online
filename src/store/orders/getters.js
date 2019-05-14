const getters = {
  getTotalPrices: (state) => (obj) => {
    state.vuexOrders.find((item) => {
      if (item.isbn === obj.isbn) {
        return item.count * parseFloat(item.price)
      }
    })
    // return 1
  },
  getCartTotalPrices: (state) => {
    let count = 0
    state.vuexOrders.forEach(v => {
      if (v.selectFlag) {
        count += parseFloat(v.total_price)
      }
    })
    // console.log(count)
    return count
  },
  getSubData: (state) => {
    return state.vuexOrders.filter(v => v.selectFlag)
  },
  showSelectAll: (state) => {
    return state.vuexOrders.every(v => v.selectFlag)
  },
  hasOrder: (state) => {
    return state.vuexOrders.some(v => v.selectFlag)
  },
  getTureId: (state) => {
    let arr = []
    state.vuexOrders.forEach(v => {
      if (v.selectFlag) {
        arr.push(v.id)
      }
    })
    return arr
  }
}
export default getters
