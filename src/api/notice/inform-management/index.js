import request from '@/utils/request'

// 页面初始化
export function getNoticeList(obj) {
  return request({
    url: '/api/oa/notice/page',
    method: 'post',
    data: obj
  })
}

// 新增/发布
export function addNotice(obj) {
  return request({
    url: '/api/oa/notice/add-notice',
    method: 'post',
    data: obj
  })
}

// 修改保存
export function editorNotice(obj) {
  return request({
    url: '/api/oa/notice/modify-notice',
    method: 'put',
    data: obj
  })
}

// 编辑
export function getNoticeDetail(id) {
  return request({
    url: '/api/oa/notice/detail/' + id,
    method: 'get'
  })
}

// 终止
export function endNotice(ids) {
  return request({
    url: '/api/oa/notice/set-notice-stop',
    method: 'put',
    data: ids
  })
}

// 删除
export function delNoticeRow(ids) {
  return request({
    url: '/api/oa/notice/del-notice',
    method: 'delete',
    data: ids
  })
}

// 获取弹框该项目部门的接口
export function projectDepartmentlist() {
  return request({
    url: '/api/hr/hr/dept/list',
    method: 'get'
  })
}

// 页面初始化
export function getLookInit(obj) {
  return request({
    url: '/api/oa/notice/query-page',
    method: 'post',
    data: obj
  })
}

// 页面初始化
export function readFlag(obj) {
  return request({
    url: '/api/oa/notice/mark-notice-readed',
    method: 'put',
    data: obj
  })
}

// 数据字典接口
export function dictionaryDatabase(name) {
  return request({
    url: '/api/dict/dict/child-list/' + name,
    method: 'get'
  })
}





