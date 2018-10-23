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
            <el-button type="danger" size="small" @click="() => null">{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
import { createNamespacedHelpers } from 'vuex'
import filterForm from './form/filter'
const { mapState } = createNamespacedHelpers('userComment')

export default {
  name: 'UserComment',
  components: { filterForm },
  data() {
    return { }
  },
  computed: {
    ...mapState([
      'comments'
    ])
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
  }
</style>

<style>
  .el-card__header {
    position: relative;
    padding: 0px 20px;
  }
</style>

