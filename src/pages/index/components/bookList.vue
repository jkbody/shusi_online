<template>
    <!--<a :href="todetail">-->

    <div class="container">
        <div
         class="book"
         @click="toDetail"
         >
            <div class="bookImg">
                <img
                        :mode="aspectFit"
                        :src="book.image" alt="">
            </div>
            <div class="content">
                <div class="left">
                    <div class="title">{{book.title}}</div>
                    <div class="author">{{book.author}}</div>
                    <div>{{book.publisher}}</div>
                </div>
                <div class="right">
                    <div>{{book.rate}} <star :rate="book.rate"></star></div>
                    <div>浏览量:{{count}}</div>
                    <div>{{book.user_info.nickName}}</div>
                </div>
            </div>
        </div>
    </div>
    <!--</a>-->
</template>

<script>
  import star from '@/pages/public_components/star'
  export default {
    name: 'bookList',
    data () {
      return {
      }
    },
    props: {
      'book': Array,
      'count': {
        type: [Number, String],
        default: 0
      }
    },
    components: {
      star
    },
    methods: {
      toDetail () {
        wx.navigateTo({
          url: `/pages/detail/main?id=${this.book.id}`
        })
      }
    },
    computed: {
      todetail () { // 将id传过去
        // return `/page/detail/main?id=${this.book.id}`
        return `/pages/me/main`
      }
    },
    mounted () {
      // console.log(this.books)
    }
  }
</script>

<style lang="stylus" scoped>
    .container
        padding 2%
        overflow hidden
        font-size:30rpx
        .book
            display flex
            width 98%
            height 304rpx
            padding 2%
            overflow hidden
            a
                display block
                width 100%
                height 100%
            .bookImg
                overflow hidden
                width 23%
                height 0
                padding-bottom 40%
                img
                    width 100%
                    height 256rpx
            .content
                flex 1
                display flex
                .left
                    width 300rpx
                    min-width: 0
                    div
                        margin-top 20rpx
                        margin-left 20rpx
                        ellipsis()
                    .title
                        font-size 33rpx
                        font-weight 600
                .right
                    flex 1
                    text-align right
                    div
                        margin-top 20rpx
                        margin-right 20rpx
</style>
