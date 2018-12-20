import {
  fetchInfo,
  fetchMembers,
  fetchDepartments,
  fetchPositions,
  createMember,
  createDepartment,
  createPositions,
  updateInfo,
  updateMember,
  updateDepartment,
  updatePosition,
  deleteMember,
  deletePosition
} from '@/api/company'
import parseDataToConditionalParams from '@/utils/parseDataToConditionalParams'
import { deepClone } from '@/utils'
import { Loading } from 'element-ui'

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
    availablePositions: [], // 可用职位数据
    companyDepartments: [], // 公司部门列表数据
    createDepartmentDialogVisible: false, // 创建部门对话框显示状态
    editDepartmentDialogVisible: false, // 编辑部门对话框显示状态
    editDepartmentDialogData: {}, // 编辑部门对话框数据（ Form ）
    departmentDetailsDialogVisible: false, // 部门详情对话框显示状态
    departmentDetailsDialogData: {} // 部门详情对话框数据
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
    setDepartments(state, payload) {
      state.companyDepartments = payload
    },
    setDepartment(state, payload) {
      state.companyDepartments = state.companyDepartments.map(item => {
        return item.id === payload.id ? payload : item
      })
    },
    setDepartmentName(state, { id, name }) {
      state.companyDepartments = state.companyDepartments()
    },
    setPosition(state, { department_id, positionData }) {
      state.companyDepartments = state.companyDepartments.map(department => {
        if (department.id === department_id) {
          department.positions.data = department.positions.data.map(position => {
            return position.id === positionData.id ? positionData : position
          })
        }
        return department
      })
    },
    setMember(state, payload) {
      state.members.data = state.members.data.map(item => {
        return item.id === payload.id ? payload : item
      })
    },
    setAvailablePositions(state, payload) {
      state.availablePositions = payload
    },
    setCreateDepartmentDialogVisible(state, payload) {
      state.createDepartmentDialogVisible = payload
    },
    setDepartmentDetailsDialogVisible(state, payload) {
      state.departmentDetailsDialogVisible = payload
    },
    setEditDepartmentDialogVisible(state, payload) {
      state.editDepartmentDialogVisible = payload
    },
    setEditDepartmentDialogData(state, payload) {
      state.editDepartmentDialogData = payload
    },
    setDepartmentDetailsDialogData(state, payload) {
      state.departmentDetailsDialogData = payload
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
    deletePosition(state, { department_id, position_id }) {
      const department = state.companyDepartments.find(department => department.id === department_id)
      department.positions.data = department.positions.data.filter(position => position.id !== position_id)
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
      commit('setDepartments', departments.data || [])
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
    async createCompanyMember({ commit }, payload) {
      const memberData = (await createMember(payload)).data
      commit('addMemberData', memberData)
      return memberData
    },
    async updateCompanyInfo({ commit }, payload) {
      const data = (await updateInfo(payload)).data
      commit('setCompanyInfo', data)
      return deepClone(data)
    },
    async updateCompanyDepartment({ commit }, { data, params = {}}) {
      const department = (await updateDepartment(data, params)).data
      commit('setDepartment', department)
    },
    async updateCompanyPosition({ commit }, { data, department_id, params = {}}) {
      const positionData = (await updatePosition(data, params)).data
      commit('setPosition', {
        department_id,
        positionData
      })
    },
    async updateCompanyMember({ commit }, payload) {
      const data = (await updateMember(payload)).data
      commit('setMember', data)
      return data
    },
    async deleteCompanyMember({ commit }, payload) {
      await deleteMember(payload)
      commit('deleteMember', payload)
    },
    async deletePosition({ commit }, { id, department_id }) {
      await deletePosition(id)
      commit('deletePosition', {
        department_id,
        position_id: id
      })
    }
  }
}

export default company
