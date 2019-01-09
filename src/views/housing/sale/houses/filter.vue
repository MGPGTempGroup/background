<template>
  <el-card class="sale-housing-filter" body-style="padding: 5px 20px 5px 20px;" shadow="never" >
    <el-collapse v-model="collapseActiveNames">
      <el-collapse-item name="1">
        <template slot="title">
          <h2 style="margin: 0" >
            <i class="fa fa-filter" />
            &nbsp;{{ $t('house.conditionalFiltering') }}
          </h2>
        </template>
        <el-form :inline="false" :model="form" label-position="top" class="sale-housing-filter__form" >
          <el-row :gutter="48" class="sale-housing-filter__form-row" >
            <el-col
              v-bind="formItemLayoutProps"
              class="sale-housing-filter__form-col" >
              <el-form-item :label="$t('house.name')" >
                <el-select
                  v-model="form.name"
                  :placeholder="$t('searchByNamePlaceholder')"
                  multiple
                  filterable
                  allow-create
                  default-first-option />
              </el-form-item>
              <!-- 地址 -->
              <el-form-item :label="$t('house.address')" >
                <el-select
                  v-model="form.address"
                  :placeholder="$t('searchByAddressPlaceholder')"
                  multiple
                  filterable
                  allow-create
                  default-first-option />
              </el-form-item>
              <!-- 郊区名称 -->
              <el-form-item :label="$t('house.suburbName')" >
                <el-select
                  v-model="form.suburb_name"
                  :placeholder="$t('searchBySuburbNamePlaceholder')"
                  multiple
                  filterable
                  allow-create
                  default-first-option />
              </el-form-item>
              <!-- 街道名称 -->
              <el-form-item :label="$t('house.streetName')" >
                <el-select
                  v-model="form.street_name"
                  :placeholder="$t('searchByStreetNamePlaceholder')"
                  multiple
                  filterable
                  allow-create
                  default-first-option />
              </el-form-item>
              <!-- 地址详细介绍 -->
              <el-form-item :label="$t('house.addressDescription')" >
                <el-select
                  v-model="form.address_description"
                  :placeholder="$t('searchByAddressDescriptionPlaceholder')"
                  multiple
                  filterable
                  allow-create
                  default-first-option />
              </el-form-item>
              <!-- 物业类型 -->
              <el-form-item :label="$t('house.propertyTypes')" >
                <el-select
                  :placeholder="$t('house.propertyTypes')"
                  v-model="form.property_type"
                  multiple
                  default-first-option >
                  <el-option
                    v-for="item in availablePropertyType"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              v-bind="formItemLayoutProps"
              class="rental-housing-filter__form-col" >
              <!-- 价格 -->
              <el-form-item :label="$t('house.price')">
                <el-row :gutter="20">
                  <el-col v-bind="{ span: 11 }" >
                    <el-input v-model.number="form.min_price" type="number" />
                  </el-col>
                  <el-col v-bind="{ span: 2 }" style="text-align: center;" >
                    ~
                  </el-col>
                  <el-col v-bind="{ span: 11 }" >
                    <el-input v-model.number="form.max_price" type="number" />
                  </el-col>
                </el-row>
              </el-form-item>
              <!-- 相关属性 -->
              <el-row >
                <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12 }" >
                  <!-- 占地面积 -->
                  <el-form-item :label="$t('house.floorSpace')" >
                    <el-input-number v-model="form.min_floor_space" controls-position="right" style="width: 85px;" type="number" />
                    &nbsp; ~ &nbsp;
                    <el-input-number v-model="form.max_floor_space" controls-position="right" style="width: 85px;" type="number" />
                  </el-form-item>
                </el-col>
                <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12 }" >
                  <!-- 卧室数量 -->
                  <el-form-item :label="$t('house.bedrooms')" >
                    <el-input-number v-model="form.min_bedrooms" controls-position="right" style="width: 85px;" type="number" />
                    &nbsp; ~ &nbsp;
                    <el-input-number v-model="form.max_bedrooms" controls-position="right" style="width: 85px;" type="number" />
                  </el-form-item>
                </el-col>
                <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12 }" >
                  <!-- 卫生间数量 -->
                  <el-form-item :label="$t('house.bathrooms')" >
                    <el-input-number v-model="form.min_bathrooms" controls-position="right" style="width: 85px;" type="number" />
                    &nbsp; ~ &nbsp;
                    <el-input-number v-model="form.max_bathrooms" controls-position="right" style="width: 85px;" type="number" />
                  </el-form-item>
                </el-col>
                <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12 }" >
                  <!-- 车位数量 -->
                  <el-form-item :label="$t('house.carSpaces')" >
                    <el-input-number v-model="form.min_car_spaces" controls-position="right" style="width: 85px;" type="number" />
                    &nbsp; ~ &nbsp;
                    <el-input-number v-model="form.max_car_spaces" controls-position="right" style="width: 85px;" type="number" />
                  </el-form-item>
                </el-col>
                <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 12 }" >
                  <!-- 车库数量 -->
                  <el-form-item :label="$t('house.lockupGarages')" >
                    <el-input-number v-model="form.min_lockup_garages" controls-position="right" style="width: 85px;" type="number" />
                    &nbsp; ~ &nbsp;
                    <el-input-number v-model="form.max_lockup_garages" controls-position="right" style="width: 85px;" type="number" />
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- agent -->
              <el-form-item :label="$t('house.agent')" >
                <el-select
                  v-model="form.agents"
                  :loading="agentsSearchLoading"
                  :placeholder="$t('searchAgentsAndSelect')"
                  :remote-method="searchAgents"
                  remote
                  multiple
                  filterable
                  default-first-option >
                  <el-option
                    v-for="item in resultOfAgentsSearched"
                    :key="item.id"
                    :label="item.name + ' ' + item.surname"
                    :value="item.id" />
                </el-select>
              </el-form-item>
              <!-- owner -->
              <el-form-item :label="$t('house.owner')" >
                <el-select
                  v-model="form.owner_id"
                  :loading="ownersSearchLoading"
                  :placeholder="$t('searchOwnersAndSelect')"
                  :remote-method="searchOwners"
                  multiple=""
                  remote
                  filterable
                  default-first-option >
                  <el-option
                    v-for="item in resultOfOwnerSearched"
                    :key="item.id"
                    :label="item.name + ' ' + item.surname"
                    :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              v-bind="formItemLayoutProps"
              class="sale-housing-filter__form-col" >
              <!-- 展示状态 -->
              <el-form-item :label="$t('displayState')" >
                <el-select v-model="form.show" :placeholder="$t('house.currState')" multiple>
                  <el-option
                    :label="$t('show')"
                    :value="1" />
                  <el-option
                    :label="$t('hide')"
                    :value="0" />
                </el-select>
              </el-form-item>
              <!-- <el-row :gutter="12" >
                <el-col :span="12" >
                  <el-form-item :label="$t('house.constructedIn')" >
                    <el-date-picker
                      v-model="form.constructed_in"
                      :start-placeholder="$t('house.startDate')"
                      :end-placeholder="$t('house.endDate')"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="date"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12" >
                  <el-form-item :label="$t('house.builtIn')" >
                    <el-date-picker
                      v-model="form.built_in"
                      :start-placeholder="$t('house.startDate')"
                      :end-placeholder="$t('house.endDate')"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="date"/>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <!-- 可用时间 -->
              <el-form-item :label="$t('house.availableDate')" >
                <el-date-picker
                  v-model="form.available_date_range"
                  :start-placeholder="$t('house.startDate')"
                  :end-placeholder="$t('house.endDate')"
                  :default-time="['00:00:00', '23:59:59']"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"/>
              </el-form-item>
              <!-- 创建于 -->
              <el-form-item :label="$t('house.createdAt')" >
                <el-date-picker
                  v-model="form.created_at_range"
                  :start-placeholder="$t('house.startDate')"
                  :end-placeholder="$t('house.endDate')"
                  :default-time="['00:00:00', '23:59:59']"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"/>
              </el-form-item>
              <!-- 修改于 -->
              <el-form-item :label="$t('house.updatedAt')" >
                <el-date-picker
                  v-model="form.updated_at_range"
                  :start-placeholder="$t('house.startDate')"
                  :end-placeholder="$t('house.endDate')"
                  :default-time="['00:00:00', '23:59:59']"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange" />
              </el-form-item>
            </el-col>
            <el-col
              :xs="{ span: 24 }"
              :sm="{ span: 24 }"
              :md="{ span: 24 }"
              :lg="{ span: 24 }"
              :xl="{ span: 24 }"
              class="sale-housing-filter__form-col sale-housing-filter__actions" >
              <el-button type="info" @click="handleReset" >{{ $t('house.reset') }}</el-button>
              <el-button type="primary" @click="handleQuery" >{{ $t('house.query') }}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
