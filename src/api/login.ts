import request from '@/utils/request'

interface LoginResponse {
  code: number
  token: string
}

// 登录方法
export function login(data: { username: string; password: string; code: string; uuid: string }): Promise<LoginResponse> {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}
