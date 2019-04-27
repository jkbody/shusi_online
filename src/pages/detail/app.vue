<template>
    <div>
        <!--<div>id:{{bookId}}</div>-->
        <div>id</div>
    </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        bookId: null
      }
    },
    mounted () {
      this.bookId = this.$root.$mp.query.id
    }
  }
</script>

<style lang="stylus" scoped>

</style>
