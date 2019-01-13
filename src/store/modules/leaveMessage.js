import * as leaveMessageAPI from '@/api/leaveMessage'
import conditionalParamParser from '@/utils/parseDataToConditionalParams'

const leaveMessage = {
  namespaced: true,
  state: {
    messages: {
      data: [],
      meta: {}
    },
    messagesTableLoading: false,
    messagesPage: 1,
    messagesPageSize: 15,
    messagesDialogVisible: false,
    messagesDialogData: [],
    messagesFilterForm: {
      name: undefined,
      email: undefined,
      message: undefined
    }
  },
  mutations: {
    setMessages(state, { data, meta }) {
      state.messages = {
        data,
        meta
      }
    },
    setMessagesTableLoading(state, isLoading) {
      state.messagesTableLoading = isLoading
    },
    setMessagesFilterForm(state, form) {
      state.messagesFilterForm = form
    },
    setMessagesPage(state, page) {
      state.messagesPage = page
    },
    setMessagesPageSize(state, pageSize) {
      state.messagesPageSize = pageSize
    },
    setMessagesDialogVisible(state, visible) {
      state.messagesDialogVisible = visible
    },
    setMessagesDialogData(state, data) {
      state.messagesDialogData = data
    },
    deleteMessage(state, { id }) {
      const messages = state.messages.data.filter(message => message.id !== id)
      state.messages.meta.pagination.total -= state.messages.data.length - messages.length
      state.messages.data = messages
    }
  },
  actions: {
    async fetchMessages({ state, commit }, payload) {
      const conditionalParams = conditionalParamParser({
        fuzzy: {
          name: state.messagesFilterForm.name,
          email: state.messagesFilterForm.email,
          messages: state.messagesFilterForm.messages
        }
      })
      const pageParams = [
        'page=' + state.messagesPage,
        'pageSize=' + state.messagesPageSize
      ].join('&')
      const messages = (await leaveMessageAPI.fetchMessages(`${pageParams}&${conditionalParams}`)).data
      commit('setMessages', messages)
    },
    async deleteMessage({ commit }, { id }) {
      await leaveMessageAPI.deleteMessage(id)
      commit('deleteMessage', {
        id
      })
    }
  }
}

export default leaveMessage
