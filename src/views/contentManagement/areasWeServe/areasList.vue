<template>
  <div class="areas" >
    <div class="areas__header" >
      <h2 class="areas__title" >{{ $t('contentMGT.editServiceAreas') }}</h2>
      <el-button type="primary" class="areas__add-btn" @click="createArea" >
        {{ $t('create') }}
      </el-button>
    </div>
    <!-- 列表 -->
    <el-row :gutter="12" tag="ul" class="areas__list" >
      <el-col
        v-for="(item, index) in list"
        :key="index"
        v-bind="itemLayoutProps"
        tag="li"
        class="areas__item">
        <el-card class="areas__item-card" shadow="hover" >
          <template slot="header" >
            <p style="margin: 5px; display: inline-block; vertical-align: center;" >{{ item.name }}</p>
            <el-button style="float: right;" @click="openDetailsEditorDialog(item.id)" ><i class="fa fa-edit" /></el-button>
          </template>
          <img :src="item.img_url" class="areas__item-img" alt="">
        </el-card>
      </el-col>
    </el-row>
    <!-- 创建Dialog -->
    <el-dialog
      :title="$t('contentMGT.createServiceArea')"
      :visible.sync="areaCreateDialogVisible"
      fullscreen>
      <h2>{{ $t('contentMGT.areaName') }}</h2>
      <el-input style="width: 200px;" />
      <h2 style="margin-top: 20px;" >{{ $t('contentMGT.editImage') }}</h2>
      <div class="areas__upload-img-wrapper" >
        <upload-image :image-list.sync="imageList" />
      </div>
      <h2 style="margin-top: 30px;" >{{ $t('contentMGT.editMainContent') }}</h2>
      <div class="areas__editor-wrapper" >
        <tinymce :height="600" v-model="createAreaContent" />
      </div>
      <div class="areas__actions" >
        <el-button type="primary" >
          {{ $t('create') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 编辑 dialog -->
    <el-dialog
      :visible.sync="editorDialogVisible"
      :title="$t('contentMGT.editServiceAreaDetails')"
      fullscreen>
      <h2>{{ $t('contentMGT.editImage') }}</h2>
      <div class="areas__upload-img-wrapper" >
        <upload-image :image-list.sync="imageList" />
      </div>
      <h2 style="margin-top: 30px;" >{{ $t('contentMGT.editMainContent') }}</h2>
      <div class="areas__editor-wrapper" >
        <tinymce :height="600" v-model="content" />
      </div>
      <div class="areas__actions" >
        <el-button type="info" @click="updateHistoricalContent({ dialogVisible: true })" >{{ $t('contentMGT.historicalContent') }}</el-button>
        &nbsp;
        <el-button type="primary" @click="onUpdate" >{{ $t('update') }}</el-button>
      </div>
      <!-- 历史内容对话框 -->
      <historical-content-dialog />
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import UploadImage from '@/components/UploadImage'
import HistoricalContentDialog from '../historicalContentDialog'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations } = createNamespacedHelpers('content')
export default {
  name: 'AreasList',
  components: {
    Tinymce, UploadImage, HistoricalContentDialog
  },
  data() {
    return {
      itemLayoutProps: { xs: 12, sm: 12, md: 8, lg: 6, xl: 4 },
      areaDetailsCurrEditId: null,
      content: this.editorContent,
      imageList: [],
      areaCreateDialogVisible: false,
      createAreaContent: ''
    }
  },
  computed: {
    ...mapState({
      list: state => state.areasWeService.list
    }),
    ...mapGetters({
      editorContent: 'contentInCurrEditing'
    }),
    editorDialogVisible: {
      get() {
        return this.$store.state.content.areasWeService.editorDialogVisible
      },
      set(visible) {
        this.updateAreaDetailsEditorDialogVisible({ visible })
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateAreaDetailsEditorDialogVisible',
      'updateAreaIdInCurrEditing',
      'updateHistoricalContent'
    ]),
    openDetailsEditorDialog(id) {
      this.updateAreaIdInCurrEditing({ id })
      this.editorDialogVisible = true
    },
    onUpdate() {
      this.$confirm(this.$t('contentMGT.confirmUpdateTips'), this.$t('tips'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel')
      }).then(() => {}).catch(action => { })
    },
    createArea() {
      this.areaCreateDialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped >
  @import '../common.scss';
  .areas {
    &__header {
      position: relative;
    }
    &__add-btn {
      position: absolute;
      top: 50%;
      right: 0px;
      transform: translateY(-50%);
    }
    &__list {
      list-style: none;
      margin: 0px;
      padding: 0px;
    }
    &__item {
      margin-bottom: 30px;
      cursor: pointer;
    }
    &__item-img {
      width: 100%;
    }
    &__actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
</style>

