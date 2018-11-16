import {
  fetchOwners,
  createOwner,
  updateOwner,
  deleteOwner
} from '@/api/propertyOwner'

const propertyOwner = {
  namespaced: true,
  state: {
    owners: {},
    ownersTableLoading: false,
    ownersTablePage: 1,
    filterForm: {
      name: '',
      phone: '',
      email: '',
      wechat: '',
      address: '',
      identity: '',
      agent: '',
      idCardNum: '',
      createdDateRange: '',
      updatedDateRange: ''
    },
    dataCreationDialogVisible: false,
    dataCreationForm: {},
    dataEditionDialogVisible: false,
    dataEditionForm: {},
    detailsDialogVisible: false,
    detailsData: {},
    availableIdentity: [
      { label: 'landlord', value: 1 },
      { label: 'vendor', value: 2 }
    ],
    detailsDialog: {
      data: {},
      visible: false
    }
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
      state.filterForm[payload.property] = payload.value
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
      const data = (await createOwner(ownerData)).data
      commit('addOwnerData', data)
      commit('updateDataCreationDialogVisible', false)
      return data
    },
    async updateOwner({ commit }, ownerData) {
      const data = (await updateOwner(ownerData)).data
      commit('updateOwnerData', data)
      return data
    },
    async deleteOwner({ commit }, ownerId) {
      await deleteOwner(ownerId)
      commit('deleteOwnerData', { id: ownerId })
    },
    async updateOwnersTablePage({ commit, dispatch }, page) {
      await dispatch('fetchOwnersData', { page })
      commit('setCurrTablePage', page)
    }
  }
}

export default propertyOwner
