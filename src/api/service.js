import request from '@/utils/request'

export function fetchServiceMessages(params) {
  return request({
    method: 'GET',
    url: 'service-messages?' + params
  })
}

export function fetchServices(params) {
  return request({
    method: 'GET',
    url: 'services',
    params
  })
}

export function fetchService(service_name, params = {}) {
  return request({
    method: 'GET',
    url: `services/${service_name}`,
    params
  })
}

export function fetchServiceContent(params) {
  return request({
    method: 'GET',
    url: 'services/' + params.service_id + '/contents'
  })
}

export function updateService(serviceName, data, params = {}) {
  return request({
    method: 'PATCH',
    url: 'services/' + serviceName,
    data,
    params
  })
}

export function updateServiceContent(serviceName, data, params = {}) {
  return request({
    method: 'POST',
    url: `services/${serviceName}/contents`,
    data,
    params
  })
}

export function deleteServiceMessage(id) {
  return request({
    url: 'service-messages/' + id,
    method: 'DELETE'
  })
}
