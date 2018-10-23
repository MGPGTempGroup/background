<template>
  <div class="user-comment-filter" >
    <el-card body-style="padding: 5px 20px;" shadow="never" >
      <el-collapse v-model="collapseActiveNames">
        <el-collapse-item name="1">
          <template slot="title" >
            <h2 style="margin: 0;" >
              <i class="fa fa-filter" />
              &nbsp;{{ $t('userComment.conditionalFiltering') }}
            </h2>
          </template>
          <el-form :model="filterForm" label-position="top" >
            <el-row :gutter="36" >
              <el-col v-bind="filterFormItemLayoutProps" >
                <el-form-item :label="$t('userComment.name')" >
                  <el-select
                    v-model="filterForm.name"
                    multiple
                    allow-create
                    default-first-option
                    filterable />
                </el-form-item>
              </el-col>
              <el-col v-bind="filterFormItemLayoutProps" >
                <el-form-item :label="$t('userComment.email')" >
                  <el-select
                    v-model="filterForm.email"
                    multiple
                    allow-create
                    default-first-option
                    filterable />
                </el-form-item>
              </el-col>
              <el-col v-bind="filterFormItemLayoutProps" >
                <el-form-item :label="$t('userComment.phone')" >
                  <el-select
                    v-model="filterForm.phone"
                    multiple
                    allow-create
                    default-first-option
                    filterable />
                </el-form-item>
              </el-col>
              <el-col v-bind="filterFormItemLayoutProps" >
                <el-form-item :label="$t('userComment.wechat')" >
                  <el-select
                    v-model="filterForm.wechat"
                    multiple
                    allow-create
                    default-first-option
                    filterable />
                </el-form-item>
              </el-col>
              <el-col v-bind="filterFormItemLayoutProps" >
                <el-form-item :label="$t('userComment.identity')" >
                  <el-select
                    v-model="filterForm.identity"
                    multiple
                    filterable>
                    <el-option
                      v-for="(item, index) in availableIdentity"
                      :key="index"
                      :label="$t(`userComment.${item.value}`)"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-bind="filterFormItemLayoutProps" >
                <el-form-item :label="$t('userComment.comments')" >
                  <el-select
                    v-model="filterForm.comments"
                    multiple
                    allow-create
                    default-first-option
                    filterable />
                </el-form-item>
              </el-col>
              <el-col v-bind="filterFormItemLayoutProps" >
                <el-form-item :label="$t('userComment.createdAt')" >
                  <el-date-picker
                    v-model="filterForm.createdAtRange"
                    :picker-options="pickerOptions"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="user-comment-filter__form-actions" >
            <el-button type="info" >
              {{ $t('reset') }}
            </el-button>
            &nbsp;&nbsp;
            <el-button type="primary" >
              {{ $t('query') }}
            </el-button>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('userComment')
export default {
  name: 'UserCommentFilter',
  data() {
    return {
      collapseActiveNames: [],
      filterFormItemLayoutProps: { xs: 24, sm: 24, md: 12, lg: 8, xl: 6 },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {
    ...mapState(['filterForm', 'availableIdentity'])
  }
}
</script>

<style lang="scss" scoped >
  .user-comment-filter {
    &__form-actions {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  }
</style>

<style lang="scss" >
  @import '@/styles/filter-form.scss';
</style>

