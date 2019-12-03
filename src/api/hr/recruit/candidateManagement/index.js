import request from '@/utils/request'

// ******************************简历主页面*********************************
// 获取候选人信息
export function getCandidateInfoById(id) {
  return request({
    url: '/api/hr/recruit/candidate/delivery/' + id, 
    method: 'get'
  })
}

// 获取阶段下拉选项
export function getProcessList(obj) {
  return request({
    url: '/api/hr/recruit/process/template/list', 
    method: 'post',
    data: obj
  })
}

// 获取人才库下拉选项
export function getTalentPoolList(obj) {
  return request({
    url: '/api/hr/recruit/talent/pool/list', 
    method: 'post',
    data: obj
  })
}

// 获取原因下拉选项
export function getReasonList(query) {
  return request({
    url: '/api/hr/recruit/archive/list', 
    method: 'post',
    data: query
  })
}

// 获取职位下拉选项
export function getPostList() {
  return request({
    url: '/api/hr/recruit/post/social/post-list', 
    method: 'get'
  })
}

// 修改阶段信息
export function editProcessApi(obj) {
  return request({
    url: '/api/hr/recruit/candidate/operation', 
    method: 'post',
    data: obj
  })
}

// 推进下一阶段
export function operationCandidateNestStage(obj) {
  return request({
    url: '/api/hr/recruit/candidate/operation-stage', 
    method: 'post',
    data: obj
  })
}


// *************************面试页面***************************
// 获取面试页面信息
export function getInterviewList(obj) {
  return request({
    url: '/api/hr/recruit/interview/list', 
    method: 'post',
    data: obj
  })
}

// 获取面试反馈模板信息
export function getInterviewTemplateApi(obj) {
  return request({
    url: '/api/hr/recruit/eval/template/list', 
    method: 'post',
    data: obj
  })
}

// 获取面试模板下拉选项
export function getInterviewTemplateArr(obj) {
  return request({
    url: '/api/hr/recruit/template/list', 
    method: 'post',
    data: obj
  })
}

// 获取面试形式下拉选项
export function getInterviewCategoryArr(code) {
  return request({
    url: '/api/hr/recruit/preference/' + code, 
    method: 'get'
  })
}

// 获取面试官日程列表
export function searchScheduleAPi(obj) {
  return request({
    url: '/api/hr/recruit/interview/list-schedule', 
    method: 'post',
    data: obj
  })
}

// 保存新增面试
export function saveNewAddInterviewApi(obj) {
  return request({
    url: '/api/hr/recruit/interview', 
    method: 'post',
    data: obj
  })
}

// 通过id获取面试表单详情
export function getInterviewDetailById(id) {
  return request({
    url: '/api/hr/recruit/interview/' + id, 
    method: 'get'
  })
}

// 保存编辑面试
export function saveEditInterviewApi(obj) {
  return request({
    url: '/api/hr/recruit/interview', 
    method: 'put',
    data: obj
  })
}

// 通过id获取下载面试反馈表单详情
export function getFeedBackInfoApi(id) {
  return request({
    url: '/api/hr/recruit/interview/feedback/' + id, 
    method: 'get'
  })
}

// 通过id取消面试
export function cancelInterviewApi(id) {
  return request({
    url: '/api/hr/recruit/interview/cancel/' + id, 
    method: 'put'
  })
}


// *************************Offer页面***************************

// 获取Offer页面信息
export function getOfferList(obj) {
  return request({
    url: '/api/hr/recruit/offer/list', 
    method: 'post',
    data: obj
  })
}

// 获取offer模板下拉选项列表
export function getOfferNameList(obj) {
  return request({
    url: '/api/hr/recruit/template/list', 
    method: 'post',
    data: obj
  })
}

// 获取Offer模板信息
export function getOfferTemplateApi(obj) {
  return request({
    url: '/api/hr/recruit/offer/template/list', 
    method: 'post',
    data: obj
  })
}

// 获取工作地点下拉选项
export function workPlaceList() {
  return request({
    url: '/api/hr/recruit/post/social/work-place-list', 
    method: 'get'
  })
}

// 保存新增Offer
export function saveNewAddOffer(obj) {
  return request({
    url: '/api/hr/recruit/offer', 
    method: 'post',
    data: obj
  })
}

// 通过id获取offer详情
export function getOfferDetailById(id) {
  return request({
    url: '/api/hr/recruit/offer/' + id, 
    method: 'get'
  })
}

// 保存编辑offer
export function saveEditOffer(obj) {
  return request({
    url: '/api/hr/recruit/offer', 
    method: 'put',
    data: obj
  })
}

// 通过id删除offer
export function delOfferById(id) {
  return request({
    url: '/api/hr/recruit/offer/' + id, 
    method: 'delete'
  })
}

// 通过code获取岗位族下拉选项
export function getPostListByCode(code) {
  return request({
    url: '/api/dict/dict/child/' + code, 
    method: 'get'
  })
}

// 人事offer数据同步
export function syncWithHrOffer(id) {
  return request({
    url: '/api/hr/recruit/offer/send/'  + id, 
    method: 'post'
  })
}



// *************************历史记录tab页****************************************

// 获取候选人投递记录
export function getCandidateRecordById(id) {
  return request({
    url: '/api/hr/recruit/candidate/record/'  + id, 
    method: 'get'
  })
}










