<template>
  <!-- 创建 dialog -->
  <el-dialog
    :visible.sync="dialogVisible"
    :title="$t('contentMGT.createServiceArea')"
    class="service-area-create-dialog">
    <div class="service-area-create-dialog__section" >
      <h2>{{ $t('contentMGT.areaName') }}</h2>
      <el-input v-model="formData.name" style="width: 200px;" />
    </div>
    <div class="service-area-create-dialog__section">
      <h2>{{ $t('contentMGT.firstPicture') }}</h2>
      <upload-image
        :image-list.sync="formData.firstPic"
        :max-count="1"
        :ratio="[495, 347]"/>
    </div>
    <div class="service-area-create-dialog__section">
      <h2>{{ $t('contentMGT.topPicture') }}</h2>
      <upload-image
        :image-list.sync="formData.topPic"
        :max-count="1"
        :ratio="[1200, 588]"/>
    </div>
    <div class="service-area-create-dialog__section">
      <h2 style="margin-top: 30px;" >{{ $t('contentMGT.mainContent') }}</h2>
      <tinymce
        ref="tinymce"
        :height="600"
        v-model="formData.introduction"/>
    </div>
    <div class="service-area-create-dialog__actions" >
      <el-button type="info" @click="reset" >{{ $t('reset') }}</el-button>
      <el-button type="primary" @click="createData" >{{ $t('create') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { uploadImage as uploadImageAPI } from '@/api/upload'

import UploadImage from '@/components/UploadImage'
import Tinymce from '@/components/Tinymce'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('service')
export default {
  name: 'CreateServiceAreaDialog',
  components: {
    Tinymce, UploadImage
  },
  data() {
    return {
      formData: {
        firstPic: [],
        topPic: [],
        introduction: '',
        name: ''
      }
    }
  },
  computed: {
    ...mapState([
      'createServiceAreaDialogVisible'
    ]),
    dialogVisible: {
      get() {
        return this.createServiceAreaDialogVisible
      },
      set(visible) {
        this.setCreateServiceAreaDialogVisible(visible)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setCreateServiceAreaDialogVisible'
    ]),
    ...mapActions([
      'createServiceArea'
    ]),
    /**
     * 重置
     */
    reset() {
      this.formData = {
        firstPic: [],
        topPic: [],
        introduction: '',
        name: ''
      }
      this.$refs.tinymce.setContent('')
    },
    /**
     * 更新
     */
    async createData() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      // 组装请求数据
      const {
        introduction,
        name
      } = this.formData
      const requestData = {
        introduction,
        name
      }

      // 判断图片是否需要上传
      try {
        const firstPic = this.formData.firstPic[0]
        const topPic = this.formData.topPic[0]
        if (firstPic) {
          const res = (await uploadImageAPI(firstPic.file))
          requestData['picture'] = res.headers.location
        }
        if (topPic) {
          const res = (await uploadImageAPI(topPic.file))
          requestData['top_picture'] = res.headers.location
        }
      } catch (err) {
        // ...
      }

      // 调用修改Action
      this.createServiceArea(requestData)
        .then(() => {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: this.$t('createSuccess')
          })
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: this.$t('createFailed')
          })
        })
        .finally(() => {
          loading.close()
        })
    }
  }
}
</script>

<style scoped lang="scss" >
.service-area-create-dialog {
  &__section {
    &:first-of-type {
      margin-top: 0px !important;
    }
    margin-top: 20px;
    padding-top: 1px; // margin 重叠
  }
  &__actions {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
