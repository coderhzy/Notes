<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index)">
          <span class="text border-1px">
            <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="food-list food-list-hook" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="(food,index) in item.foods" class="food-item border-1px" :key="index">
                <div class="icon">
                  <img :src="food.icon" alt="" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥{{food.price}}</span><span v-show="food.oldPrice" class="old">¥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cartcontrol @add="_drop" :food="food"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '../shopcart/shopcart'
import cartcontrol from '../cartcontrol/cartcontrol'
import food from '../food/food'
const ERR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    // 首先遍历goods中可以拿到所有的good，在goo下面再遍历拿到所有的foods，在每个food下面则有food.count
    // 我们再对food.count进行判断，如果count>0，则使用push方法放到foods数组中，最终返回foodsds数组。
    // 这样foods数组中就有了所有count > 0的food，接着我们就可以在上方调用selectFoods,:select-foods="selectFoods"
    // 这样我们就可以将goods组件的数值和shopcart组件联动
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.goods = response.data
        this.$nextTick(() => {
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  methods: {
    selectMenu (index, event) {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    // 被选中的food
    selectFood (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      // 父组件使用子组件的方法,show置为true
      this.$refs.food.show()
    },
    // 访问shopcart子组件
    _drop (target) {
      // 体验优化，异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  components: {
    shopcart,
    cartcontrol,
    food
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 3.48rem
    bottom: .92rem
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 1.6rem
      width: 1.6rem
      background: #f3f5f7
      .menu-item
        display: table
        height: 1.08rem
        width: 1.12rem
        padding: 0 .24rem
        line-height: .28rem
        &.current
          position: relative
          z-index: 10
          margin-top: -0.02rem
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: .24rem
          height: .24rem
          margin-right: 0.02rem
          background-size: .24rem .24rem
          background-repeat: no-repeat

          &.decrease
            bg-image('decrease_3')

          &.discount
            bg-image('discount_3')

          &.guarantee
            bg-image('guarantee_3')

          &.invoice
            bg-image('invoice_3')

          &.special
            bg-image('special_3')
        .text
          display: table-cell
          font-size: .24rem
          vertical-align: middle
          border-1px(rgba(7,17,27,0.1))
          font-size: .24rem
    .foods-wrapper
      flex: 1
      .title
        padding-left: .28rem
        height: .52rem
        line-height: .52rem
        border-left: 2px solid #09dde1
        font-size: .24rem
        color: rgb(147,153,159)
        background-color: #f3f5f7
      .food-item
        display: flex
        margin: .36rem
        padding-bottom: .36rem
        border-1px(rgba(7,17,27,0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 1.14rem
          margin-right: .20rem
        .content
          flex: 1
          .name
            margin: .04rem 0 .16rem 0
            height: .28rem
            line-height: .28rem
            font-width: .28rem
            color: rgb(7,17,27)
          .desc,.extra
            line-height: .20rem
            font-size: .20rem
            color: rgb(147,153,159)
          .desc
            margin-bottom: .16rem
            line-height: .24rem
          .extra
            .count
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
            right: 0
            bottom: .24rem
</style>
