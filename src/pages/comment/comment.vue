<!--suppress ALL -->
<template>
    <div class="container">
        <div v-if="openId">
            <div>
                <div class="title">我上传的书</div>
                <div class="title border-bottom">▼</div>
                <div v-if="!books.length" class="none">没有上传书</div>
                <book-list
                        v-for="book of books"
                        :book="book"
                        :bookId="book.id"
                        :count="book.count"
                        :key="book.id"
                ></book-list>
            </div>
            <div class="title border-bottom">评论<br>▼</div>
            <comments-list
                    :comments="getComment.data"
            ></comments-list>
            <div class="none">没有更多评论</div>
        </div>
        <div v-show="!openId">
            <div class="login">请登录</div>
        </div>
        <!--<button @click="cc">test</button>-->
    </div>
</template>
<script>
  import {request} from '@/util'
  import commentsList from '@/pages/public_components/commentsList'
  import bookList from '@/pages/public_components/bookList'
  export default {
    name: 'booksIndex',
    components: {
      commentsList,
      bookList
    },
    data () {
      return {
        show: false,
        openId: '',
        getComment: {},
        books: [],
        page: 0,
        end: false
      }
    },
    computed: {
    },
    methods: {
      cc () {
        console.log(this.getComment.data.length)
      },
      async getallcomment () {
        const res = await request({
          method: 'GET',
          url: '/weapp/commentlist',
          data: {
            openId: this.openId
          }
        })
        // console.log(res)
        this.getComment = res
      },
      async getallbooks (flag) { // 获取数据 flag 下拉是true 上啦是false
        if (flag) { // 刷新复位
          this.page = 0
          this.end = false
        }
        // 显示加载
        // showToast('loading...')
        wx.showNavigationBarLoading()
        const res = await request({ // 发送请求是提交页码数据
          method: 'GET',
          url: '/weapp/getbook',
          data: {
            page: this.page,
            openId: this.openId
          }
        })
        if (flag) { // 下拉时取得books
          this.books = res.books
        } else { // 上拉时取得books
          this.books = this.books.concat(res.books)
          if (res.books.length < 10) { // 当取得的数小于10个的时候，end 结束
            this.end = true
          }
        }
        // console.log(res.books)
        // 请求完成停止下拉 和 加载弹窗
        wx.stopPullDownRefresh()
        wx.hideNavigationBarLoading()
        // wx.hideToast()
      }
    },
    onPullDownRefresh () {
      // showToast('loading....')
      this.getallbooks(true)
    },
    onReachBottom () {
      if (this.end) {
        return false
      } else {
        this.page += 1
        this.getallbooks(false)
      }
    },
    async onShow () {
      this.openId = await wx.getStorageSync('userInfo').openId
      await this.getallcomment()
      await this.getallbooks(true)
    }
  }
</script>

<style lang="stylus" scoped>
    .container
        .title
            color #aaa
            text-align center
            font-size 30rpx
        .login
            text-align center
            margin-top 50%
            color #ccc
            font-size 40rpx
        .none
            color #aaa
            font-size 30rpx
            text-align center
</style>
