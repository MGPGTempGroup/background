<template>
  <el-dialog
    :title="$t('company.editDepartment')"
    :visible.sync="dialogVisible"
    class="edit-department-dialog">
    <el-form :model="form" label-position="top">
      <el-form-item :label="$t('company.departmentName')" >
        <el-input v-model="form.name" style="width: 300px;" />
        <el-button type="primary" >
          {{ $t('update') }} {{ $t('company.departmentName') }}
        </el-button>
      </el-form-item>
      <el-form-item :label="$t('company.positions')">
        <div
          v-for="(item, index) in form.positions"
          :key="index"
          class="edit-department-dialog__positions">
          <el-input v-model="form.positions[index].name" class="edit-department-dialog__positions-input" />
          <template
            v-if="form.positions[index].name !== editDepartmentDialogData.positions.data[index].name">
            <el-button
              type="primary">
              {{ $t('update') }}
            </el-button>
            <el-button type="info" style="margin-left: 3px;" @click="resetPosition(item.id)">
              {{ $t('reset') }}
            </el-button>
          </template>
          <el-button type="danger" style="margin-left: 3px;" @click="deletePosition(index)">
            {{ $t('delete') }}
          </el-button>
        </div>
      </el-form-item>
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
        name: '',
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
    editDepartmentDialogData(departmentData) {
      this.form = {
        name: departmentData.name,
        positions: departmentData.positions.data.map(item => ({
          name: item.name,
          id: item.id,
          members_count: item.members_count
        }))
      }
    }
  },
  methods: {
    ...mapMutations([
      'setEditDepartmentDialogVisible'
    ]),
    ...mapActions([
      'updateCompanyDepartment',
      'updateCompanyPosition',
      'deletePosition'
    ]),
    /**
     * 更新部门名称
     */

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
    deletePosition(index) {
      // this.$confirm({

      // }).then()
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
    &__form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
</style>
