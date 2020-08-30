<template>
  <scroll class='suggest'
          :data='suggestarray'
          @refresh='refresh'
          :pullup='true'
          ref='scroll'>
    <ul class='suggest-wrapper'>
      <li v-show='ifsinger' class='suggest-singer' @click='gotosinger'>
        <img :src='singer.avatar' class='singer-img'>
        <div>
          <p class='singer-desc'>歌手:{{singer.singername}}</p>
          <p class='singer-desc'>歌曲:{{zhida.songnum}} 专辑:{{zhida.albumnum}}</p>
        </div>
      </li>
      <li v-for='(item, index) in suggestarray' :key='index' class='suggest-item' @click='_initsong(item)'>
        {{item.songname}}-
        <span v-for='(item2,index2) in item.singer' :key='index2'>
          {{(index2 === (item.singer.length-1)) ? item2.name : (item2.name + '/')}}
        </span>
      </li>
      <loading v-show='ifrefresh' class='loading'></loading>
      <loading v-show='complete' class='loading' disc='没有更多了...' :complete='complete'></loading>
    </ul>
  </scroll>
</template>

<script>
import scroll from '@/base/scroll/scroll'
import {mapActions, mapMutations} from 'vuex'
import {createSuggestSong} from '@/common/js/song'
import {getSongsUrl} from '@/api/singer'
import Singer from '@/common/js/singer'
import loading from '@/base/loading/loading.vue'
export default {
  name: 'suggest',
  props: {
    suggest: Array,
    zhida: Object,
    complete: Boolean,
    noresult: Boolean
  },
  data () {
    return {
      song: [],
      singer: {},
      ifrefresh: false
    }
  },
  components: {
    scroll, loading
  },
  computed: {
    suggestarray () {
      return this.suggest
    },
    ifsinger () {
      return Object.keys(this.singer).length
    }
  },
  methods: {
    ...mapActions(['SetSingleSong']),
    ...mapMutations(['SET_SINGER']),
    loadcompleted () {
      this.ifrefresh = false
    },
    refresh () {
      this.$emit('refresh')
      this.ifrefresh = true
    },
    gotosinger () {
      this.SET_SINGER(this.singer)
      this.$router.push({
        path: `/singer/${this.singer.singermid}`
      })
    },
    _initsong (item) {
      let song = createSuggestSong(item)
      getSongsUrl(song.mid).then((data) => {
        if (data.code === 0) {
          song.url = `http://ws.stream.qqmusic.qq.com/${data.req_0.data.midurlinfo[0].purl}`
        } else {
          song.url = ''
        }
        this.song = song
      })
    },
    _initsinger (zhida) {
      let singer = {
      }
      if (zhida && zhida.type !== 0 && zhida.type !== 3) {
        singer.singer_name = zhida.singername
        singer.singer_mid = zhida.singermid
        this.singer = new Singer(singer)
      } else {
        this.singer = singer
      }
    }
  },
  watch: {
    song (newsong) {
      this.SetSingleSong(newsong)
    },
    zhida (newzhida) {
      this._initsinger(newzhida)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'
.suggest
  position:absolute
  top:75.6px
  left:0
  right:0
  bottom:0
  background-color:$color-background
  color:$color-text-l
  overflow:hidden
  .suggest-wrapper
    margin:20px
    margin-top:0
    padding-bottom:7px
    .loading
      position:relative
      top:-15px
    .suggest-singer
      display:flex
      .singer-img
        height:60px
        border-radius:50%
        margin-right:9px
      .singer-desc
        padding:7px
    .suggest-item
      margin:20px
      margin-left:0
      overflow:hidden
      white-space:nowrap
      text-overflow:ellipsis;
      line-height:1.2
</style>
