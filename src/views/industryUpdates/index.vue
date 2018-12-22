<template>
  <div class="industry-update" >
    <el-card shadow="never" >
      <template slot="header" class="industry-update__header" >
        <h2>{{ $t('industryUpdates.articleList') }}</h2>
        <el-button
          type="primary"
          class="industry-update__add-btn"
          @click="openCreateDialog">
          {{ $t('create') }}
        </el-button>
      </template>
      <el-table
        :data="articles.data"
        :loading="articlesTableLoading">
        <el-table-column
          :label="$t('id')"
          prop="id"
          align="center"
          min-width="30"/>
        <el-table-column
          :label="$t('industryUpdates.title')"
          prop="title"
          align="center"
          min-width="150px"/>
        <el-table-column
          :label="$t('creator')"
          prop="creator"
          align="center"
          min-width="40">
          <template slot-scope="scope" >
            {{ scope.row.creator ? scope.row.creator.name : $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('createdAt')"
          prop="created_at"
          align="center"
          min-width="30"/>
        <el-table-column
          :label="$t('updatedAt')"
          prop="updated_at"
          align="center"
          min-width="30"/>
        <el-table-column
          :label="$t('actions')"
          fixed="right"
          align="center"
          min-width="50">
          <template slot-scope="scope">
            <!-- <el-button type="success" size="small" @click="handleDetailsClick(scope.row)">{{ $t('details') }}</el-button> -->
            <el-button type="primary" size="small" @click="openEditDialog(scope.row)" >{{ $t('edit') }}</el-button>
            <el-button type="danger" size="small" @click="handleDeleteArticle(scope.row)" >{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="industry-update__paginator" >
        <el-pagination
          :current-page="currPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          :total="400"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handlePaginatorSizeChange"
          @current-change="handlePaginatorChange"/>
      </div>
    </el-card>

    <!-- 创建对话框 -->
    <create-industry-update-dialog/>

    <!-- 编辑对话框 -->
    <edit-industry-update-dialog/>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import UploadImage from '@/components/UploadImage'
import CreateIndustryUpdateDialog from './create'
import EditIndustryUpdateDialog from './edit'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('industryUpdate')
export default {
  name: 'IndustryUpdate',
  components: {
    UploadImage,
    Tinymce,
    CreateIndustryUpdateDialog,
    EditIndustryUpdateDialog
  },
  data() {
    return {
      currPage: 1
    }
  },
  computed: {
    ...mapState([
      'articles',
      'articlesTableLoading'
    ])
  },
  async created() {
    // 调用拉取文章列表Action
    try {
      this.fetchArticles()
    } catch (err) {
      this.$message({
        type: 'error',
        message: this.$t('getDataError')
      })
    }
  },
  methods: {
    ...mapMutations([
      'setCreateIndustryUpdateDialogVisible',
      'setEditIndustryUpdateDialogVisible',
      'setEditIndustryUpdateDialogData'
    ]),
    ...mapActions([
      'fetchArticles'
    ]),
    handlePaginatorSizeChange() {},
    handlePaginatorChange() {},
    handleEditArticle(rowData) {
      this.editArticleDialogVisible = true
    },
    handleDeleteArticle(rowData) {
      this.$confirm(this.$t('industryUpdates.confirmDeleteTips'), this.$t('tips'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel')
      }).then(() => {}).catch(action => { })
    },
    /**
     * 打开文章创建对话框
     */
    openCreateDialog() {
      this.setCreateIndustryUpdateDialogVisible(true)
    },
    /**
     * 编辑文章对话框
     */
    openEditDialog(articleData) {
      this.setEditIndustryUpdateDialogData(articleData)
      this.setEditIndustryUpdateDialogVisible(true)
    }
  }
}
</script>

<style lang="scss" scoped >
  @import '@/styles/text.scss';
  .industry-update {
    padding: 20px;
    h2 {
      margin: 0px;
    }
    &__add-btn {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
    }
    &__paginator {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
    &__form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 30px;
    }
  }
</style>

<style lang="scss">
  .el-card__header {
    position: relative;
  }
</style>

