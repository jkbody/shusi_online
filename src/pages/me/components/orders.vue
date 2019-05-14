<template>
    <div class="container">
        <button
                class="item Pay"
                @click="paid"
        >已付款</button>
        <button
                class="item noPay"
                @click="unpaid"
        >待支付</button>
    </div>
</template>

<script>
  export default {
    name: 'orders',
    data () {
      return {
        pay: 0
      }
    },
    methods: {
      paid () {
        this.pay = 1
        wx.navigateTo({
          url: '/pages/orders/main?pay=' + this.pay
        })
      },
      unpaid () {
        this.pay = 0
        wx.navigateTo({
          url: '/pages/orders/main?pay=' + this.pay
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
.container
    height 75%
    padding 3%
    display flex
    flex-direction column
    justify-content center
    .item
        width 80%
        font-size 30rpx
        margin-top 20rpx
        text-align center
        color $bgcolor
</style>
