
const temp = []
for (let i = 0; i < 10; i++) {
  temp.push({
    id: i + 1,
    created_at: '3 days ago',
    updated_at: '2 days ago',
    street_name: 'Margaret Street', // 街道名称
    street_code: '36', // 街道号码
    property_types: 'House', // 房屋类型
    rent: '$350 ~ $400', // 租金
    beds: 3, // 床位数量
    showers: 1, // 床位数量
    car_spaces: 3, // 车库数量
    furnished: false, // 是否包含家具
    agent: 'Jerry Springer', // 代理销售人
    owner: 'Jerry Springer',
    suburb: 'Moonee Ponds', // 郊区
    post_code: '3039', // 邮政编码
    state: 'VIC',
    currState: 'reserved',
    description: 'Be one of the first to secure your preferred apartment with prices ranging from $350 - $380pw',
    available_date: 'Now'
  })
}
const temp2 = []

for (let i = 0; i < 10; i++) {
  temp2.push({
    id: i + 1,
    created_at: '3 days ago',
    updated_at: '2 days ago',
    street_name: 'Margaret Street', // 街道名称
    street_code: '36', // 街道号码
    property_types: 'House', // 房屋类型
    rent: '$350 ~ $400', // 租金
    beds: 3, // 床位数量
    showers: 1, // 床位数量
    car_spaces: 3, // 车库数量
    furnished: false, // 是否包含家具
    agent: 'Jerry Springer', // 代理销售人
    owner: 'Jerry Springer',
    suburb: 'Moonee Ponds', // 郊区
    post_code: '3039', // 邮政编码
    state: 'VIC',
    currState: 'reserved',
    description: 'Be one of the first to secure your preferred apartment with prices ranging from $350 - $380pw'
  })
}

const housing = {
  namespaced: true,
  state: {
    rentalHousingList: temp,
    saleHousingList: temp2,
    createRentalHousingDialogVisible: false,
    createSaleHousingDialogVisible: false
  },
  mutations: {
    toggleCreateRentalHousingDialogVisible(state, payload) {
      state.createRentalHousingDialogVisible = payload.visible
    },
    toggleCreateSaleHousingDialogVisible(state, payload) {
      state.createSaleHousingDialogVisible = payload.visible
    }
  }
}

export default housing
