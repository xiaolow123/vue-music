import Vue from 'vue'
import Router from 'vue-router'
const Recommend = () => import('../components/Recommend/Recommend')
const disc = () => import('../components/disc/disc')
const SingerDetail = () => import('../components/SingerDetail/SingerDetail')
const Singer = () => import('../components/Singer/Singer')
const Search = () => import('../components/Search/Search')
const Rank = () => import('../components/Rank/Rank')
const RankDetail = () => import('../components/RankDetail/RankDetail')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [{
        path: ':did',
        component: disc
      }]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: RankDetail
        }
      ]
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
