<template>
  <div class='rankdetail'>
    <musiclist :songs='songs' :bgimage='bgimage' :name='rank.name'></musiclist>
  </div>
</template>

<script>
import {getRankSong} from '@/api/rank'
import {mapGetters} from 'vuex'
import musiclist from '@/components/Music-List/Music-List'
import {createSong} from '@/common/js/song'
import {getSongsUrl} from '@/api/singer'
export default {
  name: 'rankdetail',
  computed: {
    ...mapGetters(['rank']),
    bgimage () {
      return (this.ranksonglist.length === 0) ? '' : this.ranksonglist[0].image
    },
    songs () {
      return (this.ranksonglist.length === 0) ? [] : this.ranksonglist
    }
  },
  data () {
    return {
      ranksonglist: []
    }
  },
  methods: {
    _initRankSong () {
      getRankSong(this.rank.topid, this.rank.period).then((data) => {
        if (data.detail.code === 0) {
          this.ranksonglist = this._normalizeSong(data.detail.data.songInfoList)
        }
      })
    },
    _normalizeSong (list) {
      let arr = []
      if (!list) {
        return
      }
      list.forEach((item) => {
        let song = createSong(item)
        getSongsUrl(song.mid).then((data) => {
          if (data.code === 0) {
            song.url = `http://ws.stream.qqmusic.qq.com/${data.req_0.data.midurlinfo[0].purl}`
          } else {
            song.url = ''
          }
        })
        arr.push(song)
      })
      return arr
    }
  },
  mounted () {
    this._initRankSong()
  },
  components: {
    musiclist
  }
}
</script>

<style lang="stylus" scoped>
.rankdetail
  position:absolute
  left:0
  right:0
  top:0
  bottom:0
</style>
