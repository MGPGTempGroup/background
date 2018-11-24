import request from '@/utils/request'

export function fetchInfo(params) {
  return request({
    url: 'company/info',
    method: 'GET',
    params
  })
}

export function fetchMembers(params) {
  let url = 'company/members'
  params && (url += '?' + params)
  return request({
    url,
    method: 'GET'
  })
}

export function fetchDepartments(params) {
  return request({
    method: 'GET',
    url: 'company/departments'
  })
}

export function updateInfo(data) {
  return request({
    url: 'company/info',
    method: 'PATCH',
    data
  })
}

export function updateMember(data) {
  return request({
    method: 'PATCH',
    url: 'company/members/' + data.id,
    data
  })
}

export function createMember(data) {
  return request({
    method: 'POST',
    url: 'company/members',
    data
  })
}
