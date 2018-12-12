import {
  fetchServiceMessages,
  deleteServiceMessage,
  fetchServices
} from '@/api/service'
import { Loading } from 'element-ui'
import { snakeCase2CamelCase } from '@/utils'
import parseDataToConditionalParams from '@/utils/parseDataToConditionalParams'

const serviceMessage = {
  namespaced: true,
  state: {
    messages: [],
    tablePage: 1,
    tablePageSize: 15,
    tableLoading: false,
    filterServices: [],
    services: [],
    filterForm: {
      surname: [],
      name: [],
      email: [],
      phone: [],
      wechat: [],
      identity: [],
      comments: [],
      created_at_range: []
    },
    // 可用身份
    availableIdentity: [
      { value: 'landlord' },
      { value: 'vendor' }
    ]
  },
  mutations: {
    setMessages(state, payload) {
      state.messages = payload
    },
    setTablePage(state, payload) {
      state.tablePage = payload
    },
    setTablePageSize(state, payload) {
      state.tablePageSize = payload
    },
    setFilterServices(state, payload) {
      state.filterServices = payload
    },
    setServices(state, payload) {
      state.services = payload
    },
    setTableLoading(state, payload) {
      state.tableLoading = payload
    },
    deleteMessage(state, id) {
      state.messages.data = state.messages.data.filter(item => item.id !== id)
    }
  },
  actions: {
    async fetchServices({ commit }, payload) {
      const loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const services = (await fetchServices()).data
      const servicesData = services.data.map(item => {
        item.name = snakeCase2CamelCase(item.name)
        return item
      })
      commit('setServices', servicesData)
      commit('setFilterServices', servicesData.map(item => item.id))
      loading.close()
    },
    async fetchMessages({ commit, state }, payload) {
      let params = parseDataToConditionalParams({
        contains: {
          service_id: state.filterServices,
          identity_id: state.filterForm.identity
        },
        fuzzy: {
          surname: state.filterForm.surname,
          name: state.filterForm.name,
          email: state.filterForm.email,
          phone: state.filterForm.phone,
          wechat: state.filterForm.wechat,
          comments: state.filterForm.comments
        },
        dateRange: {
          created_at: state.filterForm.created_at_range
        }
      })
      params += '&pagesize=' + state.tablePageSize
      const data = (await fetchServiceMessages(params)).data
      commit('setMessages', data)
      return data
    },
    async deleteMessage({ commit }, id) {
      await deleteServiceMessage(id)
      commit('deleteMessage', id)
    }
  }
}

export default serviceMessage
