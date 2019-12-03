import request from '@/utils/request'

// 页面初始化
export function getPageList(query) {
  return request({
    url: '/api/hr/holiday/page', 
    method: 'post',
    data: query
  })
}

// 新增
export function addData(query) {
  return request({
    url: '/api/hr/holiday', 
    method: 'post',
    data: query
  })
}

// 编辑
export function editData(query) {
  return request({
    url: '/api/hr/holiday', 
    method: 'put',
    data: query
  })
}

// 编辑回显数据
export function detailData(id) {
  return request({
    url: '/api/hr/holiday/' + id, 
    method: 'get'
  })
}

// 单个删除
export function deleteData(id) {
  return request({
    url: '/api/hr/holiday/' + id, 
    method: 'delete'
  })
}

// 多个删除
export function batchDeleteData(query) {
  return request({
    url: '/api/hr/holiday/delete-batch', 
    method: 'delete',
    data: query
  })
}

