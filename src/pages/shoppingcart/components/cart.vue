<template>
<div>cart</div>
</template>

<script>
  export default {
    name: 'cart',
    beforeCreate () {
      console.log('cart beforeCreate')
    },
    created () {
      console.log('cart created')
    },
    onLoad () {
      console.log('cart onLoad')
    },
    onShow () {
      console.log('cart onShow')
    },
    onReady () {
      console.log('cart onReady')
    },
    beforeMount () {
      console.log('cart beforeMount')
    },
    mounted () {
      console.log('cart mounted')
    },
    beforeDestroy () {
      console.log('cart beforeDestroy')
    },
    destroyed () {
      console.log('cart destroyed')
    },
    onHide () {
      console.log('cart onHide')
    }
  }
</script>

<style lang="stylus" scoped>

</style>
