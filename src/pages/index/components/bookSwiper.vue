<template>
    <div class="swiper_wrap">
        <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
            <block v-for="(item, utlindex) in imgUrls" :key="utlindex">
                <swiper-item>
                    <image :src="book.image"
                           v-for="book in item"
                           :key="book.id"
                            @click="toDetail(book)"
                           class="slide-image"
                           :mode="aspectFill"/>
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
    margin-top 15rpx
    .slide-image
        width 30%
        height 250rpx
        margin 0 1.5%


</style>
