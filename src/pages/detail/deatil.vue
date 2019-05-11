<template>
    <div class="container">
        <div v-if="detailBook.title">
            <detail-header :detailBook="detailBook"></detail-header>
            <detail-content :detailBook="detailBook"></detail-content>
            <div class="title">评论<br>▼</div>
            <comments-list  :comments="getComment.data"></comments-list>
            <div v-show="show">
                <Comment
                        :detailBook="detailBook"
                        :getComment="getComment"
                        :bookId="bookId"
                ></Comment>
            </div>
            <foot :isbn="detailBook.isbn"
                  :flag="initialFlag"
                  :detailBook="detailBook"
            ></foot>
        </div>
    </div>
</template>

<script>
  import { request } from '@/util'
  import detailHeader from './components/detailHeader'
  import detailContent from './components/detailContent'
  import Comment from './components/Comment'
  import commentsList from './components/commentsList'
  import foot from './components/foot'
  import { mapMutations, mapState } from 'vuex'
  import * as type from '@/store/shoppingCart/type'
  export default {
    name: 'app',
    data () {
      return {
        detailBook: {},
        bookId: '',
        getComment: {},
        show: true,
        storyAgeOpenId: '',
        initialFlag: ''
      }
    },
    components: {
      detailHeader,
      detailContent,
      Comment,
      commentsList,
      foot
    },
    methods: {
      ...mapMutations('shoppingCart', {
        setPrice: type.SET_PRICE,
        setBookIsbn: type.SET_BOOK_ISBN,
        setOpenId: type.SET_OPEN_ID,
        resetCartData: type.RESET_CART_DATA
      }),
      async getComments () {
        const res = await request({
          url: '/weapp/commentlist',
          method: 'GET',
          data: {
            bookId: this.bookId
          }
        })
        this.getComment = res
        console.log(res)
      },
      async getIsCollect () {
        const res = await request({
          url: '/weapp/getIsCollect',
          method: 'GET',
          data: {
            isbn: this.detailBook.isbn,
            openId: this.storyAgeOpenId
          }
        })
        this.initialFlag = res.flag
        console.log(res)
      },
      async Show () {
        const arr = await this.getComment.data
        // console.log('arr是否存在', arr.length)
        if (arr.length) { // 如果存在评论
          arr.forEach((item, index) => {
            // console.log('遍历', item)
            // console.log('open_id', storyageOpenId, item.open_id)
            if (item.open_id === this.storyAgeOpenId) {
              this.show = false
              // console.log('有这个open_id,show:' + this.show)
            }
          })
        } else {
          this.show = true
        }
      },
      async getDetail () {
        const res = await request({
          url: '/weapp/detail',
          method: 'GET',
          data: {
            bookId: this.bookId
          }
        })
        // this.detailBook = res.data[0]
        this.detailBook = res.data
        this.setPrice(res.data.price)
        console.log(this.data)
        wx.setNavigationBarTitle({
          title: this.detailBook.title
        })
        // console.log(this.detailBook)
      }
    },
    computed: {
      ...mapState('shoppingCart', ['cartData'])
    },
    async onPullDownRefresh () {
      await this.getDetail()
      await this.getComments()
      await this.Show()
    },
    mounted () {
      console.log('page mounted')
      wx.showShareMenu({
        withShareTicket: true
      })
    },
    async onShow () {
      this.bookId = this.$root.$mp.query.id
      this.storyAgeOpenId = await wx.getStorageSync('userInfo').openId
      await this.getDetail()
      await this.getComments()
      await this.Show()
      await this.getIsCollect()
      await this.setOpenId(this.storyAgeOpenId)
      await this.setBookIsbn(this.detailBook.isbn)
    },
    onUnload () {
      console.log('退出')
      this.resetCartData()
    }
  }
</script>

<style lang="stylus" scoped>
    .container
        margin-bottom 90rpx
        .title
            margin-top 20rpx
            text-align center
            font-size 40rpx

</style>
