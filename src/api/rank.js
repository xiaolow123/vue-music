import axios from 'axios'
export function getRank () {
  let params = {
    _: (Math.random() + '').replace('0.', ''),
    data: {'comm': {'g_tk': 5381, 'uin': '1152921504992927697', 'format': 'json', 'inCharset': 'utf-8', 'outCharset': 'utf-8', 'notice': 0, 'platform': 'h5', 'needNewCode': 1, 'ct': 23, 'cv': 0}, 'topList': {'module': 'musicToplist.ToplistInfoServer', 'method': 'GetAll', 'param': {}}}
  }
  return axios.get('api/getRank', {
    params: params
  }).then((res) => {
    return res.data
  })
}

export function getRankSong (topid, period) {
  let params = {
    '-': 'getUCGI' + (Math.random() + '').replace('0.', ''),
    g_tk: 5381,
    loginUin: 1152921504992927697,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data: {'detail': {'module': 'musicToplist.ToplistInfoServer', 'method': 'GetDetail', 'param': {'topId': topid, 'offset': 0, 'num': 20, 'period': period}}, 'comm': {'ct': 24, 'cv': 0}}
  }
  return axios.get('/api/getRankSong', {
    params: params
  }).then((res) => {
    return res.data
  })
}
