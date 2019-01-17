import {
  fetchArticles,
  createArticle,
  updateArticle,
  deleteArticle
} from '@/api/industryUpdate'
import parseDataToConditionalParams from '@/utils/parseDataToConditionalParams'

const industryUpdate = {
  namespaced: true,
  state: {
    articles: {
      data: [],
      meta: {}
    },
    articlesTablePage: 1,
    articlesTablePageSize: 10,
    articlesFilterForm: {},
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
    setArticlesTablePage(state, payload) {
      state.articlesTablePage = payload
    },
    setArticlesTablePageSize(state, payload) {
      state.articlesTablePageSize = payload
    },
    setArticlesFilterForm(state, payload) {
      state.articlesFilterForm = payload
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
    },
    deleteArticle(state, payload) {
      state.articles.data = state.articles.data.filter(article => article.id !== payload)
    }
  },
  actions: {
    async fetchArticles({ state, commit }, { params = {}} = {}) {
      commit('setArticlesTableLoading', true)
      const conditionalParams = parseDataToConditionalParams({
        fuzzy: {
          title: state.articlesFilterForm.title,
          content: state.articlesFilterForm.content
        }
      })
      const pageParams = `page=${state.articlesTablePage}&pageSize=${state.articlesTablePageSize}`
      const includeParams = 'include=creator'
      const articles = (await fetchArticles(
        [conditionalParams, pageParams, includeParams].filter(Boolean).join('&')
      )).data
      commit('setArticles', articles)
      commit('setArticlesTableLoading', false)
    },
    async createArticle({ commit }, { data }) {
      const article = (await createArticle(data, {
        include: 'creator'
      })).data
      commit('addArticle', article)
    },
    async updateArticle({ commit }, { data }) {
      const article = (await updateArticle(data, {
        include: 'creator'
      })).data
      commit('setArticle', article)
    },
    async deleteArticle({ commit }, { id }) {
      await deleteArticle(id)
      commit('deleteArticle', id)
    }
  }
}

export default industryUpdate
