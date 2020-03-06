// 方法一
function filter_fn_1(arr) {
	return Array.from(new Set(arr))
}
// 方法二
function filter_fn_2(arr) {
	const obj = {}
	arr.forEach(item => {
		if (!obj[item]) {
			obj[item] = true
		}
	})
	return Object.keys(obj)
}
// 方法三
function filter_fn_3(arr) {
	const map = new Map()
	arr.forEach(item => {
		if (!map.has(item)) {
			map.set(item, true)
		}
	})
	return [...map].map(item => item[0])
}
// 方法四
function filter_fn_4(arr) {
	// return arr.filter((val, key, item) => item.indexOf(val) === item.lastIndexOf(val))
	const nArr = []
	arr.forEach(item => {
		if (!nArr.includes(item)) {
			nArr.push(item)
		}
	})
	return nArr
}