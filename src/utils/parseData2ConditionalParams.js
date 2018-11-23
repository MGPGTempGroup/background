import {
  parseTime
} from './index'

// 判断是否空数组
const arrayIsEmpty = arr => !(arr instanceof Array) || arr.length === 0

/**
 * 这段代码为后端条件查询接口所编写：将表单对象数据转换为条件查询字符串（url参数）
 */
export default function parseData2ConditionalParams({ fuzzy = {}, dateRange = {}, contains = {}}) {
  const paramsArr = []
  // 转换模糊查询参数
  paramsArr.push(
    Object.entries(fuzzy).filter(item => !arrayIsEmpty(item[1])).map(item => {
      return item[1].map(val => {
        return item[0] + '_like[]=' + val
      }).join('&')
    }).join('&')
  )
  // 转换时间区间查询参数
  paramsArr.push(
    Object.entries(dateRange).filter(item => !arrayIsEmpty(item[1])).map(item => {
      return item[1].map(date => {
        return 'daterange_' + item[0] + '[]=' + parseTime(date)
      }).join('&')
    }).join('&')
  )
  // 转换包含查询参数（in查询）
  paramsArr.push(
    Object.entries(contains).filter(item => !arrayIsEmpty(item[1])).map(item => {
      return item[1].map(val => {
        return 'contains_' + item[0] + '[]=' + val
      }).join('&')
    }).join('&')
  )

  return paramsArr.filter(Boolean).join('&')
}
