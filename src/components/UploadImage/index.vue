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
          <el-button type="primary" size="mini" ><i class="fa fa-edit" /></el-button>
        </div>
      </li>
      <li class="upload-image__btn" >
        <input class="upload-image__file-input" type="file" multiple @change="onFileChange" >
        <span>点击上传</span>
      </li>
    </ul>
    <el-dialog :visible.sync="visible" :title="$t('preview')" height="600px" >
      <img :src="currPreviewImgSrc" style="width: 100%;" alt="">
    </el-dialog>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.min.css'
export default {
  name: 'UploadImage',
  props: {
    imageList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currDragIndex: null,
      willDragToBeforeIndex: null,
      currPreviewImgSrc: '',
      availableTypes: ['image/jpg', 'image/jpeg', 'images/png', 'image/gif'],
      visible: false
    }
  },
  methods: {
    readAsDataURL(file) {},
    onFileChange(event) {
      const files = event.target.files
      const promises = Object.values(files).map(function(file) {
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
        this.imageList.push(...res)
      })
    },
    del(item, index) {
      this.imageList.splice(index, 1)
    },
    preview(src) {
      console.log(src)
      this.currPreviewImgSrc = src
      this.visible = true
    },
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
      this.imageList = imageList
      this.$nextTick(function() {
        console.log(this.imageList)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .upload-image {
    &__list {
      display: inline-block;
      margin: 0px;
      margin-bottom: -15px;
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
    &__btn {
      display: inline-flex;
      vertical-align: top;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 200px;
      height: 120px;
      font-size: 14px;
      color: #666666;
      background-color: white;
      box-shadow: 0px 0px 8px #DDDDDD;
      border-radius: 5px;
      transform: translateY(0px);
      transition: all .3s;
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0px 0px 10px #CCCCCC;
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

