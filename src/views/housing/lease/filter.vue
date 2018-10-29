<template>
  <el-card class="rental-housing-filter" body-style="padding: 5px 20px 5px 20px;" shadow="never" >
    <el-collapse v-model="collapseActiveNames">
      <el-collapse-item name="1">
        <template slot="title">
          <h2 style="margin: 0" >
            <i class="fa fa-filter" />
            &nbsp;{{ $t('house.conditionalFiltering') }}
          </h2>
        </template>
        <el-form :inline="false" :model="form" label-position="top" class="rental-housing-filter__form" >
          <el-row :gutter="48" class="rental-housing-filter__form-row" >
            <el-col
              :xs="{ span: 24 }"
              :sm="{ span: 12 }"
              :md="{ span: 12 }"
              :lg="{ span: 12 }"
              :xl="{ span: 8 }"
              class="rental-housing-filter__form-col" >
              <!-- 物业类型 -->
              <el-form-item :label="$t('house.propertyTypes')" >
                <el-select
                  :placeholder="$t('house.propertyTypes')"
                  v-model="form.propertyType"
                  multiple
                  default-first-option >
                  <el-option
                    v-for="item in propertyTypes"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" />
                </el-select>
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
              <!-- 相关属性 -->
              <el-form-item :label="$t('house.relatedAttributes')" >
                <i class="fa fa-bed" /> &nbsp;&nbsp;
                <el-input-number v-model="form.beds" controls-position="right" style="width: 20%;" />
                &nbsp;&nbsp;
                <i class="fa fa-shower" /> &nbsp;&nbsp;
                <el-input-number v-model="form.showers" controls-position="right" style="width: 20%;" />
                &nbsp;&nbsp;
                <i class="fa fa-car" /> &nbsp;&nbsp;
                <el-input-number v-model="form.carSpaces" controls-position="right" style="width: 20%;" />
              </el-form-item>
            </el-col>
            <el-col
              :xs="{ span: 24 }"
              :sm="{ span: 12 }"
              :md="{ span: 12 }"
              :lg="{ span: 12 }"
              :xl="{ span: 8 }"
              class="rental-housing-filter__form-col" >
              <el-form-item :label="$t('house.regionSelection')" >
                <!-- 地区选择 -->
                <el-select
                  v-model="form.region"
                  :placeholder="$t('house.regionSelectionPlaceholder')"
                  multiple
                  filterable
                  allow-create
                  default-first-option>
                  <!-- <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option> -->
                </el-select>
              </el-form-item>
              <!-- agent -->
              <el-form-item :label="$t('house.agent')" >
                <el-select
                  v-model="form.agent"
                  :placeholder="$t('house.agent')"
                  multiple
                  filterable
                  allow-create
                  default-first-option>
                  <!-- <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option> -->
                </el-select>
              </el-form-item>
              <!-- owner -->
              <el-form-item :label="$t('house.owner')" >
                <el-select
                  v-model="form.owner"
                  :placeholder="$t('house.owner')"
                  multiple
                  filterable
                  allow-create
                  default-first-option>
                  <!-- <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option> -->
                </el-select>
              </el-form-item>
            </el-col>
            <el-col
              :xs="{ span: 24 }"
              :sm="{ span: 12 }"
              :md="{ span: 12 }"
              :lg="{ span: 12 }"
              :xl="{ span: 8 }"
              class="rental-housing-filter__form-col" >
              <!-- 目前状态 -->
              <el-form-item :label="$t('house.currState')" >
                <el-select v-model="form.currState" :placeholder="$t('house.currState')" multiple>
                  <el-option
                    v-for="item in currStateOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"/>
                </el-select>
              </el-form-item>
              <!-- 可用时间 -->
              <el-form-item :label="$t('house.availableDate')" >
                <el-date-picker
                  v-model="form.availableDateRange"
                  :start-placeholder="$t('house.startDate')"
                  :end-placeholder="$t('house.endDate')"
                  :default-time="['12:00:00']"
                  type="datetimerange"/>
              </el-form-item>
              <!-- 创建于 -->
              <el-form-item :label="$t('house.createdAt')" >
                <el-date-picker
                  v-model="form.createdAtRange"
                  :start-placeholder="$t('house.startDate')"
                  :end-placeholder="$t('house.endDate')"
                  :default-time="['12:00:00']"
                  type="datetimerange"/>
              </el-form-item>
              <!-- 修改于 -->
              <el-form-item :label="$t('house.updatedAt')" >
                <el-date-picker
                  v-model="form.updatedAtRange"
                  :start-placeholder="$t('house.startDate')"
                  :end-placeholder="$t('house.endDate')"
                  :default-time="['12:00:00']"
                  type="datetimerange" />
              </el-form-item>
            </el-col>
            <el-col
              :xs="{ span: 24 }"
              :sm="{ span: 24 }"
              :md="{ span: 24 }"
              :lg="{ span: 24 }"
              :xl="{ span: 24 }"
              class="rental-housing-filter__form-col rental-housing-filter__actions" >
              <el-button type="info">{{ $t('house.reset') }}</el-button>
              <el-button type="primary">{{ $t('house.query') }}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
export default {
  name: 'RentalHousingFilter',
  props: {
    form: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      collapseActiveNames: [],
      propertyTypes: [],
      regions: [],
      currStateOpts: []
    }
  },
  computed: {
    lang() {
      return this.$store.state.app.language
    }
  },
  watch: {
    lang() {
      this.setOptions()
    }
  },
  created() {
    this.setOptions()
  },
  methods: {
    setOptions() {
      this.propertyTypes = [
        { value: 'house', label: this.$t('house.house') },
        { value: 'studio', label: this.$t('house.studio') },
        { value: 'unit', label: this.$t('house.unit') },
        { value: 'apartment', label: this.$t('house.apartment') },
        { value: 'townHouse', label: this.$t('house.townHouse') },
        { value: 'terrace', label: this.$t('house.terrace') },
        { value: 'villa', label: this.$t('house.villa') },
        { value: 'semi', label: this.$t('house.semi') },
        { value: 'duplex', label: this.$t('house.duplex') },
        { value: 'penthouse', label: this.$t('house.penthouse') }
      ]
      this.regions = {
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }]
      }
      this.currStateOpts = [
        { label: this.$t('house.active'), value: 'active' },
        { label: this.$t('house.already'), value: 'already' },
        { label: this.$t('house.reserved'), value: 'reserved' }
      ]
    }
  }
}
</script>

<style scoped lang="scss" >
  .rental-housing-filter {
    &__form {}
    &__form-row {
      margin-top: 10px;
    }
    &__form-col {}
    &__actions {
      display: flex;
      justify-content: center;
    }
  }
</style>

<style lang="scss" >
  @import '@/styles/filter-form.scss';
  @import '@/styles/text.scss';
  .el-select {
    width: 100%;
  }
  .el-input__prefix {
    left: 12px;
  }
  input[type=number] {
    -moz-appearance:textfield;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
</style>

