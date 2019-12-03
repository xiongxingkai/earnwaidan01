import request from '@/utils/request'

// 页面初始化
export function getAddressList(obj) {
  return request({
    url: '/api/hr/hr/employee/page/directory',
    method: 'post',
    data: obj
  })
}