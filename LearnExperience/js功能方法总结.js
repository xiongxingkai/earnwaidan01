// 1.打散数组
function randomArr(arr) {
	return arr.slice().sort(() => Math.random() > .5)
}


// 2.数字金额千分位格式化处理
function toThousandFormatter(num) {
	const reg1 = /\B(?=(\d{3})+$)/g // 匹配空格
	const reg2 = /(?=(?!\b)(\d{3})+$)/g // 匹配空格
	const reg3 = /\d(?=(\d{3})+$)/g // // 匹配的数字
	const reg4 = /\d{1,3}(?=(\d{3})+$)/g // // 匹配的数字
	// return num.toString().replace(reg1, ',')
	return num.toString().replace(reg1, '$&,')
	// return num.toString().replace(reg2, ',')
	// return num.toString().replace(reg2, '$&,')
	// return num.toString().replace(reg3, '$&,')
	// return num.toString().replace(reg4, '$&,')
}


// 3.随机生成指定长度的ID
function getRandomId(length) { // length 不能大于10
	return Math.random().toString(36).substr(3,length)
}


// 4.生成随机HEX色值
function getRandomColor() {
	return "#" + Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0");
}


// 5.生成星级评分
function getScore(rate) {
	return "★★★★★☆☆☆☆☆".slice(5 - rate, 10 - rate);
}


// 6.操作URL查询参数
const params = new URLSearchParams(location.search.replace(/\?/ig, "")); // location.search = "?name=young&sex=male"
params.has("name"); // true
params.get("sex"); // "male"


// 7.取整      代替正数的Math.floor()，代替负数的Math.ceil()
const num1 = ~~ 1.69;
const num2 = 1.69 | 0;
const num3 = 1.69 >> 0;
// num1 num2 num3 => 1 1 1


// 8.补零
const FillZero = (num, len) => num.toString().padStart(len, "0");
const num = FillZero(169, 5);
// num => "00169"


// 9.转数值      只对null、""、false、数值字符串有效
const num1 = +null;
const num2 = +"";
const num3 = +false;
const num4 = +"169";
// num1 num2 num3 num4 => 0 0 0 169


// 10.时间戳
const timestamp = +newDate("2019-02-14");
// timestamp => 1550102400000


// 11.精确小数
const RoundNum = (num, decimal) =>Math.round(num * 10 ** decimal) / 10 ** decimal;
const num = RoundNum(1.69, 1);
// num => 1.7



// 12.判断奇偶
const OddEven = num => !!(num & 1) ? "odd" : "even";
const num = OddEven(2);
// num => "even"



// 13.取最小最大值
const arr = [0, 1, 2];
const min = Math.min(...arr);
const max = Math.max(...arr);
// min max => 0 2




// 14.生成范围随机数
const RandomNum = (min, max) =>Math.floor(Math.random() * (max - min + 1)) + min;
const num = RandomNum(1, 10);


// 15.短路运算符
const a = d && 1; // 满足条件赋值：取假运算，从左到右依次判断，遇到假值返回假值，后面不再执行，否则返回最后一个真值
const b = d || 1; // 默认赋值：取真运算，从左到右依次判断，遇到真值返回真值，后面不再执行，否则返回最后一个假值
const c = !d; // 取假赋值：单个表达式转换为true则返回false，否则返回true




// 16.判断数据类型
/*
可判断类型：undefined、null、string、number、
boolean、array、object、symbol、date、regexp、function、
asyncfunction、arguments、set、map、weakset、weakmap
*/
function DataType(tgt, type) {
    const dataType = Object.prototype.toString.call(tgt).replace(/\[object (\w+)\]/, "$1").toLowerCase();
    return type ? dataType === type : dataType;
}
DataType("young"); // "string"
DataType(20190214); // "number"
DataType(true); // "boolean"
DataType([], "array"); // true
DataType({}, "array"); // false



// 17.是否为空数组
const arr = [];
const flag = Array.isArray(arr) && !arr.length;
// flag => true



// 18.是否为空对象
const obj = {};
const flag = DataType(obj, "object") && !Object.keys(obj).length;
// flag => true




// 19.满足条件时执行
const flagA = true; // 条件A
const flagB = false; // 条件B
(flagA || flagB) && Func(); // 满足A或B时执行
(flagA || !flagB) && Func(); // 满足A或不满足B时执行
flagA && flagB && Func(); // 同时满足A和B时执行
flagA && !flagB && Func(); // 满足A且不满足B时执行
// 为非假值时执行



// 20.为非假值时执行
const flag = false; // undefined、null、""、0、false、NaN
!flag && Func();



// 21.数组不为空时执行
const arr = [0, 1, 2];
arr.length && Func();


