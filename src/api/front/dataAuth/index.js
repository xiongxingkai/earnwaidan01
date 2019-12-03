import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/api/admin/data-auth/user/page', 
    method: 'post',
    data: query
  })
}

export function ownedPage(query) {
  return request({
    url: '/api/admin/data-auth/user/owner/page', 
    method: 'post',
    data: query
  })
}

export function addObj(obj) {
  return request({
    url: '/api/admin/data-auth', 
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/admin/data-auth/' + id, 
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/admin/data-auth/' + id, 
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/admin/data-auth', 
    method: 'put',
    data: obj
  })
}

export function delBatchObj(ids) {
  return request({
    url: '/api/admin/data-auth/batch-delete', 
    method: 'post',
    data: ids
  })
}

export function selectCategoryRange() {
  return request({
    url: '/api/admin/data-auth/select-category', 
    method: 'get'
  })
}

export function selectFieldRange(param) {
  return request({
    url: '/api/admin/data-auth/select-field-list', 
    method: 'post',
    data: param
  })
}