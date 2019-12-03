import request from '@/utils/request'

// ************************短信模板*********************
// 短信模板列表项
export function getMsgList(obj) {
  return request({
    url: '/api/hr/recruit/msg/template/list',
    method: 'post',
    data: obj
  })
}

export function getPdf() {
  return request({
    url: '/api/hr/recruit/interview/preview',
    method: 'get'
  })
}

// 获取短信数据详情
export function getMsgData(id) {
  return request({
    url: '/api/hr/recruit/msg/template/' + id,
    method: 'get'
  })
}

// 短信模板更新
export function updateMsgData(obj) {
  return request({
    url: '/api/hr/recruit/msg/template',
    method: 'put',
    data: obj
  })
}

// 短信模板新增
export function addNewMsgData(obj) {
  return request({
    url: '/api/hr/recruit/msg/template',
    method: 'post',
    data: obj
  })
}

// 短信模板删除
export function delMsgData(id) {
  return request({
    url: '/api/hr/recruit/msg/template/' + id,
    method: 'delete'
  })
}

// ************************邮件模板*********************
// 邮件模板列表项
export function getEmailList(obj) {
  return request({
    url: '/api/hr/recruit/email/template/list',
    method: 'post',
    data: obj
  })
}

// 获取邮件数据详情
export function getEmailData(id) {
  return request({
    url: '/api/hr/recruit/email/template/' + id,
    method: 'get'
  })
}

// 邮件模板更新
export function updateEmailData(obj) {
  return request({
    url: '/api/hr/recruit/email/template',
    method: 'put',
    data: obj
  })
}

// 邮件模板新增
export function addNewEmailData(obj) {
  return request({
    url: '/api/hr/recruit/email/template',
    method: 'post',
    data: obj
  })
}

// 邮件模板删除
export function delEmailData(id) {
  return request({
    url: '/api/hr/recruit/email/template/' + id,
    method: 'delete'
  })
}



