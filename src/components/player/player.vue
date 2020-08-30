<template>
  <div class='player'>
    <transition name='normal'
                @enter='normalenter'
                @after-enter='afterenter'
                @leave='normalleave'
                @after-leave='afterleave'
    >
      <div class='full-player' v-show='fullScreen' ref='full'>
        <div class='top'>
          <div class='iconfont return' @click='goback'>&#xe614;</div>
          <div class='text'>
            <p class='text-name' v-html='name'></p>
            <p class='text-singer'>{{singer}}</p>
          </div>
        </div>
        <div class='medium'>
          <img :src='image' ref='album' :class='album'>
        </div>
        <div class='progress'>
            <div class='progress-time'>{{cur}}</div>
            <progressList class='progress-list'
                          :percent='percent'
                          @move='handlemove'></progressList>
            <div class='progress-time'>{{dur}}</div>
       </div>
        <div class='bottom'>
            <div class='iconfont flex' @click='togglemode'>&#xe600;</div>
            <div class='iconfont flex' @click='pre'>&#xe670;</div>
            <div class='iconfont flex' @click='toggle' v-html='ifplay'></div>
            <div class='iconfont flex' @click='next'>&#xe674;</div>
            <div class='iconfont flex'>&#xe61b;</div>
        </div>
      </div>
    </transition>
    <transition>
      <div class='inner-player' v-show='!fullScreen' @click='go' ref='inner'>
          <img :src='image' :class="['inner-image',album]" ref='innerimage'>
          <p class='inner-text-name' v-html='name'></p>
          <p class='inner-text-singer'>{{singer}}</p>
          <div class='iconfont bofang' @click.stop='toggle' v-html='ifplay'></div>
      </div>
    </transition>
    <audio ref='audio' :src='currentsong' @timeupdate='getcurrent'></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import animations from 'create-keyframe-animation'
