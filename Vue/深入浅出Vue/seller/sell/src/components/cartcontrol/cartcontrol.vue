<template>
    <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
          <span class="iconfont inner">&#xe618;</span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>

      <div class="cart-add iconfont" @click.stop.prevent="addCart">&#xe617;</div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    // 加号点击事件，在原型上添加，foodsScroll引入地方将click设置为true
    addCart (event) {
      if (!event._constructed) {
        return
      }
      // 这里定一个方法，用Vue.set给food.count来赋值，对应标签使用V-show来与food.count联动
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      // 派发事件，vue2.0废除了dispatch，采用$emit
      this.$emit('add', event.target)
    },
    // 减号点击事件，在原型上添加，foodsScroll引入地方将click设置为true
    decreaseCart (event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: .12rem
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        font-size: .48rem
        line-height: .48rem
        color: rgb(0,160,220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: .24rem
      padding-top: .12rem
      line-height: .48rem
      text-align: center
      font-size: .20rem
      color: rgb(147,153,159)
    .cart-add
      display: inline-block
      padding: 0.12rem
      font-size: .48rem
      line-height: .48rem
      color: rgb(0,160,220)
</style>
