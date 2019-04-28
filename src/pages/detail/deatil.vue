<template>
    <div>
        <div>id:{{bookId}}</div>
        <!--<div @click="getTestID">点击获取id</div>-->
    </div>
</template>

<script>
  import { request } from '@/util'
  export default {
    name: 'app',
    data () {
      return {
        bookId: null
      }
    },
    methods: {
      async getDetail () {
        const res = await request({
          url: '/weapp/detail',
          method: 'GET',
          data: {
            bookId: this.bookId
          }
        })
        console.log(res)
      }
    },
    mounted () {
      this.bookId = this.$root.$mp.query.id
      this.getDetail()
    }
  }
</script>

<style lang="stylus" scoped>

</style>
