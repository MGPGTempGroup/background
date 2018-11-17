import {
  fetchOwners,
  createOwner,
  updateOwner,
  deleteOwner
} from '@/api/propertyOwner'
import { Loading } from 'element-ui'

const propertyOwner = {
  namespaced: true,
  state: {
    owners: {},
    ownersTableLoading: false,
    ownersTablePage: 1,
    ownersTablePageSize: 15,
    filterForm: {
      name: [],
      surname: [],
      phone: [],
      email: [],
      wechat: [],
      address: [],
      identity_id: [],
      id_card: [],
      createdDateRange: [],
      updatedDateRange: []
    },
    dataCreationDialogVisible: false,
    dataCreationForm: {
      name: '',
      surname: '',
      phone: '',
      email: '',
      wechat: '',
      address: [],
      identity_id: 1,
      id_card: ''
    },
    dataEditionDialogVisible: false,
    dataEditionForm: {},
    detailsDialogVisible: false,
    detailsData: {},
    availableIdentity: [
      { label: 'landlord', value: 1 },
      { label: 'vendor', value: 2 }
    ]
  },
  mutations: {
    resetOwnersData(state, payload) {
      state.owners = payload
    },
    updateTableLoading(state, payload) {
      state.ownersTableLoading = payload.loading
    },
    setCurrTablePage(state, payload) {
      state.ownersTablePage = payload.page
    },
    setTablePageSize(state, payload) {
      state.ownersTablePageSize = payload.pageSize
    },
    addOwnerData(state, payload) {
      state.owners.data.push(payload)
    },
    deleteOwnerData(state, payload) {
      state.owners.data = state.owners.data.filter(item => item.id !== payload.id)
    },
    updateOwnerData(state, payload) {
      state.owners.data = state.owners.data.map(item => {
        if (item.id === payload.id) item = payload
        return item
      })
    },
    updateFilterForm(state, payload) {
      state.filterForm = Object.assign({}, state.filterForm, payload)
    },
    updateDataCreationDialogVisible(state, payload) {
      state.dataCreationDialogVisible = !!payload.visible
    },
    setDataEditionDialogVisible(state, payload) {
      state.dataEditionDialogVisible = payload.visible
    },
    setDataEditionForm(state, payload) {
      state.dataEditionForm = Object.assign({}, payload)
    },
    setDetailsData(state, payload) {
      state.detailsData = payload
    },
    setDetailsDialogVisible(state, payload) {
      state.detailsDialogVisible = payload.visible
    }
  },
  actions: {
    async fetchOwners({ commit }, params) {
      commit('updateTableLoading', { loading: true })
      const owners = (await fetchOwners(params)).data
      commit('resetOwnersData', owners)
      commit('updateTableLoading', { loading: false })
      return owners
    },
    async createOwner({ commit }, ownerData) {
      const loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const data = (await createOwner(ownerData)).data
      commit('addOwnerData', data)
      commit('updateDataCreationDialogVisible', false)
      loading.close()
      return data
    },
    async updateOwner({ commit }, ownerData) {
      const loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const data = (await updateOwner(ownerData)).data
      commit('updateOwnerData', data)
      loading.close()
      return data
    },
    async deleteOwner({ commit }, ownerId) {
      const loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      await deleteOwner(ownerId)
      commit('deleteOwnerData', { id: ownerId })
      loading.close()
    },
    async updateOwnersTablePage({ commit, dispatch }, page) {
      await dispatch('fetchOwnersData', { page })
      commit('setCurrTablePage', page)
    },
    async updateOwnersTablePageSize({ commit, dispatch }, params) {
      await dispatch('fetchOwners', 'pageSize=' + params.pageSize)
      commit('setTablePageSize', params.pageSize)
    }
  }
}

export default propertyOwner
