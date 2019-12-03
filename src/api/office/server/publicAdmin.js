import request from '@/utils/request'

// *****************************************admin服务器的接口传参********************************

// 查询和表头、操作按钮组、按钮组的接口
export function titleList(query) {
  return request({
    url: '/api/admin/front/list',
    method: 'post',
    data: query
  })
}

// 表单列表生成
export function getFormList(query) {
  return request({
    url: '/api/admin/front/form/configs',
    method: 'post',
    data: query
  })
}

// export const vehiclePage = {
//   page: 1,
//   limit: 10,
//   type: 1
// }

// page
export function pageList(query) {
  return request({
    url: '/api/admin/front/data/page?params=' + query,
    method: 'get'
  })
}

// 通过路由获取对应字段
export function getServiceNames(obj) {
  return request({
    url: '/api/admin/front/srevice/list',
    method: 'post',
    data: obj
  })
}


// export const fieldName = {
//   getTableTitle: 'resourceTable', // 表头
//   getSearch: 'resourceSearch', // 查询框初始化
//   getFormList: 'resourceForm', // 表单列表
//   getOperation: 'resourceOperation', // 操作列表的按钮组
//   getButton: 'resourceButton' // 按钮组(比如新增、批量删除、导出等)
// }


// 新增提交
export function addSave(query) {
  query.sourceType = 1
  return request({
    url: '/api/admin/front/data/add',
    method: 'post',
    data: query
  })
}

// 编辑提交
export function DetailSave(query) {
  return request({
    url: '/api/admin/front/data/update',
    method: 'put',
    data: query
  })
}

// 获取详情
export function getDetail(obj) {
  return request({
    url: '/api/admin/front/data/detail',
    method: 'post',
    data: obj
  })
}


// 删除行
export function deleteRow(urls, methods, obj) {
  return request({
    url: urls,
    method: methods,
    data: obj
  })
}

// 删除行 这是oa 服务的，没有用到
export function infoDelete(id) {
  return request({
    url: '/api/oa/office-services-source/' + id,
    method: 'delete'
  })
}

// 批量删除
export function batchDelete(ids) {
  return request({
    url: '/api/admin/front/data/delete',
    method: 'delete',
    data: ids
  })
}


// 导出数据
export const getExport = {
  configUrl: '/ReportServer?reportlet=/OfficeServiceSourceTemplate/PrivateSourceTemplate.cpt&op=view&format=excel',
  apiUrl: '/api/oa/office-services-source/export',
  result: 'subordinatePartName,projectManagerName,ipAddress,exampleId,ProjectName,name,hostComputerCpu,hostMemory,operatingSystem',
  params: '&params=type=2',
  paramsSearch: {}
}

// 工资条导入
export function importEx(obj) {
  return request({
    url: '/api/salary/excel-import/wage_info',
    method: 'post',
    data: obj
  })
}

// 工作流提交
export function taskSubmit(obj) {
  return request({
    url: '/api/admin/form/workflow/submit',
    method: 'post',
    data: obj
  })
}

// 工作流审批
export function taskApproval(obj) {
  return request({
    url: '/api/admin/form/workflow/approval',
    method: 'post',
    data: obj
  })
}

// 工作流驳回
export function taskReject(obj) {
  return request({
    url: '/api/admin/form/workflow/reject',
    method: 'post',
    data: obj
  })
}

// 获取关联数据
export function getLinkage(obj) {
  return request({
    url: '/api/admin/front/data/linkage',
    method: 'post',
    data: obj
  })
}


