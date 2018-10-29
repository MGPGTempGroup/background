<template>
  <div class="create-rental-housing">
    <el-dialog
      :title="$t('house.createRentalHousingData')"
      :visible.sync="visible"
      fullscreen>
      <el-form :inline="false" :model="form" label-position="top" >
        <el-row :gutter="64" >
          <el-col :lg="{ span: 12 }" >
            <el-form-item :label="$t('house.address')">
              <el-cascader
                :options="addressOpts"
                v-model="form.currAddress"
                expand-trigger="hover"
                style="width: 100%" />
            </el-form-item>
            <el-form-item :label="$t('house.streetCode')">
              <el-input v-model="form.streetCode" type="number" />
            </el-form-item>
            <el-form-item :label="$t('house.postCode')">
              <el-input v-model="form.postCode" type="number" />
            </el-form-item>
            <!-- 目前状态 -->
            <el-form-item :label="$t('house.currState')" >
              <el-select v-model="form.currState" :placeholder="$t('house.stateSelectionPlaceholder')">
                <el-option
                  v-for="item in houseStatus"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('house.relatedAttributes')" >
              <i class="fa fa-bed" /> &nbsp;&nbsp;
              <el-input-number v-model="form.beds" controls-position="right" style="width: 23%;" />
              &nbsp;&nbsp;
              <i class="fa fa-shower" /> &nbsp;&nbsp;
              <el-input-number v-model="form.showers" controls-position="right" style="width: 23%;" />
              &nbsp;&nbsp;
              <i class="fa fa-car" /> &nbsp;&nbsp;
              <el-input-number v-model="form.carSpaces" controls-position="right" style="width: 23%;" />
            </el-form-item>
            <!-- 租金区间 -->
            <el-form-item :label="$t('house.rent')" >
              <el-input v-model="form.minPrice" style="width: 40%;" type="number" >
                <i slot="prefix" class="fa fa-dollar" />
              </el-input>
              &nbsp; ~ &nbsp;
              <el-input v-model="form.maxPrice" style="width: 40%;" type="number" >
                <i slot="prefix" class="fa fa-dollar" />
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="{ span: 11 }" >
            <!-- 可用日期 -->
            <el-form-item :label="$t('house.availableDate')" >
              <el-date-picker
                v-model="form.availableDateRange"
                :start-placeholder="$t('house.startDate')"
                :end-placeholder="$t('house.endDate')"
                :default-time="['12:00:00']"
                type="datetimerange"/>
            </el-form-item>
            <!-- 物主 -->
            <el-form-item :label="$t('house.owner')" >
              <el-autocomplete
                v-model="form.owner"
                :fetch-suggestions="searchOwners"
              />
            </el-form-item>
            <!-- 代理 -->
            <el-form-item :label="$t('house.agent')" >
              <el-autocomplete
                v-model="form.agent"
                :fetch-suggestions="searchOwners"
              />
            </el-form-item>
            <!-- 占地面积 -->
            <el-form-item :label="$t('house.floorSpace')" >
              <el-input v-model="form.floorSpace" type="number" style="width: 100px;" />
              &nbsp;m<sup>2</sup>
            </el-form-item>
            <!-- 经纬 -->
            <el-form-item :label="$t('house.preciseCoordinates')" >
              <el-input v-model="form.preciseCoordinates" style="width: 200px;" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="create-rental-housing__details-editor" >
          <p><strong>{{ $t('details') }}</strong></p>
          <tinymce v-model="form.details" />
        </div>
        <div class="create-rental-housing__upload-image-wrapper" >
          <p><strong>{{ $t('house.housingPicture') }}</strong></p>
          <upload-image :image-list.sync="form.imageList" />
        </div>
        <div class="create-rental-housing__form-actions" >
          <el-button type="primary" >
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
import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('housing')
export default {
  name: 'CreateRentalHousing',
  components: {
    tinymce, UploadImage
  },
  data() {
    return {
      form: {
        imageList: []
      }
    }
  },
  computed: {
    visible: {
      get() {
        return this.$store.state.housing.createRentalHousingDialogVisible
      },
      set(visible) {
        this.toggleCreateRentalHousingDialogVisible({ visible })
      }
    }
  },
  methods: {
    ...mapMutations([
      'toggleCreateRentalHousingDialogVisible'
    ])
  }
}
</script>

<style scoped lang="scss" >
  .create-rental-housing {
    &__form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 35px;
    }
    &__details-editor {
      margin-top: 22px;
    }
  }
</style>

