<template>
  <div class='music-list'>
    <div class='bgimage-wrapper' ref='bgimage'>
      <div class='iconfont back' @click='back'>&#xe610;</div>
      <div class='singername'>{{this.name}}</div>
    </div>
    <div class='layer' ref='layer'></div>
    <scroll :data='songs'
            class='songs-wrapper'
            ref='wrapper'
            :listenScroll='listenscroll'
            :probeType='probetype'
            @scroll='scroll'>
        <songlist :songs='songs' @select='selectitem' :ifrank='ifrank'></songlist>
    </scroll>
  </div>
</template>

<script>
import songlist from '@/base/songlist/songlist'
import scroll from '@/base/scroll/scroll'
import { mapMutations } from 'vuex'
export default {
  name: 'music-list',
  data () {
    return {
      listenscroll: true,
      probetype: 2,
      posy: 0
    }
  },
  props: {
    bgimage: {
      type: String
    },
    songs: {
      type: Array
    },
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    scroll (pos) {
      this.posy = pos.y
    },
    back () {
      this.$router.go(-1)
    },
    _attainimg () {
      this.$refs.bgimage.style.backgroundImage = `url(${this.Bgimage})`
    },
    _initscroll (posy) {
      // 通过ref获取的元素如果是个组件得再用$el才能获取其dom元素
      // 注意top后边的px
      let wrapper = this.$refs.wrapper
      let layer = this.$refs.layer
      if (this.$refs.bgimage.clientHeight + posy > 35) {
        layer.style.top = this.$refs.bgimage.clientHeight + posy + 'px'
        wrapper.$el.style.top = this.$refs.bgimage.clientHeight + 'px'
        wrapper.$el.style.overflow = 'visible'
      } else {
        wrapper.$el.style.overflow = 'hidden'
        wrapper.$el.style.top = 35 + 'px'
      }
      wrapper.refresh()
    },
    selectitem (item, index) {
      this.SET_FULL_SCREEN(true)
      this.SET_PLAYLIST(this.songs)
      this.SET_CURRENT_INDEX(index)
      this.SET_SEQUENCELIST(this.songs)
      this.SET_MODE(0)
    },
    ...mapMutations(['SET_FULL_SCREEN', 'SET_PLAYLIST', 'SET_CURRENT_INDEX', 'SET_SEQUENCELIST', 'SET_MODE'])
  },
  mounted () {
    this._attainimg()
    this._initscroll(0)
  },
  components: {
    songlist,
    scroll
  },
  computed: {
    Bgimage () {
      return this.bgimage
    },
    ifrank () {
      return this.name.indexOf('榜') !== -1
    }
  },
  watch: {
    bgimage () {
      this._attainimg()
    },
    posy (newposy) {
      this._initscroll(newposy)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'
.music-list
  position:fixed
  left:0
  right:0
  bottom:0
  top:0
  width:100%
  z-index:100
  .bgimage-wrapper
    position: relative
    width: 100%
    height: 0
    padding-top: 70%
    background-size: cover
    .back
      color:$color-theme
      position:absolute
      top:5px
      left:5px
      font-size:26px
    .singername
      position:absolute
      top:0
      left:50%
      color:$color-text
      text-align:center
      transform:translate(-50%)
      line-height:2.5
  .layer
    position: absolute
    top: 0
    bottom: 0
    width: 100%
    background: $color-background
  .songs-wrapper
    position: absolute
    top: 0
    bottom: 0
    width: 100%
    font-size:$font-size-medium
    background-color:$color-background
</style>
