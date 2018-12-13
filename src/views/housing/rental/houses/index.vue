<template>
  <div class="rental-housing-container" >
    <rental-house-filter />
    <el-card style="margin-top: 20px;" shadow="never" >
      <div slot="header" class="rental-housing__list-header" >
        <h2 style="margin: 0;" >
          <i class="fa fa-list" />
          &nbsp;{{ $t('house.houseList') }}
        </h2>
        <el-button type="primary" class="rental-housing__add-btn" @click="setLeaseCreateDialogVisible(true)" >
          {{ $t('create') }}
        </el-button>
      </div>
      <el-table v-loading="leasesTableLoading" :data="leases.data" >
        <el-table-column :label="$t('id')" prop="id" min-width="20px" align="center" />
        <el-table-column :label="$t('house.name')" prop="name" min-width="50px" align="center" />
        <el-table-column
          :label="$t('house.address')"
          min-width="60px"
          align="center">
          <template slot-scope="scope" >
            <template v-if="scope.row.address.length" >
              {{ scope.row.address.join('/') }}
            </template>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.suburbName')"
          prop="suburb_name"
          min-width="30px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.suburb_name || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.streetName')"
          prop="street_name"
          min-width="30px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.street_name || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('house.postCode')" prop="post_code" min-width="40px" align="center" />
        <el-table-column :label="$t('house.rent')" min-width="30px" align="center" >
          <template slot-scope="scope" >
            <el-popover
              placement="top-start"
              trigger="hover">
              <div v-if="scope.row.per_day_min_price" >
                {{ $t('house.dailyRent') }}：${{ scope.row.per_day_min_price }} ~ ${{ scope.row.per_day_max_price }}
              </div>
              <div v-if="scope.row.per_week_min_price" >
                {{ $t('house.weeklyRent') }}：${{ scope.row.per_week_min_price }} ~ ${{ scope.row.per_week_max_price }}
              </div>
              <div v-if="scope.row.per_month_min_price" >
                {{ $t('house.monthlyRent') }}：${{ scope.row.per_month_min_price }} ~ ${{ scope.row.per_month_max_price }}
              </div>
              <el-button slot="reference">{{ $t('details') }}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column :label="$t('house.agent')" prop="agent" min-width="40px" align="center">
          <template slot-scope="scope" >
            <template v-if="scope.row.agents.data.length" >
              <el-tag
                v-for="(item, index) in scope.row.agents.data"
                :key="index">
                {{ item.name + ' ' + item.surname }}
              </el-tag>
            </template>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </template>
        </el-table-column>
        <el-table-column :label="$t('house.owner')" prop="owner" min-width="35px" align="center">
          <template slot-scope="scope" >
            <el-tag>{{ scope.row.owner.name + ' ' + scope.row.owner.surname }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('house.availableDate')" min-width="60px" align="center" >
          <template slot-scope="scope" >
            {{ scope.row.available_start_date ?
              scope.row.available_start_date + ' ~ ' + scope.row.available_end_date :
              $t('noData')
            }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('displayState')" min-width="35px" align="center" >
          <template slot-scope="scope">
            <el-tag type="warning" size="mini" >
              {{ [$t('hide'), $t('show')][scope.row.show] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('house.createdAt')" prop="created_at" min-width="50px" align="center" />
        <el-table-column
          :label="$t('house.actions')"
          fixed="right"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetailsClick(scope.row)">{{ $t('house.details') }}</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row)" >{{ $t('house.edit') }}</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.id)" >{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row v-if="leases.meta.pagination" type="flex" justify="center" >
        <el-col :span="7" >
          <el-pagination
            :current-page="leasesTablePage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="leasesTablePageSize"
            :total="leases.meta.pagination.total"
            style="margin-top: 15px"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handlePaginatorSizeChange"
            @current-change="handlePaginatorChange" />
        </el-col>
      </el-row>
    </el-card>

    <!-- Create -->
    <rental-house-create-dialog />

    <!-- Edit -->
    <rental-house-edit-dialog />

    <!-- Details -->
    <rental-house-details-dialog />

  </div>
</template>

<script>

import rentalHouseFilter from './filter'
import rentalHouseEditDialog from './edit'
import rentalHouseCreateDialog from './create'
import rentalHouseDetailsDialog from './details'
import 'font-awesome/css/font-awesome.min.css'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('house')

export default {
  name: 'RentalHouses',
  components: {
    rentalHouseFilter,
    rentalHouseEditDialog,
    rentalHouseCreateDialog,
    rentalHouseDetailsDialog
  },
  computed: {
    ...mapState([
      'leases',
      'leasesTableLoading',
      'leasesTablePage',
      'leasesTablePageSize'
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
    this.fetchLeasesHouse()
  },
  methods: {
    ...mapMutations([
      'setLeaseCreateDialogVisible',
      'setLeasesTablePage',
      'setLeasesTablePageSize',
      'setLeaseDetailsDialogVisible',
      'setLeaseDetailsData',
      'setLeaseEditDialogVisible',
      'setLeaseEditForm'
    ]),
    ...mapActions([
      'fetchInitData',
      'fetchLeasesHouse',
      'deleteLeaseHouse'
    ]),
    /**
     * 改变分页大小
     */
    handlePaginatorSizeChange(pageSize) {
      this.setLeasesTablePageSize(pageSize)
      this.fetchLeasesHouse()
    },
    /**
     * 改变分页
     */
    handlePaginatorChange(page) {
      this.setLeasesTablePage(page)
      this.fetchLeasesHouse()
    },
    /**
     * 详情
     */
    handleDetailsClick(data) {
      this.setLeaseDetailsData(data)
      this.setLeaseDetailsDialogVisible(true)
    },
    /**
     * 编辑
     */
    handleEdit(data) {
      this.setLeaseEditForm(
        JSON.parse(
          JSON.stringify(data)
        )
      )
      this.setLeaseEditDialogVisible(true)
    },
    /**
     * 删除
     */
    handleDelete(id) {
      this.$confirm(this.$t('deleteDataTips'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.deleteLeaseHouse({ id })
          .then(() => {
            this.$message({
              type: 'success',
              message: this.$t('deleteSuccess')
            })
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: this.$t('deleteFailed')
            })
          })
          .finally(() => {
            loading.close()
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped >
  .rental-housing {
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
</style>

<style lang="scss" >
  @import '@/styles/text.scss';
</style>