import { searchOwnersByFullName } from '@/api/propertyOwner'
import { searchMembersByFullName } from '@/api/company'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('house')
export default {
  name: 'SaleHousingFilter',
  data() {
    return {
      // 折叠面板UI状态
      collapseActiveNames: [],
      // 每个表单项的栅格布局属性
      formItemLayoutProps: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 },
      // 物业业主搜索
      ownersSearchLoading: false,
      resultOfOwnerSearched: [],
      // 公司成员（代理）搜索
      agentsSearchLoading: false,
      resultOfAgentsSearched: [],
      // 过滤Form表单
      form: {
        // 名称
        name: [],
        // 地址
        address: [],
        // 郊区名称
        suburb_name: [],
        // 街道名称
        street_name: [],
        // 地址描述
        address_description: [],
        // 物业类型
        property_type: [],
        // 房屋面积
        min_floor_space: undefined,
        max_floor_space: undefined,
        // 卧室数量
        min_bedrooms: undefined,
        max_bedrooms: undefined,
        // 卫生间数量
        min_bathrooms: undefined,
        max_bathrooms: undefined,
        // 车位数量
        min_car_spaces: undefined,
        max_car_spaces: undefined,
        // 车库数量
        min_lockup_garages: undefined,
        max_lockup_garages: undefined,
        // 价格
        min_price: undefined,
        max_price: undefined,
        // 可用开始与结束日期
        available_date_range: [],
        // 创建于修改日期
        created_at_range: [],
        updated_at_range: [],
        // 代理该房屋的公司成员
        agents: [],
        // 物业业主
        owner_id: [],
        // 显示状态
        show: [1, 0]
      }
    }
  },
  computed: {
    ...mapState([
      'availablePropertyType'
    ]),
    lang() {
      return this.$store.state.app.language
    }
  },
  created() {
  },
  methods: {
    ...mapMutations([
      'setSalesFilterForm'
    ]),
    ...mapActions([
      'fetchSalesHouse'
    ]),
    /**
     * 搜索公司代理成员
     */
    async searchAgents(queryString) {
      this.agentsSearchLoading = true
      try {
        const res = (await searchMembersByFullName(queryString)).data
        this.resultOfAgentsSearched = res.data
      } catch (err) {
        this.resultOfAgentsSearched = []
      } finally {
        this.agentsSearchLoading = false
      }
    },
    /**
     * 搜索物业业主
     */
    async searchOwners(queryString) {
      this.ownersSearchLoading = true
      try {
        const res = (await searchOwnersByFullName(queryString)).data
        this.resultOfOwnerSearched = res.data
      } catch (err) {
        this.resultOfOwnerSearched = []
      } finally {
        this.ownersSearchLoading = false
      }
    },
    /**
     * 表单重置
     */
    handleReset() {
      this.form = {
        name: [],
        address: [],
        suburb_name: [],
        street_name: [],
        address_description: [],
        property_type: [],
        min_floor_space: undefined,
        max_floor_space: undefined,
        min_bedrooms: undefined,
        max_bedrooms: undefined,
        min_bathrooms: undefined,
        max_bathrooms: undefined,
        min_car_spaces: undefined,
        max_car_spaces: undefined,
        min_lockup_garages: undefined,
        max_lockup_garages: undefined,
        min_price: undefined,
        max_price: undefined,
        available_date_range: [],
        created_at_range: [],
        updated_at_range: [],
        agents: [],
        owner_id: [],
        show: [1, 0]
      }
    },
    /**
     * 查询
     */
    handleQuery() {
      const form = JSON.parse(JSON.stringify(this.form))
      this.setSalesFilterForm(form) // 修改store中filterForm的数据，用以再重新拉取列表数据时根据其组装条件查询参数
      this.fetchSalesHouse()
    }
  }
}
</script>

<style scoped lang="scss" >
  .sale-housing-filter {
    &__form {}
    &__form-row {
      margin-top: 10px;
    }
    &__form-col {}
    &__actions {
      display: flex;
      justify-content: center;
    }
  }
</style>

<style lang="scss" >
  .sale-housing-filter {
    @import '@/styles/filter-form.scss';
    @import '@/styles/text.scss';
  }
</style>