// 22.对象不为空时执行
const obj = { a: 0, b: 1, c: 2 };
Object.keys(obj).length && Func();



// 23.函数退出代替条件分支退出
if (flag) {
    Func();
    returnfalse;
}
// 换成
if (flag) {
    return Func();
}



// 24.switch/case使用区间
const age = 26;
switch (true) {
    caseisNaN(age):
        console.log("not a number");
        break;
    case (age < 18):
        console.log("under age");
        break;
    case (age >= 18):
        console.log("adult");
        break;
    default:
        console.log("please set your age");
        break;
}




// 25.克隆数组
const _arr = [0, 1, 2];
const arr = [..._arr];
// arr => [0, 1, 2]



// 26.合并数组
const arr1 = [0, 1, 2];
const arr2 = [3, 4, 5];
const arr = [...arr1, ...arr2];
// arr => [0, 1, 2, 3, 4, 5];


// 27.去重数组
const arr = [...new Set([0, 1, 1, null, null])];
// arr => [0, 1, null]



// 28.混淆数组
const arr = [0, 1, 2, 3, 4, 5].slice().sort(() =>Math.random() - .5);
// arr => [3, 4, 0, 5, 1, 2]


// 29.清空数组
const arr = [0, 1, 2];
arr.length = 0;
// arr => []


// 30.截断数组
const arr = [0, 1, 2];
arr.length = 2;
// arr => [0, 1]



// 31.交换赋值
let a = 0;
let b = 1;
[a, b] = [b, a];
// a b => 1 0


// 32.过滤空值      空值：undefined、null、""、0、false、NaN
const arr = [undefined, null, "", 0, false, NaN, 1, 2].filter(Boolean);
// arr => [1, 2]



// 33.异步累计
asyncfunction Func(deps) {
    return deps.reduce(async(t, v) => {
        const dep = await t;
        const version = await Todo(v);
        dep[v] = version;
        return dep;
    }, Promise.resolve({}));
}
const result = await Func(); // 需在async包围下使用




// 34.数组首部插入成员
let arr = [1, 2]; // 以下方法任选一种
arr.unshift(0);
arr = [0].concat(arr);
arr = [0, ...arr];
arr.splice(0,0,0)
// arr => [0, 1, 2]



// 35.数组尾部插入成员
let arr = [0, 1]; // 以下方法任选一种
arr.push(2);
arr = arr.concat(2);
arr.splice(arr.length,0)
arr[arr.length] = 2;
arr = [...arr, 2];
// arr => [0, 1, 2]



// 36.统计数组成员个数
const arr = [0, 1, 1, 2, 2, 2];
const count = arr.reduce((t, v) => {
	t[v] = t[v] ? ++t[v] : 1;
	return t;
}, {});
// count => { 0: 1, 1: 2, 2: 3 }


// 37.解构数组成员嵌套
const arr = [0, 1, [2, 3, [4, 5]]];
const [a, b, [c, d, [e, f]]] = arr;
// a b c d e f => 0 1 2 3 4 5


// 38.解构数组成员别名
const arr = [0, 1, 2];
const { 0: a, 1: b, 2: c } = arr;
// a b c => 0 1 2



// 39.解构数组成员默认值

const arr = [0, 1, 2];
const [a, b, c = 3, d = 4] = arr;
// a b c d => 0 1 2 4



// 40.获取随机数组成员

const arr = [0, 1, 2, 3, 4, 5];
const randomItem = arr[Math.floor(Math.random() * arr.length)];
// randomItem => 1


// 41.创建指定长度数组

const arr = [...new Array(3).keys()];
// arr => [0, 1, 2]



// 42.创建指定长度且值相等的数组

const arr = newArray(3).fill(0);
// arr => [0, 0, 0]



// 43.reduce代替map和filter

const _arr = [0, 1, 2];

// map
const arr = _arr.map(v => v * 2);
const arr = _arr.reduce((t, v) => {
    t.push(v * 2);
    return t;
}, []);
// arr => [0, 2, 4]

// filter
const arr = _arr.filter(v => v > 0);
const arr = _arr.reduce((t, v) => {
    v > 0 && t.push(v);
    return t;
}, []);
// arr => [1, 2]

// map和filter
const arr = _arr.map(v => v * 2).filter(v => v > 2);
const arr = _arr.reduce((t, v) => {
    v = v * 2;
    v > 2 && t.push(v);
    return t;
}, []);
// arr => [4]


// 44.克隆对象

const _obj = { a: 0, b: 1, c: 2 }; // 以下方法任选一种
const obj = { ..._obj };
const obj = JSON.parse(JSON.stringify(_obj));
// obj => { a: 0, b: 1, c: 2 }



