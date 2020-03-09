// 关于Vue数组操作
 

// Vue的数组操作的实现代码大致如下：

const aryMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
const arrayAugmentations = [];

aryMethods.forEach((method)=> {

    // 这里是原生Array的原型方法
    let original = Array.prototype[method];

   // 将push, pop等封装好的方法定义在对象arrayAugmentations的属性上
   // 注意：是属性而非原型属性
    arrayAugmentations[method] = function () {
        console.log('我被改变啦!');

        // 调用对应的原生方法并返回结果
        return original.apply(this, arguments);
    };

});

let list = ['a', 'b', 'c'];
// 将我们要监听的数组的原型指针指向上面定义的空数组对象
// 别忘了这个空数组的属性上定义了我们封装好的push等方法
list.__proto__ = arrayAugmentations;
list.push('d');  // 我被改变啦！ 4

// 这里的list2没有被重新定义原型指针，所以就正常输出
let list2 = ['a', 'b', 'c'];
list2.push('d');  // 4
// 在Vue的官方文档中，有着如下的提示：

// 当你利用索引直接设置一个项时，例如： vm.items[indexOfItem] = newValue
// 当你修改数组的长度时，例如： vm.items.length = newLength
// 这个是Js语法的限制，什么限制呢？

// 先来看一下，在这篇文章中写到，为什么不利用如下的代码来实现：

function FakeArray() {
  return  Array.call(this,arguments);
}

FakeArray.prototype = [];
FakeArray.prototype.constructor = FakeArray;

FakeArray.prototype.push = function () {
    console.log('我被改变啦');
    return Array.prototype.push.call(this,arguments);
};

let list = ['a','b','c'];

let fakeList = new FakeArray(list);
// 然而，作者在测试代码的时候，发现fakeList实际上是一个数组，而且它的push是内置的push方法，并不是继承FakeArray的方法。

// 在作者文章的评论中，有个网友评论说，这是因为Array.call并不会引用this，不止Array，String,Number,Regexp,Object等等JS的内置类都不行。

// 所以实际上代码是这样的：

function FakeArray() {
  return  Array(arguments);
}
 

// 这也就是ES5以下无法完美继承数组的问题，回过头看一下Vue中的实现，Vue的作者用的是__proto__属性，该属性指向构造对象的原型。

// 也就是说，上面的例子我们可以这样改写：

 

function FakeArray() {
  var x =  Array.call(null,arguments);
   x.__proto__ = FakeArray.prototype
   return x;
}

FakeArray.prototype = [];
FakeArray.prototype.constructor = FakeArray;

FakeArray.prototype.push = function () {
    console.log('我被改变啦');
    return Array.prototype.push.call(this,arguments);
};

let list = ['a','b','c'];

let fakeList = new FakeArray(list);
 

// 但是呢，这样写，也就意味着我们不能检测到length,和fakeList[x] = 1;这样的操作，也就有了Vue文档中的提示了。

// 本文参考自https://github.com/youngwind/blog/issues/85及其评论。