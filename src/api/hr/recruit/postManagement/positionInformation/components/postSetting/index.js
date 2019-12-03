import request from '@/utils/request'

// 获取岗位需求
export function putPostModify(obj) {
  return request({
    url: '/api/hr/recruit/post/social',
    method: 'put',
    data: obj
  })
}

// 获取
export function getTemplateList(obj) {
  return request({
    url: '/api/hr/recruit/template/list',
    method: 'post',
    data: obj
  })
}
