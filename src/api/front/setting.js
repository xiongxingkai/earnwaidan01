import request from '@/utils/request'

// table初始化
export function getSettingPage(query) {
  return request({
    url: '/api/admin/front/page', 
    method: 'post',
    data: query
  })
}

// 新增
export function SettingAdd(object) {
  return request({
    url: '/api/admin/front', 
    method: 'post',
    data: object
  })
}

// 编辑
export function SettingModify(object) {
  return request({
    url: '/api/admin/front', 
    method: 'put',
    data: object
  })
}

//删除
export function SettingDel(id) {
  return request({
    url: '/api/admin/front/' + id, 
    method: 'delete'
  })
}

// get详情
export function SettingDetail(id) {
  return request({
    url: '/api/admin/front/' + id, 
    method: 'get'
  })
}

// 表单类型列表
export function BlockNoList() {
  return request({
    url: '/api/admin/front/block-no/list', 
    method: 'get'
  })
}

// 数据库列表
export function DatabaseList() {
  return request({
    url: '/api/admin/front/config/database/list', 
    method: 'get'
  })
}

// 数据库表分页
export function TablePage(query) {
  return request({
    url: '/api/admin/front/config/table/page', 
    method: 'post',
    data: query
  })
}

// 字段列表
export function ColumnsList(query) {
  return request({
    url: '/api/admin/front/config/columns/list', 
    method: 'post',
    data: query
  })
}

// 表字段列表
export function FieldsList(query) {
  return request({
    url: '/api/admin/front/config/fields/list', 
    method: 'post',
    data: query
  })
}

// 按钮列表
export function ButtonOperationList(query) {
  return request({
    url: '/api/admin/front/config/button-operation/list', 
    method: 'post',
    data: query
  })
}

// 配置详情
export function BlockDetail(query) {
  return request({
    url: '/api/admin/front/block/detail', 
    method: 'post',
    data: query
  })
}

// 保存所有配置
export function SaveAll(query) {
  return request({
    url: '/api/admin/front/config/save-all', 
    method: 'post',
    data: query
  })
}

export function getProcess(obj) {
  return request({
    url: '/api/admin/front/process', 
    method: 'post',
    data: obj
  })
}

export function getProcessList(obj) {
  return request({
    url: '/api/admin/front/process/list', 
    method: 'post',
    data: obj
  })
}

export function getProcessPublic(obj) {
  return request({
    url: '/api/admin/front/process/public', 
    method: 'post',
    data: obj
  })
}

export function getProcessPage(obj) {
  return request({
    url: '/api/admin/front/process/attribute/page', 
    method: 'post',
    data: obj
  })
}

export function getProcessVersionPage(obj) {
  return request({
    url: '/api/admin/front/process/attribute/version/page', 
    method: 'post',
    data: obj
  })
}

export function getFamilyConfigs(obj) {
  return request({
    url: '/api/admin/front/form/family/configs', 
    method: 'post',
    data: obj
  })
}













/**
 * 获取节点列表
 * @param {*} data
 */
export function workflowActivityList(data) {
  return request({
    url: '/api/admin/workflow/activity/page', 
    method: 'post',
    data
  })
}

/**
 * 同步平台节点信息
 * 
 */
export function updateActivity(data) {
  return request({
    url: '/api/admin/workflow/activity/' + data, 
    method: 'get'
  })
}

/**
 * 节点与字段绑定
 * @param {*} data
 */
export function updateActivity(data) {
  return request({
    url: '/api/admin/workflow/activity/linking', 
    method: 'put',
    data
  })
}