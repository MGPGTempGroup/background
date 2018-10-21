<template>
  <div class="property-owners" >
    <!-- 筛选表单 -->
    <filter-form />
    <!-- 列表 -->
    <el-card class="property-owners__card" style="margin-top: 20px; padding: 0px;" shadow="never" >
      <div slot="header" class="property-owners__list-header" >
        <el-button class="property-owners__add-btn" type="primary" @click="dataCreationDialogVisible = true" >
          {{ $t('owner.create') }}&nbsp;
          <i class="fa fa-edit" />
        </el-button>
        <h2 style="" >
          <i class="fa fa-list" />
          &nbsp;{{ $t('owner.propertyOwnersList') }}
        </h2>
      </div>
      <el-table :data="propertyOwnerList" >
        <el-table-column :label="$t('owner.id')" prop="id" align="center" min-width="30px;" />
        <el-table-column :label="$t('owner.name')" prop="name" align="center" min-width="50px;" />
        <el-table-column :label="$t('owner.surname')" prop="surname" align="center" min-width="40px;" />
        <el-table-column :label="$t('owner.phoneNumber')" prop="phone" align="center" min-width="60px;" />
        <el-table-column :label="$t('owner.email')" prop="email" align="center" min-width="60px;" />
        <el-table-column :label="$t('owner.photoThumbnail')" align="center" min-width="40px;" >
          <template slot-scope="scope">
            <img :src="scope.row.photo_thumbnail" style="width: 30px; height: 30px;" alt="">
          </template>
        </el-table-column>
        <el-table-column :label="$t('owner.idCardNum')" prop="id_card_num" align="center" min-width="60px;" />
        <el-table-column :label="$t('owner.wechat')" prop="wechat" align="center" min-width="50px;" />
        <el-table-column :label="$t('owner.address')" align="center" min-width="60px;" >
          <template slot-scope="scope" > {{ scope.row.address | truncate }} </template>
        </el-table-column>
        <el-table-column :label="$t('owner.identity')" align="center" min-width="40px;">
          <template slot-scope="scope" ><el-tag>{{ $t(`owner.${scope.row.identity}`) }}</el-tag></template>
        </el-table-column>
        <!-- <el-table-column :label="$t('owner.isSignContract')" align="center" min-width="40px;">
          <el-tag slot-scope="scope" :type="['danger', 'warning'][scope.row.is_sign_contract]" >
            {{ $t(`owner.${['notSigned', 'alreadySigned'][scope.row.is_sign_contract]}`) }}
          </el-tag>
        </el-table-column> -->
        <!-- <el-table-column :label="$t('owner.followUpState')" align="center" min-width="40px" >
          <template slot-scope="scope" >
            {{ $t(`owner.${['intentionalCustomers', 'noIntention', 'iSuccess'][scope.row.follow_up_state]}`) }}
          </template>
        </el-table-column> -->
        <!-- <el-table-column :label="$t('owner.followUpTime')" prop="follow_up_time" align="center" min-width="50px" /> -->
        <el-table-column :label="$t('owner.agent')" prop="agent" align="center" min-width="50px" />
        <el-table-column
          :label="$t('owner.actions')"
          fixed="right"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">{{ $t('owner.details') }}</el-button>
            <el-button type="text" size="small">{{ $t('owner.edit') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- Paginator -->
      <div class="property-owners__list-pagination" >
        <el-pagination
          :current-page="currPage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="10"
          :total="100"
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
  </div>
</template>

<script>
import filterForm from './form/filter'
import addForm from './form/add'
import 'font-awesome/css/font-awesome.min.css'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('propertyOwner')

export default {
  name: 'PropertyOwner',
  components: { filterForm, addForm },
  filters: {
    truncate(str) {
      return str.length > 18 ? (str.substr(0, 18) + '...') : str
    }
  },
  data() {
    return {
      currPage: 1
    }
  },
  computed: {
    ...mapState({
      propertyOwnerList: state => state.list
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
  created() {},
  methods: {
    ...mapMutations([
      'updateDataCreationDialogVisible'
    ]),
    onPaginatorSizeChange() {},
    onPaginatorChange() {}
  }
}
</script>

<style scoped lang="scss" >
  .property-owners {
    padding: 20px;
    &__list-header {
      position: relative;
      padding: 1px 0px; // margin collapsing
    }
    &__card {
      // position: relative;
    }
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

<style>
  .el-card__header {
    position: relative;
    padding: 0px 20px;
  }
</style>

