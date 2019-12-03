import request from '@/utils/request'

// *****************************日历视图页面**************************************


// 获取面试类别下拉选项
export function getCategoryTypeListApi(category) {
  return request({
    url: '/api/hr/recruit/preference/' + category,
    method: 'get'
  })
}

// 获取面试日历信息选项
export function getCalendarListApi(obj, code) {
  return request({
    url: '/api/hr/recruit/interview/calendar/' + code,
    method: 'post',
    data: obj
  })
}


// *****************************列表视图页面**************************************


// 获取面试列表视图table数据
export function getInterviewListApi(obj) {
  return request({
    url: '/api/hr/recruit/interview/page',
    method: 'post',
    data: obj
  })
}

// 获取负责人下拉选项
export function getResponsiblerListApi() {
  return request({
    url: '/api/hr/recruit/post/social/name-list',
    method: 'get'
  })
}

// 获取职位下拉选项
export function getPostListApi() {
  return request({
    url: '/api/hr/recruit/post/social/validate-post-list',
    method: 'get'
  })
}

// 获取面试官下拉选项
export function getInterviewerListApi() {
  return request({
    url: '/api/hr/recruit/interview/list-interviewer',
    method: 'get'
  })
}









