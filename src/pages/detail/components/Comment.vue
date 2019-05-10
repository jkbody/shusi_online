<template>
    <div class="container">
        <div v-show="show">
            <textarea class="addcomment"
                      v-model="comment"
                      placeholder="请输入评论"
            ></textarea>
            <div>
                <div>
                    <div class="local">获取位置：
                        <switch class="switch"
                                color= "#00bcd4"
                                :checked= "getGeo"
                                type="primary"
                                @change="getGeo"
                        />
                        <span class='text-primary'>{{local||'未知地点'}}</span>
                    </div>
                    <div>手机型号：
                        <switch class="switch"
                                color= "#00bcd4"
                                :checked= "getPhone"
                                type="primary"
                                @change="getPhone"
                        /> <span class='text-primary'>{{phone||'未知设备'}}</span>
                    </div>
                    <map id="myMap" show-location />
                </div>
                <button @click="Submit">发表</button>

            </div>
        </div>
        <button @click="handleClick">测试</button>
    </div>
</template>

<script>
  import {request, showModal} from '@/util'
  export default {
    name: 'Comment',
    props: ['detailBook', 'getComment', 'bookId'],
    components: {
    },
    data () {
      return {
        show: true,
        comment: '',
        mapCtx: '',
        local: '',
        phone: '',
        geo: {},
        getComment: ''
      }
    },
    computed: {
    },
    methods: {
      async getComments () {
        console.log('发', this.bookId)
        const res = await request({
          url: '/weapp/commentlist',
          method: 'GET',
          data: {
            bookId: this.bookId
          }
        })
        this.getComment = res
        // this.show = this.getComment.data.open_id
      },
      async handleClick () {
        console.log('show', this.show)
        console.log('getComment', this.getComment)
        console.log('detailBook', this.detailBook)
        console.log('data', this.getComment.data)
        console.log('getStorageSync', wx.getStorageSync('userInfo').openId)
        await this.getComments()
        // await this.Show()
        // const Arr
      },
      async Submit () {
        if (this.comment) {
          let data = {
            open_id: this.detailBook.open_id,
            book_id: this.bookId,
            comment: this.comment,
            location: this.local,
            phone: this.phone
          }
          console.log(data)
          const res = await request({
            method: 'POST',
            url: '/weapp/submitComment',
            data: data
          })
          console.log(res)
          this.show = false
        } else {
          showModal('发表失败', '未添加评论')
        }
        await this.getComments()
        await this.Show()
        this.comment = ''
      },
      async getGeo (e) {
        if (e.target.value) {
          await this.getCenterLocation()
          await this.moveToLocation()
        } else {
          // 没选中
          this.local = ''
        }
      },
      async getPhone (e) {
        if (e.target.value) {
          await wx.getSystemInfo({
            success: res => {
              this.phone = res.model
            }
          })
        } else {
          // 没选中
          this.phone = ''
        }
      },
      async getCenterLocation () {
        const _this = this
        const key = '0db2555377f5445e238500d65b57252f'
        let url = 'https://restapi.amap.com/v3/geocode/regeo?parameters'
        await this.mapCtx.getCenterLocation({
          success (res) {
            wx.request({
              url,
              data: {
                key,
                // location: `116.480881,39.989410`,
                location: `${res.longitude},${res.latitude}`,
                output: 'json'
              },
              success (r) {
                // console.log('成功了')
                _this.local = r.data.regeocode.formatted_address
              }
            })
            // console.log(res)
          }
        })
      },
      moveToLocation () {
        this.mapCtx.moveToLocation()
      }
    },
    async mounted () {
      // this.mapCtx = await wx.createMapContext('myMap')
      // this.bookId = await this.$root.$mp.query.id
      console.log(this.show)
    },
    async onShow () {
      this.mapCtx = await wx.createMapContext('myMap')
      // this.bookId = await this.$root.$mp.query.id
      console.log(this.show)
    },
    onHide () {
      this.local = ''
      this.phone = ''
    }
  }
</script>

<style lang="stylus" scoped>
    .container
        font-size 30rpx
        padding 2%
        .local
            width 98%
            height 0
            overflow hidden
            padding-bottom 15%

        .switch
            zoom .7
        .addcomment
            width 98%
            margin 15rpx  auto
            background #eee
        #myMap
            width 98%
            margin 15rpx auto
        span
            color #aaa
        .comment
            padding 30rpx
</style>
