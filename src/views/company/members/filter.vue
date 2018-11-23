<template>
  <el-card class="members-filter-form" body-style="padding: 5px 20px 5px 20px;" shadow="never" >
    <el-collapse v-model="collapseActiveNames">
      <el-collapse-item name="1">
        <template slot="title">
          <h2 style="margin: 0" >
            <i class="fa fa-filter" />
            &nbsp;{{ $t('company.conditionalFiltering') }}
          </h2>
        </template>
        <el-form :model="form" >
          <el-row :gutter="48" >
            <el-col v-bind="formItemLayoutProps" >
              <el-form-item :label="$t('surname')" >
                <el-select
                  v-model="form.surname"
                  multiple
                  filterable
                  remote
                  allow-create
                  default-first-option />
              </el-form-item>
            </el-col>
            <el-col v-bind="formItemLayoutProps" >
              <el-form-item :label="$t('name')" >
                <el-select
                  v-model="form.name"
                  multiple
                  filterable
                  remote
                  allow-create
                  default-first-option />
              </el-form-item>
            </el-col>
            <el-col v-bind="formItemLayoutProps" >
              <el-form-item :label="$t('phone')" >
                <el-select
                  v-model="form.phone"
                  multiple
                  filterable
                  remote
                  allow-create
                  default-first-option />
              </el-form-item>
            </el-col>
            <el-col v-bind="formItemLayoutProps" >
              <el-form-item :label="$t('email')" >
                <el-select
                  v-model="form.email"
                  multiple
                  filterable
                  remote
                  allow-create
                  default-first-option />
              </el-form-item>
            </el-col>
            <el-col v-bind="formItemLayoutProps" >
              <el-form-item :label="$t('company.position')">
                <el-select v-model="form.positions" multiple >
                  <el-option-group
                    v-for="(item, index) in companyDepartments"
                    :key="index"
                    :label="item.name">
                    <el-option
                      v-for="(position, index) in item.positions.data"
                      :key="index"
                      :label="position.name"
                      :value="position.id"/>
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="members-filter-form__actions" >
            <el-button type="info" @click="handleReset" >{{ $t('reset') }}</el-button>
            <el-button type="primary" @click="handleQuery" >{{ $t('query') }}</el-button>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { deepClone } from '@/utils'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('company')
export default {
  name: 'CompanyMembersListFilterForm',
  data() {
    return {
      collapseActiveNames: [],
      formItemLayoutProps: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 },
      biggerFormItemLayoutProps: { xs: 24, sm: 24, md: 24, lg: 16, xl: 18 },
      form: {}
    }
  },
  computed: {
    ...mapState([
      'companyDepartments',
      'membersFilterForm'
    ])
  },
  created() {
    // vuex中深拷贝一份过滤表单数据到当前组件中，进行v-model绑定
    // 点击query查询时，再将当前组件的filterForm的数据同步到Vuex
    this.form = deepClone(this.membersFilterForm)
  },
  methods: {
    ...mapMutations([
      'setMembersFilterForm',
      'setMembersTableLoading'
    ]),
    ...mapActions([
      'fetchCompanyMembers'
    ]),
    /**
     * 表单重置方法
     */
    handleReset() {
      const newForm = {}
      Object.keys(this.form).forEach(key => {
        newForm[key] = []
      })
      this.form = newForm
    },
    /**
     * 确认查询
     */
    handleQuery() {
      // 同步当前过滤表单数据到Vuex
      this.setMembersFilterForm(
        deepClone(this.form)
      )
      // 重新拉取Members数据
      this.setMembersTableLoading(true)
      this.fetchCompanyMembers().finally(() => {
        this.setMembersTableLoading(false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .members-filter-form {
    &__actions {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>

<style lang="scss" >
  @import '@/styles/filter-form.scss';
  @import '@/styles/text.scss';
</style>
