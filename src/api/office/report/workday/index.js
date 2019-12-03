import request from '@/utils/request'

export function page(obj) {
  return request({
    url: '/api/oa/workday/page',
    method: 'post',
    data: obj
  })
}

export function addObj(obj) {
  return request({
    url: '/api/oa/workday',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/oa/workday/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/oa/workday/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/oa/workday',
    method: 'put',
    data: obj
  })
}

export function exportList(obj) {
  return request({
    url: '/api/oa/workday/export',
    method: 'post',
    responseType: 'arraybuffer',
    data: obj
  })
}

export function modifySatusObj(status, id) {
  return request({
    url: '/api/oa/workday/updata-status?status=' + status+ '&id=' + id,
    method: 'get'
  })
}

export function getPhone() {
  return request({
    url: '/api/oa/workday/get-phone',
    method: 'get'
  })
}