import progressList from '@/components/progress-list/progress-list'
import {MODE} from '@/api/config'
import {getrandomlist} from '@/common/js/song'
import {getSongLyric} from '@/api/song'
export default {
  name: 'player',
  components: {progressList},
  computed: {
    ...mapGetters(['fullScreen', 'playlist', 'currentIndex', 'playing', 'mode', 'sequencelist']),
    currentsong () {
      return this.playlist.length === 0 ? '' : this.playlist[this.currentIndex].url
    },
    name () {
      return this.playlist.length === 0 ? '' : this.playlist[this.currentIndex].name
    },
    singer () {
      return this.playlist.length === 0 ? '' : this.playlist[this.currentIndex].singer
    },
    image () {
      return this.playlist.length === 0 ? '' : this.playlist[this.currentIndex].image
    },
    album () {
      return this.playing ? 'album' : 'album-pause album'
    },
    duration () {
      return this.playlist.length === 0 ? '' : this.playlist[this.currentIndex].duration
    },
    id () {
      return this.playlist.length === 0 ? '' : this.playlist[this.currentIndex].id
    }
  },
  data () {
    return {
      ifplay: '&#xe60e;',
      isalbum: false,
      currentTime: 0,
      cur: '',
      dur: '',
      percent: 0,
      lyric: ''
    }
  },
  methods: {
    ...mapMutations(['SET_FULL_SCREEN', 'SET_PLAYING', 'SET_CURRENT_INDEX', 'SET_MODE', 'SET_PLAYLIST']),
    togglemode () {
      let mode = this.mode + 1
      if (mode > 2) {
        mode = 0
      }
      this.SET_MODE(mode)
    },
    goback () {
      this.SET_FULL_SCREEN(false)
    },
    go () {
      this.SET_FULL_SCREEN(true)
    },
    pre () {
      let pre = this.currentIndex - 1
      if (pre === -1) {
        pre = this.playlist.length - 1
      }
      this.SET_CURRENT_INDEX(pre)
    },
    next () {
      let next = this.currentIndex + 1
      if (next === this.playlist.length) {
        next = 0
      }
      this.SET_CURRENT_INDEX(next)
    },
    judge (list) {
      if (list.length === 0) {
        this.$refs.inner.style.zIndex = -2
      } else {
        this.$refs.inner.style.zIndex = 2
      }
    },
    normalenter () {
      let {xmove, ymove, bizhi} = this.getani()
      let animation = {
        0: {
          transform: `translate(-${xmove}px, ${ymove}px) scale(${bizhi})`
        },
        60: {
          transform: `translate(0,0) scale(1.1)`
        },
        100: {
          transform: `translate(0,0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'enter',
        animation,
        presets: {
          duration: 700,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.album, 'enter')
    },
    afterenter () {
      animations.unregisterAnimation('enter')
      this.$refs.album.style.animation = ''
    },
    normalleave () {
      let {xmove, ymove, bizhi} = this.getani()
      bizhi = 1 / bizhi
      let animation = {
        0: {
          transform: `translate(${xmove}px, -${ymove}px) scale(${bizhi})`
        },
        100: {
          transform: `translate(0,0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'leave',
        animation,
        presets: {
          duration: 300,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.innerimage, 'leave')
    },
    afterleave () {
      animations.unregisterAnimation('leave')
      this.$refs.innerimage.style.animation = ''
    },
    getani () {
      let iwidth = 25
      let fwidth = 150
      let ipad = 12
      let fpad = document.body.clientWidth / 2 - fwidth
      let topheight = 70
      let bizhi = iwidth / fwidth
      let xmove = fwidth + fpad - iwidth - ipad
      let ymove = this.$refs.full.clientHeight - topheight - fwidth - iwidth - ipad
      return {bizhi, xmove, ymove}
    },
    toggle () {
      this.SET_PLAYING(!this.playing)
    },
    getcurrent (e) {
      this.currentTime = e.target.currentTime
    },
    format () {
      let cmin = this.currentTime / 60 | 0
      let csec = (Number(this.currentTime % 60 | 0) < 10) ? '0' + (this.currentTime % 60 | 0) : this.currentTime % 60 | 0
      let dmin = this.duration / 60 | 0
      let dsec = (this.duration % 60 < 10) ? '0' + this.duration % 60 : this.duration % 60
      this.cur = `${cmin}:${csec}`
      this.dur = `${dmin}:${dsec}`
      this.percent = this.currentTime / this.duration
    },
    handlemove (nowpercent) {
      this.$refs.audio.currentTime = this.duration * nowpercent
    },
    findIndex (list) {
      let songid = this.playlist[this.currentIndex].id
      let songindex = 0
      list.forEach((item, index) => {
        if (item.id === songid) {
          songindex = index
        }
      })
      return songindex
    }
  },
  watch: {
    id (newid) {
      getSongLyric(newid).then((res) => {
        this.lyric = unescape(res.lyric)
      })
    },
    mode (newm) {
      if (MODE[newm] === 'normal') {
        let songindex = this.findIndex(this.sequencelist)
        this.SET_PLAYLIST(this.sequencelist)
        this.SET_CURRENT_INDEX(songindex)
      }
      if (MODE[newm] === 'random') {
        let randomlist = getrandomlist(this.sequencelist)
        let songindex = this.findIndex(randomlist)
        this.SET_PLAYLIST(randomlist)
        this.SET_CURRENT_INDEX(songindex)
      }
    },
    playlist (newlist) {
      this.judge(newlist)
    },
    currentsong () {
      setTimeout(() => {
        this.$refs.audio.play()
        this.SET_PLAYING(true)
      }, 20)
    },
    playing (newplay) {
      setTimeout(() => {
        let audio = this.$refs.audio
        newplay ? audio.play() : audio.pause()
        newplay ? this.ifplay = '&#xe60e;' : this.ifplay = '&#xe642;'
      }, 20)
    },
    currentTime () {
      this.format()
      if (MODE[this.mode] === 'loop') {
        if (this.cur === this.dur) {
          this.$refs.audio.currentTime = 0
          this.$refs.audio.play()
        }
      } else if (MODE[this.mode] === 'normal' || MODE[this.mode] === 'random') {
        if (this.cur === this.dur) {
          this.next()
        }
      }
    }
  },
  mounted () {
    this.judge(this.playlist)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/variable'
require('~@/common/css/iconfont.css')
.full-player
  position:fixed
  top:0
  bottom:0
  left:0
  right:0
  background-color:$color-background
  color:$color-text
  z-index:30
  .top
    height 70px
    .return
      position:fixed
      top:7px
      left:7px
      width:30px
      height:30px
      color:$color-theme
    .text
      text-align:center
      .text-name
        font-size:$font-size-medium-x
        line-height: 2
      .text-singer
        line-height:1.5
   .medium
     text-align:center
     img
       border-radius:50%
     .album
       animation:rotate 20s  linear infinite
     .album-pause
       animation-play-state: paused
   .progress
     display: flex
     position:absolute
     bottom 120px
     left:0
     right:0
     align-items:center
     .progress-time
       flex:0 0 50px
       text-align:center
     .progress-list
       flex:1 0 30px
   .bottom
     display: flex
     margin:27px
     position: absolute
     bottom: 50px
     left:0
     right:0
     .flex
       flex: 1 0 20%
       text-align:center
       color:$color-theme
    &.normal-enter
      opacity: 0
      .top
        transform: translate(0,-50px)
      .bottom
        transform: translate(0, 50px)
    &.normal-enter-active
      transition:all 0.7s
      .top,.bottom
        transition: all .5s
.inner-player
  position: fixed
  bottom: 0
  left: 0
  right: 0
  background-color: $color-highlight-background
  height:50px
  padding:12px
  .inner-image
    height 100%
    border-radius:50%
    float:left
    margin-right:17px
  .album
    animation:rotate 20s  linear infinite
  .album-pause
    animation-play-state: paused
  .inner-text-name
    color:$color-text
    margin-bottom:17px
    margin-top:5px
  .inner-text-singer
    color:$color-text-l
  .bofang
    height:55px
    width:26px
    position:absolute
    right 55px
    top:25px
    color:$color-theme
    font-size:25px
@keyframes rotate
  0%
    transform:rotate(0)
  100%
    transform: rotate(1turn)
</style>
