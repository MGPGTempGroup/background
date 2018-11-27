import {
  fetchLeases,
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
    leasesTableLoading: false,
    leasesTablePage: 1,
    leasesTablePageSize: 10,
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
    setLeases(state, payload) {
      state.leases = payload
    },
    setLeasesTableLoading(state, payload) {
      state.leasesTableLoading = payload
    },
    setLeasesTablePage(state, payload) {
      state.leasesTablePage = payload
    },
    setLeasesTablePageSize(state, payload) {
      state.leasesTablePageSize = payload
    },
    addLease(state, payload) {
      state.leases.data.push(payload)
    }
  },
  actions: {
    async fetchInitData({ dispatch }) {
      await dispatch('fetchPropertyTypes')
    },
    async fetchLeasesHouse({ commit }, payload) {
      commit('setLeasesTableLoading', true)
      const leasesData = (await fetchLeases()).data
      commit('setLeases', leasesData)
      commit('setLeasesTableLoading', false)
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
