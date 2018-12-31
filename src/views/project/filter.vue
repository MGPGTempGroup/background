<template>
  <el-card class="project-filter" body-style="padding: 5px 20px 5px 20px;" shadow="never" >
    <el-collapse v-model="collapseActiveNames">
      <el-collapse-item name="1">
        <template slot="title">
          <h2 style="margin: 0" >
            <i class="fa fa-filter" />
            &nbsp;{{ $t('project.conditionalFiltering') }}
          </h2>
        </template>
        <el-form :inline="false" :model="form" label-position="top" class="project-filter__form" >
          <el-row :gutter="48" class="project-filter__form-row" >
            <el-col
              v-bind="formItemLayoutProps"
              class="project-filter__form-col" >
              <el-form-item :label="$t('project.name')" >
                <el-select
                  v-model="form.name"
                  multiple
                  filterable
                  allow-create
                  default-first-option />
              </el-form-item>
              <el-form-item :label="$t('project.address')" >
                <el-select
                  v-model="form.address"
                  multiple
                  filterable
                  allow-create
                  default-first-option />
              </el-form-item>
              <el-form-item :label="$t('project.location')" >
                <el-select
                  v-model="form.location"
                  multiple
                  filterable
                  allow-create
                  default-first-option />
              </el-form-item>
              <el-form-item :label="$t('project.description')" >
                <el-select
                  v-model="form.description"
                  multiple
                  filterable
                  allow-create
                  default-first-option />
              </el-form-item>
              <el-form-item :label="$t('project.isPastSuccess')" >
                <el-checkbox v-model="form.is_past_success" :label="1">{{ $t('yes') }}</el-checkbox>
                <el-checkbox v-model="form.is_past_success" :label="0">{{ $t('no') }}</el-checkbox>
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
              <!-- agent -->
              <el-form-item :label="$t('house.agent')" >
                <el-select
                  v-model="form.agents"
                  :loading="agentsSearchLoading"
                  :placeholder="$t('house.agent')"
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
                  :placeholder="$t('house.owner')"
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
              <el-form-item :label="$t('project.productType')" >
                <el-select
                  v-model="form.product_type"
                  multiple>
                  <el-option
                    v-for="item in productTypes.data"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id" />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('project.isNewDevelopment')" >
                <el-checkbox v-model="form.is_new_development" :label="1">{{ $t('yes') }}</el-checkbox>
                <el-checkbox v-model="form.is_new_development" :label="0">{{ $t('no') }}</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col
              v-bind="formItemLayoutProps"
              class="project-filter__form-col" >
              <el-form-item :label="$t('project.status')" >
                <el-select
                  v-model="form.status"
                  multiple>
                  <el-option
                    v-for="item in projectStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
              </el-form-item>
              <!-- 创建于 -->
              <el-form-item :label="$t('createdAt')" >
                <el-date-picker
                  v-model="form.created_at_range"
                  :start-placeholder="$t('startDate')"
                  :end-placeholder="$t('endDate')"
                  :default-time="['00:00:00', '23:59:59']"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"/>
              </el-form-item>
              <!-- 修改于 -->
              <el-form-item :label="$t('updatedAt')" >
                <el-date-picker
                  v-model="form.updated_at_range"
                  :start-placeholder="$t('startDate')"
                  :end-placeholder="$t('endDate')"
                  :default-time="['00:00:00', '23:59:59']"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange" />
              </el-form-item>
              <el-form-item :label="$t('project.yearBuilt')" >
                <el-date-picker
                  v-model="form.year_built_range"
                  :start-placeholder="$t('startDate')"
                  :end-placeholder="$t('endDate')"
                  value-format="yyyy-MM-dd"
                  type="daterange"/>
              </el-form-item>
            </el-col>
            <el-col
              :xs="{ span: 24 }"
              :sm="{ span: 24 }"
              :md="{ span: 24 }"
              :lg="{ span: 24 }"
              :xl="{ span: 24 }"
              class="project-filter__form-col project-filter__actions" >
              <el-button type="info" @click="handleReset" >{{ $t('reset') }}</el-button>
              <el-button type="primary" @click="handleQuery" >{{ $t('query') }}</el-button>
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
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('project')
export default {
  name: 'ProjectFilter',
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
        // 位置
        location: [],
        // 介绍
        description: [],
        // 产品类型
        product_type: [],
        // 价格
        min_price: undefined,
        max_price: undefined,
        // 代理该房屋的公司成员
        agents: [],
        // 物业业主
        owner_id: [],
        // 项目状态
        status: [],
        // 是否为最新开发
        is_new_development: [0, 1],
        // 是否为过去的成功
        is_past_success: [0, 1],
        // 创建于修改日期
        created_at_range: [],
        updated_at_range: [],
        year_built_range: []
      }
    }
  },
  computed: {
    ...mapState([
      'productTypes',
      'projectStatus'
    ]),
    lang() {
      return this.$store.state.app.language
    }
  },
  created() {
  },
  methods: {
    ...mapMutations([
      'setProjectFilterForm'
    ]),
    ...mapActions([
      'fetchProjects'
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
        location: [],
        description: [],
        product_type: [],
        min_price: undefined,
        max_price: undefined,
        agents: [],
        owner_id: [],
        status: [],
        is_new_development: [0, 1],
        is_past_success: [0, 1],
        created_at_range: [],
        updated_at_range: [],
        year_built_range: []
      }
    },
    /**
     * 查询
     */
    handleQuery() {
      const form = JSON.parse(JSON.stringify(this.form))
      this.setProjectFilterForm(form) // 修改store中filterForm的数据，用以再重新拉取列表数据时根据其组装条件查询参数
      this.fetchProjects()
    }
  }
}
</script>

<style scoped lang="scss" >
  .project-filter {
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
  @import '@/styles/filter-form.scss';
  @import '@/styles/text.scss';
  .el-select {
    width: 100%;
  }
  input[type=number] {
    -moz-appearance:textfield;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
</style>

