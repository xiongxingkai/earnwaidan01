import request from '@/utils/request'

// 院校tTOP10
export function getSchoolData() {
  return request({
    url: '/api/hr/resume/school',
    method: 'get'
  })
}

// 城市TOP3
export function getCityData(val) {
  return request({
    url: '/api/hr/resume/city/' + val,
    method: 'get'
  })
}

// 招聘人员数量状态
export function getauditStatusData() {
  return request({
    url: '/api/hr/recruit/delivery',
    method: 'get'
  })
}



