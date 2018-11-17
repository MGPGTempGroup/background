<template>
  <el-card class="property-owners-filter" body-style="padding: 5px 20px 5px 20px;" shadow="never" >
    <el-collapse v-model="collapseActiveNames">
      <el-collapse-item name="1">
        <template slot="title">
          <h2 style="margin: 0" >
            <i class="fa fa-filter" />
            &nbsp;{{ $t('house.conditionalFiltering') }}
          </h2>
        </template>
        <el-form
          ref="filterForm"
          :model="filterForm"
          label-position="top"
          class="property-owners-filter__form" >
          <el-row :gutter="48" >
            <el-col v-bind="filterFormLayoutProps" >
              <!-- 姓氏筛选 -->
              <el-form-item :label="$t('owner.surname')" >
                <el-select
                  v-model="filterForm.surname"
                  :placeholder="$t('owner.searchBySurnamePlaceholder')"
                  :remote-method="() => null"
                  multiple
                  filterable
                  remote
                  allow-create
                  default-first-option
                  reserve-keyword />
              </el-form-item>
            </el-col>
            <el-col v-bind="filterFormLayoutProps" >
              <!-- 名筛选 -->
              <el-form-item :label="$t('owner.name')" >
                <el-select
                  v-model="filterForm.name"
                  :placeholder="$t('owner.searchByNamePlaceholder')"
                  :remote-method="() => null"
                  multiple
                  filterable
                  remote
                  allow-create
                  default-first-option
                  reserve-keyword />
              </el-form-item>
            </el-col>
            <el-col v-bind="filterFormLayoutProps" >
              <!-- 电话筛选 -->
              <el-form-item :label="$t('owner.phone')" >
                <el-select
                  v-model="filterForm.phone"
                  :placeholder="$t('owner.searchByPhonePlaceholder')"
                  :remote-method="() => null"
                  multiple
                  filterable
                  remote
                  allow-create
                  default-first-option
                  reserve-keyword />
              </el-form-item>
            </el-col>
            <el-col v-bind="filterFormLayoutProps" >
              <!-- 邮箱筛选 -->
              <el-form-item :label="$t('owner.email')" >
                <el-select
                  v-model="filterForm.email"
                  :placeholder="$t('owner.searchByEmailPlaceholder')"
                  :remote-method="() => null"
                  multiple
                  filterable
                  remote
                  allow-create
                  default-first-option
                  reserve-keyword />
              </el-form-item>
            </el-col>
            <el-col v-bind="filterFormLayoutProps" >
              <!-- 身份证号码筛选 -->
              <el-form-item :label="$t('owner.idCardNum')" >
                <el-select
                  v-model="filterForm.id_card"
                  :placeholder="$t('owner.searchByIdCardNumPlaceholder')"
                  :remote-method="() => null"
                  multiple
                  filterable
                  remote
                  allow-create
                  default-first-option
                  reserve-keyword />
              </el-form-item>
            </el-col>
            <el-col v-bind="filterFormLayoutProps" >
              <!-- 微信号码筛选 -->
              <el-form-item :label="$t('owner.wechat')" >
                <el-select
                  v-model="filterForm.wechat"
                  :placeholder="$t('owner.searchByWeChatPlaceholder')"
                  :remote-method="() => null"
                  multiple
                  filterable
                  remote
                  allow-create
                  default-first-option
                  reserve-keyword />
              </el-form-item>
            </el-col>
            <el-col v-bind="filterFormLayoutProps" >
              <!-- 地址筛选 -->
              <el-form-item :label="$t('owner.address')" >
                <el-select
                  v-model="filterForm.address"
                  :placeholder="$t('owner.searchByAddressPlaceholder')"
                  :remote-method="() => null"
                  multiple
                  filterable
                  remote
                  allow-create
                  default-first-option
                  reserve-keyword />
              </el-form-item>
            </el-col>
            <el-col v-bind="filterFormLayoutProps" >
              <!-- Identity -->
              <el-form-item :label="$t('owner.identity')" >
                <el-select
                  v-model="filterForm.identity_id"
                  :placeholder="$t('owner.selectByIdentityPlaceholder')"
                  multiple>
                  <el-option
                    v-for="(item, index) in availableIdentity"
                    :key="index"
                    :label="$t(`owner.${item.label}`)"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col v-bind="filterFormLayoutProps" >
              <!-- 数据创建时间筛选 -->
              <el-form-item :label="$t('owner.createdDate')" >
                <el-date-picker
                  v-model="filterForm.createdDateRange"
                  :start-placeholder="$t('owner.startDate')"
                  :end-placeholder="$t('owner.endDate')"
                  :default-time="['12:00:00']"
                  type="datetimerange" />
              </el-form-item>
            </el-col>
            <el-col v-bind="filterFormLayoutProps" >
              <!-- 数据修改时间筛选 -->
              <el-form-item :label="$t('owner.updatedDate')" >
                <el-date-picker
                  v-model="filterForm.updatedDateRange"
                  :start-placeholder="$t('owner.startDate')"
                  :end-placeholder="$t('owner.endDate')"
                  :default-time="['12:00:00']"
                  type="datetimerange" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="property-owners-filter__form-actions" >
            <el-button type="info" @click="handleReset" >
              {{ $t('owner.reset') }}
            </el-button>
            <el-button type="primary" @click="handleQuery" >
              {{ $t('owner.query') }}
            </el-button>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { param } from '@/utils'
import filterData2ConditionalParams from '@/utils/filterData2ConditionalParams'
const {
  mapState,
  mapMutations,
  mapActions
} = createNamespacedHelpers('propertyOwner')

export default {
  name: 'PropertyOwnersFilterForm',
  data() {
    return {
      collapseActiveNames: [],
      filterFormLayoutProps: { xs: 24, sm: 12, md: 12, lg: 8, xl: 6 }
    }
  },
  computed: {
    ...mapState({
      filterForm: state => state.filterForm,
      availableIdentity: state => state.availableIdentity,
      ownersTablePageSize: state => state.ownersTablePageSize
    })
  },
  created() {},
  methods: {
    ...mapActions([
      'fetchOwners'
    ]),
    ...mapMutations([
      'updateFilterForm'
    ]),
    handleQuery() {
      const filterForm = this.filterForm
      const params = filterData2ConditionalParams({
        fuzzy: {
          phone: filterForm.phone,
          name: filterForm.name,
          surname: filterForm.surname,
          email: filterForm.email,
          wechat: filterForm.wechat,
          id_card: filterForm.id_card
        },
        dateRange: {
          created_at: filterForm.createdDateRange,
          updated_at: filterForm.updatedDateRange
        },
        contains: {
          identity_id: filterForm.identity_id
        }
      })
      this.fetchOwners(params + '&' + param({
        pageSize: this.ownersTablePageSize
      }))
    },
    handleReset() {
      this.updateFilterForm({
        name: [],
        phone: [],
        email: [],
        wechat: [],
        address: [],
        identity_id: [],
        id_card: [],
        createdDateRange: [],
        updatedDateRange: []
      })
    }
  }
}
</script>

<style scoped lang="scss" >
  .property-owners-filter {
    &__form-actions {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
</style>

<style lang="scss" >
  @import '@/styles/filter-form.scss';
  @import '@/styles/text.scss';
</style>

