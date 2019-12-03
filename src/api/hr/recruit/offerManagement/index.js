import request from '@/utils/request'

// 获取录用管理列表
export function getOfferEmployeeList(obj) {
  return request({
    url: '/api/hr/recruit/offer/employee/page',
    method: 'post',
    data: obj
  })
}

// 获取岗位下拉选项
export function getPostList() {
  return request({
    url: '/api/hr/recruit/needs/query/post',
    method: 'get'
  })
}

// 获取录用审批信息
export function getOfferEmployeedBaseInfoById(id) {
  return request({
    url: '/api/hr/recruit/offer/' + id + '/info',
    method: 'get'
  })
}

// 获取需求单号下拉选项
export function getDemandOrderList() {
  return request({
    url: '/api/hr/recruit/needs/demand-order',
    method: 'get'
  })
}

// 获取录用审批表详情
export function getApproveFormDetailById(id) {
  return request({
    url: '/api/hr/recruit/offer/detail/' + id,
    method: 'get'
  })
}

// 获取关联需求单号下拉选项或通过需求id查询对应的信息
export function getNeedsIdList(obj) {
  return request({
    url: '/api/hr/recruit/needs/info',
    method: 'post',
    data: obj
  })
}

// 通过code获取岗位族下拉选项
export function getOptionListByCode(code) {
  return request({
    url: '/api/dict/dict/child/' + code,
    method: 'get'
  })
}

// 新增offer审批
export function addOfferApproveApi(obj) {
  return request({
    url: '/api/hr/recruit/offer/add-aduit',
    method: 'post',
    data: obj
  })
}

// 编辑offer审批
export function editOfferApproveApi(obj) {
  return request({
    url: '/api/hr/recruit/offer/modify/info',
    method: 'put',
    data: obj
  })
}

// 获取审批意见列表
export function getApproveList(id) {
  return request({
    url: '/api/hr/recruit/needs/flow/history/' + id,
    method: 'get'
  })
}

// 获取薪酬信息
export function getRemunerationInfoApi(id) {
  return request({
    url: '/api/hr/recruit/remuneration/info/' + id,
    method: 'get'
  })
}

// 转交下一步流程
export function goToNextStepApi(obj) {
  return request({
    url: '/api/hr/recruit/offer/adopt',
    method: 'post',
    data: obj
  })
}

// 驳回到上一步流程
export function goBackToPrevStepApi(obj) {
  return request({
    url: '/api/hr/recruit/offer/reject',
    method: 'post',
    data: obj
  })
}

// 获取流程图
export function getFlowChart(orderId) {
  return request({
    url: '/api/workflow/flow-order/' + orderId + '/curr-flow-image',
    method: 'get'
  })
}

// 获取流程记录
export function getFlowChartList(orderId) {
  return request({
    url: '/api/workflow/flow-task/' + orderId + '/history-task',
    method: 'get'
  })
}






