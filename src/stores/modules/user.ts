import { getToken, setToken, removeToken } from '@/utils/auth'

// 定义Store状态接口
interface UserState {
  token: string | undefined
  id: string
  name: string
  nickName: string
  avatar: string
  roles: string[]
  permissions: string[]
}

interface UserInfo {
  username: string
  password: string
  code: string
  uuid: string
}

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: getToken(),
    id: '',
    name: '',
    nickName: '',
    avatar: '',
    roles: [],
    permissions: []
  }),

  actions: {
    login(userInfo: UserInfo): Promise<void> {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid

      return new Promise((resolve, reject) => {
        login()
      })
    }
  }
})
