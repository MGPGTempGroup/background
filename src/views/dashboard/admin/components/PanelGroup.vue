<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('pv')">
        <div class="card-panel-icon-wrapper icon-page-view">
          <svg-icon icon-class="pv" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <el-badge :value="pv.today" >
              {{ $t('dashboard.pageViews') }}
            </el-badge>
          </div>
          <count-to :start-val="0" :end-val="pv.total" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('uv')">
        <div class="card-panel-icon-wrapper icon-unique-visitor">
          <svg-icon icon-class="uv" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <el-badge :value="uv.today" >
              {{ $t('dashboard.uniqueVisitors') }}
            </el-badge>
          </div>
          <count-to :start-val="0" :end-val="uv.total" :duration="2600" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <el-badge :value="serviceMessagesCount.today" >
              {{ $t('dashboard.serviceMessages') }}
            </el-badge>
          </div>
          <count-to :start-val="0" :end-val="serviceMessagesCount.total" :duration="3000" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('inspections')">
        <div class="card-panel-icon-wrapper icon-inspection">
          <svg-icon icon-class="inspection" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            <el-badge :value="houseInspectionsCount.today" >
              {{ $t('dashboard.houseInspections') }}
            </el-badge>
          </div>
          <count-to :start-val="0" :end-val="houseInspectionsCount.total" :duration="3200" class="card-panel-num"/>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('appStatistics')

export default {
  components: {
    CountTo
  },
  computed: {
    ...mapState({
      serviceMessagesCount: state => state.serviceMessages,
      houseInspectionsCount: state => state.houseInspections,
      pv: state => state.pageViews,
      uv: state => state.uniqueVisitors
    })
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-page-view {
        background: #40c9c6;
      }
      .icon-unique-visitor {
        background: #36a3f7;
      }
      .icon-message {
        background: #f4516c;
      }
      .icon-inspection {
        background: #36a3f7
      }
    }
    .icon-page-view {
      color: #40c9c6;
    }
    .icon-unique-visitor {
      color: #36a3f7;
    }
    .icon-message {
      color: #f4516c;
    }
    .icon-inspection {
      color: #36a3f7
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-right: 40px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>

<style lang="scss" >
  .panel-group {
    .el-badge__content {
      right: 0px !important;
    }
  }
</style>
