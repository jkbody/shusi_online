<template>
    <div class="container">
        <div v-show="show">
            <div>
                <div>
                    <div class="mapContent"
                    >
                        <div class="mapImg"
                             v-show="mapShow"
                        >
                            <div class="img">假地图</div>
                            <!--<img src="/static/img/map.jpg" alt="">-->
                        </div>
                        <div >
                            <map id="myMap"
                                v-show="!mapShow"
                                 show-location />
                        </div>
                    </div>
                    <div class="local">获取位置：
                        <switch class="switch"
                                color= "#00bcd4"
                                :checked= "getGeo"
                                type="primary"
                                @change="getGeo"
                        />
                        <span class='text-primary'>{{localName||'未知地点'}}</span>
                    </div>
                    <div>手机型号：
                        <switch class="switch"
                                color= "#00bcd4"
                                :checked= "getPhone"
                                type="primary"
                                @change="getPhone"
                        /> <span class='text-primary'>{{phone||'未知设备'}}</span>
                    </div>
                    <div class="textareaConent">
                        <div
                                class="textarea"
                                v-show="showArea"
                                @click="changeShowArea"
                        >
                            {{comment||'假输入框'}}
                        </div>
                        <textarea class="addcomment"
                                  @blur="changeShowArea"
                                  :auto-focus="true"
                                  :focus="true"
                                  :cursor-spacing="100+'px'"
                                  :confirm-type="'去死'"
                                  v-show="!showArea"
                                  v-model="comment"
                                  placeholder="请输入评论"
                        ></textarea>
                    </div>
                </div>
                <button @click="Submit" style="margin-top: 20px">发表</button>

            </div>
        </div>
        <!--<button @click="handleClick">测试</button>-->
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
        sclTop: 0,
        focus: false,
        showArea: true,
        show: true,
        mapShow: true,
        comment: '',
        mapCtx: '',
        local: '',
        phone: '',
        geo: {},
        getComment: '',
        localName: ''
      }
    },
    computed: {
    },
    methods: {
      changeShowArea () {
        this.showArea = !this.showArea
      },
      // blur () {
      //   this.showArea = true
      // },
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
          await this.getLocation()
          await this.moveToLocation()
          // console.log('this.getLocation()', this.getLocation())
          this.mapShow = false
        } else {
          // 没选中
          this.localName = ''
          this.mapShow = true
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
      async getLocationRequest () {
        const key = '0db2555377f5445e238500d65b57252f'
        let url = 'https://restapi.amap.com/v3/geocode/regeo?parameters'
        const _this = this
        wx.request({
          url,
          data: {
            key,
            // location: `116.480881,39.989410`,
            location: _this.local,
            output: 'json'
          },
          success (r) {
            // console.log('成功了')
            _this.localName = r.data.regeocode.formatted_address
          }
        })
      },
      async getLocation () {
        const _this = this
        let Timer = null
        console.log('1')
        // await _this.mapCtx.getCenterLocation({
        //   success (res) {
        //     _this.local = `${res.longitude},${res.latitude}`
        //     console.log('2', _this.local)
        //   }
        // })
        await _this.mapCtx.getCenterLocation({
          success (res) {
            _this.local = `${res.longitude},${res.latitude}`
            console.log('2', _this.local === '116.46,39.92')
            if (_this.local === '116.46,39.92') {
              Timer = setTimeout(() => {
              // setTimeout(() => {
                _this.mapCtx.getCenterLocation({
                  success (res) {
                    _this.local = `${res.longitude},${res.latitude}`
                    console.log('2.5', _this.local === '116.46,39.92')
                    if (_this.local === '116.46,39.92') {
                      _this.getLocationRequest()
                    } else {
                      console.log('第二次判断成功')
                      _this.getLocationRequest()
                    }
                  }
                })
              }
                , 500)
            } else {
              _this.getLocationRequest()
              clearTimeout(Timer)
            }
          }
        })
        await console.log('3', this.local)
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
    // onPageScroll (e) {
    //   this.sclTop = e
    //   // console.log(this.sclTop)
    // },
    onHide () {
      this.localName = ''
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
        .mapContent
            overflow hidden
            left 0
            height 0
            right 0
            padding-bottom 350rpx
            margin-bottom 20rpx
            .img
                padding 2%
                border 1rpx solid #ccc
                color #aaa
                border-radius 5rpx
                width 94%
                height 270rpx
                display block
                margin 0 auto
            #myMap
                width 98%
                margin 15rpx auto
        span
            color #aaa
        .textareaConent
            overflow hidden
            left 0
            height 0
            right 0
            padding-bottom 380rpx
            .comment
                padding 30rpx
                height 400rpx
            .textarea
                margin 5% 0
                height 300rpx
                width 95.4%
                padding 2%
                border 1px solid #ccc
                border-radius 5rpx
                color #aaa
</style>
