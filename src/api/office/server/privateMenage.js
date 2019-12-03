import request from '@/utils/request'

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

export const vehiclePage = {
  page: 1,
  limit: 10,
  type: 1
}

// page
export function pageList(query) {
  return request({
    url: '/api/oa/office-services-source/page',
    method: 'post',
    data: query
  })
}

export const fieldName = {
  getTableTitle: 'resourceTable', // 表头
  getSearch: 'resourceSearch', // 查询框初始化
  getFormList: 'resourceForm', // 表单列表
  getOperation: 'resourceOperation', // 操作列表的按钮组
  getButton: 'resourceButton' // 按钮组(比如新增、批量删除、导出等)
}


// 新增提交
export function addSave(query) {
  query.sourceType = 1
  return request({
    url: '/api/oa/office-services-source',
    method: 'post',
    data: query
  })
}

// 编辑提交
export function DetailSave(query) {
  return request({
    url: '/api/oa/office-services-source',
    method: 'put',
    data: query
  })
}

// 删除行
export function AliDelete(id) {
  return request({
    url: '/api/oa/office-services-source/' + id,
    method: 'delete'
  })
}

// 批量删除
export function batchDelete(ids) {
  return request({
    url: '/api/oa/office-services-source/del',
    method: 'post',
    data: ids
  })
}

// 获取详情
export function getDetail(id) {
  return request({
    url: '/api/oa/office-services-source/' + id,
    method: 'get'
  })
}

// 导出数据
export const getExport = {
  configUrl: '/ReportServer?reportlet=/OfficeServiceSourceTemplate/PrivateSourceTemplate.cpt&op=view&format=excel',
  apiUrl: '/api/oa/office-services-source/export',
  result: 'subordinatePartName,projectManagerName,ipAddress,exampleId,ProjectName,hostComputerCpu,hostMemory,operatingSystem,usedSpace',
  params: '&params=type=1',
  paramsSearch: {}
}



