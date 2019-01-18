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

export function changePassword({ old_pwd, new_pwd, new_pwd_confirmation }) {
  const url = 'admin-users/current/password'
  return request({
    method: 'PATCH',
    url,
    data: {
      old_pwd, new_pwd, new_pwd_confirmation
    }
  })
}

export function logout() {
  return request({
    url: 'authorizations/current',
    method: 'delete'
  })
}
