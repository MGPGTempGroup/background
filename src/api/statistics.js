import request from '@/utils/request'

export function getAll(params) {
  const url = 'statistics'
  return request({
    url: url
  })
}
