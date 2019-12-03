import request from '@/utils/request'

// 初始化数据
export function page(obj) {
  return request({
    url: '/api/hr/msg/page',
    method: 'post',
    data: obj
  })
}

// 发送短信
export function sendMsgApi(obj) {
  return request({
    url: '/api/hr/msg',
    method: 'post',
    data: obj
  })
}

// 导出
export function exportMsg(obj) {
  return request({
    url: '/api/hr/msg/export',
    method: 'get',
    responseType: 'arraybuffer',
    data: obj
  })
}



