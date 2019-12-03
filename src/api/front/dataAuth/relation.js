import request from '@/utils/request'

export function relationUpdate(param) {
  return request({
    url: '/api/admin/role-data-auth-relation/relation_update', 
    method: 'post',
    data: param
  })
}

export function queryRoleAuthList(query) {
  return request({
    url: '/api/admin/role-data-auth-relation/list', 
    method: 'post',
    data: query
  })
}

