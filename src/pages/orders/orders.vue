<template>
    <div class="container">
        <div v-if="paidFlag">
            <paid></paid>
        </div>
        <div>
            <unpaid v-if="!paidFlag"></unpaid>
        </div>
    </div>
</template>

<script>
  import paid from './components/paid'
  import unpaid from './components/unpaid'
  export default {
    name: 'orders',
    data () {
      return {
        paidFlag: ''
      }
    },
    components: {
      paid,
      unpaid
    },
    async onLoad () {
      this.paidFlag = await parseInt(this.$root.$mp.query.pay)
    }
  }
</script>

<style lang="stylus" scoped>
</style>
