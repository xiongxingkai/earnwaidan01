import request from '@/utils/request'

// offer模板
export function offerTemplate(obj) {
  return request({
    url: '/api/hr/recruit/template/list', 
    method: 'post',
    data: obj
  })
}

// 获取工作地点下拉选项
export function workPlaceList() {
  return request({
    url: '/api/hr/recruit/post/social/work-place-list', 
    method: 'get'
  })
}

// 创建Offer
export function saddSaveOffer(obj) {
  return request({
    url: '/api/hr/recruit/offer', 
    method: 'post',
    data: obj
  })
}