// 45.合并对象

const obj1 = { a: 0, b: 1, c: 2 };
const obj2 = { c: 3, d: 4, e: 5 };
const obj = { ...obj1, ...obj2 };
// obj => { a: 0, b: 1, c: 3, d: 4, e: 5 }



// 46.对象字面量

// 获取环境变量时必用此方法，用它一直爽，一直用它一直爽

const env = "prod";
const link = {
    dev: "Development Address",
    test: "Testing Address",
    prod: "Production Address"
}[env];
// link => "Production Address"


// 47.对象变量属性

const flag = false;
const obj = {
    a: 0,
    b: 1,
    [flag ? "c" : "d"]: 2
};
// obj => { a: 0, b: 1, d: 2 }


// 48.创建纯空对象

const obj = Object.create(null);
Object.prototype.a = 0;
// obj => {}


// 49.删除对象无用属性

const obj = { a: 0, b: 1, c: 2 }; // 只想拿b和c
const { a, ...rest } = obj;
// rest => { b: 1, c: 2 }



// 50.解构对象属性嵌套

const obj = { a: 0, b: 1, c: { d: 2, e: 3 } };
const { c: { d, e } } = obj;
// d e => 2 3



// 51.解构对象属性别名

const obj = { a: 0, b: 1, c: 2 };
const { a, b: d, c: e } = obj;
// a d e => 0 1 2


// 52.解构对象属性默认值

const obj = { a: 0, b: 1, c: 2 };
const { a, b = 2, d = 3 } = obj;
// a b d => 0 1 3
Function Skill

// 53.函数自执行

const Func = function() {}(); // 常用

(function() {})(); // 常用
(function() {}()); // 常用
[function() {}()];

+ function() {}();
- function() {}();
~ function() {}();
! function() {}();

newfunction() {};
newfunction() {}();
voidfunction() {}();
typeoffunction() {}();
deletefunction() {}();

1, function() {}();
1 ^ function() {}();
1 > function() {}();


// 54.隐式返回值

// 只能用于单语句返回值箭头函数，如果返回值是对象必须使用()包住
const Func = function(name) {
    return"I Love " + name;
};
// 换成
const Func = name =>"I Love " + name;



// 55.一次性函数

// 适用于运行一些只需执行一次的初始化代码
function Func() {
    console.log("x");
    Func = function() {
        console.log("y");
    }
}


// 56.惰性载入函数

// 函数内判断分支较多较复杂时可大大节约资源开销
function Func() {
    if (a === b) {
        console.log("x");
    } else {
        console.log("y");
    }
}
// 换成
function Func() {
    if (a === b) {
        Func = function() {
            console.log("x");
        }
    } else {
        Func = function() {
            console.log("y");
        }
    }
    return Func();
}


// 57.检测非空参数

function IsRequired() {
    thrownewError("param is required");
}
function Func(name = IsRequired()) {
    console.log("I Love " + name);
}
Func(); // "param is required"
Func("You"); // "I Love You"


// 58.字符串创建函数

const Func = newFunction("name", "console.log(\"I Love \" + name)");





// 59.优雅处理错误信息

try {
    Func();
} catch (e) {
    location.href = "https://stackoverflow.com/search?q=[js]+" + e.message;
}



// 60.优雅处理Async/Await参数

function AsyncTo(promise) {
    return promise.then(data => [null, data]).catch(err => [err]);
}
const [err, res] = await AsyncTo(Func());



// 61.优雅处理多个函数返回值

function Func() {
    returnPromise.all([
        fetch("/user"),
        fetch("/comment")
    ]);
}
const [user, comment] = await Func(); // 需在async包围下使用



// 62.显示全部DOM边框

// 调试页面元素边界时使用
[].forEach.call($$("*"), dom => {
    dom.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
});


// 63.自适应页面

// 页面基于一张设计图但需做多款机型自适应，元素尺寸使用rem进行设置
function AutoResponse(width = 750) {
    const target = document.documentElement;
    target.clientWidth >= 600
        ? (target.style.fontSize = "80px")
        : (target.style.fontSize = target.clientWidth / width * 100 + "px");
}

// 64.过滤XSS

function FilterXss(content) {
    let elem = document.createElement("div");
    elem.innerText = content;
    const result = elem.innerHTML;
    elem = null;
    return result;
}


// 65.存取LocalStorage
// 反序列化取，序列化存
const love = JSON.parse(localStorage.getItem("love"));
localStorage.setItem("love", JSON.stringify("I Love You"));

// 66.输出一个键盘
(_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(x=>(o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["Bs","Tab","Caps","Enter"][p++]||'Shift',p])}\\|`,m+=y+(x+'    ').slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join`
`)()