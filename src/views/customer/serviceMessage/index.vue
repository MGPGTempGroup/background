<template>
  <div class="user-comment" >
    <filter-form />
    <el-card class="user-comment__list-card" shadow="never" >
      <div slot="header" class="user-comment__list-header" >
        <h2 style="margin: 0;" >
          <i class="fa fa-list" />
          &nbsp;{{ $t('userComment.userCommentsList') }}
        </h2>
      </div>
      <el-table
        v-loading="tableLoading"
        :data="messages.data">
        <el-table-column
          :label="$t('userComment.id')"
          prop="id"
          align="center" />
        <el-table-column
          :label="$t('userComment.surname')"
          prop="surname"
          align="center" />
        <el-table-column
          :label="$t('userComment.name')"
          prop="name"
          align="center" />
        <el-table-column
          :label="$t('userComment.email')"
          prop="email"
          align="center" />
        <el-table-column
          :label="$t('userComment.phone')"
          prop="phone"
          align="center" />
        <el-table-column
          :label="$t('userComment.wechat')"
          prop="wechat"
          align="center" />
        <el-table-column
          :label="$t('userComment.identity')"
          align="center">
          <template slot-scope="scope" >
            <el-tag> {{ $t(`${scope.row.identity.name}`) }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('userComment.comments')"
          align="center">
          <template slot-scope="scope" >
            <el-popover
              :title="$t('userComment.comments')"
              :content="scope.row.comments"
              placement="left-end"
              width="300"
              trigger="hover">
              <el-button slot="reference">{{ scope.row.comments | textTruncate(18) }}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('userComment.createdAt')"
          prop="created_at"
          align="center" />
        <el-table-column
          :label="$t('userComment.comeFrom')"
          align="center">
          <template slot-scope="scope" >
            <el-tag> {{ $t(`${scope.row.service.name}`) }} </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="$store.dispatch('remark/init', { come_from_type: 'service_messages', come_from_id: scope.row.id })">
              {{ $t('remarks') }}
            </el-button>
            <el-button type="text" size="small" @click="deleteComment(scope.row)">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="messages.meta" class="user-comment__paginator-wrapper" >
        <el-pagination
          :current-page="tablePage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="tablePageSize"
          :total="messages.meta.pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="onPaginatorSizeChange"
          @current-change="onPaginatorChange"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
import { createNamespacedHelpers } from 'vuex'
import filterForm from './form/filter'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('serviceMessage')

export default {
  name: 'UserComment',
  components: { filterForm },
  computed: {
    ...mapState([
      'messages',
      'messageForCurrOperation',
      'tablePage',
      'tablePageSize',
      'tableLoading'
    ])
  },
  created() {
    this.setTableLoading(true)
    this.fetchServices().then(() => {
      return this.fetchMessages()
    }).finally(() => {
      this.setTableLoading(false)
    })
  },
  methods: {
    ...mapMutations([
      'seTablePage', 'setTablePageSize', 'setTableLoading',
      'updateMessageForCurrOperation'
    ]),
    ...mapActions([
      'fetchServices', 'fetchMessages', 'deleteMessage'
    ]),
    deleteComment(row) {
      this.$confirm(this.$t('deleteDataTips'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(async() => {
        this.setTableLoading(true)
        try {
          await this.deleteMessage(row.id)
        } catch (err) {
          this.$message({
            type: 'error',
            message: this.$t('deleteFailed')
          })
        }
        this.$message({
          type: 'success',
          message: this.$t('deleteSuccess')
        })
        this.setTableLoading(false)
      }).catch(() => {
        // ...
      })
    },
    onPaginatorSizeChange(pageSize) {
      this.setTablePageSize(pageSize)
    },
    onPaginatorChange(page) {
      this.setTablePage(page)
    }
  }
}
</script>

<style scoped lang="scss" >
  .user-comment {
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

