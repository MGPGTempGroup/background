import request from '@/utils/request'

export function fetchInfo(params) {
  return request({
    url: 'company/info',
    method: 'GET',
    params
  })
}

export function updateInfo(data) {
  return request({
    url: 'company/info',
    method: 'PATCH',
    data
  })
}
