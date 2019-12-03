import request from '@/utils/request'

export function statistic(query) {
  return request({
    url: '/api/oa/dataCenter/statistic',
    method: 'get',
    params: query
  })
}


