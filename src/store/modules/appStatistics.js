
import * as statisticsAPI from '@/api/statistics'

const appStatistics = {
  namespaced: true,
  state: {
    serviceMessages: {
      total: undefined,
      last_7_days: undefined,
      today: undefined,
      last_12_months: undefined
    },
    houseInspections: {
      total: undefined,
      last_7_days: undefined,
      today: undefined,
      last_12_months: undefined
    },
    pageViews: {
      total: undefined,
      last_7_days: undefined,
      today: undefined,
      last_12_months: undefined
    },
    uniqueVisitors: {
      total: undefined,
      last_7_days: undefined,
      today: undefined,
      last_12_months: undefined
    }
  },
  mutations: {
    setServiceMessages(state, payload) {
      state.serviceMessages = {
        ...state.serviceMessages,
        ...payload
      }
    },
    setHouseInspections(state, payload) {
      state.houseInspections = {
        ...state.houseInspections,
        ...payload
      }
    },
    setPageViews(state, payload) {
      state.pageViews = {
        ...state.pageViews,
        ...payload
      }
    },
    setUniqueVisitors(state, payload) {
      state.uniqueVisitors = {
        ...state.uniqueVisitors,
        ...payload
      }
    }
  },
  actions: {
    async fetchAllStatistics({ commit }, payload = {}) {
      const statisticsData = (await statisticsAPI.getAll()).data
      commit('setServiceMessages', statisticsData.service_messages)
      commit('setHouseInspections', statisticsData.house_inspections)
      commit('setPageViews', statisticsData.page_view)
      commit('setUniqueVisitors', statisticsData.unique_visitor)
    },
    async fetchLast12MonthsStatistics({ commit }, payload = {}) {
      const statisticsData = (await statisticsAPI.getLast12MonthsStatistics()).data
      console.log(statisticsData)
      commit('setServiceMessages', {
        last_12_months: statisticsData.service_messages
      })
      commit('setHouseInspections', {
        last_12_months: statisticsData.house_inspections
      })
      commit('setPageViews', {
        last_12_months: statisticsData.page_view
      })
      commit('setUniqueVisitors', {
        last_12_months: statisticsData.unique_visitor
      })
    }
  }
}

export default appStatistics
