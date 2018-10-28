<template>
  <div class="industry-update" >
    <el-card shadow="never" >
      <template slot="header" class="industry-update__header" >
        <h2>{{ $t('industryUpdates.articleList') }}</h2>
        <el-button type="primary" class="industry-update__add-btn" @click="createArticleDialogVisible = true" >{{ $t('create') }}</el-button>
      </template>
      <el-table :data="articles" >
        <el-table-column
          :label="$t('id')"
          prop="id"
          align="center"
          min-width="30"/>
        <el-table-column
          :label="$t('industryUpdates.title')"
          prop="title"
          align="center"/>
        <el-table-column
          :label="$t('industryUpdates.contentFragment')"
          prop="content"
          align="center"/>
        <el-table-column
          :label="$t('industryUpdates.publisher')"
          prop="publisher"
          align="center"
          min-width="40"/>
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
            <el-button type="primary" size="small" @click="handleEditArticle(scope.row)" >{{ $t('edit') }}</el-button>
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
    <!-- Data creation dialog -->
    <el-dialog
      :title="$t('industryUpdates.createArticle')"
      :visible.sync="createArticleDialogVisible" >
      <el-form :model="creationForm" label-position="top" >
        <el-form-item :label="$t('industryUpdates.title')" >
          <el-input v-model="creationForm.title" />
        </el-form-item>
        <el-form-item :label="$t('industryUpdates.mainPicture')" >
          <upload-image :image-list.sync="creationForm.imageList" />
        </el-form-item>
        <el-form-item :label="$t('industryUpdates.content')" style="margin-top: 30px;" >
          <tinymce v-model="creationForm.content" />
        </el-form-item>
        <div class="industry-update__form-actions" >
          <el-button type="primary" >{{ $t('publish') }}</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- Data editor dialog -->
    <el-dialog
      :title="$t('industryUpdates.editArticle')"
      :visible.sync="editArticleDialogVisible" >
      <el-form :model="editorForm" label-position="top" >
        <el-form-item :label="$t('industryUpdates.title')" >
          <el-input v-model="editorForm.title" />
        </el-form-item>
        <el-form-item :label="$t('industryUpdates.mainPicture')" >
          <upload-image :image-list.sync="editorForm.imageList" />
        </el-form-item>
        <el-form-item :label="$t('industryUpdates.content')" style="margin-top: 30px;" >
          <tinymce v-model="editorForm.content" />
        </el-form-item>
        <div class="industry-update__form-actions" >
          <el-button type="primary" >{{ $t('publish') }}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import UploadImage from '@/components/UploadImage'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('industryUpdates')
export default {
  name: 'IndustryUpdate',
  components: { UploadImage, Tinymce },
  data() {
    return {
      createArticleDialogVisible: false,
      editArticleDialogVisible: false,
      creationForm: { title: '', content: '', imageList: [] },
      editorForm: { title: '', content: '', imageList: [] },
      currPage: 1
    }
  },
  computed: {
    ...mapState([
      'articles'
    ])
  },
  methods: {
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

