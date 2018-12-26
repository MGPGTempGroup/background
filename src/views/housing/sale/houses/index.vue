<template>
  <div class="sale-house-container" >
    <sale-housing-filter />
    <el-card style="margin-top: 20px;" shadow="never" >
      <div slot="header" class="sale-house__list-header" >
        <h2 style="margin: 0;" >
          <i class="fa fa-list" />
          &nbsp;{{ $t('house.houseList') }}
        </h2>
        <el-button type="primary" class="sale-house__add-btn" @click="handleCreate(true)" >
          {{ $t('create') }}
        </el-button>
      </div>
      <el-table v-loading="salesTableLoading" :data="sales.data" >
        <el-table-column
          :label="$t('house.id')"
          prop="id"
          min-width="35px"
          align="center" />
        <el-table-column
          :label="$t('house.name')"
          min-width="50px"
          prop="name"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.name || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.address')"
          prop="state"
          min-width="50px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.address.length ? scope.row.address.join('/') : $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.suburbName')"
          prop="suburb_name"
          min-width="50px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.suburb_name || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.streetName')"
          prop="street_name"
          min-width="50px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.street_name || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.streetCode')"
          prop="street_code"
          min-width="45px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.street_code || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.postCode')"
          prop="post_code"
          min-width="40px"
          align="center" >
          <template slot-scope="scope" >
            {{ scope.row.post_code || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.price')"
          min-width="40px"
          align="center">
          <template slot-scope="scope" >
            <template v-if="scope.row.min_price && scope.row.max_price" >
              ${{ scope.row.min_price }} ~ ${{ scope.row.max_price }}
            </template>
            <template v-else-if="scope.row.min_price || scope.row.max_price" >
              ${{ scope.row.min_price || scope.row.max_price }}
            </template>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.agent')"
          prop="agent"
          min-width="50px"
          style="margin-right: -10px;"
          align="center">
          <template slot-scope="scope" >
            <template v-if="scope.row.agents.data.length" >
              <el-tag
                v-for="item in scope.row.agents.data"
                :key="item.id"
                style="margin-right: 10px;" >
                {{ item.name }}
              </el-tag>
            </template>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.owner')"
          prop="owner"
          min-width="35px"
          align="center">
          <template slot-scope="scope" >
            <el-tag v-if="scope.row.owner" >
              {{ scope.row.owner.name + ' ' + scope.row.owner.surname }}
            </el-tag>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.availableDate')"
          prop="available_date"
          align="center">
          <template slot-scope="scope" >
            <template v-if="scope.row.available_start_date && scope.row.available_end_date" >
              {{ scope.row.available_start_date }} ~ {{ scope.row.available_end_date }}
            </template>
            <template v-else-if="scope.row.available_start_date || scope.row.available_end_date" >
              {{ scope.row.available_start_date || scope.row.available_end_date }}
            </template>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('displayState')"
          prop="currState"
          min-width="55px"
          align="center">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.show == 1"
              type="success"
              size="mini" >
              {{ $t('show') }}
            </el-tag>
            <el-tag
              v-if="scope.row.show == 0"
              type="danger"
              size="mini" >
              {{ $t('hide') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.updatedAt')"
          prop="updated_at"
          min-width="38px"
          align="center" />
        <el-table-column
          :label="$t('house.createdAt')"
          prop="created_at"
          min-width="38px"
          align="center" />
        <el-table-column
          :label="$t('house.actions')"
          fixed="right"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetails(scope.row)">{{ $t('house.details') }}</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row)" >{{ $t('house.edit') }}</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.id)" >{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row v-if="sales.meta.pagination" type="flex" justify="center" >
        <el-col :span="7" >
          <el-pagination
            :current-page="salesTablePage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="salesTablePageSize"
            :total="sales.meta.pagination.total"
            style="margin-top: 15px"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handlePaginatorSizeChange"
            @current-change="handlePaginatorChange" />
        </el-col>
      </el-row>
    </el-card>

    <!-- Create sales data -->
    <create-sale-housing-dialog />

    <!-- Edit sales data -->
    <edit-sale-dialog />

  </div>
</template>

<script>

import SaleHousingFilter from './filter'
import EditSaleDialog from './edit'
import CreateSaleHousingDialog from './create'

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('house')

import 'font-awesome/css/font-awesome.min.css'

export default {
  name: 'HouseSale',
  components: { SaleHousingFilter, EditSaleDialog, CreateSaleHousingDialog },
  data() {
    return {
      detailDialogVisible: false,
      editDialogVisible: false,
      filterForm: {
        propertyType: '',
        region: '',
        minPrice: 0,
        maxPrice: 10000,
        agent: '',
        owner: '',
        currState: '',
        availableDateRange: '',
        createdAtRange: '',
        updatedAtRange: '',
        beds: 1,
        showers: 2,
        carSpaces: 1
      },
      currPage: 1
    }
  },
  computed: {
    ...mapState([
      'sales',
      'salesTableLoading',
      'salesTablePage',
      'salesTablePageSize'
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
    this.fetchSalesHouse()
  },
  methods: {
    ...mapMutations([
      'setSaleCreateDialogVisible',
      'setSaleEditDialogVisible',
      'setSaleEditForm',
      'setSaleDetailsData',
      'setSaleDetailsDialogVisible'
    ]),
    ...mapActions([
      'fetchInitData',
      'fetchSalesHouse',
      'changeSalesTablePage',
      'changeSalesTablePageSize',
      'deleteSaleHouse'
    ]),
    handleDetails(rowData) {
      this.setSaleDetailsData(rowData)
      this.setSaleDetailsDialogVisible(true)
    },
    handleEdit(rowData) {
      this.setSaleEditForm(rowData)
      this.setSaleEditDialogVisible(true)
    },
    handleCreate() {
      this.setSaleCreateDialogVisible(true)
    },
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
        this.deleteSaleHouse({ id })
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
    },
    handlePaginatorSizeChange(pageSize) {
      this.changeSalesTablePageSize(pageSize)
    },
    handlePaginatorChange(page) {
      this.changeSalesTablePage(page)
    }
  }
}
</script>

<style lang="scss" scoped >
  @import '@/styles/dl.scss';
  .sale-house {
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
  .sale-house-details {
    &__tab-content {
      padding-left: 10px;
    }
    &__tab-title {
      margin: 10px 0px;
      font-size: 17px;
    }
    &__tab-content-inner {}
    &__basic-info {}
    &__photo-and-video {
      margin-top: 18px;
    }
  }
</style>

<style lang="scss" >
  .sale-house-container {
    @import '@/styles/text.scss';
    input[type=number] {
      -moz-appearance:textfield;
    }
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
  }
</style>
