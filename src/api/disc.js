import axios from 'axios'
export function getDiscSong (did) {
  let params = {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    new_format: 1,
    disstid: did,
    g_tk: 5381,
    loginUin: 1152921504992927697,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }
  return axios.get('/api/getDiscSong', {
    params: params
  }).then((res) => {
    return res.data
  })
}
