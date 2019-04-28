<template>
    <div>
        <book-list
                v-for="book of books"
                :book="book"
                :bookId="book.id"
                :key="book.id"
        ></book-list>
        <div class="footer"
             v-if="end"
        >已经到底了</div>
    </div>
</template>
<script>
// import { request, showToast } from '@/util'
import { request } from '@/util'
import bookList from './components/bookList'

export default {
  name: 'booksIndex',
  components: {
    bookList
  },
  data () {
    return {
      books: [],
      page: 0,
      end: false
    }
  },
  methods: {
    async getBook (flag) { // 获取数据 flag 下拉是true 上啦是false
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
          page: this.page
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
    this.getBook(true)
  },
  onReachBottom () {
    if (this.end) {
      return false
    } else {
      this.page += 1
      this.getBook(false)
    }
  },
  mounted () {
    this.getBook(true)
  }
}
</script>

<style lang="stylus" scoped>
    .footer
        text-align center
        margin-bottom 20rpx
</style>
