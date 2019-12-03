import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/api/admin/user/page', 
    method: 'get',
    data: query
  })
}

export function addObj(obj) {
  return request({
    url: '/api/admin/user', 
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/admin/user/' + id, 
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/admin/user/' + id, 
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return request({
    url: '/api/admin/user/' + id, 
    method: 'put',
    data: obj
  })
}

// 获取网关的接口
export function getUrl() {
  return request({
    url: '/api/admin/userMgr/platform/url', 
    method: 'get'
  })
}

