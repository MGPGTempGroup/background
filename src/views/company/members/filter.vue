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
              <el-form-item :label="$t('name')" >
                <el-select
                  v-model="form.name"
                  multiple
                  filterable
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
                  allow-create
                  default-first-option />
              </el-form-item>
            </el-col>
            <el-col v-bind="biggerFormItemLayoutProps" >
              <el-form-item :label="$t('company.position')">
                <el-select v-model="form.position" multiple >
                  <el-option-group
                    v-for="(item, index) in positionDivision"
                    :key="index"
                    :label="item.department">
                    <el-option
                      v-for="(position, index) in item.positions"
                      :key="index"
                      :label="position.name"
                      :value="position.name"/>
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="members-filter-form__actions" >
            <el-button type="info" >{{ $t('reset') }}</el-button>
            <el-button type="primary">{{ $t('query') }}</el-button>
          </div>
          <!-- <el-form-item :label="$t('phone')"> -->
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
export default {
  name: 'CompanyMembersListFilterForm',
  data() {
    return {
      collapseActiveNames: ['1'],
      formItemLayoutProps: { xs: 24, sm: 24, md: 12, lg: 8, xl: 6 },
      biggerFormItemLayoutProps: { xs: 24, sm: 24, md: 24, lg: 16, xl: 18 },
      form: {},
      positionDivision: [
        {
          id: 1,
          department: 'Project Sales',
          positions: [
            {
              id: 1,
              name: 'Project Sales Director'
            },
            {
              id: 2,
              name: 'Project Sales Coordinator'
            }
          ]
        },
        {
          id: 2,
          department: 'Property Management',
          positions: [
            {
              id: 1,
              name: 'Property Management Operations Manager'
            },
            {
              id: 2,
              name: 'Team Leader'
            }
          ]
        }
      ]
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
