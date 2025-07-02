<template>
  <div class="flex min-h-screen items-center justify-center bg-[url(@/assets/images/login-background.jpg)] bg-cover bg-center bg-no-repeat">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginFormRules"
      class="w-96 rounded-2xl bg-white/60 p-6 pb-5 shadow-lg backdrop-blur-sm">
      <h3 class="mb-8 text-center text-xl font-medium text-black">{{ title }}</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="账号"
          class="h-10">
          <template #prefix>
            <svg-icon
              icon-class="user"
              class="ml-0 h-10 w-3.5" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="密码"
          class="h-10"
          @keyup.enter="handleLogin">
          <template #prefix>
            <svg-icon
              icon-class="password"
              class="ml-0 h-10 w-3.5" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input
          v-model="loginForm.captcha"
          size="large"
          auto-complete="off"
          placeholder="验证码"
          class="h-10 flex-1"
          @keyup.enter="handleLogin">
          <template #prefix>
            <svg-icon
              icon-class="validCode"
              class="ml-0 h-10 w-3.5" />
          </template>
        </el-input>
        <div class="h-10 w-32">
          <img
            :src="captchaImgUrl"
            @click="getCaptcha"
            class="h-10 cursor-pointer pl-3" />
        </div>
      </el-form-item>
      <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin: 0px 0px 25px 0px">
        记住密码
      </el-checkbox>
      <el-form-item class="mb-0 w-full">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          class="w-full"
          @click.prevent="handleLogin(loginFormRef)">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>

    <div class="font-arial fixed bottom-0 h-10 w-full text-center text-xs leading-10 tracking-wide text-white">
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

<style scoped>
:deep(.el-input__inner) {
  height: 40px !important;
}

:deep(.el-input__prefix) {
  align-items: center;
}
</style>
