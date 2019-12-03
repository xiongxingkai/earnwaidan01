import request from '@/utils/request'

// 总接口
export function initPage(query) {
  return request({
    url: '/api/asset/assets/inventory/statistic', 
    method: 'post',
    data: query
  })
}

// 获取图片路径接口
export function getImgPath(IdsArr) {
  return request({
    url: '/api/file-server/files/multiple/list', 
    method: 'post',
    data: IdsArr
  })
}

// 获取总文件id
export function getImgFile(keyArr, string) {
  return request({
    url: '/api/file-server/oss/download/list-map', 
    method: 'post',
    data: keyArr,
    params: string
  })
}


