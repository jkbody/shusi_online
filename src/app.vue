<script>
// import {request} from './util'
export default {
  name: 'app',
  async created () {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
}
</script>

<style lang="stylus" type="text/stylus" ref="stylesheet/stylus" scoped>
@import "styles/stylus/variables.styl"

</style>
