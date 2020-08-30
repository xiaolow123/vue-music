function findIndex (list, song) {
  list.forEach((item, index) => {
    if (item === song) {
      return index
    }
  })
}

export function SetSingleSong ({commit, state}, item) {
  let playlist = state.playlist.slice()
  let sequencelist = state.sequencelist.slice()
  let currentIndex = state.currentIndex
  let currentSong = playlist[currentIndex]
  let Findex = findIndex(playlist, item)
  if (Findex > -1) {
    if (Findex < currentIndex) {
      currentIndex--
      playlist.splice(Findex, 1)
    } else if (Findex > currentIndex) {
      playlist.splice(Findex, 1)
    }
  }
  currentIndex++
  playlist.splice(currentIndex, 0, item)
  let currentsIndex = findIndex(sequencelist, currentSong)
  let sfindex = findIndex(sequencelist, item)
  if (sfindex > -1) {
    if (sfindex < currentsIndex) {
      currentsIndex--
      sequencelist.splice(sfindex, 1)
    } else if (sfindex > currentsIndex) {
      sequencelist.splice(sfindex, 1)
    }
  }
  currentsIndex++
  sequencelist.splice(currentsIndex, 0, item)
  commit('SET_PLAYING', true)
  commit('SET_FULL_SCREEN', true)
  commit('SET_PLAYLIST', playlist)
  commit('SET_MODE', 0)
  commit('SET_CURRENT_INDEX', currentIndex)
  commit('SET_SEQUENCELIST', sequencelist)
}
