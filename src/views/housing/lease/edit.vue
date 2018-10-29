<template>
  <el-tabs tab-position="left">
    <el-tab-pane :label="$t('house.basicInformation')" class="rental-house-edit-tabs__pane">
      <el-form :inline="false" :form="form" label-position="top" >
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
        <el-row type="flex" justify="end">
          <el-col :span="4">
            <el-button type="info" >
              {{ $t('house.reset') }}
            </el-button>
            &nbsp;
            <el-button type="primary" >
              {{ $t('house.update') }}
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-tab-pane>
    <el-tab-pane :label="$t('house.introduction')" class="rental-house-edit-tabs__pane" style="padding: 3px;" >
      <tinymce :height="500" v-model="richTextContent"/>
    </el-tab-pane>
    <el-tab-pane :label="$t('house.pictureAndVideo')" class="rental-house-edit-tabs__pane" >
      <el-row :gutter="12" >
        <el-col v-bind="editImageGrid" >
          <el-card class="rental-house-edit-imgs" body-style="padding: 5px; line-height: 0px;" shadow="hover" >
            <img style="width: 100%;" src="https://www.melbournerealestate.com.au/wp-content/uploads/2014/04/slide6.jpg" alt="">
            <div class="img-control--simple" >
              <el-button type="danger" >
                <i class="fa fa-trash-o" />
              </el-button>
              <el-button type="primary" >
                <i class="fa fa-edit" />
              </el-button>
            </div>
          </el-card>
        </el-col>
        <el-col v-bind="editImageGrid" >
          <el-card class="rental-house-edit-imgs" body-style="padding: 5px; line-height: 0px;" shadow="hover" >
            <img style="width: 100%;" src="https://www.melbournerealestate.com.au/wp-content/uploads/2014/04/slide6.jpg" alt="">
            <div class="img-control--simple" >
              <el-button type="danger" >
                <i class="fa fa-trash-o" />
              </el-button>
              <el-button type="primary" >
                <i class="fa fa-edit" />
              </el-button>
            </div>
          </el-card>
        </el-col>
        <el-col v-bind="editImageGrid" >
          <el-card class="rental-house-edit-imgs" body-style="padding: 5px; line-height: 0px;" shadow="hover" >
            <img style="width: 100%;" src="https://www.melbournerealestate.com.au/wp-content/uploads/2014/04/slide6.jpg" alt="">
            <div class="img-control--simple" >
              <el-button type="danger" >
                <i class="fa fa-trash-o" />
              </el-button>
              <el-button type="primary" >
                <i class="fa fa-edit" />
              </el-button>
            </div>
          </el-card>
        </el-col>
        <el-col v-bind="editImageGrid" >
          <el-card class="rental-house-add-imgs" body-style="padding: 5px; line-height: 0px;" shadow="hover" >
            <div class="rental-house-add-imgs__title" >
              <div>
                <p><i class="fa fa-cloud-upload" /></p>
                <p>{{ $t('house.uploadImgTip') }}</p>
              </div>
            </div>
            <img style="width: 100%; visibility: hidden;" src="https://www.melbournerealestate.com.au/wp-content/uploads/2014/04/slide6.jpg" alt="">
          </el-card>
        </el-col>
      </el-row>
      <div class="rental-house-edit-controls" >
        <el-button type="info" >
          {{ $t('house.reset') }}
        </el-button>
        <el-button type="primary" >
          {{ $t('house.update') }}
        </el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'RentalHousingEdit',
  components: { Tinymce },
  data() {
    return {
      form: {
        currAddress: [],
        owner: 'Jerry',
        agent: 'Jerry',
        currState: 'reserved',
        minPrice: 350,
        maxPrice: 400,
        beds: 1,
        showers: 1,
        carSpaces: 1,
        floorSpace: 100,
        preciseCoordinates: '39°52′48″N，116°24′20″E',
        streetCode: 36,
        postCode: 3039
      },
      richTextContent: `<p class="listing"><b>ARRANGE AN INSPECTION TIME ONLINE - DETAILS BELOW</b> <br><br>If location, lifestyle and a place to call home is important to you, look no further than these fantastic apartments at Mason Sq!<br><br>Be one of the first to secure your preferred apartment with prices ranging from $350 - $380pw<br><br>Luxuriously appointed with no wasted space, the apartments feature stunning island bench kitchens with stainless steel appliances, including induction cooktops and dishwashers. The spacious air-conditioned living rooms, with timber flooring, open onto bright balconies or courtyards, all with plenty of natural light. The carpeted bedroom is sundrenched and features ample wardrobe with smart storage options. A beautiful fully tiled bathroom with euro laundry completes the picture. <br><br>Storage cage included and some floorplans with in-built study areas!<br><br>With Moonee Ponds train station 50 metres away and an approx. 9 minute train ride to the city, the location doesn't come much better. Not to mention being a short walk to Moonee Ponds Central Shopping Centre and a plethora of cafes and restaurants all along Puckle Street and surrounds.<br><br>Staying at Margaret Street - Mason Sq, residents have access to resort style facilities including spa, BBQ facilities, dining hall, sun deck as well as pool and gym within Hall St - Mason Sq.<br><br>NOTE: If rent is more than $350 per week, the bond will be 5 weeks of rent<br><br>Arranging an inspection is easy! To book a time to inspect, simply click on Book an Inspection Time or Email Agent to book instantly using our online system. By registering, you will be INSTANTLY informed of any updates, changes or cancellations for your appointment.</p>`,
      editImageGrid: {
        xs: 24,
        sm: 12,
        md: 8,
        lg: 8,
        xl: 6
      }
    }
  },
  computed: {
    lang() {
      return this.$store.state.app.language
    }
  },
  watch: {
    lang() {
      this.setOpts()
    }
  },
  created() {
    this.setOpts()
  },
  methods: {
    setOpts() {
      this.addressOpts = [{
        label: this.$t('address.australia'),
        value: 'australia',
        children: [
          {
            label: this.$t('address.vic'),
            value: 'vic',
            children: [
              {
                label: this.$t('address.melbourne'),
                value: 'melbourne',
                children: [
                  {
                    label: this.$t('address.mooneePonds'),
                    value: 'mooneePonds',
                    children: [
                      {
                        label: this.$t('address.margaretStreet'),
                        value: 'Margaret Street'
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }]
      this.owners = [
        { name: 'Jerry', id: 1, value: 'Jerry' }
      ]
      this.houseStatus = [
        { label: this.$t('house.active'), value: 'active' },
        { label: this.$t('house.already'), value: 'already' },
        { label: this.$t('house.reserved'), value: 'reserved' }
      ]
    },
    searchOwners(qs, cb) {
      const res = this.owners.filter(o => o.name.indexOf(qs) >= 0)
      if (res.length > 0) {
        cb(res)
      }
    }
  }
}
</script>

<style scoped lang="scss" >
  .rental-house-edit-tabs {
    &__pane {
      padding-left: 20px;
    }
  }
  .rental-house-edit-imgs {
    position: relative;
    &:hover {
    }
  }
  .rental-house-add-imgs {
    position: relative;
    cursor: pointer;
    &__title {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      position: absolute;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 1.6;
      p {
        margin: 0px;
      }
    }
  }
  .rental-house-edit-controls {
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
  }
  .img-control--simple {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.35);
    opacity: 0;
    transition: all .3s;
    &:hover {
      opacity: 1;
    }
  }
</style>

<style>
  .mce-tinymce {
    box-shadow: none !important;
  }
</style>

