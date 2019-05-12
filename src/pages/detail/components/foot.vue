<template>
    <div class="container">
        <div class="cart border-bottom"
             v-show="showShop"
        >
            <div class="cartContent">
                <div class="imgWrap"
                    @click="test"
                >
                    <img :src="detailBook.image"
                         mode="aspectFit"
                         alt="">
                </div>
                <div class="text">
                    <div class="detail">
                        <div>{{detailBook.title}}</div>
                        <div>{{detailBook.author}}</div>
                    </div>
                    <div class="price">
                        <div>{{detailBook.price}}</div>
                        <div>
                            <stapper></stapper>
                        </div>
                        <!--<div>共计：{{price}}</div>-->
                        <!--<div v-if="cartData.price">共计：{{getTotalPrices}} 元</div>-->
                        <div>共计：{{getTotalPrices}} 元</div>
                        <div>
                            <button
                                    @click="submitCart"
                                    size="mini"
                                    lang="zh_CN"
                                    hover-class="btnAct"
                            >确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="item home"
                @click="tohome"
            >
                <p class="iconfont">&#xe615;</p>
                <p>首页</p>
            </div>
            <div class="item collect"
                 @click="getCollect">
                <p v-show="!flag" class="iconfont">&#xeca7;</p>
                <p v-show="flag" class="iconfont active">&#xeca6;</p>
                <p>收藏</p>
            </div>
            <div class="item addShop"
                 @click="handleAddShop"
            >
                <p class="iconfont"
                   v-show="!showShop&&!hasGoods"
                >&#xe601;</p>
                <p class="iconfont active"
                    v-show="showShop&&!hasGoods"
                >&#xe601;</p>
                <p class="iconfont active"
                    v-show="hasGoods"
                >&#xe600;</p>
                <p>加入购物车</p>
            </div>
            <div class="item bay"
                 @click="handleBay"
            >
                <p class="iconfont">&#xe70c;</p>
                <p>购买</p>
            </div>
        </div>
    </div>
</template>

<script>
  import {request, showModal} from '@/util'
  import stapper from '@/pages/public_components/stepper'
  // import storeMouthodsName from '@/store/shoppingCart/storeMouthodsName'
  import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
  import * as type from '@/store/shoppingCart/type'
  import * as cartTypes from '@/store/cart/cartTypes'
  export default {
    name: 'foot',
    props: ['isbn', 'flag', 'detailBook'],
    components: {
      stapper
    },
    watch: {
    },
    data () {
      return {
        showShop: false,
        price: 0,
        totalPrice: 0,
        openId: ''
      }
    },
    computed: {
      ...mapState('shoppingCart', ['cartData', 'totalGoodsData']),
      ...mapState('cart', ['totalGoodsData']),
      ...mapGetters('shoppingCart', ['getTotalPrices']),
      hasGoods () {
        return this.cartData.count > 1
      }
    },
    methods: {
      ...mapMutations('shoppingCart', {
        setTotalPrice: type.SET_TOTAL_PRICE
      }),
      ...mapMutations('cart', {
        pushCart: cartTypes.PUSH_CART
      }),
      ...mapActions('cart', {
        setGoodsCart: cartTypes.SET_GOODS_CART
      }),
      submitCart () {
        // await this.setOpenId(this.storyAgeOpenId)
        // await this.setBookIsbn(this.detailBook.isbn)
        const cartData = {
          count: this.cartData.count,
          price: this.cartData.price,
          totalPrice: this.getTotalPrices,
          isbn: this.detailBook.isbn,
          open_id: this.openId
        }
        // console.log(cartData)
        this.setGoodsCart(cartData)
        // this.totalGoodsData.push(cartData)
        console.log(this.totalGoodsData)
        // if (this.totalGoodsData.length) {
        //   if (this.checkIsbn()) {
        //     this.setGoodsCart({
        //       count: this.cartData.count,
        //       totalPrice: this.getTotalPrices,
        //       isbn: this.detailBook.isbn
        //     })
        //   } else {
        //     this.pushCart(this.cartData)
        //     console.log('没有这个isbn')
        //   }
        // } else { // 数组是空的
        //   this.pushCart(this.cartData)
        //   console.log('数组是空的')
        // }
        // console.log('submitCart', this.totalGoodsData)
      },
      test () {
        console.log('cartData', this.cartData)
        // console.log('cartData', this.cartData)
        console.log('totalGoodsData', this.totalGoodsData)
      },
      handleBay () {
        console.log('flag', this.flag)
      },
      tohome () {
        wx.switchTab({
          url: '/pages/index/main'
        })
      },
      handleAddShop () {
        if (this.openId) {
          this.showShop = !this.showShop
        } else {
          showModal('请登录', '登录以后才可以加入购物车')
        }
      },
      async getCollect () {
        if (this.openId) {
          const res = await request({
            url: '/weapp/getCollect',
            method: 'GET',
            data: {
              openId: this.openId,
              isbn: this.isbn
            }
          })
          this.flag = res.flag
          console.log(res)
        } else {
          showModal('收藏失败', '请登录')
        }
      }
    },
    onShow () {
    },
    mounted () {
      console.log('设置total', this.getTotalPrices)
    },
    onLoad () {
      console.log('onLoad')
      this.setTotalPrice(this.getTotalPrices)
      this.openId = wx.getStorageSync('userInfo').openId
    },
    onUnload () {
      this.showShop = false
    }
  }
</script>

<style lang="stylus" scoped>
.container
    font-size 25rpx
    position fixed
    left 0
    right 0
    bottom 0
    height (h+90)
    color #333
    border 1px solid #ccc
    .cart
        border-radius  10rpx 10rpx 0 0
        width 96%
        height h=300rpx
        background rgb(253,253,253)
        border none
        padding 2%
        /*overflow hidden*/
        .cartContent
            display flex
            align-items start
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
                .price
                    text-align right
                    float right
                    button
                        background $bgcolor
                        color #eee
                    .btnAct
                        background rgb(0,178,202)
    .content
        padding-top 15rpx
        height 100%
        display flex
        background rgb(250,250,250)
        .item
            text-align center
        .home
            width 25%
        .collect
            width 25%
        .addShop
            width 25%
        .bay
            width 25%
        .active
            color: $bgcolor
</style>
