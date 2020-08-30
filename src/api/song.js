import axios from 'axios'
export function getSongLyric (musicid) {
  let params = {
    nobase64: 1,
    musicid: musicid,
    '-': 'jsonp1',
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf - 8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }
  return axios.get('/api/getSongLyric', {
    params: params
  }).then((res) => {
    return res.data
  })
}
