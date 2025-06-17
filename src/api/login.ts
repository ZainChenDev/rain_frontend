import request from '@/utils/request'

/**
 * 登录
 * @param data 用户名、密码、验证码和UUID
 * @returns token
 */
export function login(data: { username: string; password: string; captcha: string; uuid: string }): Promise<string> {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 获取验证码
export function captcha(): Promise<{ captchaEnabled: boolean; uuid: string; img: string }> {
  return request({
    url: '/captcha',
    method: 'get'
  })
}
