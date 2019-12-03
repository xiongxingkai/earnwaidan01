import axios from 'axios'
import {
  Message,
  MessageBox,
  Notification
} from 'element-ui'
import store from '@store'
import {
  getToken
} from '@utils/auth'
import configJs from '../../config/config.js'

let cancel
const CancelToken = axios.CancelToken
let requestUrlList = []
const saveTime = 1000

// create an axios instance
const service = axios.create({
  baseURL: configJs.HTTPS_BASE_API, // api的base_url
  timeout: 30000 // request tiemout
})

// request拦截器
service.interceptors.request.use(config => {
  // 发起请求时，取消掉当前正在进行的相同请求
  // if (requestUrl[config.url]) {
  //   requestUrl[config.url]('操作取消')
  //   requestUrl[config.url] = cancel
  // } else {
  //   requestUrl[config.url] = cancel
  // }
  // 筛选在缓存时间内未过期请求 重新赋值缓存请求数组 新数组与当前请求url匹配
  // 如果有相等项 则判断为重复提交的请求 直接return

  const pattern = /\/\w*(page|list)$/ig
  if ((config.method === 'post' || config.method === 'put') && !pattern.test(config.url)) {
    config.cancelToken = new CancelToken(c => {
      cancel = c
    })
    const nowTime = new Date().getTime()
    requestUrlList = requestUrlList.filter(item => (item.setTime + saveTime) > nowTime)
    requestUrlList = requestUrlList.filter(item => (item.method === config.method))
    const sessionUrl = requestUrlList.filter(item => (item.url === config.url))
    if (sessionUrl.length > 0) {
      console.log(config.url + '请求重复 中断请求！')
      cancel('操作取消')
    } else {
      const item = { url: config.url, method: config.method, setTime: new Date().getTime() }
      requestUrlList.push(item)
    }
  }
  // Do something before request is sent
  if (store.getters.token) {
    config.headers.Authorization = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  if (store.state.hr.Entry) {
    config.headers.Entry = 'newer'
  } else {
    delete config.headers.Entry
  }
  if (configJs.DEBUG_ADDRESS) {
    config.headers.DebugAddress = configJs.DEBUG_ADDRESS
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// response 拦截器
service.interceptors.response.use(response => {
  // delete promiseArr[response.config.url.replace(response.config.baseURL, '')]
  /**
   * 下面的注释为通过response自定义code来表示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  const res = response.data
  // if (response.status === 401 || res.status === 40101) {
  //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //     confirmButtonText: '重新登录',
  //     cancelButtonText: '取消',
  //     type: 'warning'
  //   }).then(() => {
  //     store.dispatch('LogOut').then(() => {
  //       location.reload() // 为了重新实例化vue-router对象 避免bug
  //     })
  //   })
  //   return Promise.reject('error')
  // }
  // if (res.status === 30101) {
  //   Message({
  //     message: res.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   return Promise.reject('error')
  // }
  // if (res.status === 40301) {
  //   Message({
  //     message: '当前用户无相关操作权限！',
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   return Promise.reject('error')
  // }
  if (response.status !== 200 && res.status !== 200) {
    Message({
      message: res.message,
      type: 'error',
      duration: 5 * 1000
    })
  } else {
    return response.data
  }
}, error => {
  console.log('err' + error) // for debug
  if (error.__CANCEL__) {
    return Promise.reject(error)
  }
  const response = error.response
  if (response === undefined) {
    Message({
      message: '服务器请求超时！',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject('error')
  }
  const info = response.data
  if (response.status === 401 || info.status === 40101) {
    MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    })
  }
  if (response.status === 403) {
    Notification.warning({
      title: '禁止',
      message: info.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject('error')
  }
  if (info.status === 30101) {
    Notification.warning({
      title: '失败',
      message: info.message,
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject('error')
  }
  if (response.status === 504) {
    Message({
      message: '后端服务器异常，请联系系统管理员！',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject('error')
  }
  if (response.status === 404) {
    Message({
      message: 'Api接口不存在',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject('error')
  }
  Message({
    message: info.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject('error')
})


export default service
