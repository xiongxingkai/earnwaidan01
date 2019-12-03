import request from '@/utils/request'

// 人员编辑table初始化
export function personQuery(obj) {
  return request({
    url: '/api/admin/userMsg/queryUserPage',
    method: 'post',
    data: obj
  })
}

// 获取用户树
export function personTree(obj) {
  return request({
    url: '/api/admin/userMsg/getUserTree',
    method: 'get',
    data: obj
  })
}

// 部门树
export function deptTree(obj) {
  return request({
    url: '/api/hr/hr/dept/tree',
    method: 'get',
    data: obj
  })
}

// 初始化
export function getProjectList(typenumber, dirid) {
  return request({
    url: '/api/oa/knowledge/authority/detail-authority/' + typenumber + '/' + dirid,
    method: 'get'
  })
}

// 新增
export function saveJurisdiction(obj) {
  return request({
    url: '/api/oa/knowledge/authority/authority-add',
    method: 'post',
    data: obj
  })
}

// 清空
export function clearVal(obj) {
  return request({
    url: '/api/oa/knowledge/authority/del-auth-authority',
    method: 'post',
    data: obj
  })
}




