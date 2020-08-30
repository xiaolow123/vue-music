
export default class Song {
  constructor ({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}
export function createSong (musicdata) {
  return new Song({
    id: musicdata.id,
    mid: musicdata.mid,
    singer: filterSinger(musicdata.singer),
    name: musicdata.name,
    album: musicdata.album.name,
    duration: musicdata.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicdata.album.mid}.jpg?max_age=2592000`,
    url: ''
  })
}

export function createSuggestSong (musicdata) {
  return new Song({
    id: musicdata.songid,
    mid: musicdata.songmid,
    singer: filterSinger(musicdata.singer),
    name: musicdata.songname,
    album: musicdata.albumname,
    duration: musicdata.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicdata.albummid}.jpg?max_age=2592000`,
    url: ''
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('/')
}

export function getrandomlist (list) {
  let _list = list.slice()
  let length = _list.length
  for (let i = 0; i < length; i++) {
    let num = getrandom(0, length - 1)
    let item = _list[i]
    _list[i] = _list[num]
    _list[num] = item
  }
  return _list
}

function getrandom (min, max) {
  let num = Math.floor(Math.random() * (max - min + 1) + min)
  return num
}
