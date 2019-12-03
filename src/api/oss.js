import request from '@/utils/request'

// 通过文件名获取文件下载路径
export function getDownloadUrl(objectName) {
  return request({
    url: '/api/file-server/oss/download', // 假地址 自行替换
    method: 'get',
    params: { objectName }
  })
}

// 保存文件信息到文件服务器
export function addFileInfo(params, random) {
  return request({
    url: '/api/file-server/files/multiple?v=' + random, 
    method: 'post',
    data: params
  })
}

// 从文件服务器获取文件信息
export function getFileInfoByIds(ids) {
  return request({
    url: '/api/file-server/files/multiple/' + ids + '', 
    method: 'get'
  })
}

// 从文件服务器获取单个文件信息
export function getFileInfoById(id) {
  return request({
    url: '/api/file-server/files/single/' + id, 
    method: 'get'
  })
}

// 从文件服务器删除文件信息
export function deletedFileInfoByIds(ids) {
  return request({
    url: '/api/file-server/files/multiple/' + ids + '', 
    method: 'delete'
  })
}

export function getPreviewParam() {
  return request({
    url: '/api/file-server/oss/preview-param', 
    method: 'get'
  })
}


