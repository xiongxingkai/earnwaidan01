import request from '@/utils/request'

// 添加候选人
export function getAddCandidate(obj) {
  return request({
    url: '/api/hr/recruit/candidate',
    method: 'post',
    data: obj
  })
}

// 学历
export function getCandidateDegree() {
  return request({
    url: '/api/dict/dict/child/100',
    method: 'get'
  })
}









