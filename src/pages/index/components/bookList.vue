<template>
    <!--<a :href="getUrl">-->
    <div class="container">
        <div v-for="book of books"
         class="book"
         :key="book.id">
            <!--<a :href="'/page/detail/main?id='+{book.id}">-->
                <!--<a :href="getUrl">-->
                <div class="bookImg">
                    <img
                            mode="aspectFit"
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
                        <div>浏览量:</div>
                        <div>{{book.user_info.nickName}}</div>
                    </div>
                </div>
            <!--</a>-->
        </div>
        <a :href="getUrl">测试跳转</a>
    </div>
    <!--</a>-->
</template>

<script>
  import star from './compontents/star'
  export default {
    name: 'bookList',
    data () {
      return {
      }
    },
    props: {
      'books': Array
    },
    components: {
      star
    },
    computed: {
      getUrl () { // 将id传过去
        // return `/page/detail/main?id=${this.book.id}`
        return `/pages/detail/main`
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
