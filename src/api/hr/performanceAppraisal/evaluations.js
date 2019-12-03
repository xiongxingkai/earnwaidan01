import request from '@/utils/request'

// 访问token
export function getAccessToken() {
  return request({
    url: '/api/hr/performance-appraisal/access-token', 
    method: 'get'
  })
}

