import request from '@/utils/request'

export function updateInfo(data, params = {}) {
  return request({
    method: 'PATCH',
    url: 'admin-users/current/info',
    data
  })
}

export function getUserInfo(params = {}) {
  return request({
    url: 'admin-users/current',
    method: 'get',
    params
  })
}
