<template>
  <el-dialog
    :title="$t('company.editDepartment')"
    :visible.sync="dialogVisible"
    class="edit-department-dialog"
    width="600px">
    <el-form :model="form" label-position="top">
      <el-form-item :label="$t('company.positions')">
        <div
          v-for="(item, index) in form.positions"
          :key="index"
          class="edit-department-dialog__positions">
          <el-input v-model="form.positions[index].name" class="edit-department-dialog__positions-input" />
          <template
            v-if="form.positions[index].name !== editDepartmentDialogData.positions.data[index].name">
            <el-button type="primary" @click="updatePosition(form.positions[index])" >
              {{ $t('update') }}
            </el-button>
            <el-button type="info" style="margin-left: 3px;" @click="resetPosition(item.id)">
              {{ $t('reset') }}
            </el-button>
          </template>
          <el-button type="danger" style="margin-left: 3px;" @click="wantDeletePosition(item.id)">
            {{ $t('delete') }}
          </el-button>
        </div>
      </el-form-item>
      <div class="edit-department-dialog__actions" >
        <el-button type="primary" @click="createPosition" >
          {{ $t('create') }}
        </el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('company')

import 'font-awesome/css/font-awesome.min.css'

export default {
  name: 'EditDepartmentDialog',
  data() {
    return {
      form: {
        positions: []
      }
    }
  },
  computed: {
    ...mapState([
      'editDepartmentDialogVisible',
      'editDepartmentDialogData'
    ]),
    dialogVisible: {
      get() {
        return this.editDepartmentDialogVisible
      },
      set(visible) {
        this.setEditDepartmentDialogVisible(visible)
      }
    }
  },
  watch: {
    // 监听编辑对话框数据计算属性
    // 当其改变时将其拷贝到当前组件的data之中
    // 目的是进行v-model或其他相关数据绑定时不会影响到vuex中存储的
    editDepartmentDialogData: {
      handler(departmentData) {
        this.form = {
          positions: departmentData.positions.data.map(item => ({
            name: item.name,
            id: item.id,
            members_count: item.members_count
          }))
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations([
      'setEditDepartmentDialogVisible'
    ]),
    ...mapActions([
      'createCompanyPositions',
      'updateCompanyDepartment',
      'updateCompanyPosition',
      'deletePosition'
    ]),
    /**
     * 创建职位
     */
    createPosition() {
      // 弹出输入框
      this.$prompt(this.$t('company.inputPositionNameTips'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel')
      }).then(({ value: positionName }) => {
        console.log('Submit Name:', positionName)
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        // 调用职位创建Action
        this.createCompanyPositions({
          data: {
            positions: [positionName]
          },
          department_id: this.editDepartmentDialogData.id
        }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('company.position') + ' ' + this.$t('createSuccess')
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: this.$t('comapny.position') + ' ' + this.$t('createFailed')
          })
        }).finally(() => {
          loading.close()
        })
      }).catch(() => {
        // ...
      })
    },
    /**
     * 更新部门名称
     */
    updatePosition(positionData) {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.updateCompanyPosition({
        data: positionData,
        department_id: this.editDepartmentDialogData.id
      }).then(() => {
        this.$message({
          type: 'success',
          message: this.$t('company.positionName') + ' ' + this.$t('updateSuccess')
        })
      }).catch(() => {
        this.$message({
          type: 'error',
          message: this.$t('company.positionName') + ' ' + this.$t('updateFailed')
        })
      }).finally(() => {
        loading.close()
      })
    },
    /**
     * 重置某一职位名称
     */
    resetPosition(positionId) {
      this.form.positions = this.form.positions.map(position => {
        if (position.id === positionId) {
          position = JSON.parse(
            JSON.stringify(
              this.editDepartmentDialogData.positions.data.find(position => position.id === positionId)
            )
          )
        }
        return position
      })
    },
    /**
     * 表单内删除单个position
     */
    wantDeletePosition(id) {
      this.$confirm(this.$t('deleteDataTips') + '\r\n' + this.$t('company.deletePositionTips'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.deletePosition({
          id,
          department_id: this.editDepartmentDialogData.id
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: this.$t('deleteSuccess')
            })
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: this.$t('deleteFailed')
            })
          })
          .finally(() => {
            loading.close()
          })
      })
    }
  }
}
</script>

<style scoped lang="scss" >
  .edit-department-dialog {
    &__positions {
      margin-top: 10px;
      &:first-of-type {
        margin-top: 0px;
      }
      &-input {
        margin-right: 5px;
        width: 300px;
      }
    }
    &__actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
</style>
