import request from '@/utils/request'

export function fetchOwners(params) {
  return request({
    method: 'GET',
    url: '/property-owners',
    params
  })
}

export function createOwner(data) {
  return request({
    method: 'POST',
    url: '/property-owners',
    data
  })
}

export function updateOwner(data) {
  return request({
    method: 'PATCH',
    url: '/property-owners/' + data.id,
    data
  })
}

export function deleteOwner(id, params) {
  return request({
    method: 'DELETE',
    url: '/property-owners/' + id,
    params
  })
}
