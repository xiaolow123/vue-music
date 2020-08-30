<template>
  <div class="rank">
    <ranklist :toplist='toplist'></ranklist>
    <router-view></router-view>
  </div>
</template>

<script>
import {getRank} from '@/api/rank'
import ranklist from '@/components/rank-list/rank-list'
export default {
  name: 'recommend',
  data () {
    return {
      toplist: []
    }
  },
  methods: {
    _inittoplist () {
      getRank().then((data) => {
        if (data.code === 0) {
          this.toplist = data.topList.data.group
        }
      })
    }
  },
  mounted () {
    this._inittoplist()
  },
  components: {
    ranklist
  }
}
</script>

<style lang='stylus' scoped>
@import '~@/common/stylus/variable'
.rank
  position:fixed
  left:0
  right:0
  top:77px
  bottom:0
  background-color:$color-background
</style>
