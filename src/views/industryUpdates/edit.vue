<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="$t('industryUpdates.editArticleTitle')"
    top="30px"
    class="edit-industry-update-dialog">
    <el-form :model="form" label-position="top" >
      <el-form-item :label="$t('industryUpdates.title')" >
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item :label="$t('industryUpdates.firstPicture')" >
        <upload-image :image-list.sync="form.firstPic" :max-count="1" :cropper-ratio="[374,262]" />
      </el-form-item>
      <el-form-item :label="$t('industryUpdates.topPicture')" >
        <upload-image :image-list.sync="form.topPic" :max-count="1" :cropper-ratio="[1200,588]" />
      </el-form-item>
      <el-form-item :label="$t('industryUpdates.content')" style="margin-top: 30px;" >
        <tinymce ref="tinymce" v-model="form.content" />
      </el-form-item>
      <div class="edit-industry-update-dialog__form-actions" >
        <el-button type="info" @click="resetForm" >{{ $t('reset') }}</el-button>
        <el-button type="primary" @click="submitForm" >{{ $t('update') }}</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import UploadImage from '@/components/UploadImage'
import { uploadImage as UploadImageAPI } from '@/api/upload'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('industryUpdate')
export default {
  name: 'EditIndustryUpdateDialog',
  components: {
    Tinymce,
    UploadImage
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        firstPic: [],
        topPic: []
      }
    }
  },
  computed: {
    ...mapState([
      'editIndustryUpdateDialogData',
      'editIndustryUpdateDialogVisible'
    ]),
    dialogVisible: {
      get() {
        return this.editIndustryUpdateDialogVisible
      },
      set(visible) {
        this.setEditIndustryUpdateDialogVisible(visible)
      }
    }
  },
  watch: {
    editIndustryUpdateDialogData(articleData) {
      this.formatData(articleData)
    }
  },
  methods: {
    ...mapMutations([
      'setEditIndustryUpdateDialogVisible'
    ]),
    ...mapActions([
      'updateArticle'
    ]),
    /**
     * 重置表单
     */
    resetForm() {
      this.formatData(
        this.editIndustryUpdateDialogData
      )
    },
    /**
     * 提交表单
     */
    async submitForm() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      const form = this.form
      const requestPayload = {
        id: form.id,
        title: form.title,
        content: form.content
      }

      // 上传图片
      if (form.firstPic[0] && form.topPic[0]) {
        const picUploadPromise = picObj => new Promise(async(resolve, reject) => {
          if (/^http/.test(picObj.dataURL)) {
            resolve(picObj.dataURL)
          } else {
            try {
              const response = await UploadImageAPI(picObj.file)
              const imgURL = response.headers.location
              resolve(imgURL)
            } catch (err) {
              reject()
            }
          }
        })
        try {
          const imgUrls = await Promise.all([
            picUploadPromise(form.firstPic[0]),
            picUploadPromise(form.topPic[0])
          ])
          Object.assign(requestPayload, {
            first_picture: imgUrls[0],
            top_picture: imgUrls[1]
          })
        } catch (err) {
          this.$message({
            type: 'error',
            message: 'uploadFailed'
          })
        }
      } else {
        this.$message({
          type: 'error',
          message: this.$t('industryUpdates.requiredArticlePicture')
        })
        return
      }

      try {
        await this.updateArticle({
          data: requestPayload
        })
        this.$message({
          type: 'success',
          message: this.$t('updateSuccess')
        })
        this.dialogVisible = false
        this.resetForm()
      } catch (err) {
        this.$message({
          type: 'error',
          message: this.$t('updateFailed')
        })
      } finally {
        loading.close()
      }
    },
    /**
     * 数据格式化
     */
    formatData(articleData) {
      const form = {
        id: articleData.id,
        title: articleData.title,
        content: articleData.content
      }
      if (articleData.first_picture) {
        form.firstPic = [{
          dataURL: articleData.first_picture
        }]
      }
      if (articleData.top_picture) {
        form.topPic = [{
          dataURL: articleData.top_picture
        }]
      }
      this.form = form
      const tinymceRef = this.$refs.tinymce
      if (tinymceRef) tinymceRef.setContent(articleData.content)
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-industry-update-dialog {
    &__form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
</style>
