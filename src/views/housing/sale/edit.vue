<template>
  <div class="edit-sale-house">
    <el-dialog
      :title="$t('house.editSaleHousingData')"
      :visible.sync="visible"
      fullscreen>
      <h3>{{ $t('house.notFillSomeFieldTips') }}</h3>
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
                style="width: 100%"
                @change="handleAddressSelect" />
            </el-form-item>
            <!-- 郊区名称 -->
            <el-form-item :label="$t('house.suburbName')">
              <el-input v-model="form.suburb_name" />
            </el-form-item>
            <!-- 邮编 -->
            <el-form-item :label="$t('house.postCode')">
              <el-input v-model="form.post_code" type="number" />
            </el-form-item>
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
                :default-time="['12:00:00']"
                value-format="yyyy-MM-dd hh:mm:ss"
                type="datetimerange"/>
            </el-form-item>
            <el-form-item :label="$t('house.upcomingInspectionDatetime')" >
              <multiple-date-picker v-model="form.upcoming_inspection_datetime" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formChunkLayoutProp" >
            <!-- 相关属性：卧室、卫生间、车库、车位数量等... -->
            <el-row>
              <el-col v-bind="{ xs: 24, sm: 12, md: 12, lg: 8, xl: 8 }" >
                <el-form-item :label="$t('house.bedrooms')" >
                  <el-input-number v-model.number="form.bedrooms" controls-position="right" />
                </el-form-item>
              </el-col>
              <el-col v-bind="{ xs: 24, sm: 12, md: 12, lg: 8, xl: 8 }" >
                <el-form-item :label="$t('house.bathrooms')" >
                  <el-input-number v-model.number="form.bathrooms" controls-position="right" />
                </el-form-item>
              </el-col>
              <el-col v-bind="{ xs: 24, sm: 12, md: 12, lg: 8, xl: 8 }" >
                <el-form-item :label="$t('house.carSpaces')" >
                  <el-input-number v-model.number="form.car_spaces" controls-position="right" />
                </el-form-item>
              </el-col>
              <el-col v-bind="{ xs: 24, sm: 12, md: 12, lg: 8, xl: 8 }" >
                <el-form-item :label="$t('house.lockupGarages')" >
                  <el-input-number v-model.number="form.lockup_garages" controls-position="right" />
                </el-form-item>
              </el-col>
              <el-col v-bind="{ xs:24, sm: 12, md: 12, lg: 8, xl: 8 }" >
                <el-form-item :label="$t('house.floorSpace')" >
                  <el-input v-model.number="form.floor_space" type="number" style="width: 100px;" />
                  &nbsp;m<sup>2</sup>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 租金区间 -->
            <el-form-item :label="$t('house.price')" >
              <el-input v-model="form.min_price" style="width: 40%;" type="number" />
              &nbsp; ~ &nbsp;
              <el-input v-model="form.max_price" style="width: 40%;" type="number" />
            </el-form-item>
            <el-row :gutter="24" >
              <el-col v-bind="{ xs:24, sm: 24, md: 24, lg: 12, xl: 12 }" >
                <!-- 物主 -->
                <el-form-item :label="$t('house.owner')" >
                  <el-autocomplete
                    v-model="owner"
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
              <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 12, xl: 12 }" >
                <!-- 目前状态 -->
                <el-form-item :label="$t('whetherToDisplay')" >
                  <el-select v-model="form.show">
                    <el-option
                      v-for="(item, index) in houseStatus"
                      :key="index"
                      :label="item.label"
                      :value="item.value" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="edit-sale-house__details-editor" >
          <p><strong>{{ $t('details') }}</strong></p>
          <tinymce ref="tinymce" v-model="form.details" />
        </div>
        <div class="edit-sale-house__upload-image-wrapper" >
          <p><strong>{{ $t('house.housingPicture') }}</strong></p>
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
        <div class="edit-sale-house__form-actions" >
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
import tinymce from '@/components/Tinymce'
import UploadImage from '@/components/UploadImage'
import UploadPDF from '@/components/UploadPDF'
import MultipleDatePicker from '@/components/MultipleDatePicker'

import { filterObjEmptyVal } from '@/utils'
import areaDataStorage from '@/utils/areaDataStorage'

