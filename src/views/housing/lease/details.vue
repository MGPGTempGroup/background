<template>
  <!-- 详情 -->
  <el-dialog
    :title="$t('house.detailsOfRentalHousing')"
    :visible.sync="visible"
    width="70%"
    center
    lock-scroll
    top="40px"
    append-to-body>
    <div class="rental-housing-details" >
      <el-tabs tab-position="left" >
        <el-tab-pane :label="$t('house.basicInformation')" class="rental-housing-details__tab-content">
          <h3 class="rental-housing-details__tab-title" > {{ $t('house.housingBasicInformation') }} </h3>
          <el-row
            :gutter="24"
            class="rental-housing-details__tab-content-inner rental-housing-details__basic-info">
            <el-col v-bind="layoutItemProps" tag="dl">
              <dt>{{ $t('house.id') }}</dt>
              <dd>{{ formattedData.id }}</dd>
              <dt>{{ $t('house.name') }}</dt>
              <dd>{{ formattedData.name }}</dd>
              <dt>{{ $t('house.address') }}</dt>
              <dd>
                <template v-if="Array.isArray(leaseDetailsData.address)" >
                  {{ formattedData.address.map(item => item.name).join('/') }}
                </template>
                <template v-else >
                  {{ $t('noData') }}
                </template>
              </dd>
              <dt>{{ $t('house.suburbName') }}</dt>
              <dd>{{ formattedData.suburb_name }}</dd>
              <dt>{{ $t('house.streetName') }}</dt>
              <dd>{{ formattedData.street_name }}</dd>
              <dt>{{ $t('house.streetCode') }}</dt>
              <dd>{{ formattedData.street_code }}</dd>
              <dt>{{ $t('house.postCode') }}</dt>
              <dd>{{ formattedData.post_code }}</dd>
              <dt>{{ $t('house.houseNumber') }}</dt>
              <dd>{{ formattedData.house_number }}</dd>
              <dt>{{ $t('house.addressDescription') }}</dt>
              <dd>{{ formattedData.address_description }}</dd>
              <dt>{{ $t('house.briefIntroduction') }}</dt>
              <dd>
                {{ formattedData.brief_introduction || $t('noData') }}
              </dd>
            </el-col>
            <el-col v-bind="layoutItemProps" tag="dl">
              <dt>{{ $t('house.propertyTypes') }}</dt>
              <dd class="rental-housing-details__property-type-list" >
                <template v-if="Array.isArray(formattedData.property_type) && formattedData.property_type.length" >
                  <el-tag
                    v-for="(item, index) in formattedData.property_type"
                    :key="index"
                    class="rental-housing-details__property-type-list-item" >
                    {{ item.name }}
                  </el-tag>
                </template>
                <template v-else >
                  {{ $t('noData') }}
                </template>
              </dd>
              <dt>{{ $t('house.floorSpace') }}</dt>
              <dd> {{ formattedData.floor_space || $t('noData') }} m<sup>2</sup> </dd>
              <dt>{{ $t('house.bedrooms') }}</dt>
              <dd>{{ formattedData.bedrooms || $t('noData') }}</dd>
              <dt>{{ $t('house.bathrooms') }}</dt>
              <dd>{{ formattedData.bathrooms || $t('noData') }}</dd>
              <dt>{{ $t('house.carSpaces') }}</dt>
              <dd>{{ formattedData.car_spaces || $t('noData') }}</dd>
              <dt>{{ $t('house.lockupGarages') }}</dt>
              <dd>{{ formattedData.lockup_garages || $t('noData') }}</dd>
              <dt>{{ $t('house.preciseCoordinates') }}</dt>
              <dd>{{ formattedData.map_coordinates || $t('noData') }}</dd>
              <dt>{{ $t('house.dailyRent') }}($)</dt>
              <dd>
                {{ formattedData.per_day_min_price || $t('noData') }}
                ~
                {{ formattedData.per_day_max_price || $t('noData') }}
              </dd>
              <dt>{{ $t('house.weeklyRent') }}($)</dt>
              <dd>
                {{ formattedData.per_week_min_price || $t('noData') }}
                ~
                {{ formattedData.per_week_max_price || $t('noData') }}
              </dd>
              <dt>{{ $t('house.monthlyRent') }}($)</dt>
              <dd>
                {{ formattedData.per_monthly_min_price || $t('noData') }}
                ~
                {{ formattedData.per_monthly_max_price || $t('noData') }}
              </dd>
            </el-col>
            <el-col v-bind="layoutItemProps" >
              <dt>{{ $t('displayState') }}</dt>
              <dd>
                <el-tag v-if="formattedData.show === 1" type="success" size="mini" >{{ $t('show') }}</el-tag>
                <el-tag v-else type="warning" size="mini" > {{ $t('hide') }} </el-tag>
              </dd>
              <dt>{{ $t('house.agent') }}</dt>
              <dd>
                <template v-if="formattedData.agents && formattedData.agents.data.length" >
                  <el-tag
                    v-for="(item, index) in formattedData.agents.data"
                    :key="index">
                    {{ item.name + ' ' + item.surname }}
                  </el-tag>
                </template>
                <template v-else >
                  {{ $t('noData') }}
                </template>
              </dd>
              <dt>{{ $t('house.owner') }}</dt>
              <dd>
                <el-tag v-if="typeof formattedData.owner === 'object'" >
                  {{ formattedData.owner.name }}
                </el-tag>
                <template v-else >
                  {{ $t('noData') }}
                </template>
              </dd>
              <dt>{{ $t('creator') }}</dt>
              <dd>
                <el-tag v-if="typeof formattedData.owner === 'object'" >
                  {{ formattedData.creator.name }}
                </el-tag>
                <template v-else >
                  {{ $t('noData') }}
                </template>
              </dd>
              <dt>{{ $t('house.availableDate') }}</dt>
              <dd>
                {{ formattedData.available_start_date || $t('noData') }}
                ~
                {{ formattedData.available_end_date || $t('noData') }}
              </dd>
              <dt>{{ $t('house.createdAt') }}</dt>
              <dd>{{ formattedData.created_at || $t('noData') }}</dd>
              <dt>{{ $t('house.updatedAt') }}</dt>
              <dd>{{ formattedData.updated_at || $t('noData') }}</dd>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane :label="$t('house.introduction')" class="rental-housing-details__tab-content">
          <h3 class="rental-housing-details__tab-title" > {{ $t('house.housingIntroduction') }} </h3>
          <div
            class="rental-housing-details__tab-content-inner rental-housing-details__introduction"
            v-html="formattedData.details">
            {{ $t('noData') }}
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('house.pictureAndVideo')" class="rental-housing-details__tab-content">
          <h3 class="rental-housing-details__tab-title" > {{ $t('house.introToHousingPicturesAndVideos') }} </h3>
          <el-row
            :gutter="24"
            class="rental-housing-details__tab-content-inner rental-housing-details__photo-and-video" >
            <template v-if="formattedData.broadcast_pictures && formattedData.broadcast_pictures.length" >
              <el-col
                v-for="item in formattedData.broadcast_pictures"
                v-bind="{ xs: 24, sm: 12, md: 8, lg: 6, xl: 6 }"
                :key="item.index">
                <el-card
                  style="width: 100%; cursor: pointer;"
                  body-style="padding: 5px;"
                  shadow="hover" >
                  <img :src="item.url" style="width: 100%;" >
                </el-card>
              </el-col>
            </template>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('house')
