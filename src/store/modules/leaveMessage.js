import * as leaveMessageAPI from '@/api/leaveMessage'

const leaveMessage = {
  namespaced: true,
  state: {
    messages: {
      data: [],
      meta: {}
    },
    messagesPage: 1,
    messagesPageSize: 15,
    messagesDialogVisible: false,
    messagesDialogData: []
  },
  mutations: {
    setMessages(state, { data, meta }) {
      state.messages = {
        data,
        meta
      }
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
    async fetchMessages({ commit }, payload) {
      const messages = (await leaveMessageAPI.fetchMessages()).data
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
