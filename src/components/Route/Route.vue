<template>
  <div class='route'>
    <router-link class='route-item' to='/recommend'>
    <span>推荐</span></router-link>
    <router-link class='route-item' to='/singer'>
    <span>歌手</span></router-link>
    <router-link class='route-item' to='/rank'>
    <span>排行</span></router-link>
    <router-link class='route-item' to='/search'>
    <span>搜索</span></router-link>
  </div>
</template>

<script>
export default {
  name: 'route'
}
</script>
<style lang='stylus' scoped>
@import '~@/common/stylus/variable'
.route
  display:flex
  font-size:$font-size-medium
  margin-top:7px
  align-items:center
  .route-item
    flex:1 0 25%
    text-align:center
    color:$color-text-l
    padding-bottom: 7px
    display:inline
    span
      padding-bottom:5px
    &.router-link-active
      span
        color:$color-theme
        border-bottom:2px solid $color-theme
</style>