export default {
  name: 'LeaseHouseDetails',
  data() {
    return {
      layoutItemProps: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8 }
    }
  },
  computed: {
    ...mapState([
      'leaseDetailsDialogVisible',
      'leaseDetailsData'
    ]),
    formattedData() {
      const formatted = JSON.parse(JSON.stringify(this.leaseDetailsData))
      const numberFormatter = val => val !== null ? String(val) : null
      formatted.floor_spaces = numberFormatter(formatted.floor_spaces)
      formatted.car_spaces = numberFormatter(formatted.car_spaces)
      formatted.bedrooms = numberFormatter(formatted.bedrooms)
      formatted.bathrooms = numberFormatter(formatted.bathrooms)
      formatted.lockup_garages = numberFormatter(formatted.lockup_garages)
      return formatted
    },
    visible: {
      get() {
        return this.leaseDetailsDialogVisible
      },
      set(visible) {
        this.setLeaseDetailsDialogVisible(visible)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setLeaseDetailsDialogVisible'
    ])
  }
}
</script>

<style scoped lang="scss" >
  @import '@/styles/dl.scss';
  .rental-housing-details {
    &__tab-content {
      padding-left: 10px;
    }
    &__tab-title {
      margin: 10px 0px;
      font-size: 17px;
    }
    &__tab-content-inner {}
    &__basic-info {}
    &__photo-and-video {
      margin-top: 18px;
    }
    &__property-type-list {
      margin-right: -10px;
      &-item {
        margin-right: 10px;
      }
    }
  }
</style>

