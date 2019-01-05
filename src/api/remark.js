import request from '@/utils/request'

export function fetchRemarks({ params = {}} = {}) {
  const url = 'remarks'
  return request({
    method: 'GET',
    url,
    params
  })
}

export function createRemark({ data, params = {}}) {
  const url = 'remarks'
  return request({
    method: 'POST',
    url,
    params,
    data
  })
}

export function updateRemark({ data, params = {}}) {
  const url = 'remarks/' + data.id
  return request({
    method: 'PATCH',
    url,
    data,
    params
  })
}

export function deleteRemark(id) {
  const url = 'remarks/' + id
  return request({
    method: 'DELETE',
    url
  })
}
