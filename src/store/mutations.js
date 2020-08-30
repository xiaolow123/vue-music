import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, singer) { // 采用[]eslint能检测是否写错
    state.singer = singer
  },
  [types.SET_PLAYING] (state, playing) {
    state.playing = playing
  },
  [types.SET_FULL_SCREEN] (state, screen) {
    state.fullScreen = screen
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [types.SET_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_SEQUENCELIST] (state, list) {
    state.sequencelist = list
  },
  [types.SET_DISC] (state, disc) {
    state.disc = disc
  },
  [types.SET_RANK] (state, rank) {
    state.rank = rank
  }
}
export default mutations
