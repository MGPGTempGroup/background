import { loginByEmail, logout } from '@/api/login'
import * as userAPI from '@/api/user'
import { fetchNotifications } from '@/api/notification'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    id: undefined,
    name: '',
    avatar: '',
    email: '',
    introduction: '',
    created_at: '',
    updated_at: '',
    member: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    notifications: {
      data: [],
      meta: {}
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_CREATED_AT: (state, created_at) => {
      state.created_at = created_at
    },
    SET_UPDATED_AT: (state, updated_at) => {
      state.updated_at = updated_at
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_MEMBER: (state, member) => {
      state.member = member
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_NOTIFICATIONS: (state, { data, pagination }) => {
      state.notifications = {
        data, pagination
      }
    }
  },

  actions: {

    async LoginByEmail({ commit }, userInfo) {
      const res = await loginByEmail(userInfo.email, userInfo.password)
      const tokenValue = `${res.data.token_type} ${res.data.access_token}`
      setToken(tokenValue)
      commit('SET_TOKEN', tokenValue)
    },

    // 获取管理员信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        userAPI.getUserInfo({
          include: 'member'
        }).then(response => {
          const data = response.data
          commit('SET_ROLES', ['admin'])
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_EMAIL', data.email)
          commit('SET_INTRODUCTION', data.introduction)
          commit('SET_ID', data.id)
          commit('SET_CREATED_AT', data.created_at)
          commit('SET_UPDATED_AT', data.updated_at)
          commit('SET_MEMBER', data.member)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 更新管理员信息
    async UpdateUserInfo({ commit }, payload) {
      const data = (await userAPI.updateInfo(payload)).data
      commit('SET_NAME', data.name)
      commit('SET_AVATAR', data.avatar)
      commit('SET_EMAIL', data.email)
      commit('SET_INTRODUCTION', data.introduction)
      commit('SET_ID', data.id)
      commit('SET_CREATED_AT', data.created_at)
      commit('SET_UPDATED_AT', data.updated_at)
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        userAPI.getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    },

    // 获取通知
    async fetchNotifications({ commit }, params = {}) {
      const {
        data,
        pagination
      } = (await fetchNotifications(params)).data
      commit('SET_NOTIFICATIONS', {
        data,
        pagination
      })
    }
  }
}

export default user
