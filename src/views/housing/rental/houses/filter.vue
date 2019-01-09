<template>
  <el-card class="rental-housing-filter" body-style="padding: 5px 20px 5px 20px;" shadow="never" >
    <el-collapse v-model="collapseActiveNames">
      <el-collapse-item name="1">
        <template slot="title">
          <h2 style="margin: 0" >
            <i class="fa fa-filter" />
            &nbsp;{{ $t('house.conditionalFiltering') }}
          </h2>
        </template>
        <el-form :inline="false" :model="form" label-position="top" class="rental-housing-filter__form" >
          <el-row :gutter="48" class="rental-housing-filter__form-row" >
            <el-col
              v-bind="formItemLayoutProps"
              class="rental-housing-filter__form-col" >
              <!-- 名称 -->
              <el-form-item :label="$t('house.name')" >
                <el-select
                  v-model="form.name"
                  :placeholder="$t('searchByNamePlaceholder')"
                  filterable
                  allow-create
                  multiple
                  default-first-option/>
              </el-form-item>
              <!-- 地区选择 -->
              <el-form-item :label="$t('address')" >
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
                  filterable
                  allow-create
                  multiple
                  default-first-option/>
              </el-form-item>
              <!-- 街道名称 -->
              <el-form-item :label="$t('house.streetName')" >
                <el-select
                  v-model="form.street_name"
                  :placeholder="$t('searchByStreetNamePlaceholder')"
                  filterable
                  allow-create
                  multiple
                  default-first-option/>
              </el-form-item>
              <!-- 地址描述 -->
              <el-form-item :label="$t('house.addressDescription')" >
                <el-select
                  v-model="form.address_description"
                  :placeholder="$t('searchByAddressDescriptionPlaceholder')"
                  filterable
                  allow-create
                  multiple
                  default-first-option/>
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
              <!-- 每日租金区间 -->
              <el-form-item :label="$t('house.dailyRent')" >
                <el-input v-model="form.per_day_min_price" style="width: 40%;" type="number" >
                  <i slot="prefix" class="fa fa-dollar" />
                </el-input>
                &nbsp; ~ &nbsp;
                <el-input v-model="form.per_day_max_price" style="width: 40%;" type="number" >
                  <i slot="prefix" class="fa fa-dollar" />
                </el-input>
              </el-form-item>
              <!-- 每周租金区间 -->
              <el-form-item :label="$t('house.weeklyRent')" >
                <el-input v-model="form.per_week_min_price" style="width: 40%;" type="number" >
                  <i slot="prefix" class="fa fa-dollar" />
                </el-input>
                &nbsp; ~ &nbsp;
                <el-input v-model="form.per_week_max_price" style="width: 40%;" type="number" >
                  <i slot="prefix" class="fa fa-dollar" />
                </el-input>
              </el-form-item>
              <!-- 每月租金区间 -->
              <el-form-item :label="$t('house.monthlyRent')" >
                <el-input v-model="form.per_month_min_price" style="width: 40%;" type="number" >
                  <i slot="prefix" class="fa fa-dollar" />
                </el-input>
                &nbsp; ~ &nbsp;
                <el-input v-model="form.per_month_max_price" style="width: 40%;" type="number" >
                  <i slot="prefix" class="fa fa-dollar" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col
              v-bind="formItemLayoutProps"
              class="rental-housing-filter__form-col" >
              <!-- 可用开始时间 -->
              <el-form-item :label="$t('house.availableStartDate')" >
                <el-date-picker
                  v-model="form.available_start_date_range"
                  :start-placeholder="$t('house.startDate')"
                  :end-placeholder="$t('house.endDate')"
                  :default-time="['00:00:00', '23:59:59']"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"/>
              </el-form-item>
              <!-- 可用结束时间 -->
              <el-form-item :label="$t('house.availableEndDate')" >
                <el-date-picker
                  v-model="form.available_end_date_range"
                  :start-placeholder="$t('house.startDate')"
                  :end-placeholder="$t('house.endDate')"
                  :default-time="['00:00:00', '23:59:59']"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                />
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
              <!-- 显示状态 -->
              <el-form-item :label="$t('displayState')" >
                <el-checkbox
                  v-model="form.show"
                  :label="1"
                  border>
                  {{ $t('show') }}
                </el-checkbox>
                <el-checkbox
                  v-model="form.show"
                  :label="0"
                  border>
                  {{ $t('hide') }}
                </el-checkbox>
              </el-form-item>
            </el-col>
            <el-col
              :span="24"
              class="rental-housing-filter__form-col rental-housing-filter__actions" >
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
import { createNamespacedHelpers } from 'vuex'
import { searchOwnersByFullName } from '@/api/propertyOwner'
import { searchMembersByFullName } from '@/api/company'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('house')
export default {
  name: 'LeaseHouseFilterForm',
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
        // 每日租金,
        per_day_min_price: undefined,
        per_day_max_price: undefined,
        // 每周租金
        per_week_min_price: undefined,
        per_week_max_price: undefined,
        // 每月租金
        per_month_min_price: undefined,
        per_month_max_price: undefined,
        // 可用开始与结束日期
        available_start_date_range: [],
        available_end_date_range: [],
        // 创建于修改日期
        created_at_range: [],
        updated_at_range: [],
        // 代理该房屋的公司成员
        agents: [],
        // 物业业主
        owner_id: [],
        // 显示状态
        show: [1, 0]
      },
      // 展示状态选择
      showStateOpts: [
        { label: this.$t('show'), value: 1 },
        { label: this.$t('hide'), value: 0 }
      ]
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
  methods: {
    ...mapMutations([
      'setLeasesFilterForm'
    ]),
    ...mapActions([
      'fetchLeasesHouse'
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
     * 表单重置方法
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
        per_day_min_price: undefined,
        per_day_max_price: undefined,
        per_week_min_price: undefined,
        per_week_max_price: undefined,
        per_month_min_price: undefined,
        per_month_max_price: undefined,
        available_start_date_range: [],
        available_end_date_range: [],
        created_at_range: [],
        updated_at_range: [],
        agents: [],
        owner_id: [],
        show: []
      }
    },
    handleQuery() {
      const form = JSON.parse(JSON.stringify(this.form))
      this.setLeasesFilterForm(form) // 修改store中filterForm的数据，用以再重新拉取列表数据时根据其组装条件查询参数
      this.fetchLeasesHouse()
    }
  }
}
</script>

<style scoped lang="scss" >
  .rental-housing-filter {
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
  .rental-housing-filter {
    @import '@/styles/filter-form.scss';
  }
</style>
