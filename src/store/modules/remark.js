import {
  fetchRemarks,
  createRemark,
  updateRemark,
  deleteRemark
} from '@/api/remark'

const remark = {
  namespaced: true,
  state: {
    dialogVisible: false,
    comeFromType: undefined,
    comeFromId: undefined,
    remarksPage: 1,
    remarksPageSize: 15,
    remarks: {
      data: [],
      meta: {}
    }
  },
  mutations: {
    setDialogVisible(state, { visible }) {
      state.dialogVisible = visible
    },
    setRemarks(state, { data, meta }) {
      state.remarks = {
        data,
        meta
      }
    },
    addRemark(state, remark) {
      state.remarks.data.unshift(remark)
    },
    setRemark(state, remark) {
      state.remarks.data = state.remarks.data.map(item => {
        if (item.id === remark.id) {
          return remark
        }
        return item
      })
    },
    deleteRemark(state, { id }) {
      state.remarks.data = state.remarks.data.filter(item => item.id !== id)
      state.remarks.meta.pagination.total--
    },
    setRemarksPage(state, page) {
      state.remarksPage = page
    },
    setRemarksPageSize(state, pageSize) {
      state.remarksPageSize = pageSize
    },
    setComeFromType(state, type) {
      state.comeFromType = type
    },
    setComeFromId(state, id) {
      state.comeFromId = id
    }
  },
  actions: {
    async init({ commit, dispatch }, { come_from_type, come_from_id }) {
      // 初始化分页参数
      commit('setComeFromType', come_from_type)
      commit('setComeFromId', come_from_id)
      commit('setRemarksPage', 1)
      commit('setRemarksPageSize', 10)
      // 重新拉取备注数据
      await dispatch('fetchRemarks')
      commit('setDialogVisible', { visible: true })
    },
    async fetchRemarks({ commit, state }) {
      const remarks = (await fetchRemarks({
        params: {
          page: state.remarksPage,
          pageSize: state.remarksPageSize,
          come_from_type: state.comeFromType,
          come_from_id: state.comeFromId,
          include: 'creator'
        }
      })).data
      commit('setRemarks', remarks)
    },
    async createRemark({ state, commit }, { data }) {
      Object.assign(data, {
        come_from_type: state.comeFromType,
        come_from_id: state.comeFromId
      })
      const remark = (await createRemark({
        data,
        params: {
          include: 'creator'
        }
      })).data
      commit('addRemark', remark)
    },
    async updateRemark({ state, commit }, { data }) {
      const remark = (await updateRemark({
        data,
        params: {
          include: 'creator'
        }
      })).data
      commit('setRemark', remark)
    },
    async deleteRemark({ state, commit, dispatch }, { id }) {
      await deleteRemark(id)
      commit('deleteRemark', {
        id
      })
    }
  }
}

export default remark
