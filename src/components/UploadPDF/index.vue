<template>
  <el-upload
    ref="upload"
    :action="uploadPDFAction"
    :on-preview="handlePDFPreview"
    :on-remove="handlePDFRemove"
    :on-success="handleUploadPDFSuccess"
    :on-error="handleUploadPDFError"
    :headers="uploadPDFHeaders"
    :file-list="pdfList"
    :auto-upload="true"
    :limit="1"
    name="pdf"
    accept="application/pdf">
    <el-button slot="trigger" size="small" type="primary">{{ $t('selectFile') }}</el-button>
  </el-upload>
</template>

<script>
import { getToken } from '@/utils/auth'
export default {
  name: 'UploadPDF',
  props: {
    pdfList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      uploadPDFHeaders: {
        'Authorization': getToken()
      },
      uploadPDFAction: `${process.env.BASE_API}/pdfs`
    }
  },
  methods: {
    /**
     * 预览上传的pdf文件
     */
    handlePDFPreview(file) {
      window.open(file.url, 'Preview')
    },
    /**
     * 删除上传的pdf文件
     */
    handlePDFRemove(response, file, fileList) {
      this.$emit('update:pdfList', fileList)
    },
    /**
     * pdf文件上传成功时的钩子
     */
    handleUploadPDFSuccess(response, file, fileList) {
      this.$emit('update:pdfList', fileList)
    },
    handleUploadPDFError() {
      this.$message({
        type: 'error',
        message: this.$t('uploadFailed')
      })
    }
  }
}
</script>

