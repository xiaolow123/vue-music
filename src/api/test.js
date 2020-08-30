var arr = [1, [2, [3, 4]]]
console.log((arr + '').split(',').map((item, index) => {
  return item - 0
}))
console.log(arr.flat(2))
function myflat (array) {
  return array.reduce((prev, item) => {
    return prev.concat(Array.isArray(item) ? myflat(item) : item)
  }, [])
}
console.log(myflat(arr))
function myflat2 (array) {
  var result = []
  for (let j = 0; j < array.length; j++) {
    result = result.concat(Array.isArray(array[j]) ? myflat2(array[j]) : array[j])
  }
  return result
}
console.log(myflat2(arr))
function debounce (fn, delay) {
  var timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay)
  }
}
function throttle (fn, delay) {
  var timer = null
  return function () {
    if (!timer) {
      timer = setTimeout(fn, delay)
    }
  }
}
function ww (c) {
  this.c = c
}
function mynew () {
  var fn = Array.prototype.shift.call(arguments)
  var obj = {}
  obj._proto_ = fn.prototype
  var result = fn.call(obj, ...arguments)
  if (typeof result === 'object' || 'function') {
    return result
  }
  return obj
}
function mycall () {
  var obj = Array.prototype.shift.call(arguments)
  var fn = this
  obj.fn = fn
  var args = [...arguments]
  var result = obj.fn(...args)
  delete obj.fn
  return result
}
function myapply () {
  var obj = Array.prototype.shift.call(arguments)
  var fn = this
  obj.fn = fn
  var result = obj.fn(...arguments)
  delete obj.fn
  return result
}
function mybind () {
  var fn = this
  var obj = [].shift.call(arguments)
  var args = [].slice.call(arguments)
  var bound = function () {
    var boundArgs = [].slice.call(arguments)
    var finalArgs = boundArgs.concat(args)
    if (this instanceof bound) {
      if (fn.prototype) {
        function fNop () {}
        fNop.prototype = fn.prototype
        bound.prototype = new fNop()
      }
      var result = fn.apply(this, finalArgs)
      if (typeof result === 'object' || typeof result === 'function') {
        return result
      }
      return this
    } else {
      fn.apply(obj, finalArgs)
    }
  }
}
function myinstanceof (left, right) {
  var proto = left._proto_
  var prototype = right.prototype
  while (true) {
    if (!proto._proto_) {
      return false
    }
    if (proto === prototype) {
      return true
    }
    proto = proto._proto_
  }
}
function count () {
  var num = 0
  return function () {
    console.log(++num)
  }
}
count()()
count()()
function sleep (ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(111)
    }, ms)
  })
}
sleep(2000).then((res) => {
  console.log(res)
})
function myPromise (fn) {
  var _this = this
  var resolvecalls = []
  var rejectcalls = []
  this.state = 'pending'
  function resolve (val) {
    if (val instanceof myPromise) {
      return val.then(resolve, reject)
    }
    setTimeout(() => {
      if (_this.state === 'pending') {
        _this.state = 'resolved'
        _this.val = val
        resolvecalls.forEach((item) => {
          item(val)
        })
      }
    }, 0)
  }
  function reject (val) {
    if (val instanceof myPromise) {
      return val.then(resolve, reject)
    }
    setTimeout(() => {
      if (_this.state === 'pending') {
        _this.state = 'rejected'
        _this.val = val
        rejectcalls.forEach((item) => {
          item(val)
        })
      }
    }, 0)
  }
  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
  myPromise.prototype.then = (callback1, callback2) => {
    var onResolved = typeof callback1 === 'function' ? callback1 : (val) => { return val }
    var onRejected = typeof callback2 === 'function' ? callback2 : (e) => { throw e }
    if (_this.state === 'pending') {
      resolvecalls.push(onResolved)
      rejectcalls.push(onRejected)
    }
    if (_this.state === 'resolved') {
      onResolved(_this.val)
    }
    if (_this.state === 'rejected') {
      onRejected(_this.val)
    }
  }
}
Promise.myrace = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject)
    }
  })
}
Promise.myall = function (promises) {
  var result = []
  var count = 0
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then((data) => {
        result[i] = data
        count++
        if (count === promises.length) {
          resolve(result)
        }
      })
    }
  })
}
function getJson (url) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest()
    xhr.open('get', url, true)
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.responseType = 'json'
    xhr.send()
    xhr.onreadystatechange = function () {
      if (this.readyState !== 4) { return }
      if (this.status === 200) {
        resolve(this.responseText)
      } else {
        reject(new Error(this.statusText))
      }
    }
  })
}
// domain1
var popup = window.open() // iframe的话用iframe1.contentWindow.postMessage
popup.postMessage('aa', 'www.domain2.com')
window.addEventListener('message', function (e) {
  console.log(e.data) // 发送的数据
})
// domain2
window.addEventListener('message', function (e) {
  e.source.postMessage('cc', 'www.domain1.com') // window.parent.postMessage
})
class eventEmiter {
  constructor () {
    this.events = {}
  }
  subscribe (type, handler) {
    if (!this.events[type]) {
      this.events[type] = []
    }
    this.events[type].push(handler)
  }
  publish (type) {
    this.events[type].forEach((cb) => {
      cb()
    })
  }
  remove (type, handler) {
    this.events[type] = this.events[type].filter((item) => {
      return item !== handler
    })
  }
}
class subject {
  constructor () {
    this.obs = []
  }
  addob (ob) {
    this.obs.push(ob)
  }
  notify () {
    this.obs.forEach((ob) => {
      ob.update()
    })
  }
}
class observer {
  update () {
    console.log(2)
  }
}
let Sub = new subject()
let ob = new observer()
// 目标添加观察者了
subject.addSub(ob)
// 目标发布消息调用观察者的更新方法了
subject.notify()// update
var singleinstance = (function () {
  let instance
  return function (name) {
    if (instance) {
      return ins
    }
    this.name = name
    instance = this
    return instance
  }
})()
