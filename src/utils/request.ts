import axios from 'axios'
import { getToken } from './auth'
import { ElMessage } from 'element-plus'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000
})

/*
  request拦截器
*/
service.interceptors.request.use(
  (config) => {
    // 是否需要token
    const isToken = config.headers?.isToken !== false
    // 是否需要防止数据重复提交
    //   const isRepeatSubmit = config.headers?.isRepeatSubmit !== false

    // Cookie中存在token且需要token，则添加token
    if (getToken() && !isToken) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

/*
  response拦截器
*/
service.interceptors.response.use(
  (response) => {
    // 处理响应数据
    const res = response.data
    if (res.code === 200) {
      // 只返回业务数据
      return res.data
    } else {
      // 处理业务逻辑错误
      ElMessage.error(res.message)
      console.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  (error) => {
    console.error('请求出错:', error.message)
    return Promise.reject(error)
  }
)

export default service
