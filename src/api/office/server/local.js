import request from '@/utils/request'

// ****************************以下是本地服务的共用接口-传入参数按照以下标准即可共用封装好的组件*********************************************************

// table初始化
export function pageList(query) {
  return request({
    url: '/api/admin/front/data/page?params=' + query,
    method: 'get'
  })
}

// 请求数据的动态字段
export const fieldName = {
  getTableTitle: 'blackTable', // 表头
  getSearch: 'blackSearch', // 查询框初始化
  getFormList: 'blackForm', // 表单列表
  getOperation: 'blackOperation', // 操作列表的按钮组
  getButton: 'blackButton' // 按钮组(比如新增、批量删除、导出等)
}

// 传到后台的字段
export const vehiclePage = {
  page: 1,
  limit: 10,
  type: 'blackSearch'
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

// 新增
export function addSave(query) {
  return request({
    url: '/api/admin/front/data',
    method: 'post',
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

// 编辑
export function DetailSave(query) {
  return request({
    url: '/api/admin/front/data/update',
    method: 'put',
    data: query
  })
}

// 行内删除
export function vehicleDelete(urls, methods, obj) {
  return request({
    url: urls,
    method: methods,
    data: obj
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
  params: '&params=type=1',
  paramsSearch: {}
}



