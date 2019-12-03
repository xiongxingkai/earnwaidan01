import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/api/asset/assets-info/page', 
    method: 'post',
    data: query
  })
}

export function getAsset(query) {
  return request({
    url: '/api/asset/assets-info/get-detail/' + query, 
    method: 'get'
  })
}

export function list(query) {
  return request({
    url: '/api/asset/assets-info/list', 
    method: 'post',
    data: query
  })
}

export function addAsset(query) {
  return request({
    url: '/api/asset/assets-info', 
    method: 'post',
    data: query
  })
}

export function editAsset(query) {
  return request({
    url: '/api/asset/assets-info', 
    method: 'put',
    data: query
  })
}

export function removeAssets(query) {
  return request({
    url: '/api/asset/assets-info/remove-batch', 
    method: 'post',
    data: query
  })
}

// 获取弹框该项目部门的接口
export function projectDepartmentlist() {
  return request({
    url: '/api/hr/hr/dept/list', 
    method: 'get'
  })
}

// 导出接口
export function exportData() {
  return request({
    url: '/api/asset/assets-info/export', 
    method: 'get',
    responseType: 'arraybuffer'
  })
}

// 启动再盘
export function startToAsset() {
  return request({
    url: '/api/asset/assets-info/start-to-asset',  
    method: 'get'
  })
}


