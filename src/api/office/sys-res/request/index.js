import request from '@/utils/request'
/**
 * 
 * 资源分页查询
 */
export function page(query) {
  return request({
    url: '/api/oa/sys-resource/page',
    method: 'post',
    data: query
  })
}

/**
 * 资源新增
 */

export function addRequest(query) {
  return request({
    url: '/api/oa/sys-resource',
    method: 'post',
    data: query
  })
}

/**
 * 单个资源详情
 */

export function getRequest(id) {
  return request({
    url: '/api/oa/sys-resource/' + id,
    method: 'get'
  })
}

/**
 * 资源删除
 */

export function deleteRequest(id) {
  return request({
    url: '/api/oa/sys-resource/' + id,
    method: 'delete'
  })
}

/**
 * 资源修改
 */

export function editRequest(obj) {
  return request({
    url: '/api/oa/sys-resource' ,
    method: 'put',
    data: obj
  })
}

// 审批
export function approvalData(obj) {
  return request({
    url: '/api/workflow/flow-task/handle-task' ,
    method: 'post',
    data: obj
  })
}

// 发起流程
export function approvalStart(obj) {
  return request({
    url: '/api/oa/sys-resource/add-start' ,
    method: 'post',
    data: obj
  })
}

// 获取流程图
export function getFlowChart(orderId) {
  return request({
    url: '/api/workflow/flow-order/' + orderId + '/cur-flow-image' ,
    method: 'get'
  })
}

// 获取流程记录
export function getFlowChartList(orderId) {
  return request({
    url: '/api/workflow/flow-task/' + orderId + '/history-task' ,
    method: 'get'
  })
}

// 查询流程历史任务
export function getFlowChartReviewList(orderId) {
  return request({
    url: '/api/workflow/flow-task/' + orderId + '/current-history-task' ,
    method: 'get'
  })
}

// 快捷输入接口
export function quickPage(obj) {
  return request({
    url: '/api/workflow/approval/page' ,
    method: 'post',
    data: obj
  })
}

// 新增
export function quickAdd(obj) {
  return request({
    url: '/api/workflow/approval' ,
    method: 'post',
    data: obj
  })
}

// 编辑
export function quickEdit(obj) {
  return request({
    url: '/api/workflow/approval' ,
    method: 'put',
    data: obj
  })
}

// 删除
export function quickDelRow(id) {
  return request({
    url: '/api/workflow/approval/' + id ,
    method: 'delete'
  })
}

// 详情
export function quickDetail(id) {
  return request({
    url: '/api/workflow/approval/' + id ,
    method: 'get'
  })
}


