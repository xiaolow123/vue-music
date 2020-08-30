<template>
  <div class="recommend">
      <swiper class='swiper' :options="swiperOption">
        <!-- slides -->
        <swiper-slide v-for='item in recommends' :key='item.id' class='swiper-slide'>
          <a :href='item.jump_info.url'>
          <img :src='item.pic_info.url'>
          </a>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    <p class='hot-title'>热门歌单推荐</p>
    <scroll class='hot' :data='hot' ref='scroll'>
      <ul class='item-wrapper'>
        <li v-for='item in hot' :key='item.content_id' class='hot-item' @click='selectItem(item)'>
          <img v-lazy='item.cover'>
          <p class='hot-item-username'>{{item.username}}</p>
          <p class='hot-item-title'>{{item.title}}</p>
        </li>
       </ul>
       <loading disc='正在载入' class='loading' v-show='!hot.length'></loading>
    </scroll>
  <router-view></router-view>
  </div>
</template>

<script>
import {getRecommends} from '@/api/recommend'
import 'swiper/dist/css/swiper.css'
import scroll from '@/base/scroll/scroll'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapMutations} from 'vuex'
import loading from '@/base/loading/loading.vue'
export default {
  name: 'recommend',
  data () {
    return {
      recommends: [],
      swiperOption: {
        pagination: '.swiper-pagination',
        paginationType: 'bullets',
        loop: true
      },
      hot: []
    }
  },
  mounted () {
    getRecommends().then((res) => {
      this.recommends = res.focus.data.content
      this.hot = this.normalizehot(res.recomPlaylist.data.v_hot)
    }).catch((err) => {
      console.log(err)
    })
  },
  components: {
    swiper, swiperSlide, scroll, loading
  },
  methods: {
    ...mapMutations(['SET_DISC']),
    normalizehot (list) {
      list.forEach((item, index, arr) => {
        item.href = `https://y.qq.com/n/yqq/playlist/${item.content_id}.html#stat=y_new.index.playlist.name`
      })
      return list
    },
    selectItem (item) {
      let disc = {}
      this.$router.push(`/recommend/${item.content_id}`)
      disc.bgimage = item.cover
      disc.name = item.username
      disc.id = item.content_id
      this.SET_DISC(disc)
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~@/common/stylus/variable'
.swiper >>> .swiper-pagination-bullet-active
  opacity: 1;
  background: white !important;
.recommend
  color:$color-text
  position:fixed
  left:0
  right:0
  top:69px
  bottom:0
  background-color:$color-background
  .swiper
    margin-top:9px
    .swiper-slide
      img
        width:100%
        height:130px
  .hot-title
    text-align:center
    color:$color-theme
    margin:15px
  .hot
    padding-bottom:15px
    position:absolute
    left:0
    right:0
    top:182.6px
    bottom:0
    overflow:hidden
    .loading
      position:absolute
      left:0
      right:0
      top:50%
      transform:translateY(-50%)
    .item-wrapper
      position:absolute
      left:0
      right:0
      .hot-item
        height:55px
        margin: 15px
        img
          height:100%
          float:left
          margin-right:13px
        .hot-item-username
          padding-left:13px
        .hot-item-title
          margin:25px
          color:$color-text-l
</style>
