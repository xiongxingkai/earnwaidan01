import request from '@/utils/request'

// 查询投递列表
export function page(obj) {
  return request({
    url: '/api/hr/recruit/delivery/page',
    method: 'post',
    data: obj
  })
}

// 改变审批状态
export function changeApproveStatus(obj) {
  return request({
    url: '/api/hr/recruit/delivery',
    method: 'put',
    data: obj
  })
}

// 批量改变审批状态
export function multipleChangeApproveStatus(obj) {
  return request({
    url: '/api/hr/recruit/delivery',
    method: 'post',
    data: obj
  })
}

// 获取简历url地址
export function getFileUrl(objName) {
  return request({
    url: '/api/hr/resume/download?objectName=' + objName,
    method: 'get'
  })
}

// 发送短信
export function sendMsgApi(obj) {
  return request({
    url: '/api/hr/msg',
    method: 'post',
    data: obj
  })
}

// 查询已发布的岗位列表
export function pagePostList(obj) {
  return request({
    url: '/api/hr/recruit/post/page',
    method: 'post',
    data: obj
  })
}

// 通过id查找单个岗位信息
export function pagePostById(id) {
  return request({
    url: '/api/hr/recruit/post/' + id,
    method: 'get'
  })
}

// 新建岗位
export function addPostApi(obj) {
  return request({
    url: '/api/hr/recruit/post',
    method: 'post',
    data: obj
  })
}

// 编辑岗位
export function editPostApi(obj) {
  return request({
    url: '/api/hr/recruit/post',
    method: 'put',
    data: obj
  })
}

// 删除岗位
export function delPostApi(id) {
  return request({
    url: '/api/hr/recruit/post/' + id,
    method: 'delete'
  })
}

// 批量删除岗位
export function delMultiplePostApi(arr) {
  return request({
    url: '/api/hr/recruit/post/deleteBatch',
    method: 'delete',
    data: arr
  })
}

// 导出
export function exportApi(type) {
  return request({
    url: '/api/hr/recruit/delivery/export?exportType=' + type,
    method: 'get',
    responseType: 'arraybuffer'
  })
}

// 职位批量导出
export function exportPostApi() {
  return request({
    url: '/api/hr/recruit/post/export',
    method: 'get',
    responseType: 'arraybuffer'
  })
}

// 下载模板
export function downloadTemplateApi() {
  return request({
    url: '/api/hr/recruit/post/downTemplate',
    method: 'get',
    responseType: 'arraybuffer'
  })
}





