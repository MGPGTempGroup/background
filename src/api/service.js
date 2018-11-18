import request from '@/utils/request'

export function fetchServiceMessages(params) {
  return request({
    url: 'service-messages?' + params,
    method: 'GET'
  })
}

export function fetchServices(params) {
  return request({
    url: 'services?' + params,
    method: 'GET'
  })
}

export function deleteServiceMessage(id) {
  return request({
    url: 'service-messages/' + id,
    method: 'DELETE'
  })
}
