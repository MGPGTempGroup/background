import {
  fetchInfo,
  fetchMembers,
  fetchDepartments,
  updateInfo,
  createMember
} from '@/api/company'
import { deepClone } from '@/utils'
import { Loading } from 'element-ui'

const company = {
  namespaced: true,
  state: {
    // 公司成员相关数据
    members: [
      {
        id: 1,
        name: 'xxx',
        phone: '***********',
        email: 'xxxx@gmail.com',
        job: ['Office Manager'],
        branch: 'Corporate',
        photo: 'http://lorempixel.com/640/480',
        description: `Ann Rogers has a talent for management. As right hand woman to MRE founder and director, Peter Hooymans, she serves as a linchpin of the company. A founding member of the agency, she is incredibly proud to have helped realise the vision of creating an award winning boutique real estate agency.
        Her extensive experience and industry knowledge makes Ann truly indispensable and central to the smooth running of the business. Her natural inclination is to provide support and she is always ready to drop everything and assist where required.
        Ann’s pivotal role in the company is undeniable, as her professionalism, tireless work ethic and outstanding time management skills continue to provide a benchmark for incoming staff. Her positivity and energy encapsulate the MRE cultural mind-set, with its emphasis on excellence and team work.
        A commitment to fitness and wellbeing is obvious as Ann fairly radiates good health. She knows that a successful career can only be realised when priorities are in order and everything in life is balanced, a feat she has successfully achieved.`,
        testimonials: [
          { id: 1, content: '123' }
        ],
        personal_homepage: {
          google_plus: 'http://www.google.com',
          linkin: 'http://www.linkin.com'
        },
        created_at: '3 days ago',
        updated_at: '3 days ago'
      }
    ],
    membersTablePage: 1,
    membersTablePageSize: 10,
    membersTableLoading: false,
    membersFilterForm: {},
    // 公司相关数据
    companyDepartments: [],
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
    createMembersDialogVisible: false,
    editMembersDialogVisible: false
  },
  mutations: {
    toggleCreateMembersDialogVisible(state, payload) {
      state.createMembersDialogVisible = payload.visible
    },
    toggleEditMembersDialogVisible(state, payload) {
      state.editMembersDialogVisible = payload.visible
    },
    setCompanyInfo(state, payload) {
      state.companyInfo = payload
    },
    setCreateMemberDialogVisible(state, payload) {
      state.createMembersDialogVisible = payload
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
    setCompanyDepartments(state, payload) {
      state.companyDepartments = payload
    },
    addMemberData(state, payload) {
      state.members.data.push(payload)
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
      const data = (await fetchInfo(payload)).data
      commit('setCompanyInfo', data)
      loading.close()
      return deepClone(data)
    },
    async fetchCompanyMembers({ commit }, payload) {
      const members = (await fetchMembers()).data
      commit('setMembers', members)
      return deepClone(members)
    },
    async fetchCompanyDepartments({ commit }, payload) {
      const response = (await fetchDepartments()).data
      commit('setCompanyDepartments', response.data || [])
      return response.data
    },
    async updateCompanyInfo({ commit }, payload) {
      const data = (await updateInfo(payload)).data
      commit('setCompanyInfo', data)
      return deepClone(data)
    },
    async createCompanyMember({ commit }, payload) {
      const memberData = (await createMember(payload)).data
      commit('addMemberData', memberData)
      return memberData
    }
  }
}

export default company
