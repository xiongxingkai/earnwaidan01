import request from '@/utils/request'

// 我的计划初始化
export function planStatisticsPage(obj) {
  return request({
    url: '/api/oa/workplan/page',
    method: 'post',
    data: obj
  })
}

// 视图
export function planStatisticsView(obj) {
  return request({
    url: '/api/oa/workplan/view',
    method: 'post',
    data: obj
  })
}

// 评分
export function gradeSave(obj) {
  return request({
    url: '/api/oa/workplan/score',
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

// 查看评分
export function getDetail(id) {
  return request({
    url: '/api/oa/workplan/' + id,
    method: 'get'
  })
}











