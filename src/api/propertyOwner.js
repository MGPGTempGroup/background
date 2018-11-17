import request from '@/utils/request'

export function fetchOwners(params) {
  return request({
    method: 'GET',
    url: '/property-owners?' + params // URL参数可能为a[]=1&a[]=2 故不可用params选项
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
