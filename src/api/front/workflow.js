import request from '@/utils/request'

// 获取列表
export function getTaskList(query) {
  return request({
    url: '/api/admin/front/workflow/task/list', 
    method: 'post',
    data: query
  })
}
