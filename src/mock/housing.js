import Mock from 'mockjs'

const List = []
const count = 30

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: '@increment',
      created_at: +Mock.Random.date('T'),
      updated_at: +Mock.Random.date('T'),
      street_name: '@title(5, 12)', // 街道名称
      street_number: '10000', // 街道号码
      'property_type|1': ['House', 'Unit', 'Apartment', 'Studio', 'Villa'], // 房屋类型
      rent: '$350', // 租金
      beds: 3, // 床位数量
      car_spaces: 3, // 车库数量
      furnished: false, // 是否包含家具
      agent: 'Jerry', // 代理销售人
      suburb: 'xxx', // 郊区
      post_code: '123123', // 邮政编码
      description: 'Be one of the first to secure your preferred apartment with prices ranging from $350 - $380pw',
      available_date: 'thursday november 29, 2018',
      imgs: [
        'http://www.baidu.com/213'
      ]
    })
  )
}
