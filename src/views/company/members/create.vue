<template>
  <div class="create-members-dialog" >
    <el-dialog :title="$t('company.createMembersData')" :visible.sync="dialogVisible" >
      <el-form :model="form" label-position="top" >
        <el-row :gutter="24" >
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('surname')">
              <el-input v-model="form.surname" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('name')">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('email')">
              <el-input v-model="form.email" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('phone')">
              <el-input v-model="form.phone" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.googlePlusHomePage')">
              <el-input v-model="form.google_plus_homepage" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.linkinHomePage')">
              <el-input v-model="form.linkin_homepage" />
            </el-form-item>
          </el-col>
          <el-col v-bind="biggerFormItemLayoutProps" >
            <el-form-item :label="$t('company.position')">
              <el-select v-model="form.positions" multiple >
                <el-option-group
                  v-for="(item, index) in companyDepartments"
                  :key="index"
                  :label="item.name">
                  <el-option
                    v-for="(position, index) in item.positions.data"
                    :key="index"
                    :label="position.name"
                    :value="position.id"/>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="biggerFormItemLayoutProps" >
            <el-form-item :label="$t('uploadPhoto')">
              <upload-image :image-list.sync="photoList" />
            </el-form-item>
          </el-col>
          <el-col v-bind="biggerFormItemLayoutProps" style="margin-top: 20px;" >
            <el-form-item :label="$t('company.description')">
              <tinymce v-model="form.introduction" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="create-members-dialog__form-actions" >
          <el-button type="primary" @click="handleCreateMember" >{{ $t('create') }}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import UploadImage from '@/components/UploadImage'
import { uploadImage as uploadImageAPI } from '@/api/upload'
import { filterObjEmptyVal } from '@/utils'
import Tinymce from '@/components/Tinymce'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('company')
export default {
  name: 'CreateMembersDialog',
  components: {
    UploadImage, Tinymce
  },
  data() {
    return {
      formItemLayoutProps: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      biggerFormItemLayoutProps: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      photoList: [],
      form: {
        surname: '',
        name: '',
        photo: '',
        phone: '',
        email: '',
        positions: [],
        google_plus_homepage: '',
        linkin_homepage: '',
        introduction: ''
      }
    }
  },
  computed: {
    ...mapState([
      'companyDepartments'
    ]),
    dialogVisible: {
      get() {
        return this.$store.state.company.createMembersDialogVisible
      },
      set(visible) {
        this.setCreateMemberDialogVisible(visible)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setCreateMemberDialogVisible'
    ]),
    ...mapActions([
      'createCompanyMember'
    ]),
    handleCreateMember() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // 调用图片上传API
      uploadImageAPI(this.photoList[0].file).then(res => {
        return res.headers.location
      }).then(photo => {
        this.form.photo = photo
        const form = filterObjEmptyVal(this.form)
        // 创建公司成员
        return this.createCompanyMember(form)
      }).then(() => {
        this.dialogVisible = false
        this.$message({
          type: 'success',
          message: this.$t('createSuccess')
        })
      }).finally(() => {
        loading.close()
      })
    }
  }
}
</script>

<style lang="scss" scoped >
  .create-members-dialog {
    &__form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 30px;
    }
  }
  .el-select {
    width: 100%;
  }
</style>

