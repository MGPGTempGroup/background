<template>
  <div class="personal-info" >
    <el-card>
      <div slot="header" >
        <h2 style="margin: 0px;" >{{ $t('personal.title') }}</h2>
        <el-button type="primary" class="personal-info__edit-btn" @click="openEditDialog" >
          {{ $t('editInfo') }}
        </el-button>
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
              <!-- <dt> {{ $t('personal.memberInfo') }} </dt>
              <dd>
                <el-button
                  v-if="typeof user.member === 'object'"
                  type="text"
                  @click="openMemberDetailsDialog" >
                  {{ [user.member.name, user.member.surname].filter(Boolean).join(' ') }}
                </el-button>
              </dd> -->
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
    <!-- 成员详情对话框 -->
    <!-- <company-member-details-dialog/> -->
    <!-- 信息编辑对话框 -->
    <el-dialog
      :visible.sync="editDialogVisible"
      :title="$t('editInfo')"
      width="300px"
      class="edit-info-dialog">
      <el-form :model="editFormData" label-position="top" >
        <el-form-item :label="$t('personal.name')" >
          <el-input v-model="editFormData.name" />
        </el-form-item>
        <el-form-item :label="$t('email')" >
          <el-input v-model="editFormData.email" />
        </el-form-item>
        <div class="edit-info-dialog__actions" >
          <el-button type="info" @click="resetEditForm">
            {{ $t('reset') }}
          </el-button>
          <el-button type="primary" @click="updateInfo" >
            {{ $t('update') }}
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import CompanyMemberDetailsDialog from '@/views/company/members/details'
import UploadImage from '@/components/UploadImage'
import { uploadImage as UploadImageAPI } from '@/api/upload'
import defaultAvatar from '@/assets/defaultAvatar.png'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Personal',
  components: {
    UploadImage,
    CompanyMemberDetailsDialog
  },
  data() {
    return {
      defaultAvatar,
      changeAvatarDialogVisible: false,
      uploadImageList: [],
      editDialogVisible: false,
      editFormData: {
        name: undefined,
        email: undefined
      }
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  watch: {
    user: {
      deep: true,
      immediate: true,
      handler: function(user) {
        this.editFormData = {
          name: user.name,
          email: user.email
        }
      }
    }
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
    },
    /**
     * 打开编辑信息对话框
     */
    openEditDialog() {
      this.editDialogVisible = true
    },
    /**
     * 更新个人信息
     */
    async updateInfo() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      try {
        await this.UpdateUserInfo({
          name: this.editFormData.name,
          email: this.editFormData.email
        })
      } catch (err) {
        this.$message({
          type: 'error',
          message: this.$t('updateFailed')
        })
      } finally {
        loading.close()
      }
      this.$message({
        type: 'success',
        message: this.$t('updateSuccess')
      })
      this.editDialogVisible = false
    },
    /**
     * 重置表单
     */
    resetEditForm() {
      this.editFormData = {
        name: this.user.name,
        email: this.user.email
      }
    }
    /**
     * 打开该管理员对应的成员对话框
     */
    // openMemberDetailsDialog() {
    //   this.$store.commit('company/setMemberDetailsData', this.user.member)
    //   this.$store.commit('company/setMemberDetailsDialogVisible', true)
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/dl.scss';
.personal-info {
  padding: 20px;
  &__edit-btn {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
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
.edit-info-dialog {
  .el-dialog__body {
    padding-top: 10px;
  }
  &__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>

<style scoped>
  @import url('font-awesome/css/font-awesome.min.css');
</style>

<style lang="scss" >
.personal-info {
  .el-card__header {
    position: relative;
  }
}
.edit-info-dialog {
  .el-dialog__body {
    padding-top: 10px;
  }
}
</style>
