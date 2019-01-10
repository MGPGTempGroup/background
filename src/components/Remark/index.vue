<template>
  <el-dialog
    :title="$t('remarks')"
    :visible.sync="dialogVisible">
    <div class="remark-wrapper" >
      <div class="remark">
        <div v-if="remarks.data.length" class="remark__list-wrapper" >
          <!-- 列表 -->
          <ul class="remark__list" >
            <li
              v-for="(remark) in remarks.data"
              :key="remark.id"
              class="remark__item">
              <div class="remark__item-avatar" >
                <img :src="remark.creator.avatar || defaultAvatar" alt="">
                <div>
                  {{ remark.creator.name }}
                </div>
              </div>
              <div class="remark__item-content" >
                {{ remark.content }}
              </div>
              <div class="remark__item-time" >
                <i class="fa fa-calendar" />&nbsp;
                {{ remark.created_at }}
              </div>
              <div
                v-if="currentUserId === remark.creator.id"
                class="remark__item-actions" >
                <el-button type="text" @click="handleEdit(remark)" >
                  {{ $t('edit') }}
                </el-button>
                <el-button type="text" @click="handleDelete(remark.id)" >
                  {{ $t('delete') }}
                </el-button>
              </div>
            </li>
          </ul>
          <!-- 分页 -->
          <div class="remark__paginator" >
            <el-pagination
              :current-page="remarksPage"
              :page-sizes="[10, 30, 50, 100]"
              :page-size="remarksPageSize"
              :total="remarks.meta.pagination.total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handlePaginatorSizeChange"
              @current-change="handlePaginatorChange"/>
          </div>
        </div>
        <div v-else >
          <h2 style="margin-top: 0px;" >
            {{ $t('noData') }}
          </h2>
        </div>
        <div class="remark__form" >
          <el-input
            v-model="createRemarkInput"
            :placeholder="$t('components.writeRemarkContentPlaceholder')"
            type="textarea" />
          <div class="remark__form-actions" >
            <el-button type="primary" @click="handleCreate" >
              {{ $t('publish') }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :title="$t('edit')"
      :visible.sync="editDialogVisible"
      append-to-body>
      <el-input v-model="editRemarkData.content" type="textarea" />
      <div class="edit-form__actions" >
        <el-button type="info" @click="handleEditReset" >
          {{ $t('reset') }}
        </el-button>
        <el-button type="primary" @click="handleUpdate" >
          {{ $t('update') }}
        </el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import defaultAvatar from '@/assets/defaultAvatar.png'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('remark')

export default {
  name: 'Remark',
  data() {
    return {
      createRemarkInput: '',
      editDialogVisible: false,
      editRemarkData: {
        content: ''
      },
      defaultAvatar
    }
  },
  computed: {
    ...mapState({
      remarkDialogVisible: state => state.dialogVisible
    }),
    ...mapState([
      'remarks',
      'remarksPage',
      'remarksPageSize'
    ]),
    dialogVisible: {
      get() {
        return this.remarkDialogVisible
      },
      set(visible) {
        this.setDialogVisible({
          visible
        })
      }
    },
    currentUserId() {
      return this.$store.state.user.id
    }
  },
  methods: {
    ...mapMutations([
      'setDialogVisible',
      'setRemarksPage',
      'setRemarksPageSize'
    ]),
    ...mapActions([
      'createRemark',
      'fetchRemarks',
      'updateRemark',
      'deleteRemark'
    ]),
    async getRemarks() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        await this.fetchRemarks()
      } catch (err) {
        this.$message({
          type: 'error',
          message: this.$t('getDataError')
        })
      } finally {
        loading.close()
      }
    },
    async handleCreate() {
      const content = this.createRemarkInput
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        await this.createRemark({
          data: {
            content
          }
        })
      } catch (err) {
        loading.close()
        this.$message({
          type: 'error',
          message: this.$t('createFailed')
        })
        return
      }
      this.$message({
        type: 'success',
        message: this.$t('createSuccess')
      })
      loading.close()
      this.createRemarkInput = ''
    },
    handleDelete(remarkID) {
      this.$confirm(this.$t('deleteDataTips'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(async() => {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        try {
          await this.deleteRemark({
            id: remarkID
          })
        } catch (err) {
          loading.close()
          this.$message({
            type: 'error',
            message: this.$t('deleteFailed')
          })
          return
        }
        loading.close()
        if (!this.remarks.data.length) {
          this.setRemarksPage(this.remarksPage - 1)
          this.getRemarks()
        }
        this.$message({
          type: 'success',
          message: this.$t('deleteSuccess')
        })
      })
    },
    handleEdit(remark) {
      this.editRemarkData = JSON.parse(JSON.stringify(remark))
      this.editDialogVisible = true
    },
    handleEditReset() {
      const remarkID = this.editRemarkData.id
      const originRemarkData = this.remarks.data.find(remark => remark.id === remarkID)
      this.editRemarkData = JSON.parse(JSON.stringify(originRemarkData))
    },
    async handleUpdate() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        await this.updateRemark({
          data: {
            id: this.editRemarkData.id,
            content: this.editRemarkData.content
          }
        })
      } catch (err) {
        loading.close()
        this.$message({
          type: 'error',
          message: this.$t('updateFailed')
        })
        return
      }
      this.editDialogVisible = false
      loading.close()
      this.$message({
        type: 'success',
        message: this.$t('updateSuccess')
      })
    },
    handlePaginatorChange(page) {
      this.setRemarksPage(page)
      this.getRemarks()
    },
    handlePaginatorSizeChange(pageSize) {
      this.setRemarksPageSize(pageSize)
      this.getRemarks()
    }
  }
}
</script>

<style lang="scss" scoped>
  .remark {
    padding-left: 15px;
    &-wraper {

    }
    &__list {
      padding: 15px 0px 30px 20px !important;
      border-left: 2px solid #ccc;
      border-radius: 2px;
    }
    &__item {
      min-width: 200px;
      &-avatar {
        display: flex;
        align-items: center;
        padding-top: 7px;
        padding-bottom: 7px;
        margin-left: -40px;
        background-color: white;
        > img {
          line-height: 0px;
          display: inline-block;
          width: 40px;
          border-radius: 100px 100px;
        }
        > div {
          display: inline-block;
          margin-left: 10px;
        }
      }
      &-content {
        padding: 10px;
        letter-spacing: .5px;
        word-wrap: break-all;
        word-break: break-all;
        box-shadow: 3px 3px 8px #E9E9E9;
        border-radius: 3px;
        background-color: #FEFDDF;
      }
      &-time {
        margin-top: 15px;
        text-align: right;
      }
      &-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }
    }
    &__paginator {
      display: flex;
      justify-content: center;
    }
    &__form {
      margin-top: 25px;
      &-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }
    }
    ul {
      padding: 0px;
      list-style: none;
    }
  }
  .edit-form__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  }
</style>
