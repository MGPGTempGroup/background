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

export function fetchAreasWeServe(params = {}) {
  return request({
    method: 'GET',
    url: 'service-areas',
    params
  })
}

export function fetchServiceTestimonials(params = {}) {
  return request({
    method: 'GET',
    url: 'service/testimonials',
    params
  })
}

export function createAreaWeServe(data) {
  return request({
    method: 'POST',
    url: 'service-areas',
    data
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

export function updateServiceArea(data) {
  return request({
    method: 'PATCH',
    url: `service-areas/${data.id}`,
    data
  })
}

export function updateServiceTestimonial({ id, is_show }) {
  return request({
    method: 'PATCH',
    url: `service/testimonials/${id}`,
    data: {
      is_show
    }
  })
}

export function deleteServiceMessage(id) {
  return request({
    url: 'service-messages/' + id,
    method: 'DELETE'
  })
}

export function deleteServiceArea(id) {
  return request({
    method: 'DELETE',
    url: 'service-areas/' + id
  })
}
