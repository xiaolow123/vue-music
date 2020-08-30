<template>
  <scroll class='rank-list' :data='normallist'>
    <ul class='item-wrapper'>
      <li v-for='(item, index) in normallist' :key='index' class='rank-item' @click='selectItem(item)'>
        <img :src='item.frontPicUrl' class='rank-img'>
        <div v-for='(item2, index2) in item.song' :key='index2' class='rank-text'>
          {{item2.title}}-{{item2.singerName}}
        </div>
      </li>
    </ul>
  </scroll>
</template>

<script>
import scroll from '@/base/scroll/scroll'
import {mapMutations} from 'vuex'
export default {
  name: 'ranklist',
  components: {
    scroll
  },
  props: {
    toplist: {
      type: Array
    }
  },
  data () {
    return {
      normallist: []
    }
  },
  methods: {
    ...mapMutations(['SET_RANK']),
    selectItem (item) {
      if (item) {
        let rank = {}
        this.$router.push({
          path: `/rank/${item.topId}`
        })
        rank.topid = item.topId
        rank.name = item.title
        rank.period = item.period
        this.SET_RANK(rank)
      }
    },
    _inittoplist () {
      let arr = []
      if (this.toplist.length !== 0) {
        this.toplist.forEach((item) => {
          if (item.toplist.length !== 0) {
            item.toplist.forEach((item2) => {
              arr.push(item2)
            })
          }
        })
      }
      this.normallist = arr
    }
  },
  watch: {
    toplist (newlist) {
      this._inittoplist()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'
.rank-list
  position:absolute
  left:0
  right:0
  bottom:0
  top:0
  overflow hidden
  .item-wrapper
    padding:20px
    .rank-item
      height:90px
      margin-bottom:20px
      background-color:$color-highlight-background
      .rank-img
        height:100%
        float:left
        margin-right:10px
      .rank-text
        padding:7.5px
        color:$color-text-l
        overflow:hidden
        text-overflow:ellipsis
        white-space:nowrap
</style>
