<template>
    <ul class='songlist'>
      <li v-for='(item, index) in songs' :key='item.id' class='song' @click='selectitem(item, index)'>
        <span v-show='ifrank' class='index'>{{index + 1}}</span>
        <div>
          <p class='title'>{{item.name}}</p>
          <p class='disc'>{{item.name + ' . ' + item.album}}</p>
        </div>
      </li>
    </ul>
</template>

<script>
export default {
  name: 'songlist',
  props: {
    songs: Array,
    ifrank: Boolean
  },
  methods: {
    selectitem (item, index) {
      this.$emit('select', item, index)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'
.songlist
  position:absolute
  .song
    margin:23px
    display:flex
    align-items:center
    .index
      color:$color-theme
      float:left
      font-size:$font-size-large-x
      margin-right:15px
    .title
      padding-top:9px
      margin-bottom: 9px
      color:$color-text
    .disc
      color:$color-text-l
</style>
