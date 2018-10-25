<template>
  <el-dialog :visible.sync="visible" title="收货地址">
    <el-table :data="tableData">
      <el-table-column property="date" label="日期" width="150" align="center" />
      <el-table-column property="name" label="姓名" width="200" align="center" />
      <el-table-column property="address" label="地址" align="center" />
      <el-table-column
        fixed="right"
        label="操作"
        width="120"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="() => null">{{ $t('details') }}</el-button>
          <el-button type="text" size="small">{{ $t('apply') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('content')
export default {
  name: 'HistoricalContentDialog',
  data() {
    return {
      historicalContentDialogVisible: false
    }
  },
  computed: {
    ...mapState({
      tableData: state => state.historicalContent.tableData
    }),
    visible: {
      get() {
        return this.$store.state.content.historicalContent.dialogVisible
      },
      set(dialogVisible) {
        this.updateHistoricalContent({ dialogVisible })
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateHistoricalContent'
    ])
  }
}
</script>

