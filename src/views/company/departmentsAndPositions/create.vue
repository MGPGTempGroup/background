<template>
  <el-dialog
    :title="$t('company.createDepartment')"
    :visible.sync="dialogVisible"
    top="200px"
    class="create-department-dialog">
    <el-form :model="form" label-position="top">
      <el-form-item :label="$t('company.departmentName')" style="width: 200px;" >
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item :label="$t('company.positions')" >
        <el-select
          v-model="form.positions"
          multiple
          allow-create
          filterable
          default-first-option/>
      </el-form-item>
      <div class="create-department-dialog__actions" >
        <el-button type="info" @click="resetForm" >
          {{ $t('reset') }}
        </el-button>
        <el-button type="primary" @click="createDepartment" >
          {{ $t('create') }}
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('company')
export default {
  name: 'CreateDepartmentDialog',
  data() {
    return {
      form: {
        name: '',
        positions: []
      }
    }
  },
  computed: {
    ...mapState([
      'createCompanyDepartmentDialogVisible'
    ]),
    dialogVisible: {
      get() {
        return this.createCompanyDepartmentDialogVisible
      },
      set(visible) {
        this.setCreateCompanyDepartmentDialogVisible(visible)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setCreateCompanyDepartmentDialogVisible'
    ]),
    ...mapActions([
      'createCompanyDepartment',
      'createCompanyPositions'
    ]),
    /**
     * 表单重置
     */
    resetForm() {
      this.form = {
        name: '',
        positions: []
      }
    },
    /**
     * 部门创建
     */
    async createDepartment() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      // 创建部门
      let department
      try {
        department = await this.createCompanyDepartment({
          data: {
            name: this.form.name
          }
        })
        this.$message({
          type: 'success',
          message: this.$t('company.department') + this.$t('createSuccess')
        })
      } catch (err) {
        this.$message({
          type: 'error',
          message: this.$t('company.department') + this.$t('createFailed')
        })
        loading.close()
        return
      }

      // 创建该部门职位
      try {
        await this.createCompanyPositions({
          department_id: department.id,
          data: {
            positions: this.form.positions
          },
          params: {}
        })
        this.resetForm()
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: this.$t('company.position') + this.$t('createSuccess')
        })
      } catch (err) {
        this.$message({
          type: 'error',
          message: this.$t('company.position') + this.$t('createFailed')
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

<style scoped lang="scss" >
  .create-department-dialog {
    &__actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
    .el-select {
      width: 100%;
    }
  }
</style>
