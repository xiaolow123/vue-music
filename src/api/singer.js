import axios from 'axios'

export function getSingers () {
  let params = {
    '-': 'getUCGI' + (Math.random() + '').replace('0.', ''),
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf - 8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {'comm': {'ct': 24, 'cv': 0}, 'singerList': {'module': 'Music.SingerListServer', 'method': 'get_singer_list', 'param': {'area': -100, 'sex': -100, 'genre': -100, 'index': -100, 'sin': 0, 'cur_page': 1}}}
  }
  return axios.get('api/getSingers', {
    params: params
  }).then((res) => {
    return res.data
  })
}
export function getSingerDetail (singerMid) {
  let params = {
    '-': 'getSingerSong' + (Math.random() + '').replace('0.', ''),
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf - 8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {
      'comm': {'ct': 24, 'cv': 0},
      'singerSongList': {
        'method': 'GetSingerSongList',
        'param': {'order': 1, 'singerMid': singerMid, 'begin': 0, 'num': 10},
        'module': 'musichall.song_list_server'}}
  }
  return axios.get('/api/getSingerDetail', {
    params: params
  }).then((res) => {
    return res.data
  })
}

export function getSongsUrl (mid) {
  let req0 = getreq0(mid)
  let comm = {'g_tk': 5381, 'uin': '1152921504992927697', 'format': 'json', 'ct': 23, 'cv': 0}
  return axios.post('/api/getSongsUrl', {
    req_0: req0,
    comm: comm
  }).then((res) => {
    return res.data
  })
}

function getreq0 (mid) {
  let guid = getguid()
  let req0 = {'module': 'vkey.GetVkeyServer', 'method': 'CgiGetVkey', 'param': {'guid': guid, 'songmid': [mid], 'songtype': [], 'uin': '1152921504992927697', 'loginflag': 1, 'platform': '23', 'h5to': 'speed'}}
  return req0
}

function getguid () {
  let q = new Date().getUTCMilliseconds()
  let _uid = '' + Math.round(2147483647 * Math.random()) * q % 1e10
  return _uid
}
