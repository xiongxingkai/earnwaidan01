const pi = 3.14159265358979324
const a = 6378245.0
const ee = 0.00669342162296594323

/* 判断是否在国内，不在国内则不作偏移 */
function outOfChina(lat, lon) {
  if ((lon < 72.004 || lon > 137.8347) && (lat < 0.8293 || lat > 55.8271)) {
    return true
  } else {
    return false
  }
}
function transformLat(x, y) {
  let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
  ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0
  ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0
  return ret
}
function transformLon(x, y) {
  let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
  ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0
  ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0
  ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0 * pi)) * 2.0 / 3.0
  return ret
}
// 地球坐标系(WGS-84)转火星坐标系(GCJ)
export function WGS84ToMars(wgLat, wgLng) {
  const mars_point = { lng: 0, lat: 0 }
  const flag = outOfChina(wgLat, wgLng)
  if (flag) {
    mars_point.lat = wgLat
    mars_point.lng = wgLng
    return mars_point
  }
  let dLat = transformLat(wgLng - 105.0, wgLat - 35.0)
  let dLng = transformLon(wgLng - 105.0, wgLat - 35.0)
  const radLat = wgLat / 180.0 * pi
  let magic = Math.sin(radLat)
  magic = 1- ee * magic * magic
  const sqrtMagic = Math.sqrt(magic)
  dLat = dLat * 180.0 / (a * (1 - ee) / (magic * sqrtMagic) * pi)
  dLng = dLng * 180.0 / (a / sqrtMagic * Math.cos(radLat) * pi)
  mars_point.lat = wgLat + dLat
  mars_point.lng = wgLng + dLng
  return mars_point
}
/*百度坐标转火星坐标 */
export function baiduTomars(lat, lng) {
  const x_pi = 3.14159265358979324 * 3000.0 / 180.0
  const mars_point = { lon: 0, lat: 0 }
  const x = lng - 0.0065
  const y = lat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi)
  mars_point.lng = z * Math.cos(theta)
  mars_point.lat = z * Math.sin(theta)
  return mars_point
}
export function attachCenterPoint(list, geoList, keyName) {
  if (keyName === undefined) {
    keyName = 'id'
  }
  const mapList = list.map(item => {
    let lng = null
    let lat = null
    let latitude = 0
    let longitude = 0
    let count = 0
    for (let i = 0; i < geoList.length; ++i) {
      const item = geoList[i]
      if (item[keyName] === item.id) {
        latitude += parseFloat(item.latitude)
        longitude += parseFloat(item.longitude)
        count++
      }
    }
    if (count > 0) {
      lng = longitude / count
      lat = latitude / count
    } else {
      lng = 106
      lat = 37.5
    }
    item.longitude = lng
    item.latitude = lat
    return item
  })
  return mapList
}