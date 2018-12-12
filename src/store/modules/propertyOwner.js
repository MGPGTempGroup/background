import {
  fetchOwners,
  createOwner,
  updateOwner,
  deleteOwner
} from '@/api/propertyOwner'
import { Loading } from 'element-ui'
import parseDataToConditionalParams from '@/utils/parseDataToConditionalParams'

const propertyOwner = {
  namespaced: true,
  state: {
    owners: {},
    ownersTableLoading: false,
    ownersTablePage: 1,
    ownersTablePageSize: 10,
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
      { label: 'vendor', value: 4 },
      { label: 'other', value: 5 },
      { label: 'tenant', value: 2 },
      { label: 'purchaser', value: 3 }
    ]
  },
  mutations: {
    resetOwnersData(state, payload) {
      state.owners = payload
    },
    updateTableLoading(state, payload) {
      state.ownersTableLoading = payload.loading
    },
    setTablePage(state, payload) {
      state.ownersTablePage = payload
    },
    setTablePageSize(state, payload) {
      state.ownersTablePageSize = payload
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
    async fetchOwners({ commit, state }) {
      commit('updateTableLoading', { loading: true })
      const filterForm = state.filterForm
      const conditionalParams = parseDataToConditionalParams({
        fuzzy: {
          phone: filterForm.phone,
          name: filterForm.name,
          surname: filterForm.surname,
          email: filterForm.email,
          wechat: filterForm.wechat,
          id_card: filterForm.id_card
        },
        dateRange: {
          created_at: filterForm.createdDateRange,
          updated_at: filterForm.updatedDateRange
        },
        contains: {
          identity_id: filterForm.identity_id
        }
      })
      const params = [
        conditionalParams,
        'page=' + state.ownersTablePage,
        'pageSize=' + state.ownersTablePageSize
      ].join('&')
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
      try {
        const data = (await createOwner(ownerData)).data
        commit('addOwnerData', data)
        commit('updateDataCreationDialogVisible', false)
        return data
      } finally {
        loading.close()
      }
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
    }
  }
}

export default propertyOwner
