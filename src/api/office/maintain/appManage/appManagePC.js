import request from '@/utils/request'
import requestCors from '@/utils/requestCors'

export function page(query) {
  return request({
    url: '/api/oa/appManage/page',
    method: 'post',
    data: query
  })
}

export function list(obj) {
  return request({
    url: '/api/oa/appManage/list',
    method: 'post',
    data: obj
  })
}

export function addObj(obj) {
  return request({
    url: '/api/oa/appManage',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/oa/appManage/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/oa/appManage/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/oa/appManage',
    method: 'put',
    data: obj
  })
}

export function linkSystemCheckSum() {
  return request({
    url: '/api/oa/check-sum/get',
    method: 'get'
  })
}

export function autoLogin(login_url, obj) {
  return requestCors({
    url: login_url,
    method: 'post',
    data: obj
  })
}