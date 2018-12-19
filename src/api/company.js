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

export function fetchDepartments(params = {}) {
  return request({
    method: 'GET',
    url: 'company/departments',
    params
  })
}

export function searchMembersByFullName(fullName, params = {}) {
  return request({
    method: 'GET',
    url: 'company/members?searchByFullName=' + fullName,
    params
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

export function deleteMember(id) {
  return request({
    method: 'DELETE',
    url: 'company/members/' + id
  })
}

export function createMember(data) {
  return request({
    method: 'POST',
    url: 'company/members',
    data
  })
}
