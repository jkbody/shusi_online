<template>
    <div class="container">
        <div class="none"
            v-show="!totalGoodsData.length"
        >
            <div>购物车是空的</div>
            <div>请将书本加入购物车</div>
        </div>
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
        <foot></foot>
    </div>
</template>

<script>
  import cart from '@/pages/public_components/cart'
  import foot from './components/foot'
  import {mapState} from 'vuex'
  export default {
    name: 'shoppingcart',
    data () {
      return {
        flag: true
      }
    },
    methods: {
    },
    components: {
      cart,
      foot
    },
    computed: {
      ...mapState('cart', ['totalGoodsData'])
    }
  }
</script>

<style lang="stylus" scoped>
    .container
        font-size 25rpx
        color #333
        padding 2%
        .none
            text-align center
            color #ccc
            margin-top 20rpx
            div
                margin-top 20rpx
        .item
            margin-top 10rpx
</style>
