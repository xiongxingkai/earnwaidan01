import request from '@/utils/request'

// 获取报表数据（安装、登录人数）
export function getReportNum() {
  return request({
    url: '/api/admin/login-log/report',
    method: 'get'
  })
}

// 获取近30日累计活跃度数据
export function getActiveNum() {
  return request({
    url: '/api/admin/login-log/active',
    method: 'get'
  })
}

// 获取今日登录排行数据
export function getTodayActiveNum() {
  return request({
    url: '/api/admin/login-log/today',
    method: 'get'
  })
}

// 日志分析
export function getAnalysisLog(type) {
  return request({
    url: '/api/admin/login-log/employee-analysis/' + type,
    method: 'get'
  })
}


