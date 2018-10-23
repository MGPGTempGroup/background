const content = {
  namespaced: true,
  state: {
    landlordSupport: {
      currRichEditorContent: `Test Content`
    }
  },
  mutations: {
    updateCurrRichEditorContent(state, payload) {
      state.currRichEditorContent = payload.content
    }
  }
}

export default content
