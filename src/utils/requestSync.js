import {
  getToken
} from '@utils/auth'
import configJs from '../../config/config.js'

// create an instance opt { url: '', method: '' }
const service = opt => {
  const getUploadToken = () => {
    let xmlhttp = null
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest()
    } else if (window.ActiveXObject) {
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
    }
    if (getToken()) {
      let serviceUrl = ''
      if (opt.url.indexOf('http://') > -1) {
        serviceUrl = opt.url
      } else {
        serviceUrl = configJs.BASE_API + opt.url
      }
      xmlhttp.open(opt.method, serviceUrl, false)
      xmlhttp.setRequestHeader('Authorization', getToken())
      if (opt.headers) {
        for (const key in opt.headers) {
          if (opt.headers.hasOwnProperty(key)) {
            const element = opt.headers[key]
            xmlhttp.setRequestHeader(key, element)
          }
        }
      }
      if (configJs.DEBUG_ADDRESS) {
        xmlhttp.setRequestHeader('DebugAddress', configJs.DEBUG_ADDRESS)
      }
      xmlhttp.send(null)
      const body = xmlhttp.responseText
      const responseData = eval('(' + body + ')')
      return responseData
    } else {
      return {}
    }
  }
  return getUploadToken()
}

export default service