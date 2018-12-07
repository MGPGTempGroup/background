import {
  fetchProjects,
  fetchProductTypes,
  createProject,
  updateProject
} from '@/api/project'
import i18n from '@/lang'

const project = {
  namespaced: true,
  state: {
    projects: {
      data: [],
      meta: {}
    },
    tableLoading: false,
    tablePage: 1,
    tablePageSize: 10,
    productTypes: {
      data: []
    },
    createProjectDialogVisible: false,
    editProjectDialogVisible: false,
    editProjectData: {},
    projectDetailsDialogVisible: false,
    projectDetailsData: {},
    projectStatus: [
      { label: i18n.t('projectStatus.soldOut'), value: 3 }
    ]
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload
    },
    setProject(state, payload) {
      state.projects.data = state.projects.data.map(item => {
        return item.id === payload.id ? payload : item
      })
    },
    addProject(state, payload) {
      state.projects.data.push(payload)
    },
    setTableLoading(state, payload) {
      state.tableLoading = payload
    },
    setTablePage(state, payload) {
      state.tablePage = payload
    },
    setTablePageSize(state, payload) {
      state.tablePageSize = payload
    },
    setCreateProjectDialogVisible(state, payload) {
      state.createProjectDialogVisible = payload
    },
    setEditProjectDialogVisible(state, payload) {
      state.editProjectDialogVisible = payload
    },
    setEditProjectData(state, payload) {
      state.editProjectData = payload
    },
    setProjectDetailsDialogVisible(state, payload) {
      state.projectDetailsDialogVisible = payload
    },
    setProjectDetailsData(state, payload) {
      state.projectDetailsData = payload
    },
    setProductTypes(state, payload) {
      state.productTypes = payload
    }
  },
  actions: {
    async fetchProductTypes({ commit }, payload) {
      const productTypes = (await fetchProductTypes()).data
      commit('setProductTypes', productTypes)
    },
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
    },
    async createProject({ commit }, payload) {
      const project = (await createProject(payload)).data
      commit('addProject', project)
    },
    async updateProject({ commit }, payload) {
      const project = (await updateProject(payload)).data
      commit('setProject', project)
    }
  }
}

export default project
