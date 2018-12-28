import {
  fetchServiceTestimonials,
  updateServiceTestimonial,
  deleteServiceTestimonial
} from '@/api/service'

const serviceTestimonial = {
  namespaced: true,
  state: {
    testimonials: {
      data: [],
      meta: {}
    },
    testimonialsTablePage: 1,
    testimonialsTablePageSize: 10,
    testimonialsTableLoading: false
  },
  mutations: {
    setTestimonials(state, payload) {
      state.testimonials = payload
    },
    setTestimonialsTableLoading(state, payload) {
      state.testimonialsTableLoading = payload
    },
    setTestimonialsTablePage(state, page) {
      state.testimonialsTablePage = page
    },
    setTestimonialsTablePageSize(state, pageSize) {
      state.testimonialsTablePageSize = pageSize
    },
    setTestimonialShowState(state, { id, is_show }) {
      state.testimonials.data = state.testimonials.data.map(testimonial => {
        if (testimonial.id === id) {
          testimonial.is_show = is_show
        }
        return testimonial
      })
    },
    deleteTestimonial(state, { id }) {
      state.testimonials.data = state.testimonials.data.filter(testimonial => testimonial.id !== id)
    }
  },
  actions: {
    async fetchTestimonials({ state, commit }, { params = {}} = {}) {
      commit('setTestimonialsTableLoading', true)
      Object.assign(params, {
        page: state.testimonialsTablePage,
        pageSize: state.testimonialsTablePageSize
      })
      const testimonials = (await fetchServiceTestimonials(params)).data
      commit('setTestimonials', testimonials)
      commit('setTestimonialsTableLoading', false)
    },
    async updateTestimonialDisplayState({ commit }, { id, is_show = false }) {
      const resData = (await updateServiceTestimonial({
        id,
        is_show
      })).data
      commit('setTestimonialShowState', {
        id,
        is_show: resData.is_show
      })
    },
    async deleteTestimonial({ commit }, { id }) {
      await deleteServiceTestimonial(id)
      commit('deleteTestimonial', { id })
    }
  }
}

export default serviceTestimonial
