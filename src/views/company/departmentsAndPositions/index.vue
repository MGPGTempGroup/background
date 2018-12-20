<template>
  <div class="departments-and-positions" >
    <el-card shadow="never">
      <div slot="header" class="departments-and-positions__list-header" >
        <h2 style="margin: 0px;" >{{ $t('company.departmentList') }}</h2>
        <el-button
          type="primary"
          class="departments-and-positions__create-department-btn"
          @click="openCreateDepartmentDialog">
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
            <!-- <el-button type="text" @click="openDepartmentDetailsDialog(scope.row)" >{{ $t('details') }}</el-button> -->
            <el-button type="text" @click="openEditDepartmentNameDialog(scope.row)" >{{ $t('company.editDepartmentName') }}</el-button>
            <el-button type="text" @click="openEditDepartmentDialog(scope.row)" >{{ $t('company.editPositions') }}</el-button>
            <el-button type="text">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 编辑部门名称对话框 -->
    <el-dialog
      :title="$t('company.editDepartmentName')"
      :visible.sync="editDepartmentNameDialogVisible"
      width="400px">
      <el-input v-model="editDepartmentNameDialogData.name" />
      <div style="display: flex; justify-content: flex-end; margin-top: 15px;" >
        <el-button type="primary" @click="updateDepartmentName" >{{ $t('update') }}</el-button>
      </div>
    </el-dialog>

    <!-- 创建部门对话框 -->
    <create-department-dialog/>

    <!-- 部门详情对话框 -->
    <!-- <department-details-dialog/> -->

    <!-- 编辑部门职位对话框 -->
    <edit-department-dialog/>

  </div>
</template>

<script>
import CreateDepartmentDialog from './create'
// import DepartmentDetailsDialog from './details'
import EditDepartmentDialog from './edit'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('company')
export default {
  name: 'DepartmentsAndPositions',
  components: {
    CreateDepartmentDialog, EditDepartmentDialog
  },
  data() {
    return {
      tableLoading: false,
      editDepartmentNameDialogVisible: false,
      editDepartmentNameDialogData: {
        name: ''
      }
    }
  },
  computed: {
    ...mapState([
      'companyDepartments'
    ])
  },
  created() {
    // 拉取部门数据
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
    ...mapMutations([
      'setCreateDepartmentDialogVisible',
      // 'setDepartmentDetailsDialogData',
      // 'setDepartmentDetailsDialogVisible',
      'setEditDepartmentDialogData',
      'setEditDepartmentDialogVisible'
    ]),
    ...mapActions([
      'fetchCompanyDepartments',
      'updateCompanyDepartment'
    ]),
    /**
     * 打开创建部门对话框
     */
    openCreateDepartmentDialog() {
      this.setCreateDepartmentDialogVisible(true)
    },
    /**
     * 打开部门详情对话框
     */
    // openDepartmentDetailsDialog(departmentData) {
    //   this.setDepartmentDetailsDialogData(departmentData)
    //   this.setDepartmentDetailsDialogVisible(true)
    // }
    /**
     * 打开编辑部门对话框
     */
    openEditDepartmentNameDialog(departmentData) {
      this.editDepartmentNameDialogData = JSON.parse(JSON.stringify(departmentData))
      this.editDepartmentNameDialogVisible = true
    },
    /**
     * 更新部门名称
     */
    updateDepartmentName() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const {
        id,
        name
      } = this.editDepartmentNameDialogData
      this.updateCompanyDepartment({
        data: { id, name }
      }).then(() => {
        this.editDepartmentNameDialogVisible = false
        this.$message({
          type: 'success',
          message: this.$t('updateSuccess')
        })
      }).catch(() => {
        this.$message({
          type: 'error',
          message: this.$t('updateFailed')
        })
      }).finally(() => {
        loading.close()
      })
    },
    /**
     * 打开编辑部门对话框
     */
    openEditDepartmentDialog(departmentData) {
      this.setEditDepartmentDialogData(
        JSON.parse(
          JSON.stringify(departmentData)
        )
      )
      this.setEditDepartmentDialogVisible(true)
    }
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
