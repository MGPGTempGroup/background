<template>
  <div class="departments-and-positions" >
    <el-card shadow="never">
      <div slot="header" class="departments-and-positions__list-header" >
        <h2 style="margin: 0px;" >{{ $t('company.departmentList') }}</h2>
        <el-button type="primary" class="departments-and-positions__create-department-btn" >
          {{ $t('create') }}
        </el-button>
      </div>
      <el-table
        v-loading="tableLoading"
        v-if="companyDepartments.length"
        :data="companyDepartments"
        class="departments-and-positions__table">
        <el-table-column
          :label="$t('id')"
          prop="id"
          min-width="35px"
          align="center"/>
        <el-table-column
          :label="$t('company.departmentName')"
          prop="name"
          min-width="100px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.name || $('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('company.positionsCount')"
          prop="positions_count"
          min-width="30px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.positions.data.length }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('company.membersCount')"
          min-width="30px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.positions.data.reduce((total, item) => total + item.members_count, 0) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('createdAt')"
          prop="created_at"
          min-width="60px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.created_at || $('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('updatedAt')"
          prop="updated_at"
          min-width="60px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.updated_at || $('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('actions')"
          align="center"
          min-width="50">
          <template slot-scope="scope" >
            <el-button type="text">{{ $t('details') }}</el-button>
            <el-button type="text">{{ $t('edit') }}</el-button>
            <el-button type="text">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('company')
export default {
  name: 'DepartmentsAndPositions',
  data() {
    return {
      tableLoading: false
    }
  },
  computed: {
    ...mapState([
      'companyDepartments'
    ])
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.fetchCompanyDepartments()
      .catch(() => {
        this.$message({
          type: 'error',
          message: this.$t('getDataError')
        })
      })
      .finally(() => {
        loading.close()
      })
  },
  methods: {
    ...mapActions([
      'fetchCompanyDepartments'
    ])
  }
}
</script>

<style scoped lang="scss" >
  .departments-and-positions {
    padding: 20px;
    &__list-header {
      position: relative;
    }
    &__create-department-btn {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
    &__paginator {
      display: inline-block;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 30px;
    }
  }
</style>
