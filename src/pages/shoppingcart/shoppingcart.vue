<template>
    <div class="container">
        <div class="content"
             v-show="hide"
        >
            <div class="none"
                 v-show="!totalGoodsData.length"
            >
                <div>购物车是空的</div>
                <div>请将书本加入购物车</div>
            </div>
            <div
            >
                <div v-for="(cart,index) of totalGoodsData"
                     v-show="totalGoodsData.length"
                     :key="cart.isbn"
                     class="item"
                >
                    <cart :detailBook="cart.detailBook"
                          :index="index"
                          :showShop = 'true'
                    ></cart>
                </div>
                <div
                        v-show="totalGoodsData.length>1"
                        class="none"
                >没有更多</div>
            </div>
            <foot @countHide="contentHide"></foot>
        </div>
        <div class="option"
             v-if="!hide"
        >
            <button class="success"
                    @click="isSuccess"
            >支付成功</button>
            <button class="failed"
                    @click="isFailed"
            >支付失败</button>
        </div>
    </div>
</template>

<script>
  import {request} from '@/util'
  import cart from '@/pages/public_components/cart'
  import { mapGetters, mapState, mapMutations } from 'vuex'
  import * as cartTypes from '@/store/cart/cartTypes'
  import foot from './components/foot'
  export default {
    name: 'shoppingcart',
    data () {
      return {
        flag: true,
        hide: true,
        setContentHeight0: ''
      }
    },
    components: {
      cart,
      foot
    },
    computed: {
      ...mapGetters('cart', ['getSubData', 'getCartTotalPrices']),
      ...mapState('cart', ['totalGoodsData'])
    },
    methods: {
      ...mapMutations('cart', {
        removeCart: cartTypes.REMOVE_FLAG_TRUE_CART
      }),
      contentHide () {
        this.hide = false
        console.log('hide', this.hide)
      },
      async isSuccess () {
        const openId = await wx.getStorageSync('userInfo').openId
        const res = await request({
          method: 'POST',
          url: '/weapp/submitOrder',
          data: {
            data: this.getSubData,
            pay: 1,
            totalPrice: this.getCartTotalPrices,
            openId
          }
        })
        console.log(res)
        this.hide = true
        console.log('hide', this.hide)
        await this.removeCart()
      },
      async isFailed () {
        const openId = await wx.getStorageSync('userInfo').openId
        const res = await request({
          method: 'POST',
          url: '/weapp/submitOrder',
          data: {
            data: this.getSubData,
            pay: 0,
            totalPrice: this.getCartTotalPrices,
            openId
          }
        })
        console.log(res)
        this.hide = true
        console.log('hide', this.hide)
        await this.removeCart()
      }
    },
    onHide () {
      // this.hide = false
      console.log('hide', this.hide)
    }
  }
</script>

<style lang="stylus" scoped>
    .container
        margin-bottom 80rpx
        font-size 25rpx
        color #333
        padding 2%
        height 100%
        .option
            width 100%
            height 100%
            display flex
            flex-direction column
            align-content center
            button
                width 100%
                margin-top 50rpx
        .height0
            overflow hidden
            height 0
        .none
            text-align center
            color #ccc
            margin-top 20rpx
            div
                margin-top 20rpx
        .item
            margin-top 10rpx
</style>
