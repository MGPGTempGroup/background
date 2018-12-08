import {
  fetchProjects,
  fetchProductTypes,
  createProject,
  updateProject,
  deleteProject
} from '@/api/project'
import parseData2ConditionalParams from '@/utils/parseData2ConditionalParams'
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
    projectFilterForm: {},
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
    deleteProject(state, payload) {
      state.projects.data = state.projects.data.filter(item => item.id !== payload.id)
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
    setProjectFilterForm(state, payload) {
      state.projectFilterForm = payload
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
      const params = []
      // 分页参数
      params.push([
        'page=' + state.tablePage,
        'pageSize=' + state.tablePageSize
      ].join('&'))
      // 条件筛选参数
      const filterForm = state.projectFilterForm
      params.push(parseData2ConditionalParams({
        fuzzy: {
          name: filterForm.name,
          location: filterForm.location,
          description: filterForm.description,
          address: filterForm.address
        },
        contains: {
          is_new_development: filterForm.is_new_development,
          is_past_success: filterForm.is_past_success,
          status: filterForm.status,
          owner_id: filterForm.owner_id
        },
        basics: {
          egt: {
            min_price: filterForm.min_price
          },
          elt: {
            max_price: filterForm.max_price
          }
        },
        dateRange: {
          created_at: filterForm.created_at_range,
          updated_at: filterForm.updated_at_range,
          year_built: filterForm.year_built_range
        }
      }))
      if (Array.isArray(filterForm.agents) && filterForm.agents.length) {
        params.push(
          filterForm.agents.map(id => 'agents[]=' + id).join('&')
        )
      }

      if (Array.isArray(filterForm.product_type) && filterForm.product_type.length) {
        params.push(
          filterForm.product_type.map(id => 'product_types[]=' + id).join('&')
        )
      }
      const projects = (await fetchProjects(
        params.filter(Boolean).join('&')
      )).data
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
    },
    async deleteProject({ commit, state, dispatch }, payload) {
      await deleteProject(payload.id)
      commit('deleteProject', {
        id: payload.id
      })
      if (state.projects.data.length === 0 && state.tablePage !== 1) {
        dispatch('changeTablePage', state.tablePage - 1)
      }
    }
  }
}

export default project
