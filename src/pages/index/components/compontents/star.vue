<template>
    <div class="container">
        <span>☆☆☆☆☆</span>
        <div class="hollow"
             :style="getWidth"
        >★★★★★</div>
    </div>
</template>

<script>
  export default {
    name: 'rate',
    props: {
      rate: {
        type: [Number, String],
        default: 0
      }
    },
    computed: {
      getWidth () {
        // 不知道什么这里1em不是一个字符，0.8em 是一个字符
        return `width:${this.rate * 0.8 / 2}em`
      }
    }
  }
</script>

<style lang="stylus" scoped>
.container
    position relative
    display inline-block
    color $bgcolor
    overflow hidden
    text-align left
    .hollow
        position absolute
        overflow hidden
        display inline-block
        top 0
        left 0
        width 0
</style>
