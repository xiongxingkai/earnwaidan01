import request from '@/utils/request'

export function loginApi(obj) {
  return request({
    url: '/v2/api/admins/sign_in', // 假地址 自行替换
    method: 'post',
    data: obj
  })
}
