<template>
  <div class='disc'>
    <musiclist :bgimage='disc.bgimage' :name='disc.name' :songs='songs'></musiclist>
  </div>
</template>

<script>
import musiclist from '@/components/Music-List/Music-List'
import {mapGetters} from 'vuex'
import {getDiscSong} from '@/api/disc'
import {createSong} from '@/common/js/song'
import {getSongsUrl} from '@/api/singer'
export default {
  name: 'disc',
  data () {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters(['disc'])
  },
  components: {
    musiclist
  },
  methods: {
    _initdiscsong () {
      getDiscSong(this.disc.id).then((data) => {
        let arr = []
        if (data.code === 0) {
          data.cdlist[0].songlist.forEach((item) => {
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
        }
        this.songs = arr
      })
    },
    _judgeempty () {
      if (Object.keys(this.disc).length === 0) {
        this.$router.push({path: '/recommend'})
      }
    }
  },
  mounted () {
    this._initdiscsong()
    this._judgeempty()
  }
}
</script>

<style lang="stylus" scoped>
.disc
  position:fixed
  left:0
  right:0
  top:0
  bottom:0
  z-index:1
</style>
