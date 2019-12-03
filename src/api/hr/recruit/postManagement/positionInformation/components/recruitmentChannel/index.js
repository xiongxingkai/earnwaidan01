import request from '@/utils/request'

// 渲染
export function getShowMsg(recruitReleaseId) {
  return request({
    url: '/api/hr/recruit/release/' + recruitReleaseId,
    method: 'get'
  })
}

// 修改
export function putShowMsg(obj) {
  return request({
    url: '/api/hr/recruit/release',
    method: 'put',
    data: obj
  })
}
