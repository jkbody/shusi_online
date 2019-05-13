<template>
    <div class="container border-top">
        <div class="content">
            <div class="item selectAll"
                 :style="!totalGoodsData.length ? {height:0}:{height:80 + 'rpx'}"
                 @click="selectAll"
            >
                <span class="all iconfont"
                      v-show="!flag"
                >&#xebf0; </span>
                <span class="all active iconfont"
                      v-show="flag"
                >&#xebef; </span>
                <span v-show="flag"> 取消全选</span>
                <span v-show="!flag"> 全 选</span>
            </div>
            <div class="item delete cartHide"
                 @click="removeSomeCarts"
                 :style="!totalGoodsData.length ? {height:0}:{height:80 + 'rpx'}"
            >
                <p>删 除</p>
            </div>
            <div class="item total"
            >
                <p>合计：{{getCartTotalPrices||0}} ¥</p>
            </div>
            <div class="item bay"
                 @click="handleBay"
            >
                <p>结 算</p>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import * as cartTypes from '@/store/cart/cartTypes'
  export default {
    name: 'foot',
    data () {
      return {
        openId: ''
      }
    },
    computed: {
      ...mapState('cart', ['totalGoodsData']),
      ...mapGetters('cart', ['getCartTotalPrices']),
      flag () {
        return this.totalGoodsData.every(v => {
          return v.flag === true
        })
      }
    },
    methods: {
      ...mapMutations('cart', {
        checkedFlag: cartTypes.SET_FLAG,
        setTrue: cartTypes.SET_ALL_FLAG_TRUE,
        setFlase: cartTypes.SET_ALL_FLAG_FALSE,
        removeSomeCarts: cartTypes.REMOVE_SOME_CART
      }),
      selectAll () {
        if (this.flag) {
          this.setFlase()
          console.log('取消全选')
        } else {
          this.setTrue()
          console.log('全选')
        }
      },
      toHome () {
        wx.switchTab({
          url: '/pages/index/main'
        })
      },
      handleBay () {
        console.log(typeof this.totalGoodsData[0].totalPrice)
      }
    },
    onShow () {
    },
    mounted () {
      console.log('设置total', this.getTotalPrices)
    },
    onLoad () {
      console.log('onLoad')
      // this.setTotalPrice(this.getTotalPrices)
      this.openId = wx.getStorageSync('userInfo').openId
    },
    onUnload () {
      this.showShop = false
    }
  }
</script>

<style lang="stylus" scoped>
    .container
        overflow hidden
        font-size 28rpx
        color #333
        position fixed
        left 0
        right 0
        bottom 0
        height 80rpx
        border-bottom 5rpx solid #ccc
        overflow hidden
        .content
            overflow hidden
            display flex
            align-items center
            height 80rpx
            background rgb(250,250,250)
            .item
                overflow hidden
                text-align center
                line-height 80rpx
            .delete
                width 15%
                color #ff6e97
            .selectAll
                width 25%
            .total
                width 25%
                color: $bgcolor
            .bay
                color #eee
                width 35%
                /*background #e03636*/
                background $bgcolor
            .active
                color: $bgcolor
</style>
