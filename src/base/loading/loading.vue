<template>
  <div class='loading'>
    <img src='./loading.gif' class='img' v-show='!complete'>
    <p class='disc' v-show='Comp'>{{disc}}</p>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    disc: String,
    complete: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      Comp: ''
    }
  },
  watch: {
    complete (newcomp) {
      setTimeout(() => {
        this.Comp = newcomp
      }, 300)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'
.loading
  text-align:center
  .img
    width:25px
    height:25px
  .disc
    color:$color-theme
    font-size:$font-size-small
</style>
