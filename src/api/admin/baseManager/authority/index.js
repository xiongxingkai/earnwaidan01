import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/api/admin/authority/page', 
    method: 'post',
    data: query
  })
}

export function pageTree(query) {
  return request({
    url: '/api/admin/authority/page-tree', 
    method: 'post',
    data: query
  })
}

export function listTree(query) {
  return request({
    url: '/api/admin/authority/tree', 
    method: 'post',
    data: query
  })
}

export function addObj(obj) {
  return request({
    url: '/api/admin/authority', 
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/admin/authority/' + id, 
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/admin/authority/' + id, 
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/admin/authority/', 
    method: 'put',
    data: obj
  })
}

export function getRouter() {
  return request({
    url: '/api/admin/authority/router', 
    method: 'get'
  })
}

export function getSynchronize() {
  return request({
    url: '/api/admin/authority/synchronize', 
    method: 'get'
  })
}




