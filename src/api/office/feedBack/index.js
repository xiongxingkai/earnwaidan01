import request from '@/utils/request'

// 初始化
export function getFeedbackPage(query) {
  return request({
    url: '/api/oa/feedback/feedback-page',
    method: 'post',
    data: query
  })
}

// 新增反馈意见
export function addFeedback(obj) {
  return request({
    url: '/api/oa/feedback',
    method: 'post',
    data: obj
  })
}

// 回复
export function answerFeedback(obj) {
  return request({
    url: '/api/oa/feedback/feedback-comment',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/api/oa/workday/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/api/oa/workday/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/api/oa/workday',
    method: 'put',
    data: obj
  })
}

export function exportList(obj) {
  return request({
    url: '/api/oa/workday/export',
    method: 'post',
    responseType: 'arraybuffer',
    data: obj
  })
}
