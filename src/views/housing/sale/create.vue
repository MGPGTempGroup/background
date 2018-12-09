<template>
  <div class="create-sale-housing">
    <el-dialog
      :title="$t('house.createSaleHousingData')"
      :visible.sync="visible"
      fullscreen>
      <el-form :inline="false" :model="form" label-position="top" >
        <el-row :gutter="64" >
          <el-col v-bind="formChunkLayoutProp" >
            <!-- 房屋名称 -->
            <el-form-item :label="$t('house.name')">
              <el-input v-model="form.name" />
            </el-form-item>
            <!-- 房屋简短介绍 -->
            <el-form-item :label="$t('house.briefIntroduction')">
              <el-input v-model="form.brief_introduction" />
            </el-form-item>
            <!-- 地区选择 -->
            <el-form-item :label="$t('house.address')" >
              <el-cascader
                :options="areaData"
                v-model="form.address"
                expand-trigger="hover"
                popper-class="address-selector"
                style="width: 100%"/>
            </el-form-item>
            <!-- 郊区名称 -->
            <el-form-item :label="$t('house.suburbName')">
              <el-input v-model="form.suburb_name" />
            </el-form-item>
            <!-- 邮编 -->
            <el-form-item :label="$t('house.postCode')">
              <el-input v-model="form.post_code" type="number" />
            </el-form-item>
            <!-- 是否为最新开发房产 -->
            <!-- <el-form-item :label="$t('house.isNewDevelopment')" >
              <el-radio v-model="form.is_new_development" label="1">
                {{ $t('yes') }}
              </el-radio>
              <el-radio v-model="form.is_new_development" label="0">
                {{ $t('no') }}
              </el-radio>
            </el-form-item> -->
          </el-col>
          <el-col v-bind="formChunkLayoutProp" >
            <!-- 街道名称 -->
            <el-form-item :label="$t('house.streetName')">
              <el-input v-model="form.street_name" />
            </el-form-item>
            <!-- 街道号码 -->
            <el-form-item :label="$t('house.streetCode')">
              <el-input v-model="form.street_code" />
            </el-form-item>
            <!-- 门牌号 -->
            <el-form-item :label="$t('house.houseNumber')">
              <el-input v-model="form.house_number" />
            </el-form-item>
            <!-- 详细地址 -->
            <el-form-item :label="$t('house.addressDescription')">
              <el-input v-model="form.address_description" />
            </el-form-item>
            <!-- 地图坐标 -->
            <el-form-item :label="$t('house.mapCoordinates')">
              <el-input v-model="form.map_coordinates" />
            </el-form-item>
            <!-- 可用日期 -->
            <el-form-item :label="$t('house.availableDate')" >
              <el-date-picker
                v-model="form.available_date_range"
                :start-placeholder="$t('house.startDate')"
                :end-placeholder="$t('house.endDate')"
                :default-time="['12:00:00']"
                value-format="yyyy-MM-dd hh:mm:ss"
                type="datetimerange"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formChunkLayoutProp" >
            <!-- 相关属性：卧室、卫生间、车库、车位数量等... -->
            <el-row>
              <el-col v-bind="{ xs: 24, sm: 12, md: 12, lg: 12, xl: 8 }" >
                <el-form-item :label="$t('house.bedrooms')" >
                  <el-input-number v-model="form.bedrooms" controls-position="right" />
                </el-form-item>
              </el-col>
              <el-col v-bind="{ xs: 24, sm: 12, md: 12, lg: 12, xl: 8 }" >
                <el-form-item :label="$t('house.bathrooms')" >
                  <el-input-number v-model="form.bathrooms" controls-position="right" />
                </el-form-item>
              </el-col>
              <el-col v-bind="{ xs: 24, sm: 12, md: 12, lg: 12, xl: 8 }" >
                <el-form-item :label="$t('house.carSpaces')" >
                  <el-input-number v-model="form.car_spaces" controls-position="right" />
                </el-form-item>
              </el-col>
              <el-col v-bind="{ xs: 24, sm: 12, md: 12, lg: 12, xl: 8 }" >
                <el-form-item :label="$t('house.lockupGarages')" >
                  <el-input-number v-model="form.lockup_garages" controls-position="right" />
                </el-form-item>
              </el-col>
              <el-col v-bind="{ xs:24, sm: 12, md: 12, lg: 12, xl: 8 }" >
                <el-form-item :label="$t('house.floorSpace')" >
                  <el-input v-model="form.floor_space" type="number" style="width: 100px;" />
                  &nbsp;m<sup>2</sup>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 租金区间 -->
            <el-form-item :label="$t('house.price')" >
              <el-input v-model="form.min_price" style="width: 40%;" type="number" >
                <i slot="prefix" class="fa fa-dollar" />
              </el-input>
              &nbsp; ~ &nbsp;
              <el-input v-model="form.max_price" style="width: 40%;" type="number" >
                <i slot="prefix" class="fa fa-dollar" />
              </el-input>
            </el-form-item>
            <el-row :gutter="24" >
              <el-col v-bind="{ xs:24, sm: 24, md: 12, lg: 12, xl: 12 }" >
                <!-- 物主 -->
                <el-form-item :label="$t('house.owner')" >
                  <el-autocomplete
                    v-model="form.owner_name"
                    :fetch-suggestions="searchOwners"
                    style="width: 100%;"
                    @select="handleOwnerSelect"
                  />
                </el-form-item>
              </el-col>
              <el-col v-bind="{ xs:24, sm: 24, md: 24, lg: 12, xl: 12 }" >
                <!-- 成员代理 -->
                <el-form-item :label="$t('house.agent')" >
                  <el-select
                    v-model="form.agents"
                    :remote-method="searchMembers"
                    :loading="searchMembersLoading"
                    multiple
                    filterable
                    remote
                    reserve-keyword>
                    <el-option
                      v-for="(item, index) in searchedListOfMembers"
                      :key="index"
                      :label="item.lable"
                      :value="item.value"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24" >
              <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12 }" >
                <!-- 物业类型 -->
                <el-form-item :label="$t('house.propertyTypes')" >
                  <el-select
                    v-model="form.property_type"
                    multiple >
                    <el-option
                      v-for="item in availablePropertyType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col v-bind="{ xs: 24, sm: 24, md: 12, lg: 12, xl: 12 }" >
                <!-- 目前状态 -->
                <el-form-item :label="$t('whetherToDisplay')" >
                  <el-radio v-model="form.show" :label="1" >{{ $t('show') }}</el-radio>
                  <el-radio v-model="form.show" :label="0" >{{ $t('hide') }}</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="24" >
              <el-col v-bind="{ xs: 24, sm: 24, md: 12, lg: 12, xl: 12 }" >
                <el-form-item :label="$t('house.constructedIn')" >
                  <el-date-picker
                    v-model="form.constructed_in"
                    type="datetime"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    style="width: 100%;" />
                </el-form-item>
              </el-col>
              <el-col v-bind="{ xs: 24, sm: 24, md: 12, lg: 12, xl: 12 }" >
                <el-form-item :label="$t('house.builtIn')" >
                  <el-date-picker
                    v-model="form.built_in"
                    type="datetime"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    style="width: 100%;" />
                </el-form-item>
              </el-col>
            </el-row> -->
            <!-- <el-form-item :label="$t('house.upcomingInspections')" >
              <el-date-picker
                v-model="form.upcoming_inspections_date_range"
                :start-placeholder="$t('house.startDate')"
                :end-placeholder="$t('house.endDate')"
                :default-time="['12:00:00']"
                value-format="yyyy-MM-dd hh:mm:ss"
                type="datetimerange"/>
            </el-form-item> -->
          </el-col>
        </el-row>
        <div class="create-sale-housing__details-editor" >
          <p><strong>{{ $t('details') }}</strong></p>
          <tinymce ref="tinymce" v-model="form.details" />
        </div>
        <div class="create-sale-housing__upload-image-wrapper" >
          <p>
            <strong>
              {{ $t('house.housingPicture') }}
            </strong>
          </p>
          <upload-image :image-list.sync="imageList" :max-count="10" />
        </div>
        <div class="create-sale-housing__upload-pdf-wrapper" >
          <p>
            <strong>
              {{ $t('house.infomationStatement') }}
            </strong>
          </p>
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
        </div>
        <div class="create-sale-housing__form-actions" >
          <el-button type="info" @click="handleReset" >
            {{ $t('reset') }}
          </el-button>
          <el-button type="primary" @click="handleCreate" >
            {{ $t('create') }}
          </el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import tinymce from '@/components/Tinymce'
