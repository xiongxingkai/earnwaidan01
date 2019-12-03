import request from '@/utils/request'

// 获取会议室名称和楼层
export function getRoomFloor() {
  return request({
    url: '/api/oa/meeting/room/group',
    method: 'get'
  })
}

// 获取会议室预定列表页数据
export function getRoomTab(obj) {
  return request({
    url: '/api/oa/meeting/room/page',
    method: 'post',
    data: obj
  })
}

// 获取按日期预定列表数据
export function getDateOrderTab(obj) {
  return request({
    url: '/api/oa/meeting/order/condition',
    method: 'post',
    data: obj
  })
}

// 获取按会议室预定列表数据
export function getRoomOrderTab(obj) {
  return request({
    url: '/api/oa/meeting/order/room',
    method: 'post',
    data: obj
  })
}

// 会议预约表单新增
export function submitDateOrderForm(obj) {
  return request({
    url: '/api/oa/meeting/order',
    method: 'post',
    data: obj
  })
}

// 会议统计报表综合统计
export function overViewData(obj) {
  return request({
    url: '/api/oa/meeting/analysis/overview',
    method: 'post',
    data: obj
  })
}

// 会议统计报表会议预约统计
export function orderReportData(obj) {
  return request({
    url: '/api/oa/meeting/analysis/book',
    method: 'post',
    data: obj
  })
}

// 会议统计报表会议使用统计
export function useReportData(obj) {
  return request({
    url: '/api/oa/meeting/analysis/use',
    method: 'post',
    data: obj
  })
}

// 会议统计报表单会议室统计
export function singleReportData(obj) {
  return request({
    url: '/api/oa/meeting/analysis/single',
    method: 'post',
    data: obj
  })
}

// 会议统计报表获取地点和部门
export function getLoactionOrDpt(type) {
  return request({
    url: '/api/oa/meeting/analysis/' + type,
    method: 'get'
  })
}

// 会议统计报表导出
export function exportReports(obj) {
  return request({
    url: '/api/oa/meeting/analysis/export',
    method: 'post',
    data: obj,
    responseType: 'arraybuffer'
  })
}












