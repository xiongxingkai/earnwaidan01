import request from '@/utils/request'

// 我的计划初始化
export function myplanPage(obj) {
  return request({
    url: '/api/oa/workplan/user/wait-list',
    method: 'post',
    data: obj
  })
}

// 人员范围下拉
export function personRange() {
  return request({
    url: '/api/oa/workplan/range',
    method: 'get'
  })
}

// 确认是否完成提交
export function finishStatus(obj) {
  return request({
    url: '/api/oa/workplan/handle',
    method: 'post',
    data: obj
  })
}

// 获取写周报的初始化
export function getweekReportList(obj) {
  return request({
    url: '/api/oa/workplan/user/list',
    method: 'post',
    data: obj
  })
}

// 详情
export function getDetail(id) {
  return request({
    url: '/api/oa/workplan/' + id,
    method: 'get'
  })
}

// 编辑保存
export function modifySave(obj) {
  return request({
    url: '/api/oa/workplan',
    method: 'put',
    data: obj
  })
}

// 新增保存
export function addReport(obj) {
  return request({
    url: '/api/oa/workplan',
    method: 'post',
    data: obj
  })
}

// 删除
export function delData(id) {
  return request({
    url: '/api/oa/workplan/' + id,
    method: 'delete'
  })
}

// 批量提交下周计划
export function batchNextWeek(idArr) {
  return request({
    url: '/api/oa/workplan/submit',
    method: 'post',
    data: idArr
  })
}

// 本周待完成/下周计划导出
export function planExport(obj) {
  return request({
    url: '/api/oa/workplan/plan-export',
    method: 'post',
    data: obj,
    responseType: 'arraybuffer'
  })
}

// 本周总结导出
export function reportExport(obj) {
  return request({
    url: '/api/oa/workplan/sum-export',
    method: 'post',
    data: obj,
    responseType: 'arraybuffer'
  })
}







