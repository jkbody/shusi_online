<template>
    <div class="container">
        <div class="cart"
             v-show="showShop"
        >aaa</div>
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
                   v-show="!showShop"
                >&#xe601;</p>
                <p class="iconfont active"
                    v-show="showShop"
                >&#xe601;</p>
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
  import {request} from '@/util'

  export default {
    name: 'foot',
    props: ['isbn', 'flag'],
    data () {
      return {
        showShop: false
      }
    },
    methods: {
      handleBay () {
        console.log('flag', this.flag)
      },
      tohome () {
        wx.switchTab({
          url: '/pages/index/main'
        })
      },
      handleAddShop () {
        this.showShop = !this.showShop
      },
      async getCollect () {
        let openId = await wx.getStorageSync('userInfo').openId
        const res = await request({
          url: '/weapp/getCollect',
          method: 'GET',
          data: {
            openId: openId,
            isbn: this.isbn
          }
        })
        this.flag = res.flag
        console.log(res)
      }
    },
    onHide () {
      this.flag = ''
      console.log('flag', this.flag)
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
        width 100%
        height h=200rpx
        background red
    .content
        padding-top 15rpx
        height 100%
        display flex
        background rgb(250,250,250)
        .item
            text-align center
        .home
            width 15%
        .collect
            width 15%
        .addShop
            width 35%
        .bay
            width 35%
        .active
            color: $bgcolor
</style>
