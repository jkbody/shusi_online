<template>
    <div class="container">
        <div class="cart border-bottom"
             v-show="showShop"
        >
            <div class="cartContent">
                <div class="select iconfont"
                     v-if="isCart"
                     @click="handleSelect"
                >
                    <div v-show="!thisCart.flag">
                        &#xebf0;</div>
                    <div v-show="thisCart.flag">
                        &#xebef;</div>
                </div>
                <div class="imgWrap"
                     @click="test"
                >
                    <img :src="detailBook.image"
                         mode="aspectFit"
                         alt="">
                </div>
                <div class="text">
                    <div class="detail">
                        <div class="title">{{detailBook.title}}</div>
                        <div>{{detailBook.author}}</div>
                    </div>
                    <div class="price">
                        <div>{{detailBook.price}}</div>
                        <div>
                            <div class="stepper">
                                <!-- 减号 -->
                                <text @click="bindMinus"
                                      :class="minusStatus"
                                >-</text>
                                <!-- 数值 -->
                                <input type="number" :value="cartItem" />
                                <!-- 加号 -->
                                <text @click="bindPlus"
                                      :class="normal"
                                >+</text>
                            </div>
                        </div>
                        <!--<div>共计：{{price}}</div>-->
                        <!--<div v-if="cartData.price">共计：{{getTotalPrices}} 元</div>-->
                        <div>共计：{{total||0}} 元</div>
                        <div>
                            <button
                                    v-show="!isCart"
                                    class="add"
                                    @click="submitCart"
                                    size="mini"
                                    lang="zh_CN"
                                    hover-class="btnAct"
                            >确定</button>
                            <button
                                    v-show="isCart"
                                    class="de"
                                    @click="deleteCart"
                                    size="mini"
                                    lang="zh_CN"
                                    hover-class="cartBtnAct"
                            >删除</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  // import storeMouthodsName from '@/store/shoppingCart/storeMouthodsName'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import * as type from '@/store/shoppingCart/type'
  import * as cartTypes from '@/store/cart/cartTypes'
  export default {
    name: 'foot',
    props: ['index', 'showShop', 'detailBook'],
    watch: {
    },
    data () {
      return {
        price: 0,
        totalPrice: 0,
        openId: '',
        num: 1,
        minusStatus: 'disabled',
        isCart: null
      }
    },
    computed: {
      ...mapState('shoppingCart', ['cartData']),
      ...mapState('cart', ['totalGoodsData']),
      hasGoods () {
        return this.cartData.count > 1
      },
      thisCart () {
        if (this.hasGoodsCart()) { // cart
          console.log('购物车里面有')
          return this.totalGoodsData.find(item => {
            return item.isbn === this.detailBook.isbn
          })
        } else { // detail
          console.log('购物车里面没有')
          return 0
        }
      },
      cartItem () {
        if (this.hasGoodsCart()) {
          return this.thisCart.count
        } else {
          return this.cartData.count
        }
      },
      total () {
        if (this.hasGoodsCart()) {
          return this.thisCart.totalPrice
        } else {
          return this.cartData.totalPrice
        }
      }

    },
    methods: {
      ...mapMutations('shoppingCart', {
        setTotalPrice: type.SET_TOTAL_PRICE,
        add: type.SET_COUNT_ADD,
        minus: type.SET_COUNT_MINUS
      }),
      ...mapMutations('cart', {
        cartAdd: cartTypes.SET_COUNT_ADD,
        cartMinus: cartTypes.SET_COUNT_MINUS,
        pushCart: cartTypes.PUSH_CART,
        removeCart: cartTypes.REMOVE_CART,
        checkedFlag: cartTypes.SET_FLAG
      }),
      ...mapActions('cart', {
        setGoodsCart: cartTypes.SET_GOODS_CART
      }),
      handleSelect () {
        this.checkedFlag(this.thisCart)
      },
      deleteCart () {
        console.log(this.index)
        this.removeCart(this.index)
      },
      hasGoodsCart () {
        return this.totalGoodsData.some(item => {
          return item.isbn === this.detailBook.isbn
        })
      },
      async submitCart () {
        const cartData = await {
          count: this.cartData.count,
          price: this.cartData.price,
          totalPrice: this.cartData.totalPrice,
          isbn: this.detailBook.isbn,
          open_id: this.openId,
          detailBook: this.detailBook,
          flag: true
        }
        await console.log(this.totalGoodsData)
        await this.setGoodsCart(cartData)
      },
      bindMinus () {
        // 如果只有1件了，就不允许再减了
        if (this.hasGoodsCart()) {
          this.minusStatus = this.thisCart.count <= 1 ? 'disabled' : 'normal'
          this.cartMinus(this.thisCart)
          console.log('cart count minus')
        } else {
          this.minusStatus = this.cartData.count <= 1 ? 'disabled' : 'normal'
          this.minus()
          console.log('shoppingCart count minus')
        }
      },
      bindPlus: function () {
        if (this.hasGoodsCart()) {
          this.minusStatus = 'normal'
          this.cartAdd(this.thisCart)
          console.log('shoppingCart count add')
        } else {
          this.minusStatus = 'normal'
          this.add()
          console.log('shoppingCart count add')
        }
      },
      test () {
        console.log('id', this.$root.$mp.query.id)
        if (this.$root.$mp.query.id === undefined) {
          console.log('在购物车页面')
        } else {
          console.log('详情页面')
        }
      }
    },
    onShow () {
      console.log('onshow')
      console.log('onshow', this.thisCart)
    },
    mounted () {
      // console.log('设置total', this.getTotalPrices)
    },
    onLoad () {
      console.log('onshow')
      if (this.$root.$mp.query.id === undefined) {
        this.isCart = true
      } else {
        this.isCart = false
      }
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
.cart
    border 1px solid #ccc
    border-radius  10rpx 10rpx 0 0
    width 96%
    height h=300rpx
    background rgb(253,253,253)
    padding 2%
    /*overflow hidden*/
    .cartContent
        display flex
        align-items start
        .select
            width 7%
            color $bgcolor
        .imgWrap
            top 0
            width 25%
            img
                top 0
                width 100%
                height h
        .text
            flex 1
            width 71%
            display flex
            div
                margin-top 20rpx
            .detail
                flex 1
                margin-left 10%
                float left
                text-align left
                padding-right 3%
                .title
                    font-size 25rpx
                    font-weight 600
            .price
                text-align right
                float right
                .add
                    background $bgcolor
                    color #eee
                .de
                    background #ff6e97
                    color #eee
                .btnAct
                    background rgb(0,178,202)
                .cartBtnAct
                    background #c1194e
                /*stepper容器*/
                .stepper {
                    border: 1px solid #ccc;
                    border-radius: 10rpx;
                    width: 140rpx;
                    height: 42rpx;
                    margin:0 auto;
                    overflow hidden
                    display flex
                }
                /*加号与减号*/
                .stepper text {
                    width: 40rpx;
                    height: 56rpx;
                    line-height: 42rpx;
                    font-size 30rpx
                    text-align: center;
                    float: left;
                    color $bgcolor
                }
                /*数值*/
                .stepper input {
                    float: left;
                    margin: 0 auto;
                    width: 60rpx;
                    height: 56rpx;
                    line-height: 30rpx;
                    text-align: center;
                    font-size: 25rpx;
                    border-left: 1px solid #ccc;
                    border-right: 1px solid #ccc;
                }
                /*普通样式*/
                .stepper .normal{
                    color: $bgcolor
                }

                /*禁用样式*/
                .stepper .disabled{
                    color: #ccc;
                }
</style>