import { searchOwnersByFullName } from '@/api/propertyOwner'
import { searchMembersByFullName } from '@/api/company'
import { uploadImage as uploadImageAPI } from '@/api/upload'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('house')
export default {
  name: 'EditSaleHouse',
  components: {
    tinymce, UploadImage, UploadPDF, MultipleDatePicker
  },
  data() {
    return {
      areaData: areaDataStorage(),
      formChunkLayoutProp: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 },
      imageList: [],
      pdfList: [],
      owner: null,
      form: {
        details: '',
        brief_introduction: '',
        address: [],
        property_type: [],
        available_date_range: [],
        members: [],
        show: 1,
        video_embedded_code: ''
      },
      houseStatus: [
        {
          label: this.$t('show'),
          value: 1
        },
        {
          label: this.$t('hide'),
          value: 0
        }
      ],
      searchedListOfMembers: [],
      searchMembersLoading: false
    }
  },
  computed: {
    ...mapState([
      'availablePropertyType',
      'saleEditDialogVisible',
      'saleEditForm'
    ]),
    visible: {
      get() {
        return this.saleEditDialogVisible
      },
      set(visible) {
        this.setSaleEditDialogVisible(visible)
      }
    }
  },
  watch: {
    // 数据格式化，将当前编辑数据格式化适用于表单绑定的数据
    saleEditForm(form) {
      this.dataFormatter(form)
    }
  },
  methods: {
    ...mapMutations([
      'setSaleEditDialogVisible'
    ]),
    ...mapActions([
      'updateSaleHouse'
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
    handleAddressSelect(val) {
      console.log(val)
    },
    handleOwnerSelect(item) {
      this.form.owner_id = item.id
    },
    /**
     * 更改出售房屋数据
     */
    async handleUpdate() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      // 上传所有图片，返回一个Promises数组
      let imageUrls = []
      const uploadPromises = this.imageList.map(item => {
        if (/^http/.test(item.dataURL)) {
          return item.dataURL
        }
        return new Promise(async(resolve, reject) => {
          try {
            const imgURL = (await uploadImageAPI(item.file)).headers.location
            resolve(imgURL)
          } catch (err) {
            reject()
          }
        })
      })

      // 取得上传的所有url地址
      try {
        imageUrls = await Promise.all(uploadPromises)
      } catch (err) {
        loading.close()
        this.$message({
          type: 'error',
          message: this.$t('uploadFailed')
        })
        return
      }

      // 组装表单参数数据
      const originForm = JSON.parse(JSON.stringify((this.form)))
      let form = {
        ...originForm,
        broadcast_pictures: imageUrls.map((url, index) => ({ url, index }))
      }
      if (Array.isArray(originForm.available_date_range) && originForm.available_date_range.length === 2) {
        form['available_start_date'] = originForm.available_date_range[0]
        form['available_end_date'] = originForm.available_date_range[1]
      }
      if (this.pdfList.length) {
        try {
          const pdf = this.pdfList[0]
          if (/^http/.test(this.pdfList[0].url)) {
            form.information_statement = pdf.url
          } else {
            form.information_statement = pdf.response.url
          }
        } catch (err) {
          // ...
        }
      }
      form = filterObjEmptyVal(form) // 清空无效参数

      try {
        await this.updateSaleHouse(form)
        this.visible = false
        this.$message({
          type: 'success',
          message: this.$t('updateSuccess')
        })
        this.handleReset()
      } catch (err) {
        this.$message({
          type: 'error',
          message: this.$t('updateFailed')
        })
      } finally {
        loading.close()
      }
    },
    /**
     * 重置表单
     */
    handleReset() {
      this.dataFormatter(this.saleEditForm)
    },
    /**
     * 数据格式化，将当前编辑数据格式化适用于表单绑定的数据
     */
    dataFormatter(form) {
      // Formatting Data
      this.form = {
        ...form,
        owner_id: form.owner.id,
        property_type: form.property_type.map(item => item.id),
        available_date_range: [form.available_start_date, form.available_end_date].filter(Boolean),
        agents: form.agents.data.map(item => item.id)
      }
      this.searchedListOfMembers = form.agents.data.map(item => ({
        lable: item.name + ' ' + item.surname,
        value: item.id
      }))
      if (Array.isArray(form.broadcast_pictures)) {
        this.imageList = form.broadcast_pictures.map(item => {
          return {
            dataURL: item.url
          }
        })
      }
      if (form.information_statement) {
        this.pdfList = [
          {
            name: this.$t('currentFile'),
            url: form.information_statement
          }
        ]
      }
      this.owner = form.owner.name + ' ' + form.owner.surname
      if (this.$refs.tinymce) {
        this.$refs.tinymce.setContent(form.details)
      }
    }
  }
}
</script>

<style scoped lang="scss" >
  .edit-sale-house {
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
  }
</style>

<style lang="scss" >
  .edit-sale-house {
    .el-input__prefix {
      left: 12px;
    }
    .el-select {
      width: 100%;
    }
  }
</style>

