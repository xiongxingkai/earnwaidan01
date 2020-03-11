function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if ((time + '').length === 10) {
    time = +time * 1000
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date 
  if (typeof time === 'object') {
    date = time
  } else {
    // if (('' + time).length === 10) {
    //  //  time = parseInt(time) * 1000
    //  date = new Date(time)
    // }
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    }
    if (result.length > 0 && value < 10) {
       value = '0' + value
     }
     return value || 0
  })
  return time_str
}

export function formatDate(datetime) {
  if (datetime !== null && datetime) {
    const date = new Date(datetime)
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const d = date.getDate()
    return ( y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d))
  }
  return datetime
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now -d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
   return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**数字 格式化 */
export function nFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E'},
    { value: 1E15, symbol: 'P'},
    { value: 1E12, symbol: 'T'},
    { value: 1E9, symbol: 'G'},
    { value: 1E6, symbol: 'M'},
    { value: 1E3, symbol: 'K'},
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g), ',')
}
// 千分位格式化 保留两位小数
export function toThousandsFormates(num) {
  if (
    num !== null && num !== undefined && num !== ''
    && (typeof num === 'number' || typeof num === 'string') && !isNaN(Number(num))
  ) {
    const arr = String(num).split('.')
    const reg = /(?=(?!\b)(\d{3})+$)/g // 匹配的空格 123 256
    // const reg = /\d{1,3}(?=(\d{3})+$)/g // 匹配的数字 13 256
    // const reg = /\d(?=(\d{3})+$)/g // 匹配的数字 13 265
    // arr[0] = arr[0].replace(reg, '$&,') //  $& 表示匹配的内容
    // arr[0] = arr[0].replace(reg, ',')
    return (arr[0].replace(reg, '$&,') + '.' + (arr[1] === undefined ? '00' : arr[1].length === 1 ? arr[1] + '0' : arr[1].slice(0, 2)))
  } else if (num === null || num === undefined || num === '') {
    return ''
  } else {
    return '0.00'
  }
}
// 将数值进行四舍五入
export function roundNum(num, n) {
  if (n % 1 !== 0) {
    return 0
  }
  if (num !== null && num !== undefined && num !== ''
  && (typeof num === 'number' || typeof num === 'string') && !isNaN(Number(num))) {
    num *= 10 ** n
    num = Math.round(num)
    num /= 10 ** n
    return num
  } else {
    return 0
  }
}