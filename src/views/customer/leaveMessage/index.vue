<template>
  <div class="customer-leave-message" >
    <filter-form/>
    <el-card class="customer-leave-message__list-card" shadow="never" >
      <div slot="header" class="customer-leave-message__list-header" >
        <h2 style="margin: 0;" >
          <i class="fa fa-list" />
          &nbsp;{{ $t('leaveMessage.messages') }}
        </h2>
      </div>
      <el-table
        v-loading="messagesTableLoading"
        :data="messages.data">
        <el-table-column
          :label="$t('id')"
          prop="id"
          align="center" />
        <el-table-column
          :label="$t('leaveMessage.name')"
          prop="name"
          align="center" />
        <el-table-column
          :label="$t('email')"
          prop="email"
          align="center" />
        <el-table-column
          :label="$t('createdAt')"
          prop="created_at"
          align="center" />
        <el-table-column
          :label="$t('actions')"
          fixed="right"
          align="center"
          min-width="100px">
          <template slot-scope="scope">
            <el-button type="text" @click="openMessagesDialog(scope.row.messages)" >{{ $t('details') }}</el-button>
            <el-button
              type="text"
              @click="$store.dispatch('remark/init', { come_from_type: 'leave_messages', come_from_id: scope.row.id })">
              {{ $t('remarks') }}
            </el-button>
            <el-button type="text" @click="handleDelete(scope.row.id)">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="messages.meta.pagination" class="customer-leave-message__paginator-wrapper" >
        <el-pagination
          :current-page="messagesPage"
          :page-sizes="[15, 30, 50, 100]"
          :page-size="messagesPageSize"
          :total="messages.meta.pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="onPaginatorSizeChange"
          @current-change="onPaginatorChange"/>
      </div>
    </el-card>

    <!-- 客户消息列表对话框 -->
    <messages-dialog/>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
import { createNamespacedHelpers } from 'vuex'
import MessagesDialog from './messagesDialog'
import FilterForm from './filter'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('leaveMessage')
export default {
  name: 'LeaveMessage',
  components: {
    MessagesDialog,
    FilterForm
  },
  computed: {
    ...mapState([
      'messagesPage',
      'messagesPageSize',
      'messages',
      'messagesTableLoading'
    ])
  },
  created() {
    this.dispatchFetchMessagesAction()
  },
  methods: {
    ...mapMutations([
      'setMessagesPage',
      'setMessagesPageSize',
      'setMessagesDialogVisible',
      'setMessagesDialogData',
      'setMessagesTableLoading'
    ]),
    ...mapActions([
      'fetchMessages',
      'deleteMessage'
    ]),
    async dispatchFetchMessagesAction() {
      this.setMessagesTableLoading(true)
      try {
        await this.fetchMessages()
      } catch (err) {
        this.$message({
          type: 'error',
          message: this.$t('getDataError')
        })
      } finally {
        this.setMessagesTableLoading(false)
      }
    },
    onPaginatorSizeChange(pageSize) {
      this.setMessagesPageSize(pageSize)
      this.dispatchFetchMessagesAction()
    },
    onPaginatorChange(page) {
      this.setMessagesPage(page)
      this.dispatchFetchMessagesAction()
    },
    openMessagesDialog(messages) {
      this.setMessagesDialogData(messages)
      this.setMessagesDialogVisible(true)
    },
    handleDelete(id) {
      this.$confirm(this.$t('deleteDataTips'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(async() => {
        this.setMessagesTableLoading(true)
        try {
          await this.deleteMessage({ id })
        } catch (err) {
          this.$message({
            type: 'error',
            message: this.$t('deleteFailed')
          })
          return
        } finally {
          this.setMessagesTableLoading(false)
        }
        this.$message({
          type: 'success',
          message: this.$t('deleteSuccess')
        })
      }).catch(() => {
        // ...
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.customer-leave-message {
  padding: 20px;
  &__list-card {
    margin-top: 20px;
  }
  &__list-header {
    position: relative;
  }
  &__paginator-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  &-delete-dialog__info {
    dt {
      margin-top: 15px;
      width: 100%;
      font-weight: bold;
    }
    dd {
      margin-top: 15px;
    }
  }
}
</style>
