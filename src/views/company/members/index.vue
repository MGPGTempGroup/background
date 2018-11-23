<template>
  <div class="company-members" >
    <filter-form />
    <el-card shadow="never" style="margin-top: 20px;" >
      <div slot="header" class="company-members__list-header" >
        <h2 style="margin: 0px;" >{{ $t('company.memberList') }}</h2>
        <el-button type="primary" class="company-members__create-btn" @click="setCreateMemberDialogVisible(true)" >
          {{ $t('create') }}
        </el-button>
      </div>
      <el-table
        v-loading="membersTableLoading"
        v-if="members.data"
        :data="members.data">
        <el-table-column :label="$t('id')" prop="id" align="center" min-width="20" />
        <el-table-column :label="$t('surname')" prop="surname" align="center" min-width="30" />
        <el-table-column :label="$t('name')" prop="name" align="center" min-width="30" />
        <el-table-column :label="$t('phone')" prop="phone" align="center" min-width="30" />
        <el-table-column :label="$t('email')" prop="email" align="center" min-width="30" />
        <el-table-column :label="$t('company.position')" prop="positions" align="center" min-width="30">
          <template slot-scope="scope" >
            <el-popover
              placement="right-start"
              trigger="hover">
              <div style="margin-bottom: -5px; margin-right: -5px;" >
                <el-tag
                  v-for="(position, index) in scope.row.positions.data"
                  :key="index"
                  style="margin-bottom: 5px; margin-right: 5px;" >
                  {{ position.name }}
                </el-tag>
              </div>
              <el-button slot="reference">{{ $t('details') }}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('company.introduction')"
          align="center"
          min-width="30">
          <template slot-scope="scope" >
            <el-popover
              placement="right-start"
              trigger="hover">
              <div v-html="scope.row.introduction || $t('noData')">
                {{ $t('noData') }}
              </div>
              <el-button slot="reference">{{ $t('details') }}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('company.googlePlusHomePage')"
          prop="branch"
          align="center"
          min-width="40">
          <template slot-scope="scope" >
            <a :href="scope.row.google_plus_homepage" target="_blank" >
              {{ scope.row.google_plus_homepage || $t('noData') }}
            </a>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('company.linkinHomePage')"
          prop="branch"
          align="center"
          min-width="40">
          <template slot-scope="scope" >
            <a :href="scope.row.linkin_homepage" target="_blank" >
              {{ scope.row.linkin_homepage || $t('noData') }}
            </a>
          </template>
        </el-table-column>
        <el-table-column :label="$t('createdAt')" prop="created_at" align="center" min-width="35" />
        <el-table-column :label="$t('updatedAt')" prop="updated_at" align="center" min-width="35" />
        <el-table-column
          :label="$t('actions')"
          align="center"
          min-width="60">
          <template slot-scope="scope" >
            <el-button type="primary" @click="toggleEditMembersDialogVisible({ visible: true })" >{{ $t('edit') }}</el-button>
            <el-button type="danger" @click="handleMemberDelete" >{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="members.meta" class="company-members__paginator" >
        <el-pagination
          :current-page="membersTablePage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="membersTablePageSize"
          :total="members.meta.pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handlePaginatorSizeChange"
          @current-change="handlePaginatorChange"/>
      </div>
    </el-card>
    <!-- Create member -->
    <create-members-dialog />
    <!-- Edit member -->
    <edit-members-dialog />
  </div>
</template>

<script>
import CreateMembersDialog from './create'
import EditMembersDialog from './edit'
import FilterForm from './filter'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('company')
export default {
  name: 'CompanyMembersPage',
  components: {
    CreateMembersDialog, EditMembersDialog, FilterForm
  },
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'members',
      'membersTableLoading',
      'membersTablePage',
      'membersTablePageSize'
    ])
  },
  created() {
    // 拉取公司部门职位数据
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.fetchCompanyDepartments().finally(() => loading.close())

    // 拉取公司成员数据
    this.setMembersTableLoading(true)
    this.fetchCompanyMembers().finally(() => {
      this.setMembersTableLoading(false)
      console.log(this.members)
    })
  },
  methods: {
    ...mapMutations([
      'setMembersTablePage',
      'setMembersTablePageSize',
      'setMembersTableLoading',
      'setCreateMemberDialogVisible',
      'toggleEditMembersDialogVisible'
    ]),
    ...mapActions([
      'fetchCompanyMembers',
      'fetchCompanyDepartments'
    ]),
    handleMemberDelete() {
      this.$confirm(this.$t('company.confirmDeleteMemberTips'), this.$t('tips'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel')
      }).then(() => {}).catch(action => { })
    },
    handlePaginatorSizeChange(pageSize) {
      this.setMembersTablePageSize(pageSize)
    },
    handlePaginatorChange(page) {
      this.setMembersTablePage(page)
    }
  }
}
</script>

<style scoped lang="scss" >
  .company-members {
    padding: 20px;
    &__list-header {
      position: relative;
    }
    &__create-btn {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
    &__paginator {
      display: inline-block;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 30px;
    }
  }
</style>

