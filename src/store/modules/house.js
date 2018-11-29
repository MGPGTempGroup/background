import {
  fetchLeases,
  fetchPropertyTypes,
  createLeaseHouse,
  deleteLeaseHouse
} from '@/api/house'
import parseData2ConditionalParams from '@/utils/parseData2ConditionalParams'
import { param } from '@/utils'

const house = {
  namespaced: true,
  state: {
    // 租赁房屋列表
    leases: {
      data: [],
      meta: {}
    },
    leasesTableLoading: false,
    leasesTablePage: 1,
    leasesTablePageSize: 10,
    leasesFilterForm: {},
    leaseDetailsDialogVisible: false,
    leaseDetailsData: {},
    leaseEditDialogVisible: false,
    leaseEditForm: {},
    // 出售房屋列表
    saleHousingList: [],
    createRentalHousingDialogVisible: false,
    createSaleHousingDialogVisible: false,
    availablePropertyType: []
  },
  mutations: {
    setCreateRentalHousingDialogVisible(state, payload) {
      state.createRentalHousingDialogVisible = payload
    },
    setCreateSaleHousingDialogVisible(state, payload) {
      state.createSaleHousingDialogVisible = payload.visible
    },
    setAvailablePropertyType(state, payload) {
      state.availablePropertyType = payload
    },
    setLeases(state, payload) {
      state.leases = payload
    },
    setLeaseDetailsDialogVisible(state, payload) {
      state.leaseDetailsDialogVisible = payload
    },
    setLeaseDetailsData(state, payload) {
      state.leaseDetailsData = payload
    },
    setLeaseEditFormDialogVisible(state, payload) {
      state.leaseEditDialogVisible = payload
    },
    setLeasesFilterForm(state, payload) {
      state.leasesFilterForm = payload
    },
    setLeasesTableLoading(state, payload) {
      state.leasesTableLoading = payload
    },
    setLeasesTablePage(state, payload) {
      state.leasesTablePage = payload
    },
    setLeasesTablePageSize(state, payload) {
      state.leasesTablePageSize = payload
    },
    deleteLease(state, payload) {
      state.leases.data = state.leases.data.filter(item => {
        return item.id !== payload
      })
    },
    addLease(state, payload) {
      state.leases.data.push(payload)
    }
  },
  actions: {
    async fetchInitData({ dispatch }) {
      await dispatch('fetchPropertyTypes')
    },
    async fetchLeasesHouse({ commit, state }, payload = {}) {
      commit('setLeasesTableLoading', true)
      const filterForm = state.leasesFilterForm
      const conditionalParams = parseData2ConditionalParams({
        fuzzy: {
          name: filterForm.name,
          address: filterForm.address,
          suburb_name: filterForm.suburb_name,
          street_name: filterForm.street_name,
          address_description: filterForm.address_description
        },
        dateRange: {
          available_start_date: filterForm.available_start_date,
          available_end_date: filterForm.available_end_date,
          created_at: filterForm.created_at_range,
          updated_at: filterForm.updated_at_range
        },
        contains: {
          owner_id: filterForm.owner_id,
          show: filterForm.show
        },
        between: {
          // floor_space: [filterForm.min_floor_space, filterForm.max_floor_space],
          // bedrooms: [filterForm.min_bedrooms, filterForm.max_bedrooms],
          // bathrooms: [filterForm.min_bathrooms, filterForm.max_bathroom],
          // car_spaces: [filterForm.min_car_spaces, filterForm.max_car_spaces],
          // lockup_garages: [filterForm.min_lockup_garages, filterForm.max_lockup_garages]
        },
        basics: {
          egt: {
            floor_space: filterForm.min_floor_space,
            bedrooms: filterForm.min_bedrooms,
            bathrooms: filterForm.min_bathrooms,
            car_spaces: filterForm.min_car_spaces,
            lockup_garages: filterForm.min_lockup_garages,
            per_day_min_price: filterForm.per_day_min_price,
            per_week_min_price: filterForm.per_week_min_price,
            per_month_min_price: filterForm.per_month_min_price
          },
          elt: {
            floor_space: filterForm.max_floor_space,
            bedrooms: filterForm.max_bedrooms,
            bathrooms: filterForm.max_bathrooms,
            car_spaces: filterForm.max_car_spaces,
            lockup_garages: filterForm.max_lockup_garages,
            per_day_max_price: filterForm.per_day_max_price,
            per_week_max_price: filterForm.per_week_max_price,
            per_month_max_price: filterForm.per_month_max_price
          }
        }
      })
      let params = [
        conditionalParams,
        'pageSize=' + state.leasesTablePageSize,
        'page=' + state.leasesTablePage
      ]

      if (Array.isArray(filterForm.agents) && filterForm.agents.length) {
        params.push(
          filterForm.agents.map(id => 'members[]=' + id).join('&')
        )
      }

      if (Array.isArray(filterForm.property_type) && filterForm.property_type.length) {
        params.push(
          filterForm.property_type.map(id => 'property_type[]=' + id).join('&')
        )
      }

      const extraParams = param(payload.params)
      if (extraParams) params.push(extraParams)
      params = params.join('&')
      const leasesData = (await fetchLeases(params)).data
      commit('setLeases', leasesData)
      commit('setLeasesTableLoading', false)
    },
    async fetchPropertyTypes({ commit }, payload) {
      const propertyTypes = (await fetchPropertyTypes()).data.data
      commit('setAvailablePropertyType', propertyTypes)
    },
    async createLeaseHouse({ commit }, payload) {
      const leaseHouseData = (await createLeaseHouse(payload)).data
      commit('addLease', leaseHouseData)
    },
    async deleteLeaseHouse({ commit }, payload) {
      await deleteLeaseHouse(payload.id)
      commit('deleteLease', payload.id)
    }
  }
}

export default house
