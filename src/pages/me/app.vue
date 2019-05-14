<template>
    <div class="container">
        <user-login></user-login>
        <year-progress></year-progress>
        <div class="content border-bottom border-top">
            <div class="scan">
                <scan-books></scan-books>
            </div>
            <div class="orders" v-show="userInfo.openId">
                <orders></orders>
            </div>
        </div>
        <!--<vuex-test></vuex-test>-->
    </div>
</template>
<script>
import yearProgress from './components/yearProgress'
import userLogin from './components/userLogin'
import scanBooks from './components/scanBooks'
import orders from './components/orders'
// import vuexTest from './components/vuexTest'
import {mapState} from 'vuex'
export default {
  name: 'booksIndex',
  data () {
    return {
      openId: ''
    }
  },
  computed: {
    ...mapState('login', ['userInfo'])
  },
  components: {
    yearProgress,
    userLogin,
    scanBooks,
    orders
    // vuexTest
  },
  onShow () {
    // this.openId = wx.getStorageSync('userInfo').openId
  },
  created () {
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  }
}
</script>

<style lang="stylus" scoped>
.container
    padding 0 30rpx
    columnCenter()
    .content
        display flex
        .scan
            width 40%
        .orders
            flex: 1

</style>
