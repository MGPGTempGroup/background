import request from '@/utils/request'

export function createOwner(data) {
  return request({
    method: 'POST',
    url: '/property-owners',
    data
  })
}
