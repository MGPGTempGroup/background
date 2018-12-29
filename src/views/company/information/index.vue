<template>
  <div class="company-info" >
    <el-card class="company-info__card" shadow="never" >
      <div slot="header" class="company-info__card-header" >
        <h2 style="margin: 0;" >{{ $t('company.companyInformationEditor') }}</h2>
        <p style="margin: 0px; margin-top: 15px;" >{{ $t('company.socialNetworkingSiteHomepageFormTips') }}</p>
      </div>
      <el-form v-if="form" :model="form" label-position="top" >
        <h3>{{ $t('company.companyContactInfo') }}</h3>
        <el-row :gutter="48" >
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('telephone')">
              <el-input v-model="form.telephone" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('facsimile')">
              <el-input v-model="form.facsimile" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('postCode')" >
              <el-input v-model="form.post_code" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('address')" >
              <el-cascader
                :options="areaData"
                v-model="form.address"
                expand-trigger="hover"
                @change="() => null"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.detailedAddress')" >
              <el-input v-model="form.detailed_address" />
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('openingHours') }}</h3>
        <el-row :gutter="48" >
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('monday')">
              <el-time-select
                v-model="form.opening_hours.monday.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }"
                :placeholder="$t('startTime')"/>
              <el-time-select
                v-model="form.opening_hours.monday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.monday.start_time
                }"
                :placeholder="$t('endTime')"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('tuesday')">
              <el-time-select
                v-model="form.opening_hours.tuesday.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }"
                :placeholder="$t('startTime')"/>
              <el-time-select
                v-model="form.opening_hours.tuesday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.tuesday.start_time
                }"
                :placeholder="$t('endTime')"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('wednesday')" >
              <el-time-select
                v-model="form.opening_hours.thursday.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }"
                :placeholder="$t('startTime')"/>
              <el-time-select
                v-model="form.opening_hours.wednesday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.wednesday.start_time
                }"
                :placeholder="$t('endTime')"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('thursday')" >
              <el-time-select
                v-model="form.opening_hours.thursday.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }"
                :placeholder="$t('startTime')"/>
              <el-time-select
                v-model="form.opening_hours.thursday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.thursday.start_time
                }"
                :placeholder="$t('endTime')"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('friday')" >
              <el-time-select
                v-model="form.opening_hours.friday.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }"
                :placeholder="$t('startTime')"/>
              <el-time-select
                v-model="form.opening_hours.friday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.friday.start_time
                }"
                :placeholder="$t('endTime')"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('saturday')" >
              <el-time-select
                v-model="form.opening_hours.saturday.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }"
                :placeholder="$t('startTime')"/>
              <el-time-select
                v-model="form.opening_hours.saturday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.saturday.start_time
                }"
                :placeholder="$t('endTime')"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('sunday')" >
              <el-time-select
                v-model="form.opening_hours.sunday.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }"
                :placeholder="$t('startTime')"/>
              <el-time-select
                v-model="form.opening_hours.sunday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.sunday.start_time
                }"
                :placeholder="$t('endTime')"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('company.socialNetworkingSiteHomepage') }}</h3>
        <el-row :gutter="48" >
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.googlePlusHomePage')">
              <el-input v-model="form.google_plus_homepage" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.linkinHomePage')">
              <el-input v-model="form.linkin_homepage" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.youtubeHomePaeg')">
              <el-input v-model="form.youtube_homepage" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.facebookHomePage')">
              <el-input v-model="form.facebook_homepage" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.twitterHomePage')">
              <el-input v-model="form.twitter_homepage" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.instagram')">
              <el-input v-model="form.instagram_homepage" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="company-info__form-actions" >
          <el-button type="info" @click="handleReset" >{{ $t('reset') }}</el-button>
          <el-button type="primary" @click="handleUpdate" >{{ $t('update') }}</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { deepClone } from '@/utils'
const { mapState, mapActions } = createNamespacedHelpers('company')
import areaDataStorage from '@/utils/areaDataStorage'
export default {
  name: 'CompanyInfo',
  data() {
    return {
      areaData: areaDataStorage(),
      form: null,
      formItemLayoutProps: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8 },
      formItemLargerLayoutProps: { xs: 24, sm: 12, md: 24, lg: 16, xl: 16 }
    }
  },
  computed: {
    ...mapState({
      originForm: state => state.companyInfo
    })
  },
  created() {
    this.fetchCompanyInfo().then(data => {
      this.form = data
    })
  },
  methods: {
    ...mapActions([
      'fetchCompanyInfo',
      'updateCompanyInfo'
    ]),
    handleUpdate() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.updateCompanyInfo(this.form).then(data => {
        this.form = data
        this.$message({
          message: this.$t('updateSuccess'),
          type: 'success'
        })
      }).finally(() => {
        loading.close()
      })
    },
    handleReset() {
      this.form = deepClone(this.originForm)
    }
  }
}
</script>

<style lang="scss" scoped >
  .company-info {
    padding: 20px;
    &__form-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
  .el-cascader {
    width: 100%;
  }
</style>
