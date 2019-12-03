import request from '@/utils/request'

export function page(query) {
  return request({
    url: '/api/asset/assets/inventory/page', 
    method: 'post',
    data: query
  })
}

export function getAsset(query) {
  return request({
    url: '/api/asset/assets/inventory/' + query, 
    method: 'get'
  })
}

export function addAsset(query) {
  return request({
    url: '/api/asset/assets/inventory', 
    method: 'post',
    data: query
  })
}

export function editAsset(query) {
  return request({
    url: '/api/asset/assets/inventory', 
    method: 'put',
    data: query
  })
}

export function removeAssets(query) {
  return request({
    url: '/api/asset/assets/inventory/remove-batch', 
    method: 'post',
    data: query
  })
}

export function getReportAuditData(query) {
  return request({
    url: '/api/asset/assets/inventory/report-audit-data', 
    method: 'post',
    data: query
  })
}

// 文件导出
export function GetExport(obj) {
  return request({
    url: '/api/file-server/FineReport', 
    method: 'post',
    responseType: 'arraybuffer',
    data: obj
  })
}

// 导出
export function getAssetExport(query) {
  return request({
    url: '/api/asset/assets-info/export',  
    method: 'post',
    responseType: 'arraybuffer',
    data: query
  })
}


