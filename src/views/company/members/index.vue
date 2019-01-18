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
        <el-table-column :label="$t('surname')" prop="surname" align="center" min-width="20" />
        <el-table-column :label="$t('name')" prop="name" align="center" min-width="25" />
        <el-table-column :label="$t('phone')" prop="phone" align="center" min-width="30" />
        <el-table-column :label="$t('email')" prop="email" align="center" min-width="30" />
        <el-table-column :label="$t('company.position')" prop="positions" align="center" min-width="25">
          <template slot-scope="scope" >
            <el-popover
              placement="right-start"
              trigger="click">
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
          min-width="25">
          <template slot-scope="scope" >
            <el-button slot="reference" @click="viewIntroduction(scope.row.introduction)" >{{ $t('details') }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('photo')"
          align="center"
          min-width="25">
          <template slot-scope="scope" >
            <el-popover
              placement="right-start"
              trigger="click">
              <img :src="scope.row.photo" style="max-width: 400px;" >
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
          min-width="80px">
          <template slot-scope="scope" >
            <el-button
              type="text"
              size="small"
              @click="$store.dispatch('remark/init', { come_from_type: 'company_members', come_from_id: scope.row.id })">
              {{ $t('remarks') }}
            </el-button>
            <el-button type="text" @click="openMemberDetailsDialog(scope.row)" >{{ $t('details') }}</el-button>
            <el-button type="text" @click="handleMemberEdit(scope.row)" >{{ $t('edit') }}</el-button>
            <el-button type="text" @click="handleMemberDelete(scope.row.id)" >{{ $t('delete') }}</el-button>
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

    <!-- member details dialog -->
    <member-details-dialog/>

    <!-- Introduction Dialog -->
    <el-dialog
      :title="$t('introduction')"
      :visible.sync="introductionDialogVisible">
      <div v-html="introductionDialogContent" />
    </el-dialog>
  </div>
</template>

<script>
import CreateMembersDialog from './create'
import EditMembersDialog from './edit'
import MemberDetailsDialog from './details'
import FilterForm from './filter'
import { deepClone } from '@/utils'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('company')
export default {
  name: 'CompanyMembersPage',
  components: {
    CreateMembersDialog,
    EditMembersDialog,
    FilterForm,
    MemberDetailsDialog
  },
  data() {
    return {
      introductionDialogVisible: false,
      introductionDialogContent: ''
    }
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
    })
  },
  methods: {
    ...mapMutations([
      'setMembersTablePage',
      'setMembersTablePageSize',
      'setMembersTableLoading',
      'setCreateMemberDialogVisible',
      'setEditMemberDialogVisible',
      'setEditMembersForm',
      'setMemberDetailsDialogVisible',
      'setMemberDetailsData'
    ]),
    ...mapActions([
      'fetchCompanyMembers',
      'fetchCompanyDepartments',
      'deleteCompanyMember'
    ]),
    /**
     * 打开成员详情对话框
     */
    openMemberDetailsDialog(memberData) {
      this.setMemberDetailsData(memberData)
      this.setMemberDetailsDialogVisible(true)
    },
    /**
     * 处理成员编辑
     */
    handleMemberEdit(memberData) {
      this.setEditMemberDialogVisible(true)
      memberData = deepClone(memberData)
      memberData.positions = memberData.positions.data.map(item => item.id)
      this.setEditMembersForm(memberData)
    },
    /**
     * 展示成员介绍（Introduction）
     */
    viewIntroduction(introduction) {
      this.introductionDialogContent = introduction
      this.introductionDialogVisible = true
    },
    /**
     * 处理成员删除
     */
    handleMemberDelete(id) {
      this.$confirm(this.$t('company.confirmDeleteMemberTips'), this.$t('tips'), {
        distinguishCancelAndClose: true,
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel')
      }).then(() => {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.deleteCompanyMember(id).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('deleteSuccess')
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: this.$t('deleteFailed')
          })
        }).finally(() => {
          loading.close()
        })
      })
    },
    /**
     * 处理分页大小修改
     */
    handlePaginatorSizeChange(pageSize) {
      this.setMembersTablePageSize(pageSize)
    },
    /**
     * 处理分页页数修改
     */
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
