<template>
    <div class="container">
        <textarea class="comment"
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
                    <span class='text-primary'>{{local}}</span>
                </div>
                <div>手机型号：
                    <switch class="switch"
                            color= "#00bcd4"
                            :checked= "getPhone"
                            type="primary"
                            @change="getPhone"
                    /> <span class='text-primary'>{{phone}}</span>
                </div>
                <map id="myMap" show-location />
            </div>
            <button @click="Submit">发表</button>

        </div>
    </div>
</template>

<script>
  import {request, showModal} from '@/util'
  export default {
    name: 'Comment',
    props: ['detailBook', 'bookId'],
    data () {
      return {
        comment: '',
        mapCtx: '',
        local: '',
        phone: '',
        geo: {}
      }
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
        console.log(res)
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
        } else {
          showModal('发表失败', '未添加评论')
        }

        this.comment = ''
      },
      getGeo (e) {
        if (e.target.value) {
          this.getCenterLocation()
          this.moveToLocation()
        } else {
          // 没选中
          this.local = ''
        }
      },
      getPhone (e) {
        if (e.target.value) {
          wx.getSystemInfo({
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
                location: `116.480881,39.989410`,
                output: 'json'
              },
              success (r) {
                console.log('成功了')
                _this.local = r.data.regeocode.formatted_address
              }
            })
          }
        })
      },
      moveToLocation () {
        this.mapCtx.moveToLocation()
      }
    },
    mounted () {
      this.mapCtx = wx.createMapContext('myMap')
    },
    onShow () {
      this.mapCtx = wx.createMapContext('myMap')
      this.getComments()
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
        .comment
            width 98%
            margin 15rpx  auto
            background #eee
        #myMap
            width 98%
            margin 15rpx auto
        span
            color #aaa

</style>
