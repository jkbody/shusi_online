<template>
    <div>
        <div>shoppingcart</div>
        <Cart></Cart>
    </div>
</template>

<script>
  import Cart from './components/cart'
  // import {mapState} from ''
  export default {
    name: 'shoppingcart',
    components: {
      Cart
    },
    beforeCreate () {
      console.log('page beforeCreate')
    },
    created () {
      console.log('page created')
    },
    onLoad () {
      console.log('page onLoad')
    },
    onShow () {
      console.log('page onShow')
    },
    onReady () {
      console.log('page onReady')
    },
    beforeMount () {
      console.log('page beforeMount')
    },
    mounted () {
      console.log('page mounted')
    },
    beforeDestroy () {
      console.log('page beforeDestroy')
    },
    destroyed () {
      console.log('page destroyed')
    },
    onHide () {
      console.log('page onHide')
    }
  }
</script>

<style lang="stylus" scoped>

</style>
