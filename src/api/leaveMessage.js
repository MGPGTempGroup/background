import request from '@/utils/request'

export function fetchMessages(params) {
  let url = 'customer-leave-messages'
  if (params) url += `?${params}`
  return request({
    method: 'GET',
    url
  })
}

export function deleteMessage(id) {
  const url = 'customer-leave-messages/' + id
  return request({
    method: 'DELETE',
    url
  })
}
