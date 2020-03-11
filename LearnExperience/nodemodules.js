// 67. Node js 
let util = require('util')
let da = {name: 'xxk', age: 30, isRichMan: true}
console.log(util.inspect(da))
function Base() {
  this.name = 'base'
}
Base.prototype.age = 10
function Sub() {
  this.name = 'sub'
}
util.inherits(Sub, Base)
var s = new Sub()
console.log(s, s.name, s.age)