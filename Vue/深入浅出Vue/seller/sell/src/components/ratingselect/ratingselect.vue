<template>
    <div class="ratingselect">
      <div class="rating-type">
        <span>{{desc.all}}</span>
        <span>{{desc.positive}}</span>
        <span>{{desc.negative}}</span>
      </div>
      <div class="switch">
        <span class="icon-check_circle"></span>
        <span class="text">只看内容的评价</span>
      </div>
    </div>
</template>

<script>
// const POSITIVE = 0
// const NEAGTIVE = 1
const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectype: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
