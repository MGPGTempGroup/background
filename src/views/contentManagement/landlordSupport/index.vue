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
      <el-button type="primary" @click="onUpdate" >{{ $t('update') }}</el-button>
    </div>
    <!-- 历史内容对话框 -->
    <historical-content-dialog />
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
      currRichEditorContent: this.$store.state.content.landlordSupport.currRichEditorContent,
      imageList: []
    }
  },
  computed: {},
  methods: {
    ...mapMutations([
      'updateLandlordSupportEditorContent', 'updateHistoricalContent'
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

