<template>
    <div class="container">
        <div v-show="hide">
            <div v-show="paidFlag">
                <paid></paid>
            </div>
            <div v-show="!paidFlag"
            >
                <unpaid @countHide="contentHide"></unpaid>
            </div>
        </div>
        <div class="option"
             v-show="!hide"
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
  import paid from './components/paid'
  import unpaid from './components/unpaid'
  import {request, showModal} from '@/util'
  import { mapMutations, mapGetters } from 'vuex'
  import * as type from '@/store/orders/orderTypes'
  export default {
    name: 'orders',
    data () {
      return {
        paidFlag: null,
        hide: true
      }
    },
    components: {
      paid,
      unpaid
    },
    computed: {
      ...mapGetters('orders', ['getTureId'])
    },
    methods: {
      ...mapMutations('orders', {
        setOrders: type.SET_ORDERS,
        removeOrders: type.REMOVE_FLAG_TRUE_CART
      }),
      contentHide () {
        console.log('hide', this.hide)
        this.hide = false
      },
      async isSuccess () {
        const openId = await wx.getStorageSync('userInfo').openId
        const id = await this.getTureId
        const res = await request({
          method: 'POST',
          url: '/weapp/upOrders',
          data: {
            idArr: id,
            openId
          }
        })
        console.log(res)
        this.removeOrders()
        this.hide = true // 取消订单遮罩
      },
      async isFailed () {
        this.hide = true // 取消订单遮罩
        showModal('支付失败', '请在未完成订单里面查看')
      },
      async getOrders () {
        const res = await request({
          method: 'GET',
          url: '/weapp/getOrders',
          data: {
            pay: this.paidFlag,
            openId: this.openId
          }
        })
        // console.log(res.data.data)
        await this.setOrders(res.data.data)
      }
    },
    async onLoad () {
      this.paidFlag = await parseInt(this.$root.$mp.query.pay)
      this.openId = await wx.getStorageSync('userInfo').openId
      await this.getOrders()
    }
  }
</script>
<style lang="stylus" scoped>
    button
        width 100%
        margin-top 50rpx
</style>
