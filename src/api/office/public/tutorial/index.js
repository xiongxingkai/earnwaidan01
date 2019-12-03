import request from '@/utils/request'

// 页面初始化
export function getTutorialList(obj) {
  return request({
    url: '/api/oa/tutorial/page',
    method: 'post',
    data: obj
  })
}

// 新增/发布
export function addTutorial(obj) {
  return request({
    url: '/api/oa/tutorial/add-tutorial',
    method: 'post',
    data: obj
  })
}

// 修改保存
export function editTutorial(obj) {
  return request({
    url: '/api/oa/tutorial/modify-tutorial',
    method: 'put',
    data: obj
  })
}


// 编辑
export function getTutorialDtail(id) {
  return request({
    url: '/api/oa/tutorial/detail/' + id,
    method: 'get'
  })
}

// 终止
export function endTutorial(ids) {
  return request({
    url: '/api/oa/tutorial/set-tutorial-stop',
    method: 'put',
    data: ids
  })
}

// 删除
export function delTutorialRow(ids) {
  return request({
    url: '/api/oa/tutorial/del-tutorial',
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
    url: '/api/oa/tutorial/query-page',
    method: 'post',
    data: obj
  })
}

// 页面初始化
export function readFlag(obj) {
  return request({
    url: '/api/oa/tutorial/mark-tutorial-readed',
    method: 'put',
    data: obj
  })
}

// 数据字典接口
export function dictionaryDatabase(name) {
  return request({
    url: '/api/dict/dict/child-list/' + 'name',
    method: 'get'
  })
}

