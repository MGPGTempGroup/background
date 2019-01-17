<template>
  <div class="personal-info" >
    <el-card>
      <div slot="header" >
        <h2 style="margin: 0px;" >{{ $t('personal.title') }}</h2>
      </div>
      <el-row :gutter="48" class="personal-info__wrapper" >
        <el-col v-bind="{ xs: 24, sm: 8, md: 6, lg: 4, xl: 4}">
          <div class="personal-info__avatar" >
            <img :src="user.avatar || defaultAvatar" @error="handleImgError">
            <div class="personal-info__avatar-mask" >
              <el-button type="primary" @click="openChangeAvatarDialog" >
                {{ $t('changeAvatar') }}
              </el-button>
            </div>
          </div>
        </el-col>
        <el-col v-bind="{ xs: 24, sm: 16, md: 18, lg: 20, xl: 20}" >
          <el-row :gutter="24" class="personal-info__text" >
            <el-col v-bind="{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }" tag="dl" >
              <!-- 编号 -->
              <dt> {{ $t('id') }} </dt>
              <dd> {{ user.id }} </dd>
              <!-- 名称 -->
              <dt> {{ $t('personal.name') }} </dt>
              <dd> {{ user.name }}</dd>
              <!-- 邮箱 -->
              <dt> {{ $t('email') }} </dt>
              <dd> {{ user.email }} </dd>
            </el-col>
            <el-col v-bind="{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }" tag="dl" >
              <!-- 创建与修改时间 -->
              <dt> {{ $t('createdAt') }} </dt>
              <dd> {{ user.created_at }} </dd>
              <dt> {{ $t('updatedAt') }} </dt>
              <dd> {{ user.updated_at }} </dd>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <!-- 头像上传对话框 -->
    <el-dialog
      :title="$t('changeAvatar')"
      :visible.sync="changeAvatarDialogVisible"
      class="change-avatar-dialog">
      <upload-image :image-list.sync="uploadImageList" :max-count="1" :cropper-ratio="[1,1]" />
      <div class="change-avatar-dialog__actions" >
        <el-button @click="changeAvatarDialogVisible = false" >
          {{ $t('close') }}
        </el-button>
        <el-button type="primary" @click="updateAvatar" >
          {{ $t('update') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UploadImage from '@/components/UploadImage'
import { uploadImage as UploadImageAPI } from '@/api/upload'
import defaultAvatar from '@/assets/defaultAvatar.png'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Personal',
  components: {
    UploadImage
  },
  data() {
    return {
      defaultAvatar,
      changeAvatarDialogVisible: false,
      uploadImageList: []
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'UpdateUserInfo'
    ]),
    /**
     * Avatar img元素error事件处理方法
     *
     * 触发error事件时（图片加载失败）使用defaultAvatar作为默认头像
     */
    handleImgError(event) {
      event.target.src = defaultAvatar
    },
    /**
     * 打开修改头像对话框
     */
    openChangeAvatarDialog() {
      const userAvatar = this.user.avatar
      if (!userAvatar) {
        this.changeAvatarDialogVisible = true
        return
      }
      // 判断img url是否有效
      const imgUrlValidity = new Promise((resolve, reject) => {
        const img = new Image()
        img.onerror = () => reject()
        img.onload = () => resolve(userAvatar)
        img.src = userAvatar
      })
      imgUrlValidity
        .then(url => {
          this.uploadImageList = [{ dataURL: url }]
        })
        .catch(() => {
          // ...
        })
        .finally(() => {
          this.changeAvatarDialogVisible = true
        })
    },
    /**
     * 更新头像
     */
    updateAvatar() {
      const imgItem = this.uploadImageList[0]
      if (!imgItem || !imgItem.file) {
        return
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // 请求图片上传接口
      const avatarFile = imgItem.file
      UploadImageAPI(avatarFile)
        .then(async(res) => {
          // 上传成功后请求用户信息修改接口
          const avatarURL = res.headers.location
          try {
            await this.UpdateUserInfo({ avatar: avatarURL })
          } catch (err) {
            this.$message({
              type: 'error',
              message: this.$t('updateFailed')
            })
            this.changeAvatarDialogVisible = false
            return
          }
          this.$message({
            type: 'success',
            message: this.$t('updateSuccess')
          })
          this.changeAvatarDialogVisible = false
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: this.$t('uploadFailed')
          })
        })
        .finally(() => {
          loading.close()
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/dl.scss';
.personal-info {
  padding: 20px;
  &__wrapper {
    display: flex;
    padding: 10px;
  }
  &__avatar {
    position: relative;
    top: 0px;
    left: 0px;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    border-radius: 50% / 50%;
    line-height: 0px;
    > img {
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
    }
    &-mask {
      position: absolute;
      left: 0px;
      top: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.6);
      opacity: 0;
      transition: opacity .5s;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
  }
  &__text {
  }
  .change-avatar-dialog {
    &__actions {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>

<style scoped >
  @import url('font-awesome/css/font-awesome.min.css');
</style>
