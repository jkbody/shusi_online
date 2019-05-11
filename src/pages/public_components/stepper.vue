<template>
    <div class="stepper">
        <!-- 减号 -->
        <text @click="bindMinus"
              :class="minusStatus"
        >-</text>
        <!-- 数值 -->
        <input type="number" :value="cartData.count" />
        <!-- 加号 -->
        <text @click="bindPlus"
              :class="normal"
        >+</text>
    </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import * as type from '@/store/shoppingCart/type'
  export default {
    name: 'stepper',
    data () {
      return {
        num: 1,
        minusStatus: 'disabled'
      }
    },
    computed: {
      ...mapState('shoppingCart', ['cartData'])
    },
    methods: {
      ...mapMutations('shoppingCart', {
        add: type.SET_COUNT_ADD,
        minus: type.SET_COUNT_MINUS
      }),
      bindMinus () {
        // 如果只有1件了，就不允许再减了
        this.minusStatus = this.cartData.count <= 1 ? 'disabled' : 'normal'
        this.minus()
      },
      bindPlus: function () {
        this.minusStatus = 'normal'
        this.add()
      }
    }
  }
</script>

<style lang="stylus" scoped>
    /*stepper容器*/
    .stepper {
        border: 1px solid #ccc;
        border-radius: 10rpx;
        width: 140rpx;
        height: 42rpx;
        margin:0 auto;
        overflow hidden
        display flex
    }
    /*加号与减号*/
    .stepper text {
        width: 40rpx;
        height: 56rpx;
        line-height: 42rpx;
        font-size 30rpx
        text-align: center;
        float: left;
        color $bgcolor
    }
    /*数值*/
    .stepper input {
        float: left;
        margin: 0 auto;
        width: 60rpx;
        height: 56rpx;
        line-height: 30rpx;
        text-align: center;
        font-size: 25rpx;
        border-left: 1px solid #ccc;
        border-right: 1px solid #ccc;
    }
    /*普通样式*/
    .stepper .normal{
        color: $bgcolor
    }

    /*禁用样式*/
    .stepper .disabled{
        color: #ccc;
    }
</style>
