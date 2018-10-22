<template>
  <div class="file-upload-control" >
    <p>
      <i class="fa fa-cloud-upload file-upload-control__icon" />
      <br>
      <span class="file-upload-control__title" >{{ title }}</span>
      <input
        v-bind="$attrs"
        class="file-upload-control__input"
        type="file"
        v-on="fileInputEventListeners" >
    </p>
  </div>
</template>

<script>
export default {
  name: 'FileUploadControl',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: '请点击此处上传'
    }
  },
  computed: {
    fileInputEventListeners() {
      return Object.assign({}, this.$listeners, {
        change: event => {
          const file = event.target.files[0]
          if (!file) {
            this.$emit('change', {
              dataURL: undefined, event
            })
          }
          const fr = new FileReader()
          fr.onload = res => this.$emit('change', {
            dataURL: res.target.result, event
          })
          fr.onerror = res => this.$emit('change', {
            dataURL: undefined, event
          })
          fr.readAsDataURL(file)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" >
  .file-upload-control {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px dashed #ccc;
    border-radius: 5px;
    opacity: .8;
    transition: all .3s;
    &:hover {
      opacity: 1;
    }
    &__icon {
      margin-top: -20px;
      font-size: 22px;
    }
    &__title {
      display: block;
      margin-top: 10px;
    }
    &__input {
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
