<template>
  <!-- 编辑 dialog -->
  <el-dialog
    :visible.sync="dialogVisible"
    :title="$t('contentMGT.editServiceAreaDetails')"
    class="service-area-edit-dialog">
    <div class="service-area-edit-dialog__section" >
      <h2>{{ $t('contentMGT.areaName') }}</h2>
      <el-input v-model="formData.name" style="width: 200px;" />
    </div>
    <div class="service-area-edit-dialog__section">
      <h2>{{ $t('contentMGT.firstPicture') }}</h2>
      <upload-image
        :image-list.sync="formData.firstPic"
        :max-count="1"
        :cropper-ratio="[495, 347]"/>
    </div>
    <div class="service-area-edit-dialog__section">
      <h2>{{ $t('contentMGT.topPicture') }}</h2>
      <upload-image
        :image-list.sync="formData.topPic"
        :max-count="1"
        :cropper-ratio="[1200, 588]"/>
    </div>
    <div class="service-area-edit-dialog__section">
      <h2 style="margin-top: 30px;" >{{ $t('contentMGT.editMainContent') }}</h2>
      <tinymce
        ref="tinymce"
        :height="600"
        v-model="formData.introduction"/>
    </div>
    <div class="service-area-edit-dialog__actions" >
      <el-button type="info" @click="reset" >{{ $t('reset') }}</el-button>
      <el-button type="primary" @click="updateData" >{{ $t('update') }}</el-button>
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
  name: 'EditServiceAreaDialog',
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
      'editServiceAreaDialogVisible',
      'editServiceAreaDialogData'
    ]),
    dialogVisible: {
      get() {
        return this.editServiceAreaDialogVisible
      },
      set(visible) {
        this.setEditServiceAreaDialogVisible(visible)
      }
    }
  },
  watch: {
    editServiceAreaDialogData(areaData) {
      this.formatData(
        JSON.parse(
          JSON.stringify(
            areaData
          )
        )
      )
    }
  },
  methods: {
    ...mapMutations([
      'setEditServiceAreaDialogVisible'
    ]),
    ...mapActions([
      'updateServiceArea'
    ]),
    /**
     * 重置表单
     */
    reset() {
      this.formatData(this.editServiceAreaDialogData)
    },
    /**
     * 更新
     */
    async updateData() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      // 组装请求数据
      const formData = this.formData
      const requestData = {} // 请求的数据

      // 判断图片是否需要上传
      try {
        if (formData['firstPic'][0]) {
          const firstPic = formData['firstPic'][0]
          if (/^http/.test(firstPic.dataURL)) {
            requestData['picture'] = firstPic.dataURL
          } else {
            const res = (await uploadImageAPI(firstPic.file))
            requestData['picture'] = res.headers.location
          }
        } else {
          requestData['picture'] = null
        }
        if (formData['topPic'][0]) {
          const topPic = formData['topPic'][0]
          if (/^http/.test(topPic.dataURL)) {
            requestData['top_picture'] = topPic.dataURL
          } else {
            const res = (await uploadImageAPI(topPic.file))
            requestData['top_picture'] = res.headers.location
          }
        } else {
          requestData['picture'] = null
        }
      } catch (err) {
        // ...
      }

      Object.assign(requestData, {
        introduction: formData.introduction,
        name: formData.name,
        id: formData.id
      })

      // 调用修改Action
      this.updateServiceArea(requestData)
        .then(() => {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: this.$t('updateSuccess')
          })
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: this.$t('updateFailed')
          })
        })
        .finally(() => {
          loading.close()
        })
    },
    /**
     * 数据格式化
     */
    formatData(areaData) {
      this.formData = {
        id: areaData.id,
        firstPic: areaData.picture ? [{
          dataURL: areaData.picture
        }] : [],
        topPic: areaData.top_picture ? [{
          dataURL: areaData.top_picture
        }] : [],
        introduction: areaData.introduction,
        name: areaData.name
      }
      const tinymceComponent = this.$refs.tinymce
      if (tinymceComponent) tinymceComponent.setContent(areaData.introduction)
    }
  }
}
</script>

<style scoped lang="scss" >
.service-area-edit-dialog {
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
