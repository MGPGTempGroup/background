<template>
  <div class="rental-house-inspections" >
    <el-table
      v-loading="tableLoading"
      :data="leaseInspections.data">
      <el-table-column
        :label="$t('id')"
        prop="id"
        min-width="35px"
        align="center" />
      <el-table-column
        :label="$t('surname')"
        min-width="40px"
        align="center">
        <template slot-scope="scope" >
          {{ scope.row.surname || $t('noData') }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('name')"
        min-width="40px"
        align="center">
        <template slot-scope="scope" >
          {{ scope.row.name || $t('noData') }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('house.inspectionDatetime')"
        min-width="40px"
        align="center">
        <template slot-scope="scope" >
          {{ scope.row.name || $t('noData') }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('house')
export default {
  name: 'RentalHouseInspections',
  data() {
    return {
      tableLoading: false
    }
  },
  computed: {
    ...mapState([
      'leaseInspections'
    ])
  },
  created() {
    this.tableLoading = true
    this.fetchLeaseInspections()
      .catch(() => {
        this.$message({
          type: 'error',
          message: this.$t('getDataError')
        })
      })
      .finally(() => {
        this.tableLoading = false
      })
  },
  methods: {
    ...mapActions([
      'fetchLeaseInspections'
    ])
  }
}
</script>

<style>
  .rental-house-inspections {
  }
</style>
