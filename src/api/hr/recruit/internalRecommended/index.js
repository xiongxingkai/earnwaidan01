import request from '@/utils/request'

// 获取内推岗位
export function queryRecommendPost(url) {
  return request({
    url, 
    method: 'get'
  })
}

// 获取推荐岗位
export function queryRecommendPostById(postId) {
  return request({
    url: '/api/hr/recruit/post/social/recommend/' + postId, 
    method: 'get'
  })
}

// 获取被推荐人信息
export function queryRecruitEmployeeInfo() {
  return request({
    url: '/api/hr/hr/employee/recruit/emp-info', 
    method: 'get'
  })
}

// 发送推荐人信息
export function addRecommendRecord(obj) {
  return request({
    url: '/api/hr/recruit/recommend/add-record, 
    method: 'post',
    data: obj
  })
}

// 已推荐职位查询
export function recommendPost(obj) {
  return request({
    url: '/api/hr/recruit/recommend/post, 
    method: 'post',
    data: obj
  })
}

// 查询已推荐人
export function queryRecommendCandidateInfo(postId, candidateId) {
  return request({
    url: `/api/hr/recruit/recommend/candidate/info/${postId}/${candidateId}`, 
    method: 'get'
  })
}

// 编辑已推荐人
export function mopdifyRecommendInfo(obj) {
  return request({
    url: '/api/hr/recruit/recommend/modify-info, 
    method: 'put',
    data: obj
  })
}

// 获取列表页
export function queryRecommendedInfo(obj) {
  return request({
    url: '/api/hr/recruit/recommend/status', 
    method: 'put',
    data: obj
  })
}

// 获取状态下拉框
export function selectEnumOptions() {
  return request({
    url: '/api/hr/recruit/preference/recommendStatus', 
    method: 'get'
  })
}








