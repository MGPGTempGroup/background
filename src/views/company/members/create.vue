<template>
  <div class="create-members-dialog" >
    <el-dialog :title="$t('company.createMembersData')" :visible.sync="visible" >
      <el-form :model="form" label-position="top" >
        <el-row :gutter="24" >
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
              <el-input v-model="form.googlePlusHomePage" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.linkinHomePage')">
              <el-input v-model="form.linkinHomePage" />
            </el-form-item>
          </el-col>
          <el-col v-bind="biggerFormItemLayoutProps" >
            <el-form-item :label="$t('company.position')">
              <el-select v-model="form.position" multiple >
                <el-option-group
                  v-for="(item, index) in positionDivision"
                  :key="index"
                  :label="item.department">
                  <el-option
                    v-for="(position, index) in item.positions"
                    :key="index"
                    :label="position.name"
                    :value="position.name"/>
                </el-option-group>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="biggerFormItemLayoutProps" >
            <el-form-item :label="$t('uploadPhoto')">
              <upload-image :image-list.sync="form.photoList" />
            </el-form-item>
          </el-col>
          <el-col v-bind="biggerFormItemLayoutProps" style="margin-top: 20px;" >
            <el-form-item :label="$t('company.description')">
              <tinymce v-model="form.description" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="create-members-dialog__form-actions" >
          <el-button type="primary" >{{ $t('create') }}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import UploadImage from '@/components/UploadImage'
import Tinymce from '@/components/tinymce'
const { mapMutations } = createNamespacedHelpers('company')
export default {
  name: 'CreateMembersDialog',
  components: {
    UploadImage, Tinymce
  },
  data() {
    return {
      formItemLayoutProps: { xs: 24, sm: 24, md: 12, lg: 12, xl: 8 },
      biggerFormItemLayoutProps: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      form: { photoList: [], description: '' },
      positionDivision: [
        {
          id: 1,
          department: 'Project Sales',
          positions: [
            {
              id: 1,
              name: 'Project Sales Director'
            },
            {
              id: 2,
              name: 'Project Sales Coordinator'
            }
          ]
        },
        {
          id: 2,
          department: 'Property Management',
          positions: [
            {
              id: 1,
              name: 'Property Management Operations Manager'
            },
            {
              id: 2,
              name: 'Team Leader'
            }
          ]
        }
      ]
    }
  },
  computed: {
    visible: {
      get() {
        return this.$store.state.company.createMembersDialogVisible
      },
      set(visible) {
        this.toggleCreateMembersDialogVisible({ visible })
      }
    }
  },
  methods: {
    ...mapMutations([
      'toggleCreateMembersDialogVisible'
    ])
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

