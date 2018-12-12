// 判断是否空数组
const arrayIsEmpty = arr => !(arr instanceof Array) || arr.length === 0

/**
 * 这段代码为后端条件查询接口所编写：将表单对象数据转换为条件查询字符串（url参数）
 */
export default function parseDataToConditionalParams({ fuzzy = {}, dateRange = {}, contains = {}, between = {}, basics = {}}) {
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
        return 'daterange_' + item[0] + '[]=' + date
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
  // 转换between查询参数（between查询）
  paramsArr.push(
    Object.entries(between)
      .filter(item => !arrayIsEmpty(item[1]) &&
      item[1].length === 2 &&
      item[1].every(Number))
      .map(item => {
        return item[1].map(val => {
          return item[0] + '_between[]=' + val
        }).join('&')
      }).join('&')
  )

  // 基础操作符查询参数（>、>=、<=、<>...）
  paramsArr.push(
    Object.entries(basics)
      .map(conditionalArr => {
        const [operator, conditionals] = conditionalArr
        return Object.entries(conditionals).map(item => {
          const [column, value] = item
          if (!value) return undefined
          return column + '_' + operator + '=' + value
        }).filter(Boolean).join('&')
      }).filter(Boolean).join('&')
  )

  return paramsArr.filter(Boolean).join('&')
}
