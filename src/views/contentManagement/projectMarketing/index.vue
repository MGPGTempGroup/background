<template>
  <div class="project-marketing">
    <h2>{{ $t('contentMGT.editImage') }}</h2>
    <div class="project-marketing__upload-image-wrapper" >
      <upload-image :image-list="imageList" />
    </div>
    <div class="project-marketing__select-contacts-wrapper" >
      <select-contacts />
    </div>
    <h2 style="margin-top: 30px;" >{{ $t('contentMGT.editMainContent') }}</h2>
    <div class="project-marketing__rich-editor-wrapper" >
      <tinymce :height="600" v-model="currRichEditorContent"/>
    </div>
    <div class="project-marketing__actions" >
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
import HistoricalContentDialog from '../historicalContentDialog'
import SelectContacts from './selectContacts'
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('content')
export default {
  name: 'ProjectMarketing',
  components: { UploadImage, Tinymce, HistoricalContentDialog, SelectContacts },
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
  .project-marketing {
    padding: 20px;
    &__select-contacts-wrapper {
      margin-top: 30px;
    }
    &__actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
</style>

