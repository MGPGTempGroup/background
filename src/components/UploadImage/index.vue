<template>
  <div class="upload-image" >
    <ul ref="list" refs="list" class="upload-image__list" dragable @drop="drop" >
      <li
        v-for="(item, index) in imageList"
        :key="index"
        class="upload-image__list-item"
        draggable
        @dragstart="dragStart"
        @dragenter="dragEnter"
        @dragover="dragOver">
        <img :src="item.dataURL" >
        <div class="upload-image__list-item-mask" dragable="false" >
          <el-button type="danger" size="mini" @click="del(item, index)" ><i class="fa fa-trash" /></el-button>
          <el-button type="primary" size="mini" @click="preview(item.dataURL)" ><i class="fa fa-eye" /></el-button>
          <el-button type="primary" size="mini" @click="openCropper(item.dataURL, index)" ><i class="fa fa-edit" /></el-button>
        </div>
      </li>
      <li class="upload-image__btn" >
        <input ref="fileInput" class="upload-image__file-input" type="file" multiple @change="onFileChange" >
        <div class="upload-image__btn-text" >
          <i class="fa fa-cloud-upload" style="font-size: 20px;" />
          <div style="margin-top: 5px;" >{{ $t('clickUpload') }}</div>
        </div>
      </li>
    </ul>
    <!-- 预览对话框 -->
    <el-dialog
      :visible.sync="previewDialogVisible"
      :title="$t('preview')"
      top="100px"
      append-to-body >
      <img :src="currPreviewImgSrc" style="width: 100%;" alt="">
    </el-dialog>
    <!-- 剪裁对话框 -->
    <el-dialog
      :visible.sync="cropperDialogVisible"
      :title="$t('imgCropper')"
      height="500px"
      append-to-body >
      <div class="upload-image__cropper-wrapper" >
        <vue-cropper
          ref="cropper"
          v-bind="cropperOpts" />
      </div>
      <!-- 操作按钮 -->
      <div class="upload-image__cropper-control" >
        <el-button type="info" @click="cropperDialogVisible = false" >
          {{ $t('close') }}
        </el-button>
        <el-button type="primary" @click="crop" >
          {{ $t('confirm') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import 'font-awesome/css/font-awesome.min.css'
export default {
  name: 'UploadImage',
  components: {
    VueCropper
  },
  props: {
    imageList: {
      type: Array,
      required: true
    },
    maxCount: {
      type: Number,
      default: 1
    },
    cropperRatio: {
      type: Array,
      default: () => [260, 200]
    }
  },
  data() {
    return {
      currDragIndex: null,
      willDragToBeforeIndex: null,
      currPreviewImgSrc: '',
      availableTypes: ['image/jpg', 'image/jpeg', 'images/png', 'image/gif'],
      previewDialogVisible: false,
      cropperDialogVisible: false,
      currCopperImageIndex: null,
      cropperOpts: {
        img: '', // 图片资源：dataURL or Blob or URL
        outputType: 'jpeg', // 剪裁后输出的图片文件类型
        size: 1, // 比例
        autoCrop: true, // 自动开启剪裁
        fixed: true, // 按照比例剪裁
        fixedNumber: this.cropperRatio, // 剪裁比例
        // centerBox: true, // 裁剪框是否被限制在图片之内
        // 设置剪裁框的宽度与高度
        // 这里设置了一个尽可能更大的值，让插件尽可能的将剪裁框的大小与剪裁图片保持相同
        // (因为插件不支持剪裁框宽度高度与图片相同)
        autoCropWidth: 1 << 20,
        autoCropHeight: 1 << 20
      }
    }
  },
  methods: {
    /**
     * 文件选择时（通过file input），转码所有图片文件为Base64
     */
    onFileChange(event) {
      const files = event.target.files
      const promises = Object.values(files).filter((item, index) => index < this.maxCount).map(function(file) {
        return new Promise((resolve, reject) => {
          const fr = new FileReader()
          fr.readAsDataURL(file)
          fr.onload = () => resolve({
            file, dataURL: fr.result
          })
          fr.onerror = () => reject(file)
        })
      })
      Promise.all(promises).then(res => {
        this.$emit('update:imageList', res)
      })
    },
    /**
     * 删除图片
     */
    del(item, index) {
      this.$emit('update:imageList', this.imageList.filter((v, i) => i !== index))
      // 清除file input的value
      // 防止删除某个图片后其文件还残留在file input中（再次选择删除的图片时无法触发元素change事件）
      this.$refs.fileInput.value = ''
    },
    /**
     * 图片预览
     */
    preview(dataURL) {
      this.currPreviewImgSrc = dataURL
      this.previewDialogVisible = true
    },
    /**
     * 开始剪裁
     */
    openCropper(dataURL, index) {
      this.cropperDialogVisible = true
      this.currCopperImageIndex = index
      this.cropperOpts.img = dataURL
    },
    /**
     * 确认剪裁
     */
    crop() {
      this.$refs.cropper.getCropBlob(blob => {
        this.imageList[this.currCopperImageIndex].file = new File([blob], this.currCopperImageIndex, {
          type: 'image/jpeg'
        })
      })
      this.$refs.cropper.getCropData(dataURL => {
        this.imageList[this.currCopperImageIndex].dataURL = dataURL
        this.cropperOpts.img = dataURL
      })
      // this.cropperDialogVisible = false
    },
    /**
     * 拖拽相关事件处理
     */
    dragStart(event) {
      this.currDragIndex = [].indexOf.call(this.$refs.list.children, event.target)
    },
    dragEnter(event) {
      event.preventDefault()
      let el = event.target
      if (el.nodeName.toLowerCase() === 'li' || (el = el.parentElement).nodeName.toLowerCase() === 'li') {
        this.willDragToBeforeIndex = [].indexOf.call(this.$refs.list.children, el)
      }
    },
    dragOver(event) {
      event.preventDefault()
    },
    drop(event) {
      const imageList = JSON.parse(JSON.stringify(this.imageList))
      const currData = imageList.splice(this.currDragIndex, 1)[0]
      imageList.splice(this.willDragToBeforeIndex, 0, currData)
      this.$emit('update:imageList', imageList)
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload-image {
    &__list {
      display: inline-block;
      margin: 0px;
      margin-top: -15px;
      padding: 0px;
      min-height: 120px;
      list-style: none;
      &-item {
        position: relative;
        display: inline-flex;
        justify-content: center;
        margin-right: 10px;
        margin-bottom: 15px;
        padding: 5px;
        vertical-align: top;
        min-width: 160px;
        height: 120px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px #CCCCCC;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          .upload-image__list-item-mask {
            transition: opacity .5s;
            z-index: 10;
            opacity: 1;
          }
        }
        > img {
          height: 100%;
          border-radius: inherit;
        }
        &-mask {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 0px;
          top: 0px;
          z-index: -1;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,.35);
          opacity: 0;
        }
      }
    }
    &__cropper-wrapper {
      width: 100%;
      height: 500px;
    }
    &__cropper-control {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
    &__btn {
      display: inline-flex;
      vertical-align: top;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      position: relative;
      margin-bottom: 15px;
      width: 150px;
      height: 120px;
      font-size: 14px;
      letter-spacing: .5px;
      color: #666666;
      background-color: white;
      border: 1px dashed #ccc;
      border-radius: 5px;
      transform: translateY(0px);
      transition: all .3s;
      &-text {
        text-align: center;
      }
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0px 0px 15px #EEEEEE;
        border-color: #1E90FD;
      }
    }
    &__file-input {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }
</style>

