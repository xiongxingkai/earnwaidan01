/** ============================================手动实现一个Promise异步类============================================== */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(fn){
  const that = this
  this.status = PENDING
  this.value = undefined
  this.reason = undefined
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  function resolve(value) {
    if (value instanceof MyPromise) {
      debugger
      return value.then(resolve, reject)
    }
    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = FULFILLED
        debugger
        that.value = value
        that.onFulfilledCallbacks.forEach(cb => cb(that.value))
      }
    })
  }

  function reject(reason){
    setTimeout(() => {
      if (that.status === PENDING) {
        that.status = REJECTED
        that.reason = reason
        that.onRejectedCallbacks.forEach(cb => cb(that.reason))
      }
    })
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }

}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason}

  return new MyPromise((resolve, reject) => {
    if (that.status === PENDING) {
      that.onFulfilledCallbacks.push(value => {
        try {
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
      setTimeout(() =>{
        try {
          debugger
          console.log(that.value)
          resolve(onFulfilled(that.value))
        } catch (error) {
          reject(error)
        }
      })
    }else if (that.status === REJECTED) {
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
p.then(res => {console.log(res); return 999}).then(res => {console.log(res)})

new MyPromise((resolve,reject) => {resolve(p)}).then(res => console.log('输出resolve为promise时的值'+res))

const path = require('path')
const fs = require('fs')
console.log(path.join('/foo', 'bar\\', 'baz/asdf', 'quux', '../dag/'))
console.log(path.join('',''))
console.log(path.normalize('/foo/bar//baz/\\asdf/quux/..'))
console.log(path.normalize('C:\\temp\\\\foo\\bar\\../\\'))
console.log('windows识别符', path.win32.normalize('C:////temp\\\\/\\/\\/foo/bar'))
console.log(path.parse('C:\\path\\dir\\file.txt'))
console.log(path.relative('/data/orandea/test\\aaa', '/data/orandea/impl/bbb'))
console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'))
console.log(fs.readdirSync('e:\\webstorm_files\\myvueapp02'))




/** ======================================手动实现一个数据拦截================================================================= */

// Vue2.0原理

function render() {
	console.log('页面渲染')
}
var pro = Object.create(Array.prototype)
var arrMethods=['push','pop','unshift','shift','splice','sort','reverse']
arrMethods.forEach(item => {
	pro[item]=function() {
		Array.prototype[item].call(this,...arguments)
		render()
	}
})
function v2_observe(obj){
	if (typeof obj!== 'object'||obj===null) {
		return 
	} else if (Array.isArray(obj)){
		obj.__proto__ = pro
	} else {
		for(var key in obj){
			define(obj,key,obj[key])
		}
	}
}
function define(obj,key,value) {
	v2_observe(value)
	Object.defineProperty(obj,key,{
		get() {
			console.log(`获取属性${key}的值， ${value}`)
			return value
		},
		set(nVal){
			if (nVal !== value) {
				v2_observe(nVal)
				value=nVal
				render()
			}
		}
	})
}

var obj = {a:3,b:[1,2],c:{name:'xxk',age:30}}
v2_observe(obj)




// Vue3.0原理

var handler = {
  get(target,key,receiver) {
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {
    var result = Reflect.set(target, key, value, receiver)
    render()
    return result
  }
}
var obj1 = {a:3,b:[1,2],c:{name:'xxk',age:30}}
var proxy = new Proxy(obj1, handler)








// 订阅者Dep的简单实现
class Dep {
  constructor() {
    /** 用来存放watcher对象的数组 */
    this.subs = []
  }
  /** 在subs中添加一个watcher对象 */
  addSub(sub) {
    this.subs.push(sub)
  }
  /** 通知所有watcher对象更新视图 */
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

// 观察者 Watcher的简单实现
class Watcher {
  constructor(obj, key, cb) {
    // 将Dep.target指向自己
    // 然后触发属性的 getter 添加监听
    // 最后将Dep.target置空
    Dep.target = this
    this.cb = cb
    this.obj = obj
    this.key = key
    this.value = obj[key]
    Dept.target = null
  }
  update() {
    // 获取新值
    this.value = this.obj[this.key]
    // 我们定义一个cb函数，这个函数用来模拟视图更新，调用它即代表更新视图
    this.cb(this.value)
  }
}

function observer_1(obj) {
  // 判断类型
  if (typeof obj !== 'object' || obj === null) {
    return 
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, value)
  })
}

function defineReactive(obj, key, value) {
  // 递归子属性
  observer_1(value)
  let dep = new Dep() // 新增
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('get', value) // 监听
      // 将Watcher添加到订阅
      if (Dept.target) {
        dp.addSub(Dep.target) // 新增
      }
      return value
    },
    set(newVal) {
      if (newVal !== value) {
        value = newVal
        observer_1(newVal)
        console.log('set', newVal) // 监听
        render()
        // 执行Watcher的update方法
        dp.notify() // 新增
      }
    }
  })
}

class Vue {
  constructor(options) {
    this._data = options.data
    observer_1(this._data)
    // 新建一个Watcher 观察者对象，这时候Dep.target会指向这个Watcher对象
    new Watcher()
    console.log('模拟视图渲染')
  }
}










