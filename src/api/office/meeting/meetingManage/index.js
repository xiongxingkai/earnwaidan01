import request from '@/utils/request'

// 获取会议室列表
export function getMeetingRoomGroup() {
  return request({
    url: '/api/oa/meeting/room/group',
    method: 'get'
  })
}

// 查询全部会议预定信息
export function getMeetingInfoPage(obj) {
  return request({
    url: '/api/oa/meeting/order/info',
    method: 'post',
    data: obj
  })
}

// 按日查询会议信息
export function getMeetingInfoByDay(day) {
  return request({
    url: '/api/oa/meeting/order/day/' + day,
    method: 'get'
  })
}

// 按周查询会议信息
export function getMeetingInfoByWeek(weekDay) {
  return request({
    url: '/api/oa/meeting/order/week/' + weekDay,
    method: 'get'
  })
}

// 按月查询会议信息
export function getMeetingInfoByMonth(monthDay) {
  return request({
    url: '/api/oa/meeting/order/month/' + monthDay,
    method: 'get'
  })
}

// 根据id查询会议预定详细信息
export function getMeetingInfoDetailById(id) {
  return request({
    url: '/api/oa/meeting/order/detail/' + id,
    method: 'get'
  })
}

// 根据id删除会议预定信息
export function delMeetingInfoById(id) {
  return request({
    url: '/api/oa/meeting/order/' + id,
    method: 'delete'
  })
}











