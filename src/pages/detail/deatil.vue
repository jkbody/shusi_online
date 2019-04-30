<template>
    <div>
        <detail-header :detailBook="detailBook"></detail-header>
        <detail-content :detailBook="detailBook"></detail-content>
    </div>
</template>

<script>
  import { request } from '@/util'
  import detailHeader from './components/detailHeader'
  import detailContent from './components/detailContent'
  export default {
    name: 'app',
    data () {
      return {
        detailBook: {}
      }
    },
    components: {
      detailHeader,
      detailContent
    },
    methods: {
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
        wx.setNavigationBarTitle({
          title: this.detailBook.title
        })
        // console.log(this.detailBook)
      }
    },
    mounted () {
      wx.showShareMenu({
        withShareTicket: true
      })
    },
    onShow () {
      this.bookId = this.$root.$mp.query.id
      this.getDetail()
    }
  }
</script>

<style lang="stylus" scoped>

</style>
