<template>
  <div class="sale-house-container" >
    <sale-housing-filter />
    <el-card style="margin-top: 20px;" shadow="never" >
      <div slot="header" class="sale-house__list-header" >
        <h2 style="margin: 0;" >
          <i class="fa fa-list" />
          &nbsp;{{ $t('house.houseList') }}
        </h2>
        <el-button type="primary" class="sale-house__add-btn" @click="handleCreate(true)" >
          {{ $t('create') }}
        </el-button>
      </div>
      <el-table v-loading="salesTableLoading" :data="sales.data" >
        <el-table-column
          :label="$t('house.id')"
          prop="id"
          min-width="35px"
          align="center" />
        <el-table-column
          :label="$t('house.name')"
          min-width="50px"
          prop="name"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.name || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.address')"
          prop="state"
          min-width="50px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.address.length ? scope.row.address.join('/') : $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.suburbName')"
          prop="suburb_name"
          min-width="50px"
          align="center"/>
        <el-table-column
          :label="$t('house.streetName')"
          prop="street_name"
          min-width="50px"
          align="center" />
        <el-table-column
          :label="$t('house.streetCode')"
          prop="street_code"
          min-width="45px"
          align="center" />
        <el-table-column
          :label="$t('house.postCode')"
          prop="post_code"
          min-width="40px"
          align="center" >
          <template slot-scope="scope" >
            {{ scope.row.post_code || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.price')"
          min-width="40px"
          align="center">
          <template slot-scope="scope" >
            <template v-if="scope.row.min_price && scope.row.max_price" >
              ${{ scope.row.min_price }} ~ ${{ scope.row.max_price }}
            </template>
            <template v-else-if="scope.row.min_price || scope.row.max_price" >
              ${{ scope.row.min_price || scope.row.max_price }}
            </template>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.agent')"
          prop="agent"
          min-width="50px"
          style="margin-right: -10px;"
          align="center">
          <template slot-scope="scope" >
            <template v-if="scope.row.agents.data.length" >
              <el-tag
                v-for="item in scope.row.agents.data"
                :key="item.id"
                style="margin-right: 10px;" >
                {{ item.name }}
              </el-tag>
            </template>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.owner')"
          prop="owner"
          min-width="35px"
          align="center">
          <template slot-scope="scope" >
            <el-tag>
              {{ scope.row.owner.name + ' ' + scope.row.owner.surname || $t('noData') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.availableDate')"
          prop="available_date"
          align="center">
          <template slot-scope="scope" >
            <template v-if="scope.row.available_start_date && scope.row.available_end_date" >
              {{ scope.row.available_start_date }} ~ {{ scope.row.available_end_date }}
            </template>
            <template v-else-if="scope.row.available_start_date || scope.row.available_end_date" >
              {{ scope.row.available_start_date || scope.row.available_end_date }}
            </template>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('displayState')"
          prop="currState"
          min-width="55px"
          align="center">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.show == 1"
              type="success"
              size="mini" >
              {{ $t('show') }}
            </el-tag>
            <el-tag
              v-if="scope.row.show == 0"
              type="danger"
              size="mini" >
              {{ $t('hide') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.updatedAt')"
          prop="updated_at"
          min-width="38px"
          align="center" />
        <el-table-column
          :label="$t('house.createdAt')"
          prop="created_at"
          min-width="38px"
          align="center" />
        <el-table-column
          :label="$t('house.actions')"
          fixed="right"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetailsClick(scope.row)">{{ $t('house.details') }}</el-button>
            <el-button type="text" size="small" @click="editDialogVisible = true" >{{ $t('house.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row v-if="Object.getOwnPropertyNames(sales.meta).length" type="flex" justify="center" >
        <el-col :span="7" >
          <el-pagination
            :current-page="salesTablePage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="salesTablePageSize"
            :total="sales.meta.pagination.total"
            style="margin-top: 15px"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handlePaginatorSizeChange"
            @current-change="handlePaginatorChange" />
        </el-col>
      </el-row>
    </el-card>

    <!-- 详情 -->
    <el-dialog
      :title="$t('house.detailsOfRentalHousing')"
      :visible.sync="detailDialogVisible"
      width="50%"
      center>
      <div class="sale-house-details" >
        <el-tabs tab-position="left" >
          <el-tab-pane :label="$t('house.basicInformation')" class="sale-house-details__tab-content">
            <h3 class="sale-house-details__tab-title" > {{ $t('house.housingBasicInformation') }} </h3>
            <el-row class="sale-house-details__tab-content-inner sale-house-details__basic-info" >
              <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 12 }" :xl="{ span: 8 }" tag="dl">
                <dt>{{ $t('house.id') }}</dt>
                <dd>1</dd>
                <dt>{{ $t('house.aState') }}</dt>
                <dd>Vic</dd>
                <dt>{{ $t('house.suburb') }}</dt>
                <dd>Moonee Ponds</dd>
                <dt>{{ $t('house.streetName') }}</dt>
                <dd>Margaret Street</dd>
                <dt>{{ $t('house.streetCode') }}</dt>
                <dd>36</dd>
                <dt>{{ $t('house.postCode') }}</dt>
                <dd>3039</dd>
                <dt>{{ $t('house.availableDate') }}</dt>
                <dd>Now</dd>
              </el-col>
              <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 12 }" :xl="{ span: 8 }" tag="dl">
                <dt>{{ $t('house.propertyTypes') }}</dt>
                <dd>
                  <el-tag size="mini" >{{ $t('house.house') }}</el-tag>
                  <el-tag size="mini" >{{ $t('house.studio') }}</el-tag>
                </dd>
                <dt>{{ $t('house.floorSpace') }}</dt>
                <dd> 102 m<sup>2</sup> </dd>
                <dt>{{ $t('house.beds') }}</dt>
                <dd>3</dd>
                <dt>{{ $t('house.showers') }}</dt>
                <dd>1</dd>
                <dt>{{ $t('house.carSpaces') }}</dt>
                <dd>3</dd>
                <dt>{{ $t('house.rent') }}</dt>
                <dd>$350 ~ $400</dd>
                <dt>{{ $t('house.preciseCoordinates') }}</dt>
                <dd>39°52′48″N，116°24′20″E</dd>
              </el-col>
              <el-col :xs="{ span: 24 }" :sm="{ span: 24 }" :md="{ span: 12 }" :lg="{ span: 12 }" :xl="{ span: 8 }" tag="dl">
                <dt>{{ $t('house.currState') }}</dt>
                <dd>
                  <el-tag type="warning" size="mini" > {{ $t('house.reserved') }} </el-tag>
                </dd>
                <dt>{{ $t('house.agent') }}</dt>
                <dd>Jerry Springer</dd>
                <dt>{{ $t('house.owner') }}</dt>
                <dd>Jerry Springer</dd>
                <dt>{{ $t('house.dataCreator') }}</dt>
                <dd>Ana</dd>
                <dt>{{ $t('house.createdAt') }}</dt>
                <dd>3 days ago</dd>
                <dt>{{ $t('house.updatedAt') }}</dt>
                <dd>2 days ago</dd>
                <dt>{{ $t('house.upcomingInspections') }}</dt>
                <dd>
                  Tue 23rd Oct, 4:45pm-5:45pm
                  <br>
                  Wed 24th Oct, 4:45pm-5:45pm
                  <br>
                  Thu 25th Oct, 4:45pm-5:45pm
                </dd>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('house.introduction')" class="sale-house-details__tab-content">
            <h3 class="sale-house-details__tab-title" > {{ $t('house.housingIntroduction') }} </h3>
            <div class="sale-house-details__tab-content-inner sale-house-details__introduction" >
              <p class="listing"><b>ARRANGE AN INSPECTION TIME ONLINE - DETAILS BELOW</b> <br><br>If location, lifestyle and a place to call home is important to you, look no further than these fantastic apartments at Mason Sq!<br><br>Be one of the first to secure your preferred apartment with prices ranging from $350 - $380pw<br><br>Luxuriously appointed with no wasted space, the apartments feature stunning island bench kitchens with stainless steel appliances, including induction cooktops and dishwashers. The spacious air-conditioned living rooms, with timber flooring, open onto bright balconies or courtyards, all with plenty of natural light. The carpeted bedroom is sundrenched and features ample wardrobe with smart storage options. A beautiful fully tiled bathroom with euro laundry completes the picture. <br><br>Storage cage included and some floorplans with in-built study areas!<br><br>With Moonee Ponds train station 50 metres away and an approx. 9 minute train ride to the city, the location doesn't come much better. Not to mention being a short walk to Moonee Ponds Central Shopping Centre and a plethora of cafes and restaurants all along Puckle Street and surrounds.<br><br>Staying at Margaret Street - Mason Sq, residents have access to resort style facilities including spa, BBQ facilities, dining hall, sun deck as well as pool and gym within Hall St - Mason Sq.<br><br>NOTE: If rent is more than $350 per week, the bond will be 5 weeks of rent<br><br>Arranging an inspection is easy! To book a time to inspect, simply click on Book an Inspection Time or Email Agent to book instantly using our online system. By registering, you will be INSTANTLY informed of any updates, changes or cancellations for your appointment.</p>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('house.pictureAndVideo')" class="sale-house-details__tab-content">
            <h3 class="sale-house-details__tab-title" > {{ $t('house.introToHousingPicturesAndVideos') }} </h3>
            <div class="sale-house-details__tab-content-inner sale-house-details__photo-and-video" >
              <el-carousel height="400px">
                <el-carousel-item>
                  <img style="width: 100%;" src="https://www.melbournerealestate.com.au/wp-content/uploads/2014/04/slide6.jpg" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('house.rentalRecords')" class="sale-house-details__tab-content">
            <h3 class="sale-house-details__tab-title" > {{ $t('house.rentalRecords') }} </h3>
            <div class="sale-house-details__tab-content-inner sale-house-details__photo-and-video" >
              <el-carousel height="400px">
                <el-carousel-item>
                  <img style="width: 100%;" src="https://www.melbournerealestate.com.au/wp-content/uploads/2014/04/slide6.jpg" alt="">
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="detailDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑 -->
    <el-dialog
      :title="$t('house.edit')"
      :visible.sync="editDialogVisible"
      width="65%">
      <sale-house-edit-form />
    </el-dialog>

    <!-- Create sale house data -->
    <create-sale-housing-dialog />

  </div>
</template>

<script>

import SaleHousingFilter from './filter'
import SaleHouseEditForm from './edit'
import CreateSaleHousingDialog from './create'
import 'font-awesome/css/font-awesome.min.css'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('house')

export default {
  name: 'HouseSale',
  components: { SaleHousingFilter, SaleHouseEditForm, CreateSaleHousingDialog },
  data() {
    return {
      detailDialogVisible: false,
      editDialogVisible: false,
      filterForm: {
        propertyType: '',
        region: '',
        minPrice: 0,
        maxPrice: 10000,
        agent: '',
        owner: '',
        currState: '',
        availableDateRange: '',
        createdAtRange: '',
        updatedAtRange: '',
        beds: 1,
        showers: 2,
        carSpaces: 1
      },
      currPage: 1
    }
  },
  computed: {
    ...mapState([
      'sales',
      'salesTableLoading',
      'salesTablePage',
      'salesTablePageSize'
    ])
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.fetchInitData().finally(() => {
      loading.close()
    })
    this.fetchSalesHouse()
  },
  methods: {
    ...mapMutations([
      'setSaleCreateDialogVisible',
      'setSalesTablePageSize',
      'setSalesTablePage'
    ]),
    ...mapActions([
      'fetchInitData',
      'fetchSalesHouse'
    ]),
    handleDetailsClick(rowData) {
      this.detailDialogVisible = true
    },
    handleCreate() {
      this.setSaleCreateDialogVisible(true)
    },
    handlePaginatorSizeChange(pageSize) {
      this.setSalesTablePageSize(pageSize)
    },
    handlePaginatorChange(page) {
      this.setSalesTablePage(page)
    }
  }
}
</script>

<style lang="scss" scoped >
  @import '@/styles/dl.scss';
  .sale-house-container {
    padding: 20px;
  }
  .sale-house {
    &__list-header {
      position: relative;
      padding: 1px 0px; // margin collapsing
    }
    &__add-btn {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .sale-house-details {
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
  }
</style>

<style lang="scss" >
  @import '@/styles/text.scss';
</style>
