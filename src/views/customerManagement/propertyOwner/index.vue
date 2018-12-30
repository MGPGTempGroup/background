<template>
  <div class="property-owners" >
    <!-- 筛选表单 -->
    <filter-form />
    <!-- 列表 -->
    <el-card
      class="property-owners__card"
      style="margin-top: 20px; padding: 0px;"
      shadow="never">
      <div slot="header" class="property-owners__list-header" >
        <h2 style="margin: 0px;" >
          <i class="fa fa-list" />
          &nbsp;{{ $t('owner.propertyOwnersList') }}
        </h2>
        <el-button class="property-owners__add-btn" type="primary" @click="dataCreationDialogVisible = true" >
          {{ $t('owner.create') }}&nbsp;
          <i class="fa fa-edit" />
        </el-button>
      </div>
      <el-table
        v-loading="tableLoading"
        :data="owners.data">
        <el-table-column :label="$t('owner.id')" prop="id" align="center" min-width="30px;" />
        <el-table-column :label="$t('owner.name')" prop="name" align="center" min-width="50px;">
          <template slot-scope="scope" >
            {{ scope.row.name || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('owner.surname')" prop="surname" align="center" min-width="40px;" />
        <el-table-column :label="$t('owner.phone')" prop="phone" align="center" min-width="60px;">
          <template slot-scope="scope" >
            {{ scope.row.phone || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('owner.email')" prop="email" align="center" min-width="60px;">
          <template slot-scope="scope" >
            {{ scope.row.email || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('owner.wechat')" prop="wechat" align="center" min-width="50px;">
          <template slot-scope="scope" >
            {{ scope.row.wechat || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('owner.idCardNum')" prop="id_card" align="center" min-width="60px;">
          <template slot-scope="scope" >
            {{ scope.row.id_card || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('owner.address')" prop="address" align="center" min-width="80px;">
          <template slot-scope="scope" > {{ (scope.row.address.join('/') || $t('noData')) | textTruncate }} </template>
        </el-table-column>
        <el-table-column :label="$t('owner.identity')" align="center" min-width="40px;">
          <template slot-scope="scope" >
            <el-tag>{{ $t(`owner.${scope.row.identity.name.toLowerCase()}`) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('createdAt')" prop="created_at" align="center" min-width="55px;" />
        <el-table-column :label="$t('updatedAt')" prop="updated_at" align="center" min-width="55px;" />
        <el-table-column
          :label="$t('owner.actions')"
          fixed="right"
          align="center"
          min-width="70px;">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetailsClick(scope.row)">{{ $t('owner.details') }}</el-button>
            <el-button type="text" size="small" @click="handleEditClick(scope.row)" >{{ $t('owner.edit') }}</el-button>
            <el-button type="text" size="small" @click="handleDeleteClick(scope.row.id)" >{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- Paginator -->
      <div v-if="owners.meta" class="property-owners__list-pagination" >
        <el-pagination
          :current-page="currTablePage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="currTabbePageSize"
          :total="owners.meta.pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="onPaginatorSizeChange"
          @current-change="onPaginatorChange"/>
      </div>
    </el-card>
    <!-- Data Create Dialog -->
    <el-dialog
      :title="$t('owner.create')"
      :visible.sync="dataCreationDialogVisible"
      width="60%">
      <add-form />
    </el-dialog>

    <!-- Owner Details Dialog -->
    <details-dialog />

    <!-- Edit Data Dialog -->
    <edit-dialog />
  </div>
</template>

<script>
import filterForm from './form/filter'
import addForm from './form/add'
import detailsDialog from './dialog/details'
import editDialog from './dialog/edit'
import 'font-awesome/css/font-awesome.min.css'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('propertyOwner')

export default {
  name: 'PropertyOwner',
  components: { filterForm, addForm, editDialog, detailsDialog },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      owners: state => state.owners,
      tableLoading: state => state.ownersTableLoading,
      currTablePage: state => state.ownersTablePage,
      currTabbePageSize: state => state.ownersTablePageSize
    }),
    dataCreationDialogVisible: {
      get() {
        return this.$store.state.propertyOwner.dataCreationDialogVisible
      },
      set(visible) {
        this.updateDataCreationDialogVisible({ visible })
      }
    }
  },
  created() {
    // 拉取业主列表数据
    this.fetchOwners()
  },
  methods: {
    ...mapMutations([
      'updateDataCreationDialogVisible',
      'setDetailsDialogVisible',
      'setDetailsData',
      'setDataEditionDialogVisible',
      'setDataEditionForm',
      'setTablePage',
      'setTablePageSize'
    ]),
    ...mapActions([
      'fetchOwners',
      'deleteOwner'
    ]),
    handleDetailsClick(row) {
      this.setDetailsData(row)
      this.setDetailsDialogVisible({ visible: true })
    },
    handleEditClick(row) {
      this.setDataEditionForm(JSON.parse(JSON.stringify(row)))
      this.setDataEditionDialogVisible({ visible: true })
    },
    handleDeleteClick(id) {
      this.$confirm(this.$t('deleteDataTips'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }).then(() => {
        this.deleteOwner(id).then(res => {
          this.$message({
            message: this.$t('deleteSuccess'),
            type: 'success'
          })
        }).catch(() => {
          this.$message({
            message: this.$t('deleteFailed'),
            type: 'error'
          })
        })
      })
    },
    onPaginatorSizeChange(pageSize) {
      this.setTablePageSize(pageSize)
      this.fetchOwners()
    },
    onPaginatorChange(page) {
      this.setTablePage(page)
      this.fetchOwners()
    }
  }
}
</script>

<style scoped lang="scss" >
  .property-owners {
    padding: 20px;
    &__list-header {
      position: relative;
    }
    &__card {}
    &__add-btn {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
    &__list-pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
    }
  }
</style>
