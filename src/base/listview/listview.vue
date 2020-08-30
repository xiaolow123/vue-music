<template>
  <div class='listview-wrapper'>
    <scroll :data='data'
            class='listview'
            ref='scroll'
            :probeType='probetype'
            @scrollend='scrollend'>
      <ul ref='list'>
        <li v-for='item in data' :key='item.title' ref='singer'>
          <p class='list-alpha'>{{item.title}}</p>
          <ul>
            <li @click='_routeto(item2)' v-for='item2 in item.items' :key="item2.avatar" class='list-singer'>
              <img :src='item2.avatar' class='singer-img'>
              <span class='singer-name'>{{item2.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class='alpha-wrapper'>
        <ul>
          <li v-for='(item , index) in alphalist'
              :key='index'
              ref='alpha'
              @touchstart='touchstart'
              @touchmove.prevent='touchmove'
              @touchend='touchend'
              @click='clickscroll(index)'
              :class='{gaoliang: index3 === index}'
              >
            {{item}}
          </li>
        </ul>
      </div>
    </scroll>
  </div>
</template>

<script>
import scroll from '@/base/scroll/scroll'
import { mapMutations } from 'vuex'
export default {
  name: 'listview',
  props: {
    data: {
      type: Array,
      default: new Array(2)
    }
  },
  components: {
    scroll
  },
  computed: {
    alphalist () {
      return this.data.map((item) => {
        return item.title.substr(0, 1)
      })
    }
  },
  data () {
    return {
      fisrtpageY: 0,
      offset: 0,
      nowpageY: 0,
      probetype: 2,
      index3: 0
    }
  },
  methods: {
    scrollend (y) {
      this.nowpageY = y
    },
    touchstart (event) {
      this.fisrtpageY = event.touches[0].pageY
    },
    touchmove (event) {
      let per = this.getper()
      this.offset = event.touches[0].pageY - this.fisrtpageY
      this.$refs.scroll.scrollto(per * this.offset + this.nowpageY)
    },
    touchend (event) {
    },
    _routeto (item) {
      this.$emit('select', item)
      this.SET_SINGER(item)
    },
    ...mapMutations(['SET_SINGER']),
    clickscroll (index) {
      let dom = this.$refs.singer[index]
      this.$refs.scroll.scrolltoel(dom)
    },
    getper () {
      let per = this.$refs.list.clientHeight / this.$refs.alpha.length / this.$refs.alpha[0].clientHeight
      return per
    }
  },
  watch: {
    nowpageY (newpageY) {
      let per = this.getper()
      let index = -Math.round(newpageY / per / this.$refs.alpha[0].clientHeight) - 1
      this.index3 = index
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'
.listview-wrapper
  height:100%
  width:100%
  .listview
    color:$color-text-ll
    font-size: $font-size-small
    position relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-alpha
      padding: 11px
      color: $color-text-l
      background: $color-highlight-background
    .list-singer
      margin:13px
      padding-bottom:9px
      .singer-img
        height:50px
        margin-right:9px
    .alpha-wrapper
      position:fixed
      right:0
      top:50%
      z-index:30
      color:$color-text-ll
      margin:auto 0
      transform:translateY(-50%)
.gaoliang
  color:$color-theme
</style>
