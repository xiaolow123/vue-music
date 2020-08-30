<template>
    <musiclist :bgimage='singer.avatar' :songs='Singerdata' :name='singer.singername'></musiclist>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail, getSongsUrl } from '@/api/singer'
import { createSong } from '@/common/js/song'
import musiclist from '@/components/Music-List/Music-List'
export default {
  name: 'singerdetail',
  computed: {
    ...mapGetters([
      'singer'
    ]),
    Singerdata () {
      if (this.singerdata !== []) {
        return this.singerdata
      }
    }
  },
  data () {
    return {
      singerdata: []
    }
  },
  mounted () {
    if (!this.singer.singermid) {
      this.$router.push({path: '/singer'})
      return
    }
    this._initsingerdata()
  },
  methods: {
    _initsingerdata () {
      getSingerDetail(this.singer.singermid).then((res) => {
        this.singerdata = this._normarlizesingerdata(res.singerSongList.data.songList)
        this._initsongsurl()
      })
    },
    _initsongsurl () {
      this.singerdata.forEach(item => {
        getSongsUrl(item.mid).then(data => {
          if (data.code === 0) {
            item.url = `http://dl.stream.qqmusic.qq.com/${data.req_0.data.midurlinfo[0].purl}?`
          } else {
            item.url = ''
          }
        })
      })
    },
    _normarlizesingerdata (list) {
      let ret = []
      if (!list) {
        return []
      }
      list.forEach((item) => {
        ret.push(createSong(item.songInfo))
      })
      return ret
    }
  },
  components: {
    musiclist
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'
</style>
