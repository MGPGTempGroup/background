import request from '@/utils/request'

export function fetchProjects(params) {
  let url = 'projects'
  if (params) url += '?' + params
  return request({
    method: 'GET',
    url
  })
}
