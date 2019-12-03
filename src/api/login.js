import request from '@/utils/request'

export function loginByUsername(username, password, captchaId, captcha, accountType) {
  const data = {
    username,
    password,
    captchaId,
    captcha,
    accountType
  }
  return request({
    url: '/api/admin/auth/jwt/token',
    method: 'post',
    data
  })
}

export function logout(token) {
  return request({
    url: '/api/admin/auth/jwt/invalid',
    method: 'post',
    params: { token }
  })
}

export function getGaptcha() {
  return request({
    url: '/api/admin/captcha/person',
    method: 'get'
  })
}

export function getInfo() {
  return request({
    url: '/api/admin/user/front/info',
    method: 'get'
  })
}

export function getAllMenus() {
  return request({
    url: '/api/admin/user/front/all-menus',
    method: 'get'
  })
}

export function getAllElements() {
  return request({
    url: '/api/admin/user/front/all-elements',
    method: 'get'
  })
}

export function getMenus(parentId) {
  return request({
    url: '/api/admin/user/front/menus',
    method: 'get',
    params: { parentId }
  })
}

export function getTopMenus() {
  return request({
    url: '/api/admin/user/front/top-menus',
    method: 'get'
  })
}

export function phoneCaptcha(cellphone, captchaType) {
  return request({
    url: '/api/admin/captcha/phone',
    method: 'get',
    params: { cellphone, captchaType }
  })
}

export function findPassword(cellphone, captchaId, captcha, password, accountType) {
  return request({
    url: '/api/admin/auth/jwt/find-password',
    method: 'post',
    params: { cellphone, captchaId, captcha, password, accountType }
  })
}


