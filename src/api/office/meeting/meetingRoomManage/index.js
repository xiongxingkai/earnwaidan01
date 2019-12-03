import request from '@/utils/request'

// 获取设备列表
export function getDeviceList(obj) {
  return request({
    url: '/api/oa/meeting/resource/list',
    method: 'post',
    data: obj
  })
}

// 获取会议室列表
export function getMeetingRoomList(obj) {
  return request({
    url: '/api/oa/meeting/room/page',
    method: 'post',
    data: obj
  })
}

// 获取单个会议室详情
export function getMeetingRoomDetailById(id) {
  return request({
    url: '/api/oa/meeting/room/' + id,
    method: 'get'
  })
}

// 保存新增会议室信息
export function addMeetingRoomInfo(obj) {
  return request({
    url: '/api/oa/meeting/room',
    method: 'post',
    data: obj
  })
}

// 保存编辑会议室信息
export function editMeetingRoomInfo(obj) {
  return request({
    url: '/api/oa/meeting/room',
    method: 'put',
    data: obj
  })
}

// 修改会议室的状态
export function changeMeetingRoomStatus(obj) {
  return request({
    url: '/api/oa/meeting/room/modify/status',
    method: 'put',
    data: obj
  })
}











