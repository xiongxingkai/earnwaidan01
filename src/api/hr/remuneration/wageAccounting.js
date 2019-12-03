import request from '@/utils/request'
import requestHttps from '@/utils/requestHttps'

// 页面初始化
export function waglist(query) {
  return request({
    url: '/api/salary/calculation/page',
    method: 'post',
    data: query
  })
}

// 编辑保存
export function editWag(query) {
  return request({
    url: '/api/salary/calculation',
    method: 'put',
    data: query
  })
}

// 详情
export function getWag(id) {
  return request({
    url: '/api/salary/calculation/' + id,
    method: 'get'
  })
}

// 计算当月工资
export function calculateSalary() {
  return request({
    url: '/api/salary/calculation/compute',
    method: 'get'
  })
}

// 导入
export function importEx(obj, name) {
  return requestHttps({
    url: '/api/salary/excel-import/' + name,
    method: 'post',
    data: obj
  })
}

// 自动导出接口
export function autoExport(serviceName) {
  return requestHttps({
    url: '/api/salary/excel-import/' + serviceName,
    method: 'post',
    responseType: 'arraybuffer'
  })
}

// 批量删除
export function batchDeleteData(queryIds) {
  return request({
    url: '/api/salary/calculation/batch',
    method: 'delete',
    data: queryIds
  })
}





