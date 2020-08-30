<template>
  <div class='Progress' @touchstart.prevent='handlestart'
                        @touchmove.prevent ='handlemove'
                        @touchend.prevent ='handleend'
                        @click.prevent='handleclick'
                  ref='progress'>
    <div class='progress-cur' ref='cur'></div>
  </div>
</template>

<script>
export default {
  name: 'progress-list',
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  computed: {
    progresswidth () {
      return this.$refs.progress.clientWidth
    }
  },
  data () {
    return {
      fpageX: '',
      nowpercent: 0,
      test: 0
    }
  },
  methods: {
    handlestart (e) {
      this.fpageX = e.touches[0].pageX
    },
    handlemove (e) {
      let nowpageX = e.touches[0].pageX - this.fpageX + this.progresswidth * this.percent
      this.nowpercent = nowpageX / this.progresswidth
    },
    handleend () {
      this.$emit('move', this.nowpercent)
    },
    handleclick (e) {
      this.test = e.offsetX
    }
  },
  watch: {
    percent (newp) {
      let num = (newp * 100).toFixed(1)
      this.$refs.cur.style.width = num + '%'
    },
    nowpercent (newp) {
      let num = (newp * 100).toFixed(1)
      this.$refs.cur.style.width = num + '%'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'
.Progress
  background-color:$color-highlight-background
  height:7px
  .progress-cur
    height:100%
    background-color:$color-theme
    width:0
</style>
