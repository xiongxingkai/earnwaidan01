import request from '@/utils/request'

// 筛选
export function queryCandidateNum(obj) {
  return request({
    url: '/api/hr/recruit/social/delivery/candidate-num',
    method: 'post',
    data: obj
  })
}

// 初始化列表
export function getCandidatePage(obj) {
  return request({
    url: '/api/hr/recruit/candidate/page',
    method: 'post',
    data: obj
  })
}

// 流程
export function getTemplateList(obj) {
  return request({
    url: '/api/hr/recruit/process/template/list',
    method: 'post',
    data: obj
  })
}

// 流程按钮
export function operationRecruitCandidate(obj) {
  return request({
    url: '/api/hr/recruit/candidate/operation',
    method: 'post',
    data: obj
  })
}

// 职位下拉选项
export function postList(obj) {
  return request({
    url: '/api/hr/recruit/post/social/post-list',
    method: 'post',
    data: obj
  })
}

// 人才库下拉选项
export function talentPollList(obj) {
  return request({
    url: '/api/hr/recruit/talent/pool/list',
    method: 'post',
    data: obj
  })
}

// 短信模板下拉选项
export function msgTemplate(obj) {
  return request({
    url: '/api/hr/recruit/msg/template/list',
    method: 'post',
    data: obj
  })
}

// 邮件模板下拉选项
export function emailTemplate(obj) {
  return request({
    url: '/api/hr/recruit/email/template/list',
    method: 'post',
    data: obj
  })
}

// 展示短信
export function showMsg(obj) {
  return request({
    url: '/api/hr/recruit/candidate/show-text',
    method: 'post',
    data: obj
  })
}

// 发送短信 邮件
export function sendMsg(obj) {
  return request({
    url: '/api/hr/recruit/candidate/send-msg',
    method: 'post',
    data: obj
  })
}

//  导出
export function getExport(obj) {
  return request({
    url: '/api/hr/recruit/candidate/export',
    method: 'post',
    responseType: 'arraybuffer',
    data: obj
  })
}

// 人才原因下拉菜单
export function cause(obj) {
  return request({
    url: '/api/hr/recruit/archive/list',
    method: 'post',
    data: obj
  })
}

// 移动候选人到人才库时添加人才库
export function addCauseDown(obj) {
  return request({
    url: '/api/hr/recruit/talent/pool',
    method: 'post',
    data: obj
  })
}











