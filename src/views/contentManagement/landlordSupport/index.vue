<template>
  <div class="landlord-support" >
    <h2>{{ $t('contentMGT.editImage') }}</h2>
    <div class="landlord-support__upload-image-wrapper" >
      <upload-image :image-list="imageList" />
    </div>
    <h2 style="margin-top: 30px;" >{{ $t('contentMGT.editMainContent') }}</h2>
    <div class="landlord-support__rich-editor-wrapper" >
      <tinymce :height="600" v-model="currRichEditorContent"/>
    </div>
    <div class="landlord-support__actions" >
      <el-button type="info" @click="updateHistoricalContent({ dialogVisible: true })" >{{ $t('contentMGT.historicalContent') }}</el-button>
      &nbsp;
      <el-button type="primary" @click="confirmUpdateDialogVisible = true" >{{ $t('update') }}</el-button>
    </div>
    <!-- 历史内容对话框 -->
    <historical-content-dialog />
    <!-- 更新确认对话框 -->
    <el-dialog :title="$t('tips')" :visible.sync="confirmUpdateDialogVisible" >
      <strong>{{ $t('contentMGT.confirmUpdateTips') }}</strong>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirmUpdateDialogVisible = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="() => undefined">{{ $t('confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import UploadImage from '@/components/UploadImage'
import historicalContentDialog from '../historicalContentDialog'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('content')
export default {
  name: 'LandlordSupport',
  components: { Tinymce, UploadImage, historicalContentDialog },
  data() {
    return {
      confirmUpdateDialogVisible: false,
      imageList: []
    }
  },
  computed: {
    // todo: 组件自身先维护一份富文本内容的数据（v-model的数据源也是这个），在update时再commit mutation同步到store
    currRichEditorContent: {
      get() {
        return this.$store.state.content.landlordSupport.currRichEditorContent
      },
      set(content) {
        this.updateCurrRichEditorContent({ content })
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateCurrRichEditorContent', 'updateHistoricalContent'
    ])
  }
}
</script>

<style lang="scss" scoped >
  @import '../common.scss';
  .landlord-support {
    padding: 20px;
    &__rich-editor-wrapper {}
    &__actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
</style>

