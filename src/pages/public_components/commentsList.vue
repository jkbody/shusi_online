<template>
    <div class="container">
        <div v-for="item of comments"
             class="border-bottom"
             :key="item"
             @click="toDetail(item.book_id)"
        >
            <div class="headImg"><img
                    :src="item.user_info.image"
                    alt="">
                <span>{{item.user_info.name}}</span>
            </div>
            <div class="comment">{{item.comment}}</div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'commentsList',
    props: {
      'comments': {
        type: Array,
        default: []
      }
    },
    methods: {
      toDetail (bookId) {
        wx.navigateTo({
          url: `/pages/detail/main?id=${bookId}`
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .container
        font-size 30rpx
        padding 2%
        .title
            text-align center
            font-size 40rpx
        .comment
            padding 30rpx
        .headImg
            height 40rpx
            line-height 40rpx
            vertical-align: middle
            margin-top 10rpx
            span
                color #aaa
            img
                border-radius 50%
                width 40rpx
                height 40rpx
</style>
