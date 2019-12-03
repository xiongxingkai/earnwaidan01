import request from '@/utils/request'

export function page(obj) {
  return request({
    url: '/api/oa/knowledge/doc/log/page',
    method: 'post',
    data: obj
  })
}
