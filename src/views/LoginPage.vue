<template>
  <div class="login">
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login-form">
      <h3 class="title">{{ title }}</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" placeholder="账号">
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" size="large" auto-complete="off" placeholder="密码" @keyup.enter="handleLogin">
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="loginForm.captcha" size="large" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter="handleLogin">
          <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
        </el-input>
        <div class="login-captcha">
          <img :src="captchaImgUrl" @click="getCaptcha" class="login-captcha-img" />
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button :loading="loading" size="large" type="primary" style="width: 100%" @click.prevent="handleLogin(loginFormRef)">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>

    <div class="el-login-footer">
      <span>No Copyright.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/modules/user'
import { captcha } from '@/api/login'

import Cookies from 'js-cookie'

import type { FormInstance, FormRules } from 'element-plus'
import type { LocationQueryValue } from 'vue-router'

/**
 * 定义接口
 */
interface LoginForm {
  username: string
  password: string
  rememberMe: boolean
  captcha: string
  uuid: string
}

interface CaptchaResponse {
  captchaEnabled?: boolean
  img: string
  uuid: string
}

const title = import.meta.env.VITE_APP_TITLE
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const loginForm = ref<LoginForm>({
  username: 'admin',
  password: 'admin123',
  rememberMe: false,
  captcha: '',
  uuid: ''
})

/**
 * 表单验证
 */
const loginFormRef = ref<FormInstance>()
const loginFormRules = ref<FormRules<LoginForm>>({
  username: [{ required: true, trigger: 'blur', message: '请输入您的账号' }],
  password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
  captcha: [{ required: true, trigger: 'change', message: '请输入验证码' }]
})

const loading = ref<boolean>(false)

const redirect = ref(undefined)

/**
 * 登录
 */
const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      loading.value = true
      // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
      if (loginForm.value.rememberMe) {
        Cookies.set('username', loginForm.value.username, { expires: 30 })
        Cookies.set('password', loginForm.value.password, { expires: 30 })
        Cookies.set('rememberMe', String(loginForm.value.rememberMe), { expires: 30 })
      } else {
        // 否则移除
        Cookies.remove('username')
        Cookies.remove('password')
        Cookies.remove('rememberMe')
      }

      // 登录并保存token到cookie
      userStore
        .login(loginForm.value)
        .then(() => {
          // 从当前路由 (route.query) 获取查询参数，过滤掉"redirect"，保留其他所有参数到otherQueryParams
          const query = route.query
          const otherQueryParams = Object.keys(query).reduce(
            (acc: Record<string, LocationQueryValue | LocationQueryValue[]>, cur: string) => {
              if (cur !== 'redirect') {
                acc[cur] = query[cur]
              }
              return acc
            },
            {} as Record<string, string>
          )
          // 登录后重定向到用户原来想访问的页面
          router.push({ path: redirect.value || '/', query: otherQueryParams })
        })
        .catch((error) => {
          loading.value = false
          console.error('登录失败:', error)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const getCookie = () => {
  const username: string | undefined = Cookies.get('username')
  const password: string | undefined = Cookies.get('password')
  const rememberMe: string | undefined = Cookies.get('rememberMe')
  loginForm.value = {
    ...loginForm.value,
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : password,
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  }
}

/**
 * 验证码
 */
const captchaImgUrl = ref<string>('')
const getCaptcha = () => {
  captcha()
    .then((res: CaptchaResponse) => {
      if (res.captchaEnabled) {
        loginForm.value.uuid = res.uuid
        captchaImgUrl.value = 'data:image/gif;base64,' + res.img
      }
    })
    .catch((error) => {
      console.error('获取验证码失败:', error)
    })
}

getCookie()
getCaptcha()
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../assets/images/login-background.jpg');
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #000000;
}

.login-form {
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(6px);
  border-radius: 15px;
  width: 400px;
  padding: 25px 25px 5px 25px;
  z-index: 1;
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-captcha {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-captcha-img {
  height: 40px;
  padding-left: 12px;
}
</style>
