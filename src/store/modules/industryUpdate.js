import {
  fetchArticles,
  createArticle,
  updateArticle
} from '@/api/industryUpdate'

const industryUpdate = {
  namespaced: true,
  state: {
    articles: {
      data: [],
      meta: {}
    },
    articlesTableLoading: false,
    createIndustyUpdateDialogVisible: false,
    editIndustryUpdateDialogVisible: false,
    editIndustryUpdateDialogData: {}
  },
  mutations: {
    setArticles(state, payload) {
      state.articles = payload
    },
    setArticlesTableLoading(state, payload) {
      state.articlesTableLoading = payload
    },
    setCreateIndustryUpdateDialogVisible(state, payload) {
      state.createIndustyUpdateDialogVisible = payload
    },
    setEditIndustryUpdateDialogVisible(state, payload) {
      state.editIndustryUpdateDialogVisible = payload
    },
    setEditIndustryUpdateDialogData(state, payload) {
      state.editIndustryUpdateDialogData = payload
    },
    addArticle(state, payload) {
      state.articles.data.push(payload)
    },
    setArticle(state, payload) {
      state.articles.data = state.articles.data.map(article => {
        return article.id !== payload.id ? article : payload
      })
    }
  },
  actions: {
    async fetchArticles({ commit }, { params = {}} = {}) {
      commit('setArticlesTableLoading', true)
      const articles = (await fetchArticles()).data
      commit('setArticles', articles)
      commit('setArticlesTableLoading', false)
    },
    async createArticle({ commit }, { data }) {
      const article = (await createArticle(data)).data
      commit('addArticle', article)
    },
    async updateArticle({ commit }, { data }) {
      const article = (await updateArticle(data)).data
      commit('setArticle', article)
    }
  }
}

export default industryUpdate
