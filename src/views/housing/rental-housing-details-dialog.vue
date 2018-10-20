<template>
  <el-dialog
    :title="$t('house.detailsOfRentalHousing')"
    :visible.sync="visible"
    width="50%"
    center>
    <div class="rental-housing-details" >
      <el-tabs tab-position="left" >
        <el-tab-pane :label="$t('house.basicInformation')" class="rental-housing-details__tab-content">
          <h3 class="rental-housing-details__tab-title" > {{ $t('house.housingBasicInformation') }} </h3>
          <el-row class="rental-housing-details__tab-content-inner rental-housing-details__basic-info" >
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
        <el-tab-pane :label="$t('house.introduction')" class="rental-housing-details__tab-content">
          <h3 class="rental-housing-details__tab-title" > {{ $t('house.housingIntroduction') }} </h3>
          <div class="rental-housing-details__tab-content-inner rental-housing-details__introduction" >
            <p class="listing"><b>ARRANGE AN INSPECTION TIME ONLINE - DETAILS BELOW</b> <br><br>If location, lifestyle and a place to call home is important to you, look no further than these fantastic apartments at Mason Sq!<br><br>Be one of the first to secure your preferred apartment with prices ranging from $350 - $380pw<br><br>Luxuriously appointed with no wasted space, the apartments feature stunning island bench kitchens with stainless steel appliances, including induction cooktops and dishwashers. The spacious air-conditioned living rooms, with timber flooring, open onto bright balconies or courtyards, all with plenty of natural light. The carpeted bedroom is sundrenched and features ample wardrobe with smart storage options. A beautiful fully tiled bathroom with euro laundry completes the picture. <br><br>Storage cage included and some floorplans with in-built study areas!<br><br>With Moonee Ponds train station 50 metres away and an approx. 9 minute train ride to the city, the location doesn't come much better. Not to mention being a short walk to Moonee Ponds Central Shopping Centre and a plethora of cafes and restaurants all along Puckle Street and surrounds.<br><br>Staying at Margaret Street - Mason Sq, residents have access to resort style facilities including spa, BBQ facilities, dining hall, sun deck as well as pool and gym within Hall St - Mason Sq.<br><br>NOTE: If rent is more than $350 per week, the bond will be 5 weeks of rent<br><br>Arranging an inspection is easy! To book a time to inspect, simply click on Book an Inspection Time or Email Agent to book instantly using our online system. By registering, you will be INSTANTLY informed of any updates, changes or cancellations for your appointment.</p>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('house.pictureAndVideo')" class="rental-housing-details__tab-content">
          <h3 class="rental-housing-details__tab-title" > {{ $t('house.introToHousingPicturesAndVideos') }} </h3>
          <div class="rental-housing-details__tab-content-inner rental-housing-details__photo-and-video" >
            <el-carousel height="400px">
              <el-carousel-item>
                <img style="width: 100%;" src="https://www.melbournerealestate.com.au/wp-content/uploads/2014/04/slide6.jpg" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="$t('house.rentalRecords')" class="rental-housing-details__tab-content">
          <h3 class="rental-housing-details__tab-title" > {{ $t('house.rentalRecords') }} </h3>
        </el-tab-pane>
      </el-tabs>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'RentalHousingDetailsDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss" >

</style>

