<template>
<div class="container border-bottom">
    <div
            class="tag border-bottom"
        v-for="tag of detailBook.tags"
         :key="tag"
    >
        {{tag}}
    </div>
    <div>
        <p class="sum" :key="i" v-for="(sum, i) of detailBook.summary">{{sum}}</p>
    </div>
</div>
</template>

<script>
  export default {
    name: 'detailCeader',
    props: ['detailBook'],
    mounted () {
      // console.log(this.detailBook.summary)
    }
  }
</script>

<style lang="stylus" scoped>
.container
    font-size 30rpx
    padding 15rpx
    .tag
        display inline-block
        border 1rpx solid $bgcolor
        color $bgcolor
        margin 10rpx
        padding 10rpx
        border-radius 10rpx
    .sum
        text-indent:2em

</style>
