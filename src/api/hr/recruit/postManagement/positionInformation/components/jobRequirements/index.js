import request from '@/utils/request'

// 获取岗位需求
export function getTest(postId) {
  return request({
    url: '/api/hr/recruit/post/social/' + postId,
    method: 'get'
  })
}

// 修改
export function putList(obj) {
  return request({
    url: '/api/hr/recruit/post/social',
    method: 'put',
    data: obj
  })
}
