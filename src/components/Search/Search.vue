<template>
  <div class="search">
    <searchbox :hotkeys='hotkeys' @search='search' ></searchbox>
    <suggest :suggest='suggest'
             :zhida='zhida'
             v-show='suggest.length !== 0'
             @refresh='refresh'
             :complete='complete'
             :noresult='noresult'
             ref='suggest'></suggest>
    <noresult :noresult='noresult' v-show='noresult' class='noresult'></noresult>
  </div>
</template>

<script>
import searchbox from '@/components/SearchBox/SearchBox'
import {getSearchHot, getSearchContent} from '@/api/search'
import suggest from '@/components/Suggest/Suggest'
import noresult from '@/base/no-result/no-result.vue'
export default {
  name: 'recommend',
  components: {
    searchbox,
    suggest,
    noresult
  },
  data () {
    return {
      hotkeys: [],
      suggest: [],
      zhida: {},
      page: 1,
      query: '',
      totalnum: 0,
      complete: false,
      noresult: false
    }
  },
  mounted () {
    this.inithotkeys()
  },
  watch: {
    page (newpage) {
      if (newpage * 20 > this.totalnum) {
        this.complete = true
      }
      this.research()
    },
    query () {
      this.page = 1
    }
  },
  methods: {
    refresh () {
      this.page++
    },
    inithotkeys () {
      getSearchHot().then((res) => {
        if (res.hotkey.code === 0) {
          this.hotkeys = res.hotkey.data.vec_hotkey.slice(0, 10)
        }
      })
    },
    search (query) {
      this.complete = false
      this.query = query
      getSearchContent(query, 1).then((data) => {
        if (data.code === 0) {
          this.suggest = data.data.song.list
          this.zhida = data.data.zhida
          this.totalnum = data.data.song.totalnum
          if (data.message === 'no results') {
            this.noresult = true
          } else {
            this.noresult = false
          }
        }
      })
    },
    research () {
      getSearchContent(this.query, this.page).then((data) => {
        if (data.code === 0) {
          this.suggest = this.suggest.concat(data.data.song.list)
          this.$refs.suggest.loadcompleted()
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'
.search
  position:fixed
  left:0
  right:0
  top:77px
  bottom:0
  background-color:$color-background
  .noresult
    position:absolute
    top:75.6px
    background-color:$color-background
    left:0
    right:0
</style>
