import request from '@/utils/request'

// 获取渠道信息列表
export function getChannelList(obj) {
  return request({
    url: '/api/hr/recruit/channel/list',
    method: 'post',
    data: obj
  })
}

// 新增渠道信息
export function addChannelApi(obj) {
  return request({
    url: '/api/hr/recruit/channel',
    method: 'post',
    data: obj
  })
}



