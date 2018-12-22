
import {
  fetchArticles,
  createArticle
} from '@/api/industryUpdate'

const industryUpdate = {
  namespaced: true,
  state: {
    articles: {
      data: [],
      meta: {}
    },
    articlesTableLoading: false,
    createIndustyUpdateDialogVisible: false
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
    addArticle(state, payload) {
      state.articles.data.push(payload)
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
    }
  }
}

export default industryUpdate
