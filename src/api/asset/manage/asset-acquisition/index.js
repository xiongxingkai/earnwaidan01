import request from '@/utils/request'

// 初始化
export function assetPage(query) {
  return request({
    url: '/api/asset/assets-info/query-page-asset', 
    method: 'post',
    data: query
  })
}

// 资产类别
export function assetClass() {
  return request({
    url: '/api/asset/assets-info/get-asset-class', 
    method: 'post'
  })
}

// 资产类型
export function assetType() {
  return request({
    url: '/api/asset/assets-info/get-asset-type', 
    method: 'post'
  })
}

// 使用状态
export function userStatus() {
  return request({
    url: '/api/asset/assets-info/get-asset-uses-state', 
    method: 'post'
  })
}

export function list() {
  return request({
    url: '/api/asset/assets-info/list', 
    method: 'get'
  })
}

// 新增
export function addAsset(query) {
  return request({
    url: '/api/asset/assets-info', 
    method: 'post',
    data: query
  })
}

// 修改
export function editAsset(query) {
  return request({
    url: '/api/asset/assets-info', 
    method: 'put',
    data: query
  })
}

// 获取详情数据
export function geiAssetdetail(assetId) {
  return request({
    url: '/api/asset/assets-info/get-detail/' + assetId, 
    method: 'get'
  })
}

export function removeAssets(query) {
  return request({
    url: '/api/asset/assets-info/remove-batch/', 
    method: 'post',
    data: query
  })
}

// 获取弹框该项目部门的接口
export function projectDepartmentlist() {
  return request({
    url: '/api/hr/hr/dept/biz/list', 
    method: 'get'
  })
}

// 输入资产编号赋值
export function getAssetNum(num) {
  return request({
    url: '/api/asset/assets-info/by-number/' + num,  
    method: 'get'
  })
}

// 删除
export function assetDel(id) {
  return request({
    url: '/api/asset/assets-info/del-asset/' + id,  
    method: 'delete'
  })
}

// 批量提交
export function saveAllup(ids) {
  return request({
    url: '/api/asset/assets-info/post-asset',  
    method: 'post',
    data: ids
  })
}

// 点击编辑保存提交
export function putAssetDate(formData) {
  return request({
    url: '/api/asset/assets-info',  
    method: 'put',
    data: formData
  })
}

export function getAssetByNumber(query) {
  return request({
    url: '/api/asset/assets-info/by-number/' + query,  
    method: 'get'
  })
}

export function getAssetById(query) {
  return request({
    url: '/api/asset/assets-info/get-detail/' + query,  
    method: 'get'
  })
}

export function getAssetByIds(query) {
  return request({
    url: '/api/asset/assets-info/get-detail-ids',  
    method: 'post',
    data: query
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

// 所有使用单位-部门小组接口
export function peojectDepartmentTeam() {
  return request({
    url: '/api/hr/hr/dept/all-list',  
    method: 'get'
  })
}

// 数据字典接口
export function dictionaryDatabase(name) {
  return request({
    url: '/api/dict/dict/child-list/' + name,  
    method: 'get'
  })
}

