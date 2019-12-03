import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/api/oa/appManage/page',
    method: 'post',
    data: query
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










