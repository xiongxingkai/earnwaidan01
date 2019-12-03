import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/api/admin/authority/rule/page', 
    method: 'post',
    data: query
  })
}

export function addObj(obj) {
  return request({
    url: '/api/admin/authority/rule', 
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/admin/authority/rule/' + id, 
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/admin/authority/rule/' + id, 
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/admin/authority/rule', 
    method: 'put',
    data: obj
  })
}

export function addMatrix(obj) {
  return request({
    url: '/api/admin/authority/rule/matrix', 
    method: 'post',
    data: obj
  })
}

export function getMatrix(id) {
  return request({
    url: '/api/admin/authority/rule/matrix/' + id, 
    method: 'get'
  })
}

export function delMatrix(id) {
  return request({
    url: '/api/admin/authority/rule/matrix/' + id, 
    method: 'delete'
  })
}

export function delMatrixByField(query) {
  return request({
    url: '/api/admin/authority/rule/matrix/delete-by-field', 
    method: 'delete',
    data: query
  })
}

export function putMatrix(obj) {
  return request({
    url: '/api/admin/authority/rule/matrix', 
    method: 'put',
    data: obj
  })
}

export function listMatrix(obj) {
  return request({
    url: '/api/admin/authority/rule/matrix/as-matrix', 
    method: 'post',
    data: obj
  })
}

export function pageMatrix(obj) {
  return request({
    url: '/api/admin/authority/rule/matrix/page', 
    method: 'post',
    data: obj
  })
}

export function addField(obj) {
  return request({
    url: '/api/admin/authority/field', 
    method: 'post',
    data: obj
  })
}

export function getField(id) {
  return request({
    url: '/api/admin/authority/field/' + id, 
    method: 'get'
  })
}

export function delField(id) {
  return request({
    url: '/api/admin/authority/field/' + id, 
    method: 'delete'
  })
}

export function putField(obj) {
  return request({
    url: '/api/admin/authority/field', 
    method: 'put',
    data: obj
  })
}

export function syncMatrixUser(ruleId) {
  return request({
    url: '/api/admin/authority/rule/matrix/sync-user/' + ruleId, 
    method: 'get'
  })
}


