import { createOwner } from '@/api/propertyOwner'

const temp = []
for (let i = 0; i < 10; i++) {
  temp.push({
    id: i + 1, // 序号
    name: 'Jerry Smith', // 姓名
    surname: 'Smith', // 姓
    email: '********@gmail.com', // 电子邮件
    phone: '173****4331', // 手机号码
    photo_thumbnail: 'https://www.melbournerealestate.com.au/wp-content/uploads/2015/03/Ella-2.png', // 头像缩略图
    id_card_num: '***********', // 身份证号码
    wechat: 'xxxxx',
    address: 'Victoria University International PO Box 14428 Melbourne, Victoria 8001, Australia',
    identity: ['landlord', 'vendor'][Math.round(Math.random())], // 身份
    // is_sign_contract: Math.random() > 0.5 ? 1 : 0, // 是否签署合同
    agent: 'Jerry', // 销售代理
    // approved: Math.random() > 0.5 ? 1 : 0, // 是否经过审批
    // follow_up_state: Math.round(Math.random() * 2), // 跟进状态
    // follow_up_time: '3 hours ago',
    created_at: '1 years ago', // 数据创建于
    updated_at: '3 days ago' // 数据修改于
  })
}

const propertyOwner = {
  namespaced: true,
  state: {
    list: temp,
    filterForm: {
      name: '',
      phone: '',
      email: '',
      wechat: '',
      address: '',
      identity: '',
      agent: '',
      idCardNum: '',
      createdDateRange: '',
      updatedDateRange: ''
    },
    dataCreationForm: {
      name: '',
      surname: '',
      email: '',
      wechat: '',
      phone: '',
      address: [],
      identity_id: null,
      id_card: ''
    },
    dataEditionForm: {
      name: 'Jerry Smith',
      surname: 'Smith',
      email: '********@gmail.com',
      wechat: 'xxxxx',
      idCardNum: '***********',
      address: [],
      identity: ['landlords'],
      agent: ['Jerry'],
      photo: '173****4331'
    },
    availableIdentity: [
      { label: 'landlord', value: 1 },
      { label: 'vendor', value: 2 }
    ],
    dataCreationDialogVisible: false,
    dataEditionDialogVisible: false,
    detailsDialogVisible: false
  },
  mutations: {
    updateFilterForm(state, payload) {
      state.filterForm[payload.property] = payload.value
    },
    updateDataCreationDialogVisible(state, payload) {
      state.dataCreationDialogVisible = !!payload.visible
    },
    updateDataEditionDialogVisible(state, payload) {
      state.dataEditionDialogVisible = !!payload.visible
    },
    updateDetailsDialogVisible(state, payload) {
      state.detailsDialogVisible = !!payload.visible
    },
    addOwnerData(state, payload) {
      state.list.push(payload)
    }
  },
  actions: {
    async createOwner({ commit }, ownerData) {
      const res = await createOwner(ownerData)
      commit('addOwnerData', res.data)
      commit('updateDataCreationDialogVisible', false)
      // commit mutations
      return res
    }
  }
}

export default propertyOwner
