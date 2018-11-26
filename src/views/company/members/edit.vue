<template>
  <div class="edit-members-dialog" >
    <el-dialog :title="$t('company.editMembersData')" :visible.sync="visible" >
      <el-form v-if="Object.keys(form).length !== 0" :model="form" label-position="top" >
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
        <div class="edit-members-dialog__form-actions" >
          <el-button type="info" @click="handleReset" >{{ $t('reset') }}</el-button>
          <el-button type="primary" @click="handleUpdateMember" >{{ $t('update') }}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/upload'
import { deepClone, filterObjEmptyVal } from '@/utils'
import UploadImage from '@/components/UploadImage'
import Tinymce from '@/components/tinymce'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('company')
export default {
  name: 'EditMembersDialog',
  components: {
    UploadImage, Tinymce
  },
  data() {
    return {
      formItemLayoutProps: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      biggerFormItemLayoutProps: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      photoList: [],
      form: {
        id: 1,
        surname: '',
        name: '',
        email: '',
        phone: '',
        photo: '',
        introduction: null,
        google_plus_homepage: '',
        linkin_homepage: null,
        positions: [],
        created_at: '',
        updated_at: ''
      }
    }
  },
  computed: {
    ...mapState([
      'companyDepartments',
      'memberEditForm'
    ]),
    visible: {
      get() {
        return this.$store.state.company.editMembersDialogVisible
      },
      set(visible) {
        this.setEditMemberDialogVisible(visible)
      }
    }
  },
  watch: {
    memberEditForm(form) {
      if (form.photo) this.photoList = [{ dataURL: form.photo }]
      this.form = deepClone(form)
    }
  },
  methods: {
    ...mapMutations([
      'setEditMemberDialogVisible'
    ]),
    ...mapActions([
      'updateCompanyMember'
    ]),
    /**
     * 处理成员信息更新
     */
    async handleUpdateMember() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let form = deepClone(this.form)
      if (this.photoList[0].file) {
        try {
          const res = await uploadImage(this.photoList[0].file)
          form.photo = res.headers.location
        } catch (e) {
          this.$message({
            type: 'error',
            message: this.$t('uploadFailed')
          })
        }
      }
      form = filterObjEmptyVal(form)
      this.updateCompanyMember(form).then((res) => {
        this.visible = false
        this.$message({
          type: 'success',
          message: this.$t('updateSuccess')
        })
      }).finally(() => {
        loading.close()
      })
    },
    /**
     * 处理表单重置
     */
    handleReset() {
      const originForm = deepClone(this.memberEditForm)
      this.photoList = [{ dataURL: originForm.photo }]
      this.form = originForm
    }
  }
}
</script>

<style lang="scss" scoped >
  .edit-members-dialog {
    &__form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
  }
  .el-select {
    width: 100%;
  }
</style>
