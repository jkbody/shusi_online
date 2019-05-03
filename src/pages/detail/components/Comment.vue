<template>
    <div class="container">
        <div class="title">评论</div>
        <div class="title">▼</div>
        <div v-for="item of getComment.data"
                 class="border-bottom"
                 :key="item"
            >
                <div class="headImg"><img
                        :src="item.user_info.image"
                        alt="">
                    <span>{{item.user_info.name}}</span>
                </div>
                <div class="comment">{{item.comment}}</div>
            </div>
        <div v-if="show">
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
    props: ['detailBook'],
    data () {
      return {
        bookId: '',
        comment: '',
        mapCtx: '',
        local: '',
        phone: '',
        geo: {},
        getComment: '',
        show: true
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
        console.log('data', this.getComment.data)
        console.log('getStorageSync', wx.getStorageSync('userInfo').openId)
        await this.getComments()
        await this.Show()
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
      },
      async Show () {
        const arr = await this.getComment.data
        const storyageOpenId = await wx.getStorageSync('userInfo').openId
        console.log('arr是否存在', arr.length)
        if (arr.length) { // 如果存在评论
          arr.forEach((item, index) => {
            console.log('遍历', item)
            // console.log('open_id', storyageOpenId, item.open_id)
            if (item.open_id === storyageOpenId) {
              console.log('有这个open_id')
              this.show = false
            }
          })
        } else {
          this.show = true
        }
      }
    },
    async mounted () {
      this.mapCtx = await wx.createMapContext('myMap')
      this.bookId = await this.$root.$mp.query.id
      await this.getComments()
      await this.Show()
    },
    async onShow () {
      this.mapCtx = await wx.createMapContext('myMap')
      this.bookId = await this.$root.$mp.query.id
      await this.getComments()
      await this.Show()
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
        .title
            text-align center
            font-size 40rpx
        .comment
            padding 30rpx
        .headImg
            height 40rpx
            line-height 40rpx
            vertical-align: middle
            margin-top 10rpx
            img
                border-radius 50%
                width 40rpx
                height 40rpx
</style>
