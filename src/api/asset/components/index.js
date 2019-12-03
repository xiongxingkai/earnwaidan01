import request from '@/utils/request'

export function getUserList() {
  return request({
    url: '/api/admin/userMgr/getUserList', 
    method: 'get'
  })
}

export function getUserTree() {
  return request({
    url: '/api/admin/userMgr/getUserTree', 
    method: 'get'
  })
}


