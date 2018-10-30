<template>
  <div class="company-info" >
    <el-card class="company-info__card" shadow="never" >
      <div slot="header" class="company-info__card-header" >
        <h2 style="margin: 0;" >{{ $t('company.companyInformationEditor') }}</h2>
        <p style="margin: 0px; margin-top: 15px;" >{{ $t('company.socialNetworkingSiteHomepageFormTips') }}</p>
      </div>
      <el-form :model="form" label-position="top" >
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
          <el-col v-bind="formItemLargerLayoutProps" >
            <el-form-item :label="$t('address')" >
              <el-cascader
                :options="addressOpts"
                v-model="form.address"
                expand-trigger="hover"
                @change="() => null"/>
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
                placeholder="起始时间"/>
              <el-time-select
                v-model="form.opening_hours.monday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.monday.start_time
                }"
                placeholder="结束时间"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('tuesday')">
              <el-time-select
                v-model="form.opening_hours.monday.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }"
                placeholder="起始时间"/>
              <el-time-select
                v-model="form.opening_hours.monday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.monday.start_time
                }"
                placeholder="结束时间"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('wednesday')" >
              <el-time-select
                v-model="form.opening_hours.monday.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }"
                placeholder="起始时间"/>
              <el-time-select
                v-model="form.opening_hours.monday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.monday.start_time
                }"
                placeholder="结束时间"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('thursday')" >
              <el-time-select
                v-model="form.opening_hours.monday.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }"
                placeholder="起始时间"/>
              <el-time-select
                v-model="form.opening_hours.monday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.monday.start_time
                }"
                placeholder="结束时间"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('friday')" >
              <el-time-select
                v-model="form.opening_hours.monday.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }"
                placeholder="起始时间"/>
              <el-time-select
                v-model="form.opening_hours.monday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.monday.start_time
                }"
                placeholder="结束时间"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('saturday')" >
              <el-time-select
                v-model="form.opening_hours.monday.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }"
                placeholder="起始时间"/>
              <el-time-select
                v-model="form.opening_hours.monday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.monday.start_time
                }"
                placeholder="结束时间"/>
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('sunday')" >
              <el-time-select
                v-model="form.opening_hours.monday.start_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00'
                }"
                placeholder="起始时间"/>
              <el-time-select
                v-model="form.opening_hours.monday.end_time"
                :picker-options="{
                  start: '00:00',
                  step: '00:15',
                  end: '24:00',
                  minTime: form.opening_hours.monday.start_time
                }"
                placeholder="结束时间"/>
            </el-form-item>
          </el-col>
        </el-row>
        <h3>{{ $t('company.socialNetworkingSiteHomepage') }}</h3>
        <el-row :gutter="48" >
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.googlePlusHomePage')">
              <el-input v-model="form.googleplus" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.linkinHomePage')">
              <el-input v-model="form.linkin" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.youtubeHomePaeg')">
              <el-input v-model="form.youtube" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.facebookHomePage')">
              <el-input v-model="form.facebook" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.twitterHomePage')">
              <el-input v-model="form.twitter" />
            </el-form-item>
          </el-col>
          <el-col v-bind="formItemLayoutProps" >
            <el-form-item :label="$t('company.instagram')">
              <el-input v-model="form.instagram" />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="company-info__form-actions" >
          <el-button type="info" >{{ $t('reset') }}</el-button>
          <el-button type="primary" >{{ $t('update') }}</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CompanyInfo',
  data() {
    return {
      form: {
        opening_hours: {
          monday: {},
          tuesday: {},
          wednesday: {},
          thursday: {},
          firday: {},
          saturday: {},
          sunday: {}
        }
      },
      formItemLayoutProps: { xs: 24, sm: 12, md: 12, lg: 8, xl: 8 },
      formItemLargerLayoutProps: { xs: 24, sm: 12, md: 24, lg: 16, xl: 16 }
    }
  },
  watch: {
    '$store.state.app.language': function() {
      this.setOpts()
    }
  },
  created() {
    this.setOpts()
  },
  methods: {
    setOpts() {
      this.addressOpts = [{
        label: this.$t('addressList.australia'),
        value: 'australia',
        children: [
          {
            label: this.$t('addressList.vic'),
            value: 'vic',
            children: [
              {
                label: this.$t('addressList.melbourne'),
                value: 'melbourne',
                children: [
                  {
                    label: this.$t('addressList.mooneePonds'),
                    value: 'mooneePonds',
                    children: [
                      {
                        label: this.$t('addressList.margaretStreet'),
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

