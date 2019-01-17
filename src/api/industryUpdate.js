import request from '@/utils/request'

export function fetchArticles(params = null) {
  let url = 'industry-updates'
  if (params) url += '?' + params
  return request({
    method: 'GET',
    url
  })
}

export function createArticle(data, params = {}) {
  return request({
    method: 'POST',
    url: 'industry-updates',
    data,
    params
  })
}

export function updateArticle(data, params = {}) {
  return request({
    method: 'PATCH',
    url: 'industry-updates/' + data.id,
    data,
    params
  })
}

export function deleteArticle(id) {
  return request({
    method: 'DELETE',
    url: 'industry-updates/' + id
  })
}
