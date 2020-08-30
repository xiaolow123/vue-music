function down(parentindex) {
  let temp = dat[parentindex]
  let childindex = parentindex * 2 + 1
  while (childindex < dat.length) {
    if (dat[childindex] < dat[parentindex]) {
      if (childindex + 1 < dat.length && dat[childindex + 1] < dat[childindex]) {
        childindex++
      }
      if (temp <= dat[childindex]) {
        break
      }
      dat[childindex] = dat[parentindex]
      parentindex = childindex
      childindex = parentindex * 2 + 1
    }
  }
  dat[parentindex] = temp
}
var a = {
  b: 2
}
var c
Object.defineProperty(a, 'b', {
  set (val) {
    c = val + 1
  },
  get () {
    return c
  }
})
a.b = 6
console.log(a.b)
let dat = [5, 8, 10, 3, 2, 18, 17, 9]
for (let i = (dat.length - 2) / 2; i > 0; i++) {
  down(i)
}
for (let j = dat.length - 1; j > 0; j--) {
  [dat[j], dat[0]] = [dat[0], dat[j]]
  down(0)
}
console.log(dat)
