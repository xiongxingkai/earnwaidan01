import request from '@/utils/request'
import requestHttps from '@/utils/requestHttps'

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

export const infoPage = {
  page: 1,
  limit: 10,
  blockNo: 'hrWageInfoSearch'
}

// page
export function pageList(query) {
  return requestHttps({
    url: '/api/salary/front/data/page?params=' + query,
    method: 'get',
  })
}

export const fieldName = {
  getTableTitle: 'hrWageInfoTable', // 表头
  getSearch: 'hrWageInfoSearch', // 查询框初始化
  getFormList: 'hrWageInfoForm', // 表单列表
  getOperation: 'hrWageInfoOperation', // 操作列表的按钮组
  getButton: 'hrWageInfoButton' // 按钮组(比如新增、批量删除、导出等)
}


// 编辑提交
export function DetailSave(query) {
  return requestHttps({
    url: '/api/salary/front/data/update',
    method: 'put',
    data: query
  })
}

// 获取详情
export function getDetail(obj) {
  return requestHttps({
    url: '/api/salary/front/data/detail',
    method: 'post',
    data: obj
  })
}

// 工资条导入
export function importEx(obj) {
  return requestHttps({
    url: '/api/salary/excel-import/wage_info',
    method: 'post',
    data: obj
  })
}

// 删除
export function batchDelete(urls, methods, object) {
  return request({
    url: urls,
    method: methods,
    data: object
  })
}

// 编辑提交
export function DetailSave(obj) {
  return request({
    url: '/api/oa/office-services-source',
    method: 'put',
    data: query
  })
}

// 批量删除
export function batchDelete(ids) {
  return request({
    url: '/api/salary/front/data/delete',
    method: 'delete',
    data: ids
  })
}





