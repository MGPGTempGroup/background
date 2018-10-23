<template>
  <div class="user-comment" >
    <filter-form />
    <el-card class="user-comment__list-card" shadow="never" >
      <div slot="header" class="user-comment__list-header" >
        <h2>
          <i class="fa fa-list" />
          &nbsp;{{ $t('userComment.userCommentsList') }}
        </h2>
      </div>
      <el-table :data="comments" >
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
            <el-tag> {{ $t(`userComment.${scope.row.identity}`) }} </el-tag>
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
          prop="createdAt"
          align="center" />
        <el-table-column
          fixed="right"
          align="center"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="deleteComment(scope.row)">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="user-comment__paginator-wrapper" >
        <el-pagination
          :current-page="currCommentsPage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="10"
          :total="100"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="onPaginatorSizeChange"
          @current-change="onPaginatorChange"/>
      </div>
    </el-card>
    <!-- 删除确认Dialog -->
    <el-dialog
      :visible.sync="deleteConfirmationDialogVisible"
      :title="$t('userComment.confirmDeleteTip')"
      width="35%"
      center>
      <dl class="user-comment-delete-dialog__info" >
        <dt>{{ $t('userComment.id') }}</dt>
        <dd>{{ messageForCurrOperation.id }}</dd>
        <dt>{{ $t('userComment.name') }}</dt>
        <dd>{{ messageForCurrOperation.name }}</dd>
        <dt>{{ $t('userComment.comment') }}</dt>
        <dd>{{ messageForCurrOperation.comments }}</dd>
      </dl>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="deleteConfirmationDialogVisible = false">{{ $t('confirm') }}</el-button>
        <el-button type="info" @click="deleteConfirmationDialogVisible = false">{{ $t('cancel') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
import { createNamespacedHelpers } from 'vuex'
import filterForm from './form/filter'
const { mapState, mapMutations } = createNamespacedHelpers('userComment')

export default {
  name: 'UserComment',
  components: { filterForm },
  data() {
    return { }
  },
  computed: {
    ...mapState(['comments', 'currCommentsPage', 'messageForCurrOperation']),
    deleteConfirmationDialogVisible: {
      get() {
        return this.$store.state.userComment.deleteConfirmationDialogVisible
      },
      set(visible) {
        this.updateDeleteConfirmationDialogVisible(visible)
      }
    }
  },
  methods: {
    ...mapMutations(['updateDeleteConfirmationDialogVisible', 'updateMessageForCurrOperation']),
    deleteComment(row) {
      this.updateMessageForCurrOperation(row)
      this.deleteConfirmationDialogVisible = true
    },
    onPaginatorSizeChange() {},
    onPaginatorChange() {}
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
      padding: 1px 0px; // margin collapsing
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

<style>
  .el-card__header {
    position: relative;
    padding: 0px 20px;
  }
</style>

