import {
  fetchInfo,
  fetchMembers,
  fetchDepartments,
  createDepartment,
  createPositions,
  updateInfo,
  updateMember,
  deleteMember,
  createMember
} from '@/api/company'
import parseDataToConditionalParams from '@/utils/parseDataToConditionalParams'
import { deepClone } from '@/utils'
import { Loading } from 'element-ui'
import { fetchPositions } from '../../api/company'

const company = {
  namespaced: true,
  state: {
    // 公司成员相关数据
    members: {},
    membersTablePage: 1,
    membersTablePageSize: 10,
    membersTableLoading: false,
    membersFilterForm: {
      surname: [],
      name: [],
      phone: [],
      email: [],
      positions: []
    },
    createMembersDialogVisible: false,
    editMembersDialogVisible: false,
    memberEditForm: {},
    // 公司相关数据
    companyInfo: {
      telephone: '',
      facsimile: '',
      post_code: '',
      address: [],
      opening_hours: {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      }
    },
    availablePositions: [],
    companyDepartments: [],
    createDepartmentDialogVisible: false,
    departmentDetailsDialogVisible: false
  },
  mutations: {
    setCompanyInfo(state, payload) {
      state.companyInfo = payload
    },
    setCreateMemberDialogVisible(state, payload) {
      state.createMembersDialogVisible = payload
    },
    setEditMemberDialogVisible(state, payload) {
      state.editMembersDialogVisible = payload
    },
    setMembers(state, payload) {
      state.members = payload
    },
    setMembersTableLoading(state, payload) {
      state.membersTableLoading = payload
    },
    setMembersTablePage(state, payload) {
      state.membersTablePage = payload
    },
    setMembersTablePageSize(state, payload) {
      state.membersTablePageSize = payload
    },
    setMembersFilterForm(state, payload) {
      state.membersFilterForm = payload
    },
    setEditMembersForm(state, payload) {
      state.memberEditForm = payload
    },
    setCompanyDepartments(state, payload) {
      state.companyDepartments = payload
    },
    setAvailablePositions(state, payload) {
      state.availablePositions = payload
    },
    setCreateDepartmentDialogVisible(state, payload) {
      state.createDepartmentDialogVisible = payload
    },
    addMemberData(state, payload) {
      state.members.data.push(payload)
    },
    addDepartment(state, payload) {
      state.companyDepartments.push(payload)
    },
    addPositions(state, { department_id, positions }) {
      state.companyDepartments.map(item => {
        if (item.id === department_id) {
          item.positions.data = item.positions.data.concat(positions)
        }
        return item
      })
    },
    deleteMember(state, payload) {
      state.members.data = state.members.data.filter(item => {
        return item.id !== payload
      })
    },
    updateMemberData(state, payload) {
      state.members.data = state.members.data.map(item => {
        return item.id === payload.id ? payload : item
      })
    }
  },
  actions: {
    async fetchCompanyInfo({ commit }, payload) {
      const loading = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      const data = (await fetchInfo()).data
      commit('setCompanyInfo', data)
      loading.close()
      return deepClone(data)
    },
    async fetchCompanyMembers({ commit, state }, payload) {
      // 解析条件查询参数
      const filterForm = state.membersFilterForm
      const conditionalParams = parseDataToConditionalParams({
        fuzzy: {
          surname: filterForm.surname,
          name: filterForm.name,
          email: filterForm.email,
          phone: filterForm.phone
        }
      })
      const positionParams = filterForm.positions.map(id => {
        return 'positions[]=' + id
      }).join('&')
      const params = `${conditionalParams}&pagesize=${state.membersTablePageSize}&${positionParams}`
      const members = (await fetchMembers(params)).data
      commit('setMembers', members)
      return deepClone(members)
    },
    async fetchCompanyDepartments({ commit }, payload) {
      const departments = (await fetchDepartments()).data
      commit('setCompanyDepartments', departments.data || [])
      return departments.data
    },
    async fetchCompanyPositions({ commit }, { params }) {
      const positions = (await fetchPositions(params)).data
      commit('setAvailablePositions', positions.data)
    },
    async createCompanyDepartment({ commit }, { data, params = {}}) {
      const department = (await createDepartment(data, params)).data
      if (!department.positions) {
        department.positions = {
          data: []
        }
      }
      commit('addDepartment', department)
      return department
    },
    async createCompanyPositions({ commit }, { department_id, data, params = {}}) {
      const positions = (await createPositions(department_id, data, params)).data
      commit('addPositions', {
        department_id,
        positions: positions.data
      })
      return positions
    },
    async updateCompanyInfo({ commit }, payload) {
      const data = (await updateInfo(payload)).data
      commit('setCompanyInfo', data)
      return deepClone(data)
    },
    async updateCompanyMember({ commit }, payload) {
      const data = (await updateMember(payload)).data
      commit('updateMemberData', data)
      return data
    },
    async createCompanyMember({ commit }, payload) {
      const memberData = (await createMember(payload)).data
      commit('addMemberData', memberData)
      return memberData
    },
    async deleteCompanyMember({ commit }, payload) {
      await deleteMember(payload)
      commit('deleteMember', payload)
    }
  }
}

export default company
