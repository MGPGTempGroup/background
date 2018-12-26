
import * as statisticsAPI from '@/api/statistics'

const appStatistics = {
  namespaced: true,
  state: {
    serviceMessages: {
      total: undefined,
      last_7_days: undefined,
      today: undefined
    },
    houseInspections: {
      total: undefined,
      last_7_days: undefined,
      today: undefined
    },
    pageViews: {
      total: undefined,
      last_7_days: undefined,
      today: undefined
    },
    uniqueVisitors: {
      total: undefined,
      last_7_days: undefined,
      today: undefined
    }
  },
  mutations: {
    setServiceMessages(state, payload) {
      state.serviceMessages = payload
    },
    setHouseInspections(state, payload) {
      state.houseInspections = payload
    },
    setPageViews(state, payload) {
      state.pageViews = payload
    },
    setUniqueVisitors(state, payload) {
      state.uniqueVisitors = payload
    }
  },
  actions: {
    async fetchAllStatistics({ state, commit }, payload = {}) {
      const statisticsData = (await statisticsAPI.getAll()).data
      commit('setServiceMessages', statisticsData.service_messages)
      commit('setHouseInspections', statisticsData.house_inspections)
      commit('setPageViews', statisticsData.page_view)
      commit('setUniqueVisitors', statisticsData.unique_visitor)
    }
  }
}

export default appStatistics
