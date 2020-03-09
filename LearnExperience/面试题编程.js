function print(arr, sum) {
	for (var i =0;i<arr.length;i++) {
		for(var j=i+1;j<arr.length;j++) {
			if (arr[i]+arr[j]===sum) {
				console.log(arr[i], arr[j])
				return arr[i] + ',' + arr[j]
			}
		}
	}
	console.log('没有找到')
	return 'NOT Found'
}

function Fn(){
	this.x = 100
	this.y= 200
	this.getX=function() {
		console.log(this.x)
	}
}
Fn.prototype = {
	y: 400,
	getX: function() {
		console.log(this.x)
	},
	getY: function() {
		console.log(this.y)
	},
	sum: function() {
		console.log(this.x + this.y)
	}
}
var f1=new Fn()
var f2=new Fn

function Foo() {
	getName = function() {
		console.log(1)
	}
	return this
}
Foo.getName = function() {
	console.log(2)
}
Foo.prototype.getName = function() {
	console.log(3)
}
var getName = function() {
	console.log(4)
}
function getName() {
	console.log(5)
}
Foo.getName()
new new Foo().getName() 怎么理解

饥人谷_汲汲
2017.05.18 16:00:51
字数 112
阅读 1,033
看到一道面试题，提炼出来的结果是

function Foo(){
  var getName = function(){console.log(1)}
  return this
}
  
Foo.prototype.getName = function(){
  console.log(3)
}
new Foo().getName()
new new Foo().getName()   // 3 返回一个  Foo.getName的实例对象
new Foo.getName() // 2 返回一个  Foo.getName的实例对象
new Foo.prototype.getName() // 3 返回一个  Foo.getName的实例对象


// 经过测试，我目前个人觉得new和()是配套的关系，就像写代码时{([()])}出现这种多层嵌套时的配套关系，而且是从中心往外去配套。意思就是对于new Foo().getName()来说，并不是如我最初所想的，等价于


var a = Foo().getName
new a() //这是错的
// 而是等价于

var a = new Foo()
a.getName() //这是对的
// 对于new new Foo().getName()，其等价于

var a = new Foo()
var b = a.getName
var c = new b()





function Person() {
	this.name = 'xxk'
}
Person.prototype.getName = function() {
	console.log(this.name)
	console.log(this.age)
}
Person.prototype.age = 5000
var per1 = new Person
per1.getName()


async function async1() {
	console.log('async1 start')
	await async2()
	console.log('async1 end')
}

async function async2() {
	console.log('async2')
}

console.log('script start')
setTimeout(function() {
	console.log('settimeout')
},0)
async1()
new Promise(function(resolve) {
	console.log('promise1')
	resolve()
}).then(function() {
	console.log('promise2')
})
console.log('script end')


// 实现一个sleep函数的定时器,用法如同promise的风格
function sleep(time) {
	return new Promise((resolve, reject) => {
		setTimeout(function() {
			resolve()
		}, time);
	})
}