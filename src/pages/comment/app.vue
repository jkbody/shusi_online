<template>
    <div>
        <div>我添加的书</div>
        <div>我的评论</div>
    </div>
</template>
<script>
  import {request} from '@/util'
  export default {
    name: 'booksIndex',
    data () {
      return {
        openId: ''
      }
    },
    async mounted () {
      this.openId = await wx.getStorageSync('userInfo').openId
      const res = await request({
        method: 'GET',
        url: '/weapp/commentlist',
        data: {
          openId: this.openId
        }
      })
      console.log(res)
    }
  }
</script>

<style scoped>

</style>
