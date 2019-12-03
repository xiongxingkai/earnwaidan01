import request from '@/utils/request'
/**
 * 此处占位
*/

export function getProfile() {
  return request({
    url: '/api/admin/personal/get-profile',
    method: 'get'
  })
}

export function updateProfile(obj) {
  return request({
    url: '/api/admin/personal/get-profile',
    method: 'post',
    data: obj
  })
}

export function changePassword(password, newPassword) {
  return request({
    url: '/api/admin/personal/change-password',
    method: 'post',
    params: { password, newPassword }
  })
}

/**
 * 
 * 获取个人设备锁列表
 */
export function getDeviceLock() {
  return request({
    url: '/api/admin/personal/device-lock/list',
    method: 'post'
  })
}

/**
 * 申请解绑
 */
export function applyUnBind(id) {
  return request({
    url: '/api/admin/personal/device-lock/apply-unbind',
    method: 'post',
    params: { id }
  })
}

/**
 * 申请绑定
 */
export function applyBind(macAddress, equipementType) { // mac地址， 设备型号
  return request({
    url: '/api/admin/personal/device-lock/apply',
    method: 'post',
    params: { macAddress, equipementType }
  })
}

/**
 * 
 * 设备锁校验
 */
export function verfication(macAddress, equipementType) { // mac地址， 设备型号
  return request({
    url: '/api/admin/personal/device-lock/verification',
    method: 'post',
    params: { macAddress, equipementType }
  })
}

export function loginLog(obj) {
  return request({
    url: '/api/admin/login-log/check-in',
    method: 'post',
    data: obj
  })
}












