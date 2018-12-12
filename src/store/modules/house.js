import {
  fetchLeases,
  fetchSales,
  fetchPropertyTypes,
  createLeaseHouse,
  createSaleHouse,
  updateLeaseHouse,
  updateSaleHouse,
  deleteLeaseHouse,
  deleteSaleHouse
} from '@/api/house'
import parseDataToConditionalParams from '@/utils/parseDataToConditionalParams'
import { param } from '@/utils'
import i18n from '@/lang'

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
    leaseCreateDialogVisible: false,
    saleCreateDialogVisible: false,
    // 出售房屋列表
    sales: {
      data: [],
      meta: {}
    },
    salesTableLoading: false,
    salesTablePage: 1,
    salesTablePageSize: 10,
    salesFilterForm: {},
    saleDetailsDialogVisible: false,
    saleDetailsData: {},
    saleEditDialogVisible: false,
    saleEditForm: {},
    createSaleHousingDialogVisible: false,
    availablePropertyType: [],
    houseStatus: [
      {
        label: i18n.t('house.saleOut'),
        value: 3
      },
      {
        label: i18n.t('house.saleOut')
      }
    ]
  },
  mutations: {
    setLeaseCreateDialogVisible(state, payload) {
      state.leaseCreateDialogVisible = payload
    },
    setSaleCreateDialogVisible(state, payload) {
      state.saleCreateDialogVisible = payload
    },
    setLeaseEditDialogVisible(state, payload) {
      state.leaseEditDialogVisible = payload
    },
    setSaleEditDialogVisible(state, payload) {
      state.saleEditDialogVisible = payload
    },
    setAvailablePropertyType(state, payload) {
      state.availablePropertyType = payload
    },
    setLeases(state, payload) {
      state.leases = payload
    },
    setSales(state, payload) {
      state.sales = payload
    },
    setLeaseDetailsDialogVisible(state, payload) {
      state.leaseDetailsDialogVisible = payload
    },
    setSaleDetailsDialogVisible(state, payload) {
      state.saleDetailsDialogVisible = payload
    },
    setLeaseDetailsData(state, payload) {
      state.leaseDetailsData = payload
    },
    setSaleDetailsData(state, payload) {
      state.saleDetailsData = payload
    },
    setLeaseEditForm(state, payload) {
      state.leaseEditForm = payload
    },
    setSaleEditForm(state, payload) {
      state.saleEditForm = payload
    },
    setLeasesFilterForm(state, payload) {
      state.leasesFilterForm = payload
    },
    setSalesFilterForm(state, payload) {
      state.salesFilterForm = payload
    },
    setLeasesTableLoading(state, payload) {
      state.leasesTableLoading = payload
    },
    setSalesTableLoading(state, payload) {
      state.salesTableLoading = payload
    },
    setLeasesTablePage(state, payload) {
      state.leasesTablePage = payload
    },
    setSalesTablePage(state, payload) {
      state.salesTablePage = payload
    },
    setLeasesTablePageSize(state, payload) {
      state.leasesTablePageSize = payload
    },
    setSalesTablePageSize(state, payload) {
      state.salesTablePageSize = payload
    },
    deleteLease(state, payload) {
      state.leases.data = state.leases.data.filter(item => item.id !== payload)
    },
    deleteSale(state, payload) {
      state.sales.data = state.sales.data.filter(item => item.id !== payload)
    },
    addLease(state, payload) {
      state.leases.data.push(payload)
      state.leases.meta.pagination.total += 1
    },
    addSale(state, payload) {
      state.sales.data.push(payload)
      state.sales.meta.pagination.total += 1
    },
    setLease(state, payload) {
      state.leases.data = state.leases.data.map(item => {
        return item.id === payload.id ? payload : item
      })
    },
    setSale(state, payload) {
      state.sales.data = state.sales.data.map(item => {
        return item.id === payload.id ? payload : item
      })
    }
  },
  actions: {
    async fetchInitData({ dispatch }) {
      await dispatch('fetchPropertyTypes')
    },
    async fetchLeasesHouse({ commit, state }, payload = {}) {
      commit('setLeasesTableLoading', true)
      const filterForm = state.leasesFilterForm
      const conditionalParams = parseDataToConditionalParams({
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
    async fetchSalesHouse({ commit, state }, payload = {}) {
      commit('setSalesTableLoading', true)
      const filterForm = state.salesFilterForm
      const conditionalParams = parseDataToConditionalParams({
        fuzzy: {
          name: filterForm.name,
          address: filterForm.address,
          suburb_name: filterForm.suburb_name,
          street_name: filterForm.street_name,
          address_description: filterForm.address_description
        },
        dateRange: {
          created_at: filterForm.created_at_range,
          updated_at: filterForm.updated_at_range
        },
        contains: {
          owner_id: filterForm.owner_id,
          show: filterForm.show
        },
        basics: {
          egt: {
            floor_space: filterForm.min_floor_space,
            bedrooms: filterForm.min_bedrooms,
            bathrooms: filterForm.min_bathrooms,
            car_spaces: filterForm.min_car_spaces,
            lockup_garages: filterForm.min_lockup_garages,
            min_price: filterForm.min_price,
            available_start_date: Array.isArray(filterForm.available_date_range) ? filterForm.available_date_range[0] : undefined
          },
          elt: {
            floor_space: filterForm.max_floor_space,
            bedrooms: filterForm.max_bedrooms,
            bathrooms: filterForm.max_bathrooms,
            car_spaces: filterForm.max_car_spaces,
            lockup_garages: filterForm.max_lockup_garages,
            max_price: filterForm.max_price,
            available_end_date: Array.isArray(filterForm.available_date_range) ? filterForm.available_date_range[1] : undefined
          }
        }
      })
      let params = [
        conditionalParams,
        'pageSize=' + state.salesTablePageSize,
        'page=' + state.salesTablePage
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
      const sales = (await fetchSales(params)).data
      commit('setSales', sales)
      commit('setSalesTableLoading', false)
    },
    async fetchPropertyTypes({ commit }, payload) {
      const propertyTypes = (await fetchPropertyTypes()).data.data
      commit('setAvailablePropertyType', propertyTypes)
    },
    async createLeaseHouse({ commit }, payload) {
      const leaseHouseData = (await createLeaseHouse(payload)).data
      commit('addLease', leaseHouseData)
    },
    async createSaleHouse({ commit }, payload) {
      const saleHouseData = (await createSaleHouse(payload)).data
      commit('addSale', saleHouseData)
    },
    async updateLeaseHouse({ commit }, payload) {
      const data = (await updateLeaseHouse(payload)).data
      commit('setLease', data)
    },
    async updateSaleHouse({ commit }, payload) {
      const data = (await updateSaleHouse(payload)).data
      commit('setSale', data)
    },
    async deleteLeaseHouse({ commit }, payload) {
      await deleteLeaseHouse(payload.id)
      commit('deleteLease', payload.id)
    },
    async deleteSaleHouse({ commit, dispatch, state }, payload) {
      await deleteSaleHouse(payload.id)
      commit('deleteSale', payload.id)
      commit('setSales', {
        data: state.sales.data,
        meta: {
          ...state.sales.meta,
          pagination: {
            ...state.sales.pagination,
            total: state.sales.meta.pagination.total - 1
          }
        }
      })
      if (state.sales.data.length === 0 && state.salesTablePage !== 1) {
        await dispatch('changeSalesTablePage', state.salesTablePage - 1)
      }
    },
    async changeSalesTablePage({ commit, dispatch }, payload) {
      commit('setSalesTablePage', payload)
      await dispatch('fetchSalesHouse')
    },
    async changeSalesTablePageSize({ commit, dispatch }, payload) {
      commit('setSalesTablePageSize', payload)
      await dispatch('fetchSalesHouse')
    }
  }
}

export default house
