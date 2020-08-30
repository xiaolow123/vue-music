export default class Singer {
  constructor ({singer_name: singername, singer_mid: singermid}) {
    this.singername = singername
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${singermid}.jpg?max_age=2592000`
    this.singermid = singermid
  }
}
