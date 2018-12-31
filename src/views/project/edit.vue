<template>
  <div class="edit-project" >
    <el-dialog
      :title="$t('project.editProject')"
      :visible.sync="dialogVisible"
      width="80%">
      <el-form
        :inline="false"
        :model="form"
        label-position="top">
        <el-row :gutter="64" >
          <el-col v-bind="formItemLayoutProps">
            <el-form-item :label="$t('project.name')" >
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps">
            <el-form-item :label="$t('project.location')" >
              <el-input v-model="form.location" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps">
            <el-form-item :label="$t('project.address')" >
              <el-cascader
                :options="areaData"
                v-model="form.address"
                expand-trigger="hover"
                style="width: 100%;"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps">
            <el-form-item :label="$t('project.description')" >
              <el-input v-model="form.description" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps">
            <el-form-item :label="$t('project.yearBuilt')" >
              <el-date-picker
                v-model="form.year_built"
                value-format="yyyy-MM-dd"
                type="date"
                style="width: 100%"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps">
            <el-form-item :label="$t('project.owner')" >
              <el-autocomplete
                v-model="form.owner_name"
                :fetch-suggestions="searchOwners"
                :placeholder="$t('searchAndSelect')"
                style="width: 100%;"
                @select="handleOwnerSelect" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps">
            <el-form-item :label="$t('project.productType')" >
              <el-select
                v-model="form.product_type"
                multiple
                style="width: 100%;">
                <el-option
                  v-for="item in productTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps">
            <el-form-item :label="$t('project.status')" >
              <el-select
                v-model="form.status"
                style="width: 100%;">
                <el-option
                  v-for="item in projectStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps">
            <el-row :gutter="12" >
              <el-col v-bind="{ span: 12 }">
                <el-form-item :label="$t('project.minPrice')" >
                  <el-input v-model.number="form.min_price" />
                </el-form-item>
              </el-col>
              <el-col v-bind="{ span: 12 }">
                <el-form-item :label="$t('project.maxPrice')" >
                  <el-input v-model.number="form.max_price" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col v-bind="formItemLayoutProps">
            <el-form-item :label="$t('project.agents')" >
              <el-select
                v-model="form.agents"
                :remote-method="searchMembers"
                :loading="searchMembersLoading"
                :placeholder="$t('searchAndSelect')"
                multiple
                filterable
                remote
                reserve-keyword
                style="width: 100%;">
                <el-option
                  v-for="item in searchedListOfMembers"
                  :key="item.id"
                  :label="item.lable"
                  :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps">
            <el-row :gutter="12" >
              <el-col :span="12" >
                <el-form-item :label="$t('project.isNewDevelopment')" >
                  <el-radio v-model="form.is_new_development" :label="1">{{ $t('yes') }}</el-radio>
                  <el-radio v-model="form.is_new_development" :label="0">{{ $t('no') }}</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="12" >
                <el-form-item :label="$t('project.isPastSuccess')" >
                  <el-radio v-model="form.is_past_success" :label="1">{{ $t('yes') }}</el-radio>
                  <el-radio v-model="form.is_past_success" :label="0">{{ $t('no') }}</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="edit-project__intro-editor" >
          <p><strong>{{ $t('project.introduction') }}</strong></p>
          <tinymce ref="tinymce" v-model="form.introduction" />
        </div>
        <div class="edit-project__upload-image-wrapper" >
          <p><strong>{{ $t('project.pictures') }}</strong></p>
          <upload-image :image-list.sync="imageList" :max-count="10" />
        </div>
        <div class="edit-project__form-actions" >
          <el-button type="info" @click="handleReset" >
            {{ $t('reset') }}
          </el-button>
          <el-button type="primary" @click="handleUpdate" >
            {{ $t('update') }}
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { searchOwnersByFullName } from '@/api/propertyOwner'
import { searchMembersByFullName } from '@/api/company'
import { uploadImage as UploadImageAPI } from '@/api/upload'

import areaDataStorage from '@/utils/areaDataStorage'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('project')

import Tinymce from '@/components/Tinymce'
import UploadImage from '@/components/UploadImage'

