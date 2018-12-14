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
        :label="$t('mobile')"
        min-width="40px"
        align="center">
        <template slot-scope="scope" >
          {{ scope.row.mobile || $t('noData') }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('email')"
        min-width="40px"
        align="center">
        <template slot-scope="scope" >
          {{ scope.row.email || $t('noData') }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('house.preferredInspectionDatetime')"
        min-width="60px"
        align="center">
        <template slot-scope="scope" >
          {{ scope.row.preferred_inspection_datetime || $t('noData') }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('house.preferredMoveInDate')"
        min-width="60px"
        align="center">
        <template slot-scope="scope" >
          {{ scope.row.preferred_move_in_date || $t('noData') }}
        </template>
      </el-table-column>
      <!-- <el-table-column
        :label="$t('house.followUpState')"
        min-width="60px"
        align="center">
        <template slot-scope="scope" >
          <template v-if="scope.row.followUp" >
            {{ scope.row.followUp.name }}
          </template>
          <template v-else >
            {{ $t('noData') }}
          </template>
        </template>
      </el-table-column> -->
      <el-table-column
        :label="$t('house.comment')"
        min-width="30px"
        align="center">
        <template slot-scope="scope" >
          <template v-if="scope.row.comment" >
            <el-popover
              placement="right-end"
              width="300"
              trigger="hover">
              <div style="word-wrap: break-word;" >
                {{ scope.row.comment }}
              </div>
              <div slot="reference" >
                {{ scope.row.comment | textTruncate(30) }}
              </div>
            </el-popover>
          </template>
          <template v-else >
            {{ $t('noData') }}
          </template>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('house.house')"
        min-width="100px"
        align="center">
        <template slot-scope="scope" >
          <template v-if="scope.row.house" >
            <el-button @click="previewHouseDetails(scope.row.house)" >
              {{ scope.row.house.name | textTruncate(10) }}
            </el-button>
          </template>
          <template v-else >
            {{ $t('noData') }}
          </template>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('house.createdAt')"
        min-width="60px"
        align="center">
        <template slot-scope="scope" >
          {{ scope.row.created_at || $t('noData') }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('house.actions')"
        fixed="right"
        align="center"
        min-width="40px;">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDelete(scope.row.id)" >{{ $t('delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- Paginator -->
    <div v-if="leaseInspections.meta.pagination" class="rental-house-inspections__table-pagination" >
      <el-pagination
        :current-page="tablePage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="tablePageSize"
        :total="leaseInspections.meta.pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="onPaginatorSizeChange"
        @current-change="onPaginatorChange"/>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('house')
export default {
  name: 'RentalHouseInspections',
  data() {
    return {
      tableLoading: false,
      tablePage: 1,
      tablePageSize: 10
    }
  },
  computed: {
    ...mapState([
      'leaseInspections'
    ])
  },
  created() {
    this.tableLoading = true
    this.fetchLeaseInspections({
      page: this.tablePage,
      pageSize: this.tablePageSize
    })
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
    ...mapMutations([
      'setLeaseDetailsDialogVisible',
      'setLeaseDetailsData'
    ]),
    ...mapActions([
      'fetchLeaseInspections',
      'deleteLeaseInspection'
    ]),
    /**
     * 分页相关
     */
    onPaginatorSizeChange(pageSize) {
      this.tableLoading = true
      this.fetchLeaseInspections({
        page: this.tablePage,
        pageSize: pageSize
      })
        .then(() => {
          this.tablePageSize = pageSize
        })
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
    onPaginatorChange(page) {
      this.tableLoading = true
      this.fetchLeaseInspections({
        page: page,
        pageSize: this.tablePageSize
      })
        .then(() => {
          this.tablePage = page
        })
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
    /**
     * 展示房屋详情
     */
    previewHouseDetails(houseData) {
      this.setLeaseDetailsData(houseData)
      this.setLeaseDetailsDialogVisible(true)
    },
    /**
     * 删除数据
     */
    handleDelete(id) {
      this.$confirm(this.$t('deleteDataTips'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        this.deleteLeaseInspection({ id }).then(res => {
          this.$message({
            message: this.$t('deleteSuccess'),
            type: 'success'
          })
        }).catch(() => {
          this.$message({
            message: this.$t('deleteFailed'),
            type: 'error'
          })
        }).finally(() => {
          this.tableLoading = false
        })
      })
    }
  }
}
</script>

<style scoped lang="scss" >
  .rental-house-inspections {
    &__table-pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
  }
</style>
