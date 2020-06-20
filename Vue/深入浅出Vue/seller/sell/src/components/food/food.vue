<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="foodcontent">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="iconfont back-iconfont">&#xe600;</i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">¥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food" class="buyfood"></cartcontrol>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">
              加入购物车
            </div>
          </transition>
        </div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品信息</h1>
        <p class="text">{{food.info}}</p>
      </div>
    </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect></ratingselect>
      </div>
  </transition>
</template>

<script>
import BScroll from 'better-scroll'
import Vue from 'vue'
import cartcontrol from '../cartcontrol/cartcontrol'
import split from '../split/split'
import ratingselect from '../ratingselect/ratingselect'
export default {
  props: {
    food: {
      type: Object
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  methods: {
    // 展示goods
    show () {
      this.showFlag = true
      // BScroll
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      })
    },
    hide () {
      this.showFlag = false
    },
    // 添加第一个商品，标签绑定点击事件
    addFirst (event) {
      // 多次点击
      if (!event._constructored) {
        return
      }
      // 派发事件
      this.$emit('add', event.target)
      Vue.set(this.food, 'count', 1)
    }
  },
  components: {
    cartcontrol,
    split,
    ratingselect
  }
}
</script>

<style lang="stylus" scoped>
  .food
    position: fixed
    left: 0
    top: 0
    bottom: .96rem
    z-index: 30
    width: 100%
    background: #ffffff
    transform: translate3d(0,0,0)
    &.move-enter-active,&.move-leave-active
      transition: all 0.2s linear
    &.move-enter,&.move-leave
      transform: translate3d(0,100%,0)
    .image-header
      position: relative
      width: 100%
      height: 0
      /* padding-top，上下padding值与宽高相等 */
      padding-top: 100%
      /* 图片撑开盒子 */
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 0.20rem
        left: 0
        .back-iconfont
          display: block
          padding: .20rem
          font-size: .40rem
          color: #ffffff

    .content
      position: relative
      padding: .36rem
      .title
        line-height: .28rem
        margin-bottom: .16rem
        font-size: .28rem
        font-weight: 700
        color: rgb(7,17,27)
      .detail
        margin-bottom: .36rem
        height: .20rem
        line-height: .20rem
        font-size: 0
        .sell-count,.rating
          font-size: .20rem
          color: rbg(147,153,159)
        .sell-count
          margin-right: .24rem
      .price
          font-weight: 700
          line-height: .48rem
        .now
          margin-right: .16rem
          font-size: .28rem
          color: rgb(240,20,20)
        .old
          text-decoration: line-through
          font-size: .20rem
          color: rgb(147,153,159)
      .cartcontrol-wrapper
        position: absolute
        right: .24rem
        bottom: .24rem
      .buy
        position: absolute
        right: .36rem
        bottom: .36rem
        z-index: 10
        height: .48rem
        line-height: .48rem
        padding: 0 .24rem
        box-sizing: border-box
        border-radius: .24rem
        font-size: .20rem
        color: #fff
        background: rgb(0,160,220)
        opacity: 1
        &.fade-enter-active,&.fade-leave-active
          transition: all 0.2s
        &.fade-enter,&.fade-leave
          opacity: 0
          z-index: -1
    .info
      padding: .36rem
      .title
        line-height: .28rem
        margin-bottom: .12rem
        font-size: .28rem
        color: rbg(7,17,27)
      .text
        line-height: .48rem
        padding: 0 .16rem
        font-size: rgb(77,85,93)

</style>
