<template>
    <div class="swiper_wrap border-bottom">
        <swiper class="swiper"
                :indicator-dots="indicatorDots"
                :autoplay="autoplay"
                :interval="interval"
                :duration="duration"
                indicator-color="#00bcd4"
        >
            <block v-for="(item, utlindex) in imgUrls" :key="utlindex">
                <swiper-item>
                    <img :src="book.image"
                           v-for="book in item"
                           :key="book.id"
                            @click="toDetail(book)"
                           class="slide-image"
                           mode="aspectFill"/>
                </swiper-item>
            </block>
        </swiper>
    </div>
</template>

<script>
  export default {
    name: 'bookSwiper',
    props: {
      topBooks: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        indicatorDots: true,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        books: [],
        tsetpages: []
      }
    },
    methods: {
      test () {
        this.books = this.imgUrls
        console.log(this.books)
      },
      toDetail (book) {
        wx.navigateTo({
          url: `/pages/detail/main?id=${book.id}`
        })
      }
    },
    computed: {
      imgUrls () {
        const pages = []
        this.topBooks.forEach((item, index) => {
          const page = Math.floor(index / 3)
          if (!pages[page]) {
            pages[page] = []
          }
          pages[page].push(item)
        })
        return pages
      }
    },
    mounted () {
      // console.log(this.topBooks)
    }
  }
</script>

<style lang="stylus" scoped>
.swiper_wrap
    margin-top 10rpx
    height 420rpx
    .swiper
        height 400rpx
        .slide-image
            margin-left  1.5%
            width 31.33%
            height 400rpx



</style>
