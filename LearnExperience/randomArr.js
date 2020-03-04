/*
华为编程题： 
随机生成n个0-1000之间的整数，并去除重复的数字，然后再由小到大排列
*/
function getSortRandom(n){
	n = Math.floor(n)
	var arr = new Array(n).fill(0).map(item => Math.floor(Math.random()*1000))
	arr = Array.from(new Set(arr))
	arr.sort((a, b) => a - b)
	return arr
}
// 接受一个16进制的字符，输出该字符以十进制表示的数字
function getNum16ToNum10(str) {
	return parseInt(str, 16)
}
