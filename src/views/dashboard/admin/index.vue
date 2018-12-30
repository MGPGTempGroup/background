<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff; padding:16px 16px 0; padding-top: 0px; margin-bottom:32px;">
      <div class="line-chart-action" >
        <el-radio-group v-model="currChartDataType">
          <el-radio-button label="last_7_days">
            {{ $t('dashboard.last7Days') }}
          </el-radio-button>
          <el-radio-button label="last_12_months">
            {{ $t('dashboard.last12Months') }}
          </el-radio-button>
        </el-radio-group>
      </div>
      <line-chart :chart-data="chartData" :x-axis-data="chartXAxisData"/>
    </el-row>

  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('appStatistics')

import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
// import TodoList from './components/TodoList'
// import NotificationList from './components/notification'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      currChartDataType: 'last_7_days',
      currChartDataKey: 'pv',
      chartData: {
        quantity: [0, 0, 0, 0, 0, 0, 0]
      },
      chartXAxisData: []
    }
  },
  computed: {
    ...mapState({
      lineChartDataList: state => ({
        messages: {
          last_7_days: state.serviceMessages.last_7_days,
          last_12_months: state.serviceMessages.last_12_months
        },
        inspections: {
          last_7_days: state.houseInspections.last_7_days,
          last_12_months: state.houseInspections.last_12_months
        },
        pv: {
          last_7_days: state.pageViews.last_7_days,
          last_12_months: state.pageViews.last_12_months
        },
        uv: {
          last_7_days: state.uniqueVisitors.last_7_days,
          last_12_months: state.uniqueVisitors.last_12_months
        }
      })
    })
  },
  watch: {
    currChartDataType: {
      handler() {
        this.handleSetLineChartData(
          this.currChartDataKey
        )
      }
    }
  },
  created() {
    this.handleSetLineChartData(
      this.currChartDataKey
    )
  },
  methods: {
    handleSetLineChartData(type) {
      console.log(this.lineChartDataList[type])
      this.chartData = {
        quantity: Object.values(this.lineChartDataList[type][this.currChartDataType])
      }
      this.chartXAxisData = Object.keys(this.lineChartDataList[type][this.currChartDataType])
      this.currChartDataKey = type
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .line-chart-action {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
