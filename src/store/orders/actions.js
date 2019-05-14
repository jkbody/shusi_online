import * as type from './orderTypes'
// import {request} from '@/util'

const actions = {
  async [type.SET_GOODS_CART] ({ commit, state }, obj) {
    if (state.totalGoodsData.length) {
      const hasIsbn = state.totalGoodsData.find(item => {
        if (item.isbn === obj.isbn) {
          // commit(type.SET_GOODS_CART, obj)
          console.log('购物车有这本书，不同提交')
          return true
        }
      })
      if (!hasIsbn) {
        console.log('购物车有东西但是没有这本书')
        commit(type.PUSH_CART, obj)
      }
    } else {
      console.log('购物车是空的')
      commit(type.PUSH_CART, obj)
    }
    console.log(obj)
  }
}
export default actions
