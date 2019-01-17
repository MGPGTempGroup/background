import request from '@/utils/request'

export function updateInfo(data) {
  return request({
    method: 'PATCH',
    url: 'admin-users/current/info',
    data
  })
}
