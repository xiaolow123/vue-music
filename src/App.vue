<template>
  <div id="app">
    <m-header></m-header>
    <route></route>
    <router-view></router-view>
    <player></player>
  </div>
</template>

<script>
import MHeader from '@/components/M-header/M-header'
import route from '@/components/Route/Route'
import player from '@/components/player/player'
export default {
  name: 'App',
  components: {
    MHeader,
    route,
    player
  }
}
</script>

<style lang='stylus'>
</style>
