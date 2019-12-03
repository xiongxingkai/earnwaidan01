import request from '@/utils/request'

// 页面初始化
export function getPageList(query) {
  return request({
    url: '/api/hr/employee/dispatch/page', 
    method: 'post',
    data: query
  })
}

// 新增
export function addTransfer(formData) {
  return request({
    url: '/api/hr/employee/dispatch', 
    method: 'post',
    data: formData
  })
}

// 编辑
export function editSave(query) {
  return request({
    url: '/api/hr/employee/dispatch', 
    method: 'put',
    data: query
  })
}

// 查看
export function editTransfer(rowId) {
  return request({
    url: '/api/hr/employee/dispatch/' + rowId, 
    method: 'get'
  })
}

// 删除
export function delTransfer(query) {
  return request({
    url: '/api/hr/employee/dispatch/del-employee-dispatch', 
    method: 'post',
    data: query
  })
}

// 带出信息接口
export function getDataInfo(num) {
  return request({
    url: '/api/hr/employee/dispatch/get-employee/' + num, 
    method: 'get'
  })
}

// 导出
export function getExport(query) {
  return request({
    url: '/api/hr/employee/dispatch/export', 
    method: 'post',
    responseType: 'arraybuffer',
    data: query
  })
}

// 待入职管理页面初始化
export function onboardingPage(query) {
  return request({
    url: '/api/hr/offer/page', 
    method: 'post',
    data: query
  })
}

// 数据字典接口
export function dictionaryDatabase(name) {
  return request({
    url: '/api/dict/dict/child-list/' + name, 
    method: 'get'
  })
}

// 部门接口
export function projectDepartmentNode(query) {
  return request({
    url: '/api/hr/hr/dept/list?deptNum=' + query, 
    method: 'get'
  })
}

// 放弃签约接口
export function abandon(id) {
  return request({
    url: '/api/hr/offer/abandon/' + id, 
    method: 'post'
  })
}

