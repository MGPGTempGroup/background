<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff; padding:16px 16px 0; padding-top: 0px; margin-bottom:32px;">
      <line-chart :chart-data="chartData" :x-axis-data="chartXAxisData"/>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 18}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list/>
      </el-col>
    </el-row>

  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('appStatistics')

import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
  data() {
    return {
      chartData: {
        quantity: [0, 0, 0, 0, 0, 0, 0]
      },
      chartXAxisData: []
    }
  },
  computed: {
    ...mapState({
      lineChartDataList: state => ({
        messages: state.serviceMessages.last_7_days,
        inspections: state.houseInspections.last_7_days,
        pv: state.pageViews.last_7_days,
        uv: state.uniqueVisitors.last_7_days
      })
    })
  },
  created() {
    this.handleSetLineChartData('pv')
  },
  methods: {
    handleSetLineChartData(type) {
      this.chartData = {
        quantity: Object.values(this.lineChartDataList[type])
      }
      this.chartXAxisData = Object.keys(this.lineChartDataList[type])
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
}
</style>