import { filterObjEmptyVal } from '@/utils'
export default {
  name: 'EditProject',
  components: {
    Tinymce, UploadImage
  },
  data() {
    return {
      formItemLayoutProps: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 },
      form: {
        name: '',
        location: '',
        address: [],
        introduction: '',
        description: '',
        year_built: '',
        agents: [],
        owner_id: undefined,
        product_type: [],
        is_new_development: 0,
        is_past_success: 0,
        min_price: 0,
        max_price: 0,
        status: 0,
        broadcast_pictures: []
      },
      imageList: [],
      areaData: areaDataStorage(),
      searchedListOfMembers: [],
      searchMembersLoading: false
    }
  },
  computed: {
    ...mapState([
      'editProjectDialogVisible',
      'editProjectData',
      'projectStatus'
    ]),
    ...mapState({
      productTypes(state) {
        return state.productTypes.data.map(item => {
          return {
            id: item.id,
            name: item.name
          }
        })
      }
    }),
    dialogVisible: {
      get() {
        return this.editProjectDialogVisible
      },
      set(visible) {
        this.setEditProjectDialogVisible(visible)
      }
    }
  },
  watch: {
    editProjectData(form) {
      this.dataFomatter(form)
    }
  },
  methods: {
    ...mapMutations([
      'setEditProjectDialogVisible'
    ]),
    ...mapActions([
      'updateProject'
    ]),
    /**
     * 搜索物业业主
     */
    searchOwners(keyWord, callback) {
      searchOwnersByFullName(keyWord).then(res => {
        const owners = res.data.data
        const results = owners.map(item => ({
          value: item.name + ' ' + item.surname,
          id: item.id
        }))
        callback(results)
      }).catch(() => {
        callback([])
      })
    },
    handleOwnerSelect(data) {
      this.form.owner_id = data.id
    },
    /**
     * 搜索公司成员
     */
    searchMembers(keyWord) {
      this.searchMembersLoading = true
      searchMembersByFullName(keyWord).then(res => {
        const members = res.data.data
        const results = members.map(item => ({
          lable: item.name + ' ' + item.surname,
          value: item.id
        }))
        this.searchedListOfMembers = results
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        this.searchMembersLoading = false
      })
    },
    handleReset() {
      this.dataFomatter(this.editProjectData)
    },
    /**
     * 修改数据
     */
    async handleUpdate() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      // 组装提交数据
      const formData = JSON.parse(JSON.stringify(this.form))

      // 上传所有图片
      const uploadPromises = this.imageList.map(item => {
        if (/^http/.test(item.dataURL)) return item.dataURL
        const imgFile = item.file
        return new Promise(async(resolve, reject) => {
          try {
            const imgURL = (await UploadImageAPI(imgFile)).headers.location
            resolve(imgURL)
          } catch (err) {
            reject()
          }
        })
      })
      try {
        // 等待所有图片上传完成（Promises数组）
        const imgUrls = await Promise.all(uploadPromises)
        formData.broadcast_pictures = imgUrls.map((url, index) => ({
          url, index
        }))
      } catch (err) {
        loading.close()
        this.$message({
          type: 'error',
          message: this.$t('uploadFailed')
        })
        return
      }

      try {
        await this.updateProject(
          filterObjEmptyVal(formData)
        )
        this.dialogVisible = false
        this.handleReset()
        this.$message({
          type: 'success',
          message: this.$t('updateSuccess')
        })
      } catch (err) {
        this.$message({
          type: 'error',
          message: this.$t('updateFailed')
        })
      } finally {
        loading.close()
      }
    },
    dataFomatter(form) {
      const originForm = JSON.parse(JSON.stringify(form))
      this.searchedListOfMembers = originForm.agents.data.map(item => ({
        lable: item.name + ' ' + item.surname,
        value: item.id
      }))
      setTimeout(() => {
        this.form = {
          ...originForm,
          owner_name: originForm.owner.name + ' ' + originForm.owner.surname,
          product_type: originForm.productTypes.data.map(item => item.id),
          agents: originForm.agents.data.map(item => item.id)
        }
        this.imageList = originForm.broadcast_pictures.map(item => ({
          dataURL: item.url
        }))
        if (this.$refs.tinymce) {
          this.$refs.tinymce.setContent(originForm.introduction)
        }
      }, 0)
    }
  }
}
</script>

<style scoped lang="scss" >
  .edit-project {
    &__intro-editor {
      margin-top: 22px;
    }
    &__form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 35px;
    }
  }
</style>

