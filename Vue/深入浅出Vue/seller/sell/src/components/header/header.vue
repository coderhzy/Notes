<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <div class="iconfont" style="display: inline-block">&#xe61d;</div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="supports-item" v-for="(item,index) in seller.supports" :key="item.score">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <div class="iconfont cross-icon" style="display: inline-block">&#xe615;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../../components/star/star'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail () {
      this.detailShow = true
    },
    hideDetail () {
      this.detailShow = false
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    star
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .header
    position: relative
    overflow: hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)

    .content-wrapper
      position: relative
      padding: .48rem .24rem .36rem .48rem

      .avatar
        display: inline-block
        vertical-align: top

        img
          border-radius: .04rem

      .content
        display: inline-block
        margin-left: .32rem

        .title
          margin: 0 0 .16rem 0

          .brand
            display: inline-block
            vertical-align: top
            width: .60rem
            height: .36rem
            bg-image('brand')
            background-size: .60rem .36rem
            background-repeat: no-repeat

            .name
              margin-left: .12rem
              font-szie: .32rem
              line-height: 18px
              font-weight: blod

        .description
          margin-bottom: .20rem
          line-height: .24rem
          font-size: .24rem

        .support
          font-size: 0

          .icon
            display: inline-block
            vertical-align: top
            width: .24rem
            height: .24rem
            margin-right: 4px
            background-size: .24rem .24rem
            background-repeat: no-repeat

            &.decrease
              bg-image('decrease_1')

            &.discount
              bg-image('discount_1')

            &.guarantee
              bg-image('guarantee_1')

            &.invoice
              bg-image('invoice_1')

            &.special
              bg-image('special_1')

          .text
            line-height: .24rem
            font-size: .20rem

      .support-count
        position: absolute
        right: .24rem
        bottom: .36rem
        padding: 0 .16rem
        height: .48rem
        line-height: .48rem
        border-radius: .28rem
        background-color: rbga(0, 0, 0, 0.2)
        text-align: center
        border: 1px solid;

        .count
          font-size: .20rem

    .bulletin-wrapper
      position: relative
      height: .56rem
      line-height: .56rem
      padding: 0 .44rem 0 .44rem
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7, 17, 27, 0.2)

      .bulletin-title
        display: inline-block
        vertical-align: top
        margin-top: .16rem
        width: .44rem
        height: .24rem
        bg-image('bulletin')
        background-size: .44rem .24rem
        background-repeat: no-repeat

      .bulletin-text
        vertical-align: top
        font-size: .20rem
        margin: 0 .08rem

      .icon-keyboard_arrow_right
        position: absolute

    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(0.20rem)

    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7, 17, 27, 0.8)
      transition: all 0.5s
      backdrop-filter: blur(0.10rem)
      &.fade-transition
        opacity: 1
        background: rgba(7, 17, 27, 0.8)
      &.fade-enter,&fade-leave
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        min-height: 100%
        width: 100%
        .detail-main
          margin-top: 1.2rem
          padding-bottom: 1.28rem
          .name
            line-height: .32rem
            text-align: center
            font-size: .32rem
            font-weight: 700
          .star-wrapper
            margin-top: .36rem
            padding: .02rem 0
            text-align: center
          .title
            width: 80%
            margin: .56rem auto 24px auto
            display: flex
            .line
              flex: 1
              position: relative
              top: -0.12rem
              border-bottom: .02rem solid rgba(255,255,255,0.2)
            .text
              padding:0 .24rem
              font-weight: 700
              font-size: .28rem
          .supports
              width: 80%
              margin: 0 auto
              .supports-item
                padding: 0 .24rem
                margin-bottom: .24rem
                font-size: 0
                &:last-child
                  margin-bottom: 0
                .icon
                  display: inline-block
                  width: .32rem
                  height: .32rem
                  vertical-align: top
                  margin-right: .12rem
                  background-size: .32rem .32rem
                  background-repeat: no-repeat

                  &.decrease
                    bg-image('decrease_1')
                  &.discount
                    bg-image('discount_1')
                  &.guarantee
                    bg-image('guarantee_1')
                  &.invoice
                    bg-image('invoice_1')
                  &.special
                    bg-image('special_1')

                .text
                  line-height:.24rem
                  font-size: .12rem
          .bulletin
              width: 80%
              margin: 0 auto
            .content
              padding:0 .24rem
              line-height: .48rem
              font-size: .24rem
      .detail-close
        width: .64rem
        height: .64rem
        margin: -1.28rem auto to auto
        clear: both
        font-size: .64rem
        .cross-icon
          padding-bottom: .56rem
          margin-left: 3.75rem
          font-size: .50rem

</style>
