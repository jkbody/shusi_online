<template>
    <div class="container">
        <div class="content">
            <div v-for="(order,index) of orders"
                 class="order"
                 :key="order.CreateTime"
            >
                <div class="orderTitle">
                    <div class="orderHeader">
                        <div>{{order.CreateTime}}</div>
                        <div class="unpaid"
                             v-show="!paid"
                        >未支付</div>
                    </div>
                    <div class="select iconfont"
                         @click="handleSelect(order.id)"
                    >
                        <div v-show="!order.selectFlag">
                            &#xebf0;</div>
                        <div v-show="order.selectFlag">
                            &#xebef;</div>
                    </div>
                </div>
                <div class="cartsContent">
                    <div v-for="(goodsList,item) of order.goods_list"
                         :key="goodsList.time"
                    >
                        <div class="cartContent">
                            <div class="imgWrap"
                                 @click="test"
                            >
                                <img :src="goodsList.detailBook.image"
                                     mode="aspectFit"
                                     alt="">
                            </div>
                            <div class="text">
                                <div class="detail">
                                    <div class="title">{{goodsList.detailBook.title}}</div>
                                    <div>{{goodsList.detailBook.author}}</div>
                                </div>
                                <div class="price">
                                    <div>{{goodsList.detailBook.price}}</div>
                                    <div>共计：{{goodsList.totalPrice||0}} 元</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footContent">
                    <div>共计：{{order.total_price}} ￥</div>
                </div>
            </div>
        </div>
        <div class="footContainer">
            <div class="footContent"
            >
                <div class="item selectAll"
                     :class="height0"
                     @click="selectAll"
                >
                    <span class="all active iconfont"
                          v-show="showSelectAll"
                    >&#xebef; </span>
                    <span class="all iconfont"
                          v-show="!showSelectAll"
                    >&#xebf0; </span>
                    <span v-show="showSelectAll"> 取消全选</span>
                    <span v-show="!showSelectAll"> 全 选</span>
                </div>
                <div class="item delete cartHide"
                     @click="removeOrders"
                     :class="height0"
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
    </div>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import * as type from '@/store/orders/orderTypes'
  import {showModal} from '@/util'
  export default {
    name: 'orders',
    data () {
      return {
        paid: ''
        // openId: '',
      }
    },
    computed: {
      ...mapState('orders', {
        orders: 'vuexOrders'
      }),
      ...mapGetters('orders', ['showSelectAll', 'getTureId', 'hasOrder', 'showSelectAll', 'getSubData', 'getCartTotalPrices'])
    },
    methods: {
      ...mapMutations('orders', {
        setFlag: type.SET_FLAG,
        setAllFlagFlase: type.SET_ALL_FLAG_FALSE,
        setAllFlagTrue: type.SET_ALL_FLAG_TRUE,
        removeOrders: type.REMOVE_FLAG_TRUE_CART
      }),
      handleSelect (id) {
        this.setFlag(id)
      },
      selectAll () {
        if (this.showSelectAll) {
          this.setAllFlagFlase()
          console.log(this.showSelectAll, '取消全选')
        } else {
          this.setAllFlagTrue()
          console.log(this.showSelectAll, '全选')
        }
      },
      handleBay () {
        if (this.hasOrder) {
          console.log('click')
          return this.$emit('countHide')
        } else {
          showModal('支付失败', '请在未完成订单里面查看')
        }
      }
    },
    async onLoad () {
      this.paid = await parseInt(this.$root.$mp.query.pay)
      // this.openId = await wx.getStorageSync('userInfo').openId
      // await this.getOrders()
      console.log(this.orders)
    }
  }
</script>

<style lang="stylus" scoped>
    .container
        padding 2%
        font-size 30rpx
        margin-bottom 80rpx
        .active
            color $bgcolor
        .unpaid
            color #ff7800
        .footContainer
            overflow hidden
            font-size 25rpx
            color #333
            position fixed
            left 0
            right 0
            bottom 0
            height 80rpx
            .footContent
                border 1px solid #ccc
                height 80rpx
                display flex
                background rgb(250,250,250)
                .item
                    line-height 80rpx
                    text-align center
                .selectAll
                    width 25%
                .delete
                    width 20%
                .total
                    width 25%
                .bay
                    flex 1
                    color #eee
                    background $bgcolor
                .active
                    color: $bgcolor
        .content
            display flex
            flex-direction column
            .order
                border-radius: 10rpx
                border 1px solid #ccc
                margin 20rpx 0
                .footContent
                    padding 2%
                    text-align right
                    color $bgcolor
                .orderTitle
                    display flex
                    text-indent 2%
                    margin-top 10rpx
                    .orderHeader
                        flex 1
                    .select
                        float right
                        width 7%
                        color $bgcolor
                .cartsContent
                    font-size 30rpx
                    flex-direction column
                    .cartContent
                        display flex
                        border 1px solid #ccc
                        height 250rpx
                        margin 2%
                        padding 5%
                        border-radius  10rpx
                        background rgb(250,250,250)
                        .imgWrap
                            top 0
                            width 30%
                            img
                                top 0
                                width 100%
                                height 250rpx
                        .text
                            flex 1
                            display flex
                            div
                                margin-top 20rpx
                                font-size 25rpx
                            .detail
                                flex 1
                                margin-left 10%
                                float left
                                text-align left
                                padding-right 3%
                                font-size 25rpx
                                .title
                                    font-size 25rpx
                                    font-weight 600
                            .price
                                text-align right
                                float right

</style>
