import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function loginByEmail(email, password) {
  const data = {
    email,
    password
  }
  return request({
    url: 'authorizations',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'authorizations/current',
    method: 'delete'
  })
}

export function getUserInfo() {
  return request({
    url: 'admin-users/current',
    method: 'get'
  })
}

