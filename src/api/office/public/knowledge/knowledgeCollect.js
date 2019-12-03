import request from '@/utils/request'

export function getKnowledgeCollect(obj) {
  return request({
    url: '/api/oa/knowledge/doc-collect/page',
    method: 'post',
    data: obj
  })
}

export function getUserAuthority(id) {
  return request({
    url: '/api/oa/knowledge/doc-collect/knowledge-authority-user/' + id,
    method: 'get'
  })
}

export function cancelCollect(id) {
  return request({
    url: '/api/oa/knowledge/doc-collect/' + id,
    method: 'delete'
  })
}

export function cancelCollectByIds(ids) {
  return request({
    url: '/api/oa/knowledge/doc-collect/cancel-collect',
    method: 'post',
    data: ids
  })
}

export function getCollectDetail(id) {
  return request({
    url: '/api/oa/knowledge/doc-collect/' + id,
    method: 'get'
  })
}
