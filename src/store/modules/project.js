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
    }
  },
  actions: {
    async fetchProjects({ commit }, payload) {
      commit('setTableLoading', true)
      const projects = (await fetchProjects()).data
      commit('setProjects', projects)
      commit('setTableLoading', false)
      return projects
    }
  }
}

export default project
