import {
  fetchPropertyTypes,
  createLeaseHouse
} from '@/api/house'

const housing = {
  namespaced: true,
  state: {
    // 租赁房屋列表
    leases: {
      data: [],
      meta: {}
    },
    // 出售房屋列表
    saleHousingList: [],
    createRentalHousingDialogVisible: false,
    createSaleHousingDialogVisible: false,
    availablePropertyType: []
  },
  mutations: {
    toggleCreateRentalHousingDialogVisible(state, payload) {
      state.createRentalHousingDialogVisible = payload.visible
    },
    toggleCreateSaleHousingDialogVisible(state, payload) {
      state.createSaleHousingDialogVisible = payload.visible
    },
    setAvailablePropertyType(state, payload) {
      state.availablePropertyType = payload
    },
    addLease(state, payload) {
      state.leases.data.push(payload)
    }
  },
  actions: {
    async fetchInitData({ dispatch }) {
      // 派遣拉取物业类型Action
      await dispatch('fetchPropertyTypes')
    },
    async fetchPropertyTypes({ commit }, payload) {
      const propertyTypes = (await fetchPropertyTypes()).data.data
      commit('setAvailablePropertyType', propertyTypes)
    },
    async createLeaseHouse({ commit }, payload) {
      const leaseHouseData = (await createLeaseHouse(payload)).data
      commit('addLease', leaseHouseData)
    }
  }
}

export default housing
