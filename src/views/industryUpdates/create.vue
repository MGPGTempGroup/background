<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="$t('industryUpdates.createArticleTitle')"
    top="30px"
    class="create-industry-update-dialog">
    <el-form :model="form" label-position="top" >
      <el-form-item :label="$t('industryUpdates.title')" >
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item :label="$t('industryUpdates.firstPicture')" >
        <upload-image :image-list.sync="form.firstPic" :max-count="1" :ratio="[374,262]" />
      </el-form-item>
      <el-form-item :label="$t('industryUpdates.topPicture')" >
        <upload-image :image-list.sync="form.topPic" :max-count="1" :ratio="[1200,588]" />
      </el-form-item>
      <el-form-item :label="$t('industryUpdates.content')" style="margin-top: 30px;" >
        <tinymce ref="tinymce" v-model="form.content" />
      </el-form-item>
      <div class="create-industry-update-dialog__form-actions" >
        <el-button type="info" @click="resetForm" >{{ $t('reset') }}</el-button>
        <el-button type="primary" @click="submitForm" >{{ $t('publish') }}</el-button>
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
  name: 'CreateIndustryUpdateDialog',
  components: {
    Tinymce, UploadImage
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
      'createIndustyUpdateDialogVisible'
    ]),
    dialogVisible: {
      get() {
        return this.createIndustyUpdateDialogVisible
      },
      set(visible) {
        this.setCreateIndustryUpdateDialogVisible(visible)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setCreateIndustryUpdateDialogVisible'
    ]),
    ...mapActions([
      'createArticle'
    ]),
    /**
     * 重置表单
     */
    resetForm() {
      this.form = {
        title: '',
        content: '',
        firstPic: [],
        topPic: []
      }
      this.$refs.tinymce.setContent('')
    },
    /**
     * 提交
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
        title: form.title,
        content: form.content
      }

      // 上传图片
      if (form.firstPic[0] && form.topPic[0]) {
        const { file: firstPicFile } = form.firstPic[0]
        const { file: topPicFile } = form.topPic[0]
        try {
          const responses = await Promise.all([UploadImageAPI(firstPicFile), UploadImageAPI(topPicFile)])
          Object.assign(requestPayload, {
            first_picture: responses[0].headers.location,
            top_picture: responses[1].headers.location
          })
        } catch (err) {
          loading.close()
          this.$message({
            type: 'error',
            message: this.$t('uploadFailed')
          })
          return
        }
      } else {
        this.$message({
          type: 'error',
          message: this.$t('industryUpdates.requiredArticlePicture')
        })
        return
      }

      // 调用文章创建Action
      try {
        await this.createArticle({
          data: requestPayload
        })
        this.resetForm()
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: this.$t('createSuccess')
        })
      } catch (err) {
        this.$message({
          type: 'error',
          message: this.$t('createFailed')
        })
      } finally {
        loading.close()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-industry-update-dialog {
    &__form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
</style>
