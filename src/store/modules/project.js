import {
  fetchProjects
} from '@/api/project'

const project = {
  namespaced: true,
  state: {
    projects: {
      data: [],
      meta: {}
    },
    tableLoading: false,
    tablePage: 1,
    tablePageSize: 10
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload
    },
    setTableLoading(state, payload) {
      state.tableLoading = payload
    },
    setTablePage(state, payload) {
      state.tablePage = payload
    },
    setTablePageSize(state, payload) {
      state.tablePageSize = payload
    }
  },
  actions: {
    async fetchProjects({ commit, state }, payload) {
      commit('setTableLoading', true)
      const pageParams = [
        'page=' + state.tablePage,
        'pageSize=' + state.tablePageSize
      ].join('&')
      const projects = (await fetchProjects(pageParams)).data
      commit('setProjects', projects)
      commit('setTableLoading', false)
      return projects
    },
    async changeTablePage({ commit, dispatch }, payload) {
      commit('setTablePage', payload)
      await dispatch('fetchProjects')
    },
    async changeTablePageSize({ commit, dispatch }, payload) {
      commit('setTablePageSize', payload)
      await dispatch('fetchProjects')
    }
  }
}

export default project
