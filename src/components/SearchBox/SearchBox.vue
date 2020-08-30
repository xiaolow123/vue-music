<template>
  <div class='searchbox'>
    <div class='input-wrapper'>
      <div class='iconfont searchicon'>&#xe61d;</div>
      <input class='iconfont' :placeholder='placeholder' v-model='icontent'>
      <div class='iconfont deleteicon' v-show='icontent' @click='deletecontent'>&#xe625;</div>
    </div>
    <div class='hot-search'>
      <p class='hot-title'>热门搜索</p>
      <span v-for='(item, index) in hotkeys' :key='index' class='hot-query'
            @click='selectItem(item.query)'>
        {{item.query}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchbox',
  data () {
    return {
      icontent: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    },
    hotkeys: {
      type: Array
    }
  },
  methods: {
    deletecontent () {
      this.icontent = ''
    },
    selectItem (query) {
      this.icontent = query
    },
    search (query) {
      this.$emit('search', query)
    }
  },
  watch: {
    icontent (newquery) {
      this.search(newquery)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'
.search
  position:absolute
  top:0
  bottom:0
  left:0
  right:0
  background-color:$color-background
  .input-wrapper
    margin:20px
    padding:7px
    background-color:$color-dialog-background
    border-radius:7px
    display:flex
    align-items:center
    .searchicon
      color:$color-theme
      margin-right:5px
    input
      background-color:$color-dialog-background
      display:block
      width:100%
      color:$color-text
      font-size:$font-size-medium
    .deleteicon
      font-size:$font-size-medium-x
      color:$color-theme
  .hot-search
    color:$color-text-l
    margin:20px
    margin-right:0
    .hot-title
      padding:5px
      padding-left:0
    .hot-query
      margin:15px
      margin-bottom:0
      margin-left:0
      padding:7px
      background-color:$color-dialog-background
      display:inline-block
      border-radius:5px
::placeholder
  color:$color-text-l
  font-size:$font-size-medium
</style>
