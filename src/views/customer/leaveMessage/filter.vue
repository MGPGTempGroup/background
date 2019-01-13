<template>
  <el-card class="customer-leave-message-filter-form" body-style="padding: 5px 20px 5px 20px;" shadow="never" >
    <el-collapse v-model="collapseActiveNames">
      <el-collapse-item name="1">
        <template slot="title">
          <h2 style="margin: 0" >
            <i class="fa fa-filter" />
            &nbsp;{{ $t('leaveMessage.conditionalFiltering') }}
          </h2>
        </template>
        <el-form :model="form" label-position="top" >
          <el-row :gutter="48" >
            <el-col v-bind="formItemLayoutProps" >
              <el-form-item :label="$t('name')" >
                <el-select
                  v-model="form.name"
                  :placeholder="$t('searchByNamePlaceholder')"
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
                  :placeholder="$t('searchByEmailPlaceholder')"
                  multiple
                  filterable
                  remote
                  allow-create
                  default-first-option />
              </el-form-item>
            </el-col>
            <el-col v-bind="formItemLayoutProps" >
              <el-form-item :label="$t('leaveMessage.messages')" >
                <el-select
                  v-model="form.messages"
                  :placeholder="$t('searchByMessageContentPlaceholer')"
                  multiple
                  filterable
                  remote
                  allow-create
                  default-first-option />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="customer-leave-message-filter-form__actions" >
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
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('leaveMessage')
export default {
  name: 'LeaveMessagesFilterForm',
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
      'messagesFilterForm'
    ])
  },
  created() {
    // vuex中深拷贝一份过滤表单数据到当前组件中，进行v-model绑定
    // 点击query查询时，再将当前组件的filterForm的数据同步到Vuex
    this.form = deepClone(this.messagesFilterForm)
  },
  methods: {
    ...mapMutations([
      'setMessagesFilterForm',
      'setMessagesTableLoading'
    ]),
    ...mapActions([
      'fetchMessages'
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
      this.setMessagesFilterForm(
        deepClone(this.form)
      )
      this.setMessagesTableLoading(true)
      this.fetchMessages().finally(() => {
        this.setMessagesTableLoading(false)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .customer-leave-message-filter-form {
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
