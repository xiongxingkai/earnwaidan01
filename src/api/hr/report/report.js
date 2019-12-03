import request from '@/utils/request'

// 员工类别
export function getEmpData(str) {
  if (str !== '' && str !== undefined && str !== null) {
    return request({
      url: '/api/hr/report/type?dept=' + str,
      method: 'get'
    })
  } else {
    return request({
      url: '/api/hr/report/type',
      method: 'get'
    })
  }
}

// 员工性别
export function getGenderData(str) {
  if (str !== '' && str !== undefined && str !== null) {
    return request({
      url: '/api/hr/report?dept=' + str,
      method: 'get'
    })
  } else {
    return request({
      url: '/api/hr/report',
      method: 'get'
    })
  }
}

// 员工学历
export function getDegreeData(str) {
  if (str !== '' && str !== undefined && str !== null) {
    return request({
      url: '/api/hr/report/degree?dept=' + str,
      method: 'get'
    })
  } else {
    return request({
      url: '/api/hr/report/degree',
      method: 'get'
    })
  }
}

// 员工职称
export function getRankData(str) {
  if (str !== '' && str !== undefined && str !== null) {
    return request({
      url: '/api/hr/report/rank?dept=' + str,
      method: 'get'
    })
  } else {
    return request({
      url: '/api/hr/report/rank',
      method: 'get'
    })
  }
}

// 部门
export function getDeptData() {
  return request({
    url: '/api/hr/hr/dept/list',
    method: 'get'
  })
}

