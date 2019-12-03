import request from '@/utils/request'

// 获取偏好设置tab选项信息
export function getPreferenceInfo() {
  return request({
    url: '/api/hr/recruit/preference',
    method: 'get'
  })
}

// 编辑保存偏好设置tab选项信息
export function editPreferenceInfo(obj) {
  return request({
    url: '/api/hr/recruit/preference',
    method: 'put',
    data: obj
  })
}

// 通过id获取招聘流程模板详情
export function getProcessDetail(id) {
  return request({
    url: '/api/hr/recruit/process/template/' + id,
    method: 'get'
  })
}

// 通过id删除招聘流程模板详情
export function delProcessDetail(id) {
  return request({
    url: '/api/hr/recruit/process/template/' + id,
    method: 'delete'
  })
}

// 新增保存招聘流程
export function addProcessApi(obj) {
  return request({
    url: '/api/hr/recruit/process/template',
    method: 'post',
    data: obj
  })
}

// 编辑保存招聘流程
export function editProcessApi(obj) {
  return request({
    url: '/api/hr/recruit/process/template',
    method: 'put',
    data: obj
  })
}

// 新增保存面试评价流程
export function addEvalApi(obj) {
  return request({
    url: '/api/hr/recruit/eval/template',
    method: 'post',
    data: obj
  })
}

// 编辑保存面试评价流程
export function editEvalApi(obj) {
  return request({
    url: '/api/hr/recruit/eval/template',
    method: 'put',
    data: obj
  })
}

// 通过id删除面试评价模板详情
export function delEvalDetail(id) {
  return request({
    url: '/api/hr/recruit/eval/template/' + id,
    method: 'delete'
  })
}

// 通过id获取面试评价模板详情
export function getEvalDetail(id) {
  return request({
    url: '/api/hr/recruit/eval/template/' + id,
    method: 'get'
  })
}

// 根据category获取下拉选项
export function getChoiceApi(category) {
  return request({
    url: '/api/hr/recruit/preference/' + category,
    method: 'get'
  })
}
