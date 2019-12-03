import request from '@/utils/request'

// 获取招聘需求列表
export function getRecruitNeedsList(obj) {
  return request({
    url: '/api/hr/recruit/needs/page',
    method: 'post',
    data: obj
  })
}

// 新增招聘需求
export function addRecruitNeedsApi(obj) {
  return request({
    url: '/api/hr/recruit/needs',
    method: 'post',
    data: obj
  })
}

// 编辑招聘需求
export function editRecruitNeedsApi(obj) {
  return request({
    url: '/api/hr/recruit/needs',
    method: 'put',
    data: obj
  })
}

// 查看招聘需求表单详情
export function getRecruitNeedsApi(id) {
  return request({
    url: '/api/hr/recruit/needs/' + id,
    method: 'get'
  })
}

// 获取工作地点下拉选项
export function getWorkPlaceList() {
  return request({
    url: '/api/hr/recruit/post/social/work-place-list',
    method: 'get'
  })
}

// 获取部门下拉选项
export function getDepartmentNameList() {
  return request({
    url: '/api/hr/hr/dept/list',
    method: 'get'
  })
}

// 获取岗位下拉选项
export function getPostList() {
  return request({
    url: '/api/hr/recruit/needs/query/post',
    method: 'get'
  })
}

// 通过code获取录用下拉选项
export function getOptionListByCode(code) {
  return request({
    url: '/api/dict/dict/child/' + code,
    method: 'get'
  })
}

// 获取审批意见下拉列表
export function getApproveList(id) {
  return request({
    url: '/api/hr/recruit/needs/flow/history/' + id,
    method: 'get'
  })
}

// 转交下一步流程
export function goToNextStepApi(obj) {
  return request({
    url: '/api/hr/recruit/needs/adopt',
    method: 'post',
    data: obj
  })
}

// 驳回到上一步流程
export function goBackToPrevStepApi(obj) {
  return request({
    url: '/api/hr/recruit/needs/reject',
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









