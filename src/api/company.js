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

export function fetchMember(memberID, params = {}) {
  const url = 'company/members/' + memberID
  return request({
    method: 'GET',
    url,
    params
  })
}

export function fetchDepartments(params = {}) {
  return request({
    method: 'GET',
    url: 'company/departments',
    params
  })
}

export function fetchPositions(params) {
  return request({
    method: 'GET',
    url: 'company/positions',
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

export function createDepartment(data, params = {}) {
  return request({
    method: 'POST',
    url: 'company/departments',
    data,
    params
  })
}

export function createMember(data) {
  return request({
    method: 'POST',
    url: 'company/members',
    data
  })
}

export function createPositions(department_id, data, params = {}) {
  return request({
    method: 'POST',
    url: 'company/departments/' + department_id + '/positions',
    data,
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

export function updateDepartment(data, params = {}) {
  return request({
    method: 'PATCH',
    url: 'company/departments/' + data.id,
    data,
    params
  })
}

export function updatePosition(data) {
  return request({
    method: 'PATCH',
    url: 'company/positions/' + data.id,
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

export function deletePosition(id) {
  return request({
    method: 'DELETE',
    url: 'company/positions/' + id
  })
}

export function deleteMember(id) {
  return request({
    method: 'DELETE',
    url: 'company/members/' + id
  })
}

export function deleteDepartment(id) {
  return request({
    method: 'DELETE',
    url: 'company/departments/' + id
  })
}
