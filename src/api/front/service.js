import request from '@/utils/request'

export function pageService(query) {
  return request({
    url: '/api/admin/front/service/page', 
    method: 'post',
    data: query
  })
}

export function addService(query) {
  return request({
    url: '/api/admin/front/service', 
    method: 'post',
    data: query
  })
}

export function getService(query) {
  return request({
    url: '/api/admin/front/service/' + query, 
    method: 'get'
  })
}

export function delService(query) {
  return request({
    url: '/api/admin/front/service/' + query, 
    method: 'delete'
  })
}

export function putService(query) {
  return request({
    url: '/api/admin/front/service', 
    method: 'put',
    data: query
  })
}

export function listServiceRouter() {
  return request({
    url: '/api/admin/front/service/router/list', 
    method: 'get'
  })
}

export function listService(query) {
  return request({
    url: '/api/admin/front/service/list', 
    method: 'post',
    data: query
  })
}

export function createWorkflowService(query) {
  return request({
    url: '/api/admin/front/service/create-workflow/' + query, 
    method: 'get'
  })
}

export function removeWorkflowService(query) {
  return request({
    url: '/api/admin/front/service/remove-workflow/' + query, 
    method: 'delete'
  })
}

export function createWorkflowService2(data) {
  return request({
    url: '/api/admin/front/service/create-workflow/two', 
    method: 'post',
    data
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