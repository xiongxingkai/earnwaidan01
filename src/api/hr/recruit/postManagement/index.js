import request from '@/utils/request'

// 获取职位管理列表
export function getPostPage(obj) {
  return request({
    url: '/api/hr/recruit/post/social/page',
    method: 'post',
    data: obj
  })
}

// 获取工作地点下拉选项
export function queryWorkPlaceList() {
  return request({
    url: '/api/hr/recruit/post/social/work-place-list',
    method: 'get'
  })
}

// 部门接口
export function projectDepartmentNode(query) {
  return request({
    url: '/api/hr/hr/dept/list?deptNum=' + query,
    method: 'get'
  })
}

// 部门接口
export function getNameList() {
  return request({
    url: '/api/hr/recruit/post/social/name-list' ,
    method: 'get'
  })
}

// 招聘状态
export function selectEnumOptions(postStatus) {
  return request({
    url: '/api/hr/recruit/preference/' + postStatus,
    method: 'get'
  })
}









