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
            <!-- 视频嵌入代码 -->
            <el-form-item :label="$t('house.videoEmbeddedCode')">
              <el-input
                :rows="4"
                v-model="form.video_embedded_code"
                type="textarea" />
            </el-form-item>
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
                :default-time="['00:00:00', '23:59:59']"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"/>
            </el-form-item>
            <el-form-item :label="$t('house.upcomingInspectionDatetime')" >
              <multiple-date-picker v-model="form.upcoming_inspection_datetime" />
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
                    :placeholder="$t('searchAndSelect')"
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
                    :placeholder="$t('searchAndSelect')"
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
                      :label="$t(`propertyType.${item.name}`)"
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
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%;" />
                </el-form-item>
              </el-col>
              <el-col v-bind="{ xs: 24, sm: 24, md: 12, lg: 12, xl: 12 }" >
                <el-form-item :label="$t('house.builtIn')" >
                  <el-date-picker
                    v-model="form.built_in"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    style="width: 100%;" />
                </el-form-item>
              </el-col>
            </el-row> -->
            <!-- <el-form-item :label="$t('house.upcomingInspections')" >
              <el-date-picker
                v-model="form.upcoming_inspections_date_range"
                :start-placeholder="$t('house.startDate')"
                :end-placeholder="$t('house.endDate')"
                :default-time="['00:00:00', '23:59:59']"
                value-format="yyyy-MM-dd HH:mm:ss"
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
              {{ $t('house.housingPictureUpload') }}
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
          <upload-PDF :pdf-list.sync="pdfList"/>
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
import UploadPDF from '@/components/UploadPDF'
import MultipleDatePicker from '@/components/MultipleDatePicker'

import { searchOwnersByFullName } from '@/api/propertyOwner'
import { searchMembersByFullName } from '@/api/company'
import { uploadImage as UploadImageAPI } from '@/api/upload'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('house')

import { filterObjEmptyVal } from '@/utils'
import areaDataStorage from '@/utils/areaDataStorage'
export default {
  name: 'CreateSaleHouse',
  components: {
    tinymce, UploadImage, UploadPDF, MultipleDatePicker
  },
  data() {
    return {
      areaData: areaDataStorage(),
      formChunkLayoutProp: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 },
      imageList: [],
      pdfList: [],
      form: {
        details: '',
        brief_introduction: '',
        address: [],
        agents: [],
        owner_name: '',
        property_type: [],
        available_date_range: [],
        upcoming_inspection_datetime: [],
        video_embedded_code: '',
        show: 1
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
        upcoming_inspection_datetime: [],
        video_embedded_code: '',
        show: 1
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
      if (this.pdfList.length) {
        try {
          formData.information_statement = this.pdfList[0].response.url
        } catch (err) {
          // ...
        }
      }

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
    &__upload-image-wrapper {
      padding-top: 1px;
      margin-top: 20px;
    }
    &__upload-pdf-wrapper {
      padding-top: 1px;
      margin-top: 10px;
    }
  }
</style>

<style lang="scss" >
  .create-sale-housing {
   .el-input__prefix {
      left: 12px;
    }
    .el-select {
      width: 100%;
    }
  }
</style>

