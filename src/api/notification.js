import request from '@/utils/request'

export function fetchNotifications(params = {}) {
  return request({
    method: 'GET',
    url: 'admin-users/current/notifications',
    params
  })
}
