import request from '@/utils/request'

// 我的代办页面page
export function reportGetTodopage(query) {
  return request({
    url: '/api/salary/report/todo-page',
    method: 'post',
    data: query
  })
}

// 待处理页面page
export function reportGetDonepage(query) {
  return request({
    url: '/api/salary/report/done-page',
    method: 'post',
    data: query
  })
}

// 已完成页面page
export function reportGetFinishedpage(query) {
  return request({
    url: '/api/salary/report/finished-page',
    method: 'post',
    data: query
  })
}

// 新增
export function addSalary(obj) {
  return request({
    url: '/api/salary/change',
    method: 'post',
    data: obj
  })
}

// 编辑
export function reportEdit(obj) {
  return request({
    url: '/api/salary/report',
    method: 'put',
    data: obj
  })
}

// 删除
export function reportDel(id) {
  return request({
    url: '/api/salary/report/' + id,
    method: 'delete'
  })
}

// 详情
export function reportDetail(id) {
  return request({
    url: '/api/salary/report/' + id,
    method: 'get'
  })
}

//************************************************ */

// 发起流程
export function reportStartFlow(obj) {
  return request({
    url: '/api/salary/report/start-flow',
    method: 'put',
    data: obj
  })
}

// 二次转交接口
export function secondaryFlow(obj) {
  return request({
    url: '/api/salary/report/handle-task',
    method: 'post',
    data: obj
  })
}

// 退回接口
export function stepBack(obj) {
  return request({
    url: '/api/workflow/flow-task/reject-prev-task',
    method: 'post',
    data: obj
  })
}

// 通过工号获取对应信息
export function getPersonInfo(jobNum) {
  return request({
    url: '/api/hr/hr/employee/query/job-number/' + jobNum,
    method: 'get'
  })
}

// 驳回
export function rejectTask(obj) {
  return request({
    url: '/api/project/hard/reject-task',
    method: 'post',
    data: obj
  })
}

// 审批硬成本
export function approvalData(obj) {
  return request({
    url: '/api/workflow/flow-task/handle-task',
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

// 查询流程历史任务
export function getFlowChartReviewList(orderId) {
  return request({
    url: '/api/workflow/flow-task/' + orderId + '/current-history-task',
    method: 'get'
  })
}

// 查询可以驳回的任务节点
export function getFlowChartBackList(taskId) {
  return request({
    url: '/api/workflow/flow-task/' + taskId + '/back-activity',
    method: 'get'
  })
}










