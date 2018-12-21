<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="$t('company.departmentDetails')"
    top="30px"
    class="department-details-dialog">
    <el-row :gutter="24" tag="dl" >
      <el-col v-bind="layoutItemProps" >
        <dt>{{ $t('company.departmentName') }}</dt>
        <dd>{{ departmentDetailsDialogData.name || $t('noData') }}</dd>
      </el-col>
      <el-col v-bind="layoutItemProps" >
        <dt>{{ $t('company.positions') }}</dt>
        <dd>
          <el-tag
            v-for="(position) in departmentDetailsDialogData.positions.data"
            :key="position.id"
            style="margin-right: 5px;">
            {{ position.name }} ({{ position.members_count }})
          </el-tag>
        </dd>
      </el-col>
      <el-col v-bind="layoutItemProps" >
        <dt>{{ $t('updatedAt') }}</dt>
        <dd>{{ departmentDetailsDialogData.updated_at || $t('noData') }}</dd>
      </el-col>
      <el-col v-bind="layoutItemProps" >
        <dt>{{ $t('createdAt') }}</dt>
        <dd>{{ departmentDetailsDialogData.created_at || $t('noData') }}</dd>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('company')

export default {
  name: 'DepartmentDetailsDialog',
  data() {
    return {
      layoutItemProps: {
        xs: 24,
        sm: 24,
        md: 12,
        lg: 12,
        xl: 8
      }
    }
  },
  computed: {
    ...mapState([
      'departmentDetailsDialogVisible',
      'departmentDetailsDialogData'
    ]),
    dialogVisible: {
      get() {
        return this.departmentDetailsDialogVisible
      },
      set(visible) {
        this.setDepartmentDetailsDialogVisible(visible)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setDepartmentDetailsDialogVisible'
    ])
  }
}
</script>

<style scoped lang="scss" >
  .department-details-dialog {
    @import '@/styles/dl.scss';
  }
</style>
