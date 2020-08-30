<template>
  <div class="singer">
    <listview :data='singerlist' @select='_routeto'></listview>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingers } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import pinyin from 'js-pinyin'
import Singer from '@/common/js/singer'
import Listview from '@/base/listview/listview'
pinyin.setOptions({checkPolyphone: false, charCase: 0})
export default {
  name: 'recommend',
  mounted () {
    this._getSingers()
  },
  data () {
    return {
      singerlist: []
    }
  },
  methods: {
    _routeto (item) {
      this.$router.push({path: `/singer/${item.singermid}`})
    },
    normalizelist (singerlist) {
      let map = {
        hot: {
          title: '热门',
          items: []
        }
      }
      singerlist.forEach((item, index) => {
        if (index < 10) {
          map.hot.items.push(new Singer(item))
        }
        let findex = pinyin.getFullChars(item.singer_name).charAt(0)
        if (!map[findex]) {
          map[findex] = {
            title: findex,
            items: []
          }
        }
        map[findex].items.push(new Singer(item))
      })
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    _getSingers () {
      getSingers().then(data => {
        if (data.code === ERR_OK) {
          this.singerlist = this.normalizelist(data.singerList.data.singerlist)
        }
      })
    }
  },
  components: {
    Listview
  }
}
</script>

<style lang='stylus' scoped>
.singer
  position: fixed
  top: 75px
  bottom: 0
  width: 100%
</style>
