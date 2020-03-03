/*
.宏任务（macrotask ）和微任务（microtask ）

macrotask 和 microtask 表示异步任务的两种分类。

在挂起任务时，JS 引擎会将所有任务按照类别分到这两个队列中，
首先在 macrotask 的队列（这个队列也被叫做 task queue）
中取出第一个任务，执行完毕后取出 microtask 队列中的所有任务顺序执行；
之后再取 macrotask 任务，周而复始，直至两个队列的任务都取完。
*/
// 先看个例子

setTimeout(() => {
    //执行后 回调一个宏事件
    console.log('内层宏事件3')
}, 0)
console.log('外层宏事件1');

new Promise((resolve) => {
    console.log('外层宏事件2');
    resolve()
}).then(() => {
    console.log('微事件1');
}).then(()=>{
    console.log('微事件2')
})
// 我们看看打印结果

// 外层宏事件1
// 外层宏事件2
// 微事件1
// 微事件2
// 内层宏事件3
/*
• 首先浏览器执行js进入第一个宏任务进入主线程, 遇到 setTimeout  分发到宏任务Event Queue中

• 遇到 console.log() 直接执行 输出 外层宏事件1

• 遇到 Promise， new Promise 直接执行 输出 外层宏事件2

• 执行then 被分发到微任务Event Queue中

•第一轮宏任务执行结束，开始执行微任务 打印 '微事件1' '微事件2'

•第一轮微任务执行完毕，执行第二轮宏事件，打印setTimeout里面内容'内层宏事件3'

宏任务
 

#	                    浏览器	    Node
setTimeout	           √	        √
setInterval	           √	        √
setImmediate	         x	        √
requestAnimationFrame	 √	        x
 

微任务
#	                         浏览器	   Node
process.nextTick	           x	      √
MutationObserver	           √	      x
Promise.then catch finally	 √	      √  

其中在同一轮任务中process.nextTick的回调函数调用早于Promise.then catch finally
*/
//  这个例子看懂基本js执行机制就理解了

//主线程直接执行
console.log('1');
//丢到宏事件队列中
setTimeout(function() {
    console.log('2');
    setTimeout(() => {
      console.log(20)
      process.nextTick(function() {
        console.log('21');
      })
      new Promise(function(resolve) {
          console.log('22');
          resolve();
      }).then(function() {
          console.log('23')
      })
      process.nextTick(function() {
        console.log('25');
      })
    }, 0);
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
//微事件1
process.nextTick(function() {
    console.log('6');
})
//主线程直接执行
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    //微事件2
    console.log('8')
})
//丢到宏事件队列中
setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})

// node环境中运行结果如下
// 1 7 6 8 2 4 9 11 3 10 5 12 20 22 21 25 23

/*
• 首先浏览器执行js进入第一个宏任务进入主线程, 直接打印console.log('1')

• 遇到 setTimeout  分发到宏任务Event Queue中

• 遇到 process.nextTick 丢到微任务Event Queue中

• 遇到 Promise， new Promise 直接执行 输出 console.log('7');

• 执行then 被分发到微任务Event Queue中

•第一轮宏任务执行结束，开始执行微任务 打印 6,8

•第一轮微任务执行完毕，执行第二轮宏事件，执行setTimeout

•先执行第一、二个setTimeout主线程宏任务，在执行微任务，打印'2,4,9,11'

•再执行第一、二个setTimeout里面的微任务process.nextTick()，打印 ‘3 10’
•再执行第一、二个setTimeout里面的微任务.then()，打印 ‘5 12’
•再执行第一个setTimeout里面的主线程宏任务setTimeout里面的回调函数中的主线程宏任务，打印 ‘20 22’
•再执行第一个setTimeout里面的主线程宏任务setTimeout里面的回调函数中的微任务process.nextTick()，打印 ‘21 25’
•再执行第一个setTimeout里面的主线程宏任务setTimeout里面的回调函数中的微任务.then()，打印 ‘23’
•

*/
// 整段代码，共进行了三次事件循环，完整的输出为1 7 6 8 2 4 9 11 3 10 5 12 20 22 21 25 23
// 以上是在浏览器环境下执行的数据，只作为宏任务和微任务的分析，我在node环境下测试打印出来的顺序为：1，7，6，8，2，4，9，11，3，10，5，12。node环境执行结果和浏览器执行结果不一致的原因是：浏览器的Event loop是在HTML5中定义的规范，而node中则由libuv库实现。libuv库流程大体分为6个阶段：timers，I/O callbacks，idle、prepare，poll，check，close callbacks，和浏览器的microtask，macrotask那一套有区别。
// 浏览器环境下会先将一个setTimeout回调函数中的宏任务跟微任务都执行完了才会去执行下一个宏任务队列