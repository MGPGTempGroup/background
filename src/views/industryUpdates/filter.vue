<template>
  <el-card class="indsutry-update-filter" body-style="padding: 5px 20px 5px 20px;" shadow="never" >
    <el-collapse v-model="collapseActiveNames">
      <el-collapse-item name="1">
        <template slot="title">
          <h2 style="margin: 0" >
            <i class="fa fa-filter" />
            &nbsp;{{ $t('industryUpdates.conditionalFiltering') }}
          </h2>
        </template>
        <el-form :inline="false" :model="form" label-position="top" class="indsutry-update-filter__form" >
          <el-row :gutter="48" class="indsutry-update-filter__form-row" >
            <el-col
              v-bind="formItemLayoutProps"
              class="indsutry-update-filter__form-col" >
              <el-form-item :label="$t('industryUpdates.title')" >
                <el-select
                  v-model="form.title"
                  :placeholder="$t('searchByTitlePlaceholder')"
                  multiple
                  filterable
                  allow-create
                  default-first-option />
              </el-form-item>
            </el-col>
            <el-col
              v-bind="formItemLayoutProps"
              class="indsutry-update-filter__form-col" >
              <el-form-item :label="$t('industryUpdates.content')" >
                <el-select
                  v-model="form.content"
                  :placeholder="$t('searchByContentPlaceholder')"
                  multiple
                  filterable
                  allow-create
                  default-first-option />
              </el-form-item>
            </el-col>
            <el-col
              :xs="{ span: 24 }"
              :sm="{ span: 24 }"
              :md="{ span: 24 }"
              :lg="{ span: 24 }"
              :xl="{ span: 24 }"
              class="industry-update-filter__form-col industry-update-filter__actions" >
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
import { createNamespacedHelpers } from 'vuex'
const { mapMutations, mapActions } = createNamespacedHelpers('industryUpdate')
export default {
  name: 'ProjectFilter',
  data() {
    return {
      // 折叠面板UI状态
      collapseActiveNames: [],
      // 每个表单项的栅格布局属性
      formItemLayoutProps: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 },
      // 过滤Form表单
      form: {
        title: '',
        content: ''
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    ...mapMutations([
      'setArticlesFilterForm'
    ]),
    ...mapActions([
      'fetchArticles'
    ]),
    /**
     * 表单重置
     */
    handleReset() {
      this.form = {
        title: [],
        content: []
      }
    },
    /**
     * 查询
     */
    handleQuery() {
      const form = JSON.parse(JSON.stringify(this.form))
      this.setArticlesFilterForm(form) // 修改store中filterForm的数据，用以再重新拉取列表数据时根据其组装条件查询参数
      this.fetchArticles()
    }
  }
}
</script>

<style scoped lang="scss" >
  .industry-update-filter {
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
