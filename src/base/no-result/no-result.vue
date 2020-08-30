<template>
  <div class='noresult'>
      <img src='./no-result@2x.png'>
      <p>抱歉，未找到相应结果</p>
  </div>
</template>

<script>
export default {
  name: 'noresult',
  props: {
    noresult: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'
.noresult
  color:$color-theme
  text-align :center
  position:relative
  top:-7px
  p
    margin:12px
</style>
