import * as type from './cartTypes'

const mutations = {
  [type.SET_COUNT_ADD] (state, obj) {
    state.totalGoodsData.find((item) => {
      if (item.isbn === obj.isbn) {
        item.count++
        item.totalPrice = item.count * parseFloat(item.price)
      }
    })
  },
  [type.SET_FLAG] (state, obj) {
    state.totalGoodsData.find((item) => {
      if (item.isbn === obj.isbn) {
        item.flag = !item.flag
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
        item.totalPrice = item.count * parseFloat(item.price)
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
  },
  [type.REMOVE_CART] (state, index) {
    state.totalGoodsData.splice(parseInt(index), 1)
  },
  [type.SET_ALL_FLAG_TRUE] (state) {
    state.totalGoodsData.forEach(v => {
      if (!v.flag) v.flag = true
    })
  },
  [type.SET_ALL_FLAG_FALSE] (state) {
    state.totalGoodsData.forEach(v => {
      if (v.flag) v.flag = false
    })
  },
  [type.REMOVE_FLAG_TRUE_CART] (state) {
    state.totalGoodsData = state.totalGoodsData.filter(v => !v.flag)
    // state.totalGoodsData.forEach((v, index, arr) => {
    //   if (v.flag) {
    //     arr.splice(index, 1)// 在删除的时候序号会乱，所以这样有漏网之鱼
    //   }
    // })
  }
}
export default mutations
