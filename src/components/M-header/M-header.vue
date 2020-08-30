<template>
  <div class="header">
    <div class='icon'></div>
    <div class='text'>Chicken Music</div>
  </div>
</template>

<script>
export default {
  name: 'recommend'
}
</script>

<style lang='stylus' scoped>
@import '~@/common/stylus/variable'
@import '~@/common/stylus/mixin'
.header
  margin:auto
  text-align:center
  .icon
    bg-image('logo')
    width:30px
    height:32px
    background-size:30px 32px
    display:inline-block
    margin:7px
  .text
    color:$color-theme
    display:inline-block
    font-size:$font-size-large
    line-height:44px
    vertical-align:top
</style>
