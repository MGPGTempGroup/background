import request from '@/utils/request'

export function fetchLeases(params) {
  return request({
    method: 'GET',
    url: 'leases?' + params
  })
}

export function fetchPropertyTypes() {
  return request({
    method: 'GET',
    url: 'property-types'
  })
}

export function createLeaseHouse(data) {
  return request({
    method: 'POST',
    url: 'leases',
    data
  })
}

export function updateLeaseHouse(data) {
  return request({
    method: 'PATCH',
    url: 'leases/' + data.id,
    data
  })
}

export function deleteLeaseHouse(id) {
  return request({
    method: 'DELETE',
    url: 'leases/' + id
  })
}
