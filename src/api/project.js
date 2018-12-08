import request from '@/utils/request'

export function fetchProjects(params) {
  let url = 'projects'
  if (params) url += '?' + params
  return request({
    method: 'GET',
    url
  })
}

export function fetchProductTypes() {
  return request({
    method: 'GET',
    url: 'product-types'
  })
}

export function createProject(data) {
  return request({
    method: 'POST',
    url: 'projects',
    data
  })
}

export function updateProject(data) {
  return request({
    method: 'PATCH',
    url: 'projects/' + data.id,
    data
  })
}

export function deleteProject(id) {
  return request({
    method: 'DELETE',
    url: 'projects/' + id
  })
}
