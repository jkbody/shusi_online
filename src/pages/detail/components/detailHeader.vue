<template>
<div class="container border-bottom">
    <div class="bg_img_wrap">
        <img :src="detailBook.image" alt="">
    </div>
    <div class="img_wrap">
        <img   :src="detailBook.image"
               :mode="aspectFit"
               alt="">
        <div class="title">{{detailBook.author}} ◆ {{detailBook.title}}</div>
    </div>
    <div class="text">
        <div class="textContent">
            <div class="left"
            ><img :src="detailBook.user_info.image"
                            mode="aspectFit"
                        alt=""> {{detailBook.user_info.name}}</div>
            <div class="right">{{detailBook.rate}} <star :rate="detailBook.rate"></star></div>
        </div>
        <div class="textContent">
            <div class="left">{{detailBook.publisher}}</div>
            <div class="right">¥{{detailBook.price}}</div>
        </div>
    </div>
</div>
</template>

<script>
  import star from '@/pages/public_components/star'
  export default {
    name: 'detailHeader',
    props: ['detailBook'],
    components: {
      star
    },
    mounted () {
      // console.log(this.detailBook.user_info.name)
    }
  }
</script>

<style lang="stylus" scoped>
.container
    /*padding 2rpx*/
    width 100%
    position relative
    margin-bottom 70rpx
    .bg_img_wrap
        width 100%
        height 0
        padding-bottom 70%
        overflow hidden
        img
            width 100%
            filter blur(15px)
            opacity .9
    .img_wrap
        position absolute
        top 0
        width 100%
        height 0
        padding-bottom 70%
        overflow hidden
        img
            margin 40rpx auto 10rpx
            width 33%
            height 380rpx
            display block
        .title
            font-size 30rpx
            text-align center
            font-weight 600
    .text
        font-size 30rpx
        font-weight 600
        padding 15rpx
        .textContent
            margin-top 10rpx
            display flex
            align-items baseline
            .right
                flex 1
                text-align right
            .left
                text-align left
                img
                    border-radius 50%
                    width 40rpx
                    height 40rpx
</style>
