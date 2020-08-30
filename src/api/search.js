import axios from 'axios'
export function getSearchHot () {
  let params = {
    cgiKey: 'GetHomePage',
    _: 1581488434947,
    data: {'comm': {'g_tk': 5381, 'uin': '1152921504992927697', 'format': 'json', 'inCharset': 'utf-8', 'outCharset': 'utf-8', 'notice': 0, 'platform': 'h5', 'needNewCode': 1}, 'MusicHallHomePage': {'module': 'music.musicHall.MusicHallPlatform', 'method': 'MobileWebHome', 'param': {'ShelfId': [101, 102, 161]}}, 'hotkey': {'module': 'tencent_musicsoso_hotkey.HotkeyService', 'method': 'GetHotkeyForQQMusicMobile', 'param': {'remoteplace': 'txt.miniapp.wxada7aab80ba27074', 'searchid': '1559616839293'}}}
  }
  return axios.get('/api/getSearchHot', {
    params: params
  }).then((res) => {
    return res.data
  })
}

export function getSearchContent (query, page) {
  let params = {
    _: (Math.random() + '').replace('0.', ''),
    g_tk: 5381,
    uin: 1152921504992927697,
    format: 'json',
    inCharset: 'utf - 8',
    outCharset: 'utf - 8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: 1,
    catZhida: 1,
    t: 0,
    flag: 1,
    ie: 'utf - 8',
    sem: 1,
    aggr: 0,
    perpage: 20,
    n: 20,
    p: page,
    remoteplace: 'txt.mqq.all'
  }
  return axios.get('/api/getSearchContent', {
    params: params
  }).then((res) => {
    return res.data
  })
}
