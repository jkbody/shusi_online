<template>
    <div class="container">
        <div class="cartContainer"
             :style="getBottom"
        >
            <cart :detailBook="detailBook"
                  @addSuccess="addSuccess"
            ></cart>
        </div>
        <div class="content">
            <div class="item home"
                @click="tohome"
            >
                <p class="iconfont">&#xe615;</p>
                <p>首页</p>
            </div>
            <div class="item collect"
                 @click.stop="getCollect">
                <p v-show="!flag" class="iconfont">&#xeca7;</p>
                <p v-show="flag" class="iconfont active">&#xeca6;</p>
                <p>收藏</p>
            </div>
            <div class="item addShop"
                 @click.stop="handleAddShop"
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
  import cart from '@/pages/public_components/cart'
  // import storeMouthodsName from '@/store/shoppingCart/storeMouthodsName'
  import { mapState } from 'vuex'
  export default {
    name: 'foot',
    props: ['isbn', 'flag', 'detailBook'],
    components: {
      cart
    },
    watch: {
    },
    data () {
      return {
        showShop: false,
        openId: ''
      }
    },
    computed: {
      ...mapState('shoppingCart', ['cartData']),
      hasGoods () {
        return this.cartData.count > 1
      },
      getBottom () {
        return this.showShop ? 'bottom:140rpx' : 'bottom:-210rpx'
      }
    },
    methods: {
      handleBay () {
      },
      tohome () {
        wx.switchTab({
          url: '/pages/index/main'
        })
      },
      addSuccess () {
        // console.log('add')
        this.showShop = false
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
              isbn: this.detailBook.isbn
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
    font-size 25rpx
    color #333
    .cartContainer
        position fixed
        left 0
        right 0
        height 300rpx
        transition bottom .5s
        /*bottom -300rpx*/
        /*flex 1*/
        border-radius  10rpx 10rpx 0 0
        width 100%
        border none
        z-index 333
    .content
        z-index 888
        position fixed
        left 0
        right 0
        bottom 0
        border 1px solid #ccc
        padding-top 15rpx
        height 90rpx
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
