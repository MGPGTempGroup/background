<template>
  <div class="content">
    <h2>{{ $t('contentMGT.editImage') }}</h2>
    <div class="content__upload-image-wrapper" >
      <upload-image :image-list="imageList" />
    </div>
    <div class="content__areas-list-wrapper" >
      <areas-list />
    </div>
    <h2 style="margin-top: 30px;" >{{ $t('contentMGT.editMainContent') }}</h2>
    <div class="content__rich-editor-wrapper" >
      <tinymce :height="600" v-model="currRichEditorContent"/>
    </div>
    <div class="content__actions" >
      <el-button type="info" @click="updateHistoricalContent({ dialogVisible: true })" >{{ $t('contentMGT.historicalContent') }}</el-button>
      &nbsp;
      <el-button type="primary" @click="onUpdate" >{{ $t('update') }}</el-button>
    </div>
    <!-- 历史内容对话框 -->
    <historical-content-dialog />
  </div>
</template>

<script>
import UploadImage from '@/components/UploadImage'
import Tinymce from '@/components/Tinymce'
import historicalContentDialog from '../historicalContentDialog'
import areasList from './areasList'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('content')
export default {
  name: 'AreasWeServe',
  components: { UploadImage, Tinymce, historicalContentDialog, areasList },
  data() {
    return {
      imageList: [],
      currRichEditorContent: 'Hello, World'
    }
  },
  methods: {
    ...mapMutations([
      'updateHistoricalContent'
    ]),
    onUpdate() {
      this.$confirm(this.$t('contentMGT.confirmUpdateTips'), this.$t('tips'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel')
      }).then(() => {}).catch(action => { })
    }
  }
}
</script>

<style lang="scss" scoped >
  @import '../common.scss';
  .content__areas-list-wrapper {
    margin-top: 30px;
  }
</style>

