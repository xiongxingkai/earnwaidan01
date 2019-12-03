import request from '@/utils/request'
import requestHttps from '@/utils/requestHttps'

export const workflowApi = {
  HrLeaveApply: '/api/salary'
}

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
export function addSave(baseUrl, query) {
  query.sourceType = 1
  return requestHttps({
    url: baseUrl + '/front/data/add',
    method: 'post',
    data: query
  })
}

// page
export function pageList(baseUrl, query) {
  return requestHttps({
    url: baseUrl + '/front/data/page?params=' + query,
    method: 'get'
  })
}

// 编辑提交
export function DetailSave(baseUrl, query) {
  return requestHttps({
    url: baseUrl + '/front/data/update',
    method: 'put',
    data: query
  })
}

// 获取详情
export function getDetail(baseUrl, obj) {
  return requestHttps({
    url: baseUrl + '/front/data/detail',
    method: 'post',
    data: obj
  })
}


// 删除行
export function deleteRow(urls, methods, obj) {
  return requestHttps({
    url: urls,
    method: methods,
    data: obj
  })
}

// // 删除行 这是oa 服务的，没有用到
// export function infoDelete(id) {
//   return request({
//     url: '/api/oa/office-services-source/' + id,
//     method: 'delete'
//   })
// }

// 批量删除
export function batchDelete(baseUrl, ids) {
  return requestHttps({
    url: baseUrl + '/front/data/delete',
    method: 'delete',
    data: ids
  })
}

// 导入
export function importEx(baseUrl, obj, name) {
  return requestHttps({
    url: baseUrl + '/excel-import/' + name,
    method: 'post',
    data: obj
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

// 自动导出接口
export function autoExport(baseUrl, serviceName) {
  return requestHttps({
    url: baseUrl + '/excel-export/' + serviceName,
    method: 'post',
    responseType: 'arraybuffer'
  })
}

// 下载模板
export function downloadTemplate(baseUrl, serviceName) {
  return requestHttps({
    url: baseUrl + '/excel-download-template/' + serviceName,
    method: 'get',
    responseType: 'arraybuffer'
  })
}

// 获取下载文件名称
export function getFileName(serviceName) {
  return request({
    url: '/api/admin/data/property/get/' + serviceName,
    method: 'post'
  })
}


// 工作流提交
export function taskSubmit(baseUrl, obj) {
  return request({
    url: baseUrl + '/front/complex/workflow/start',
    method: 'post',
    data: obj
  })
}

// 工作流审批
export function taskApproval(baseUrl, obj) {
  return request({
    url: baseUrl + '/front/complex/workflow/handle/task',
    method: 'post',
    data: obj
  })
}

// 工作流驳回
export function taskReject(baseUrl, obj) {
  return request({
    url: baseUrl + '/fron/complex/workflow/reject/task',
    method: 'post',
    data: obj
  })
}

// 获取关联数据
export function getLinkage(baseUrl, obj) {
  return request({
    url: baseUrl + '/front/data/linkage',
    method: 'post',
    data: obj
  })
}

// 获取代办列表
export function todoList(baseUrl, obj) {
  return request({
    url: baseUrl + '/fron/complex/workflow/todo/list',
    method: 'post',
    data: obj
  })
}

// 获取未完成列表
export function unFinishList(baseUrl, obj) {
  return request({
    url: baseUrl + '/fron/complex/workflow/unFinish/list',
    method: 'post',
    data: obj
  })
}

// 获取已完成列表
export function finishedList(baseUrl, obj) {
  return request({
    url: baseUrl + '/fron/complex/workflow/finished/list',
    method: 'post',
    data: obj
  })
}


