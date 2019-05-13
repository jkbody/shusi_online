<template>
    <div class="container">
        <div v-for="cart of totalGoodsData"
             :key="cart.isbn"
             class="item"
        >
            <cart :detailBook="cart.detailBook"
                  :showShop = 'true'
            ></cart>
        </div>
    </div>
</template>

<script>
  import cart from '@/pages/public_components/cart'
  import {mapState} from 'vuex'
  export default {
    name: 'shoppingcart',
    components: {
      cart
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
        .item
            margin-top 10rpx
</style>
