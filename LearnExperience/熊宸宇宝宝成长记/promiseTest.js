const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(fn) {
  const that = this
  this.status = PENDING
  this.value = undefined
  this.reason = undefined
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  function resolve(value) {
    debugger
    console.log('外层调用', value)
    if (value instanceof MyPromise) {
      debugger
      console.log('内层promise调用', value)
      return value.then(resolve, reject)
    }
    debugger
    if (that.status === PENDING) {
      console.log('内层调用', value)
      that.status = FULFILLED
      debugger
      that.value = value
      that.onFulfilledCallbacks.forEach(cb => cb(that.value))
      return value
    }
  }

  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED
      that.reason = reason
      that.onRejectedCallbacks.forEach(cb => cb(that.reason))
    }
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }

}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => {
    throw reason
  }

  return new MyPromise((resolve, reject) => {
    if (that.status === PENDING) {
      debugger
      console.log('外层PENDING状态时调用', that.value)
      that.onFulfilledCallbacks.push(value => {
        try {
          console.log('回调函数执行了', value)
          resolve(onFulfilled(value))
        } catch (error) {
          reject(error)
        }
      })
      that.onRejectedCallbacks.push(reason => {
        try {
          resolve(onRejected(reason))
        } catch (error) {
          reject(error)
        }
      })
    } else if (that.status === FULFILLED) {
      debugger
      console.log('外层FULFILLED状态时调用', that.value)
      try {
        debugger
        console.log('内层FULFILLED状态时调用', that.value)
        resolve(onFulfilled(that.value))
      } catch (error) {
        reject(error)
      }
    } else if (that.status === REJECTED) {
      try {
        reject(onRejected(that.reason))
      } catch (error) {
        reject(error)
      }
    }
  })
}
var p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(888)
  }, 3000)
})
// p.then(res => {console.log(res); return 999}).then(res => {console.log(res)})

new MyPromise((resolve, reject) => {
  resolve(p)
}).then(res => console.log('输出resolve为promise时的值' + res))
