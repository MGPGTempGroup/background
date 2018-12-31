import request from '@/utils/request'

export function getAll(params) {
  const url = 'statistics'
  return request({
    url
  })
}

export function getLast12MonthsStatistics(params) {
  const url = 'statistics/past-12-months'
  return request({
    url
  })
}

export function getLast30DaysStatistics(params) {
  const url = 'statistics/past-30-days'
  return request({
    url
  })
}
