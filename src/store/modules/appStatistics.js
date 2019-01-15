
import * as statisticsAPI from '@/api/statistics'

const appStatistics = {
  namespaced: true,
  state: {
    messages: {
      total: undefined,
      today: undefined,
      last_7_days: undefined,
      last_30_days: undefined,
      last_12_months: undefined
    },
    houseInspections: {
      total: undefined,
      today: undefined,
      last_7_days: undefined,
      last_30_days: undefined,
      last_12_months: undefined
    },
    pageViews: {
      total: undefined,
      today: undefined,
      last_7_days: undefined,
      last_30_days: undefined,
      last_12_months: undefined
    },
    uniqueVisitors: {
      total: undefined,
      today: undefined,
      last_7_days: undefined,
      last_30_days: undefined,
      last_12_months: undefined
    }
  },
  mutations: {
    setMessages(state, payload) {
      state.messages = {
        ...state.messages,
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
      commit('setMessages', statisticsData.messages)
      commit('setHouseInspections', statisticsData.house_inspections)
      commit('setPageViews', statisticsData.page_view)
      commit('setUniqueVisitors', statisticsData.unique_visitor)
    },
    async fetchLast12MonthsStatistics({ commit }, payload = {}) {
      const statisticsData = (await statisticsAPI.getLast12MonthsStatistics()).data
      commit('setMessages', {
        last_12_months: statisticsData.messages
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
    },
    async fetchLast30DaysStatistics({ commit }, payload = {}) {
      const statisticsData = (await statisticsAPI.getLast30DaysStatistics()).data
      commit('setMessages', {
        last_30_days: statisticsData.messages
      })
      commit('setHouseInspections', {
        last_30_days: statisticsData.house_inspections
      })
      commit('setPageViews', {
        last_30_days: statisticsData.page_view
      })
      commit('setUniqueVisitors', {
        last_30_days: statisticsData.unique_visitor
      })
    }
  }
}

export default appStatistics