import UploadImage from '@/components/UploadImage'

import { searchOwnersByFullName } from '@/api/propertyOwner'
import { searchMembersByFullName } from '@/api/company'
import { uploadImage as UploadImageAPI } from '@/api/upload'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('house')

import { filterObjEmptyVal } from '@/utils'
import areaDataStorage from '@/utils/areaDataStorage'
import { getToken } from '@/utils/auth'
export default {
  name: 'CreateSaleHouse',
  components: {
    tinymce, UploadImage
  },
  data() {
    return {
      areaData: areaDataStorage(),
      formChunkLayoutProp: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 },
      imageList: [],
      pdfList: [],
      uploadPDFHeaders: {
        'Authorization': getToken()
      },
      uploadPDFAction: `${process.env.BASE_API}/pdfs`,
      form: {
        details: '',
        brief_introduction: '',
        address: [],
        agents: [],
        owner_name: '',
        property_type: [],
        available_date_range: [],
        upcoming_inspections_date_range: []
      },
      searchedListOfMembers: [],
      searchMembersLoading: false
    }
  },
  computed: {
    ...mapState([
      'saleCreateDialogVisible',
      'availablePropertyType'
    ]),
    visible: {
      get() {
        return this.saleCreateDialogVisible
      },
      set(visible) {
        this.setSaleCreateDialogVisible(visible)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setSaleCreateDialogVisible'
    ]),
    ...mapActions([
      'createSaleHouse'
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
    /**
     * 物业业主选择后的回调
     */
    handleOwnerSelect(data) {
      this.form.owner_name = data.value
      this.form.owner_id = data.id
    },
    /**
     * 预览上传的pdf文件
     */
    handlePDFPreview(file) {
      window.open(file.url, 'Preview')
    },
    /**
     * 删除上传的pdf文件
     */
    handlePDFRemove(a) {
      this.form.information_statement = undefined
    },
    /**
     * pdf文件上传成功时的钩子
     */
    handleUploadPDFSuccess(response) {
      this.form.information_statement = response.url
    },
    handleUploadPDFError() {
      this.$message({
        type: 'error',
        message: this.$t('uploadFailed')
      })
    },
    /**
     * 表单重置
     */
    handleReset() {
      this.form = {
        details: '',
        brief_introduction: '',
        address: [],
        agents: [],
        owner_name: '',
        property_type: [],
        available_date_range: [],
        upcoming_inspections_date_range: []
      }
      this.$refs.tinymce.setContent('')
      this.imageList = []
      this.pdfList = []
    },
    /**
     * 创建数据
     */
    async handleCreate() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      // 组装提交数据
      const originFormData = JSON.parse(JSON.stringify(this.form))
      const formData = {}
      Object.keys(originFormData).forEach(key => {
        switch (key) {
          case 'available_date_range':
            formData['available_start_date'] = originFormData[key][0]
            formData['available_end_date'] = originFormData[key][1]
            break
          case 'upcoming_inspections_date_range':
            formData['upcoming_inspections_start_date'] = originFormData[key][0]
            formData['upcoming_inspections_end_date'] = originFormData[key][1]
            break
          default:
            formData[key] = originFormData[key]
            break
        }
      })

      // 上传所有图片
      const uploadPromises = this.imageList.map(item => {
        const imgFile = item.file
        const dataURL = item.dataURL
        return new Promise(async(resolve, reject) => {
          try {
            if (/^http/.test(dataURL)) resolve(dataURL)
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

      // 调用创建Action
      this.createSaleHouse(filterObjEmptyVal(formData))
        .then(() => {
          this.visible = false
          this.handleReset()
          this.$message({
            type: 'success',
            message: this.$t('createSuccess')
          })
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: this.$t('createFailed')
          })
        })
        .finally(() => {
          loading.close()
        })
    }
  }
}
</script>

<style scoped lang="scss" >
  .create-sale-housing {
    &__form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 35px;
    }
    &__details-editor {
      margin-top: 22px;
    }
    &__upload-pdf-wrapper {
      padding-top: 1px;
      margin-top: 22px;
    }
    // rewrite
    .el-input_prefix {
      left: 12px;
    }
  }
</style>
