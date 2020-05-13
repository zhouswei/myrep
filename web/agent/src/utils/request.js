import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import router from '@/router'
// create an axios instance
axios.defaults.withCredentials = true
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  // console.log(JSON.stringify(config))
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  if (config.method === 'post') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  return config
}, error => {
  // Do something with request error
  // console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => { /**
    * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
    * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
    */
    const res = response
    // console.log('1113' + JSON.stringify(res))
    const objRes = res.data
    if (objRes.IsError === true) {
      if (objRes.ErrCode === 2) {
        store.dispatch('FedLogOut').then(() => {
          Message.error(objRes.ErrMsg)
          router.push({ path: '/' })
        })
        return Promise.reject(new Error(objRes.Msg))
      } else {
        Message({
          message: objRes.ErrMsg,
          type: 'error',
          duration: 5 * 1000,
          showClose: true,
          dangerouslyUseHTMLString: true
        })
        return Promise.reject(new Error(objRes.ErrMsg))
      }
    } else {
      return objRes
    }
  },
  error => {
    // console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
      showClose: true,
      dangerouslyUseHTMLString: true
    })
    return Promise.reject(error)
  })

export default service
