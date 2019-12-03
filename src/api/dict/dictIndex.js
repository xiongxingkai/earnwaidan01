import request from '@/utils/request'

export function dictPage(query) {
  return request({
    url: '/api/dict/sys-dict/query-dict-page', 
    method: 'post',
    data: query
  })
}

export function addDictData(query) {
  return request({
    url: '/api/dict/sys-dict/add-dict', 
    method: 'post',
    data: query
  })
}

export function modifyDictData(query) {
  return request({
    url: '/api/dict/sys-dict/modify-dict', 
    method: 'post',
    data: query
  })
}

export function delDictData(query) {
  return request({
    url: '/api/dict/sys-dict/del-dict', 
    method: 'post',
    data: query
  })
}

export function getDictData(query) {
  return request({
    url: '/api/dict/sys-dict/detail-dict/' + query, 
    method: 'get'
  })
}
