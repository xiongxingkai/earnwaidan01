import request from '@/utils/request'

export function listTree(obj) {
  return request({
    url: '/api/oa/knowledge/tree/list',
    method: 'post',
    data: obj
  })
}

export function allTree(obj) {
  return request({
    url: '/api/oa/knowledge/tree/all/tree',
    method: 'post',
    data: obj
  })
}

export function addTreeNewNode(obj) {
  return request({
    url: '/api/oa/knowledge/tree/new-node',
    method: 'post',
    data: obj
  })
}

export function editTreeNode(obj) {
  return request({
    url: '/api/oa/knowledge/tree',
    method: 'put',
    data: obj
  })
}

export function getTreeNode(id) {
  return request({
    url: '/api/oa/knowledge/tree/' + id,
    method: 'get'
  })
}

export function deleteTreeNode(id) {
  return request({
    url: '/api/oa/knowledge/tree/' + id,
    method: 'delete'
  })
}

export function pageDoc(obj) {
  return request({
    url: '/api/oa/knowledge/doc/page',
    method: 'post',
    data: obj
  })
}

export function addDoc(obj) {
  return request({
    url: '/api/oa/knowledge/doc',
    method: 'post',
    data: obj
  })
}

export function deleteDocs(obj) {
  return request({
    url: '/api/oa/knowledge/doc/delete-docs',
    method: 'post',
    data: obj
  })
}

export function getDoc(id) {
  return request({
    url: '/api/oa/knowledge/doc/' + id,
    method: 'get'
  })
}

export function editDoc(obj) {
  return request({
    url: '/api/oa/knowledge/doc',
    method: 'put',
    data: obj
  })
}

export function getAuthority() {
  return request({
    url: '/api/oa/knowledge/tree/knowledge-authority',
    method: 'get'
  })
}

export function collectionTheKnowledge(obj) {
  return request({
    url: '/api/oa/knowledge/doc-collect',
    method: 'post',
    data: obj
  })
}

export function collectionTheUserKnowledge(id) {
  return request({
    url: '/api/oa/knowledge/doc-collect/cancel-collect-as-knowledge/' + id,
    method: 'delete'
  })
}

export function moveDocs(obj) {
  return request({
    url: '/api/oa/knowledge/doc/move',
    method: 'post',
    data: obj
  })
}





