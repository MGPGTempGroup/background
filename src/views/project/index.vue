<template>
  <div class="project__container" >
    <project-filter />
    <el-card style="margin-top: 20px;" shadow="never" >
      <div slot="header" class="project__list-header" >
        <h2 style="margin: 0;" >
          <i class="fa fa-list" >
            &nbsp; {{ $t('project.list') }}
          </i>
        </h2>
        <el-button
          type="primary"
          class="project__add-btn"
          @click="handleCreate">
          {{ $t('create') }}
        </el-button>
      </div>
      <el-table
        v-loading="tableLoading"
        :data="projects.data">
        <el-table-column
          :label="$t('id')"
          prop="id"
          min-width="20px"
          align="center"/>
        <el-table-column
          :label="$t('project.name')"
          prop="name"
          min-width="50px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.name || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('project.location')"
          prop="name"
          min-width="45px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.location || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('project.address')"
          prop="name"
          min-width="65px"
          align="center">
          <template slot-scope="scope" >
            <template v-if="Array.isArray(scope.row.address) && scope.row.address.length > 0" >
              {{ scope.row.address.join('/') }}
            </template>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('project.yearBuilt')"
          prop="year_built"
          min-width="30px"
          align="center">
          <template slot-scope="scope" >
            {{ scope.row.year_built || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('project.isNewDevelopment')"
          prop="is_new_development"
          min-width="30px"
          align="center">
          <template slot-scope="scope" >
            <el-tag v-if="scope.row.is_new_development" >
              {{ $t('yes') }}
            </el-tag>
            <el-tag v-else >
              {{ $t('no') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('project.isPastSuccess')"
          prop="is_past_success"
          min-width="35px"
          align="center">
          <template slot-scope="scope" >
            <el-tag v-if="scope.row.is_past_success" >
              {{ $t('yes') }}
            </el-tag>
            <el-tag v-else >
              {{ $t('no') }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('project.agents')"
          prop="agents"
          min-width="50px"
          align="center">
          <template slot-scope="scope" >
            <template v-if="scope.row.agents.data.length" >
              <el-tag
                v-for="item in scope.row.agents.data"
                :key="item.id"
                style="margin-right: 3px;">
                {{ item.name + ' ' + item.surname }}
              </el-tag>
            </template>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('project.productType')"
          prop="productTypes"
          min-width="50px"
          align="center">
          <template slot-scope="scope" >
            <template v-if="scope.row.productTypes.data.length" >
              <el-tag
                v-for="item in scope.row.productTypes.data"
                :key="item.id"
                style="margin-right: 3px;">
                {{ item.name }}
              </el-tag>
            </template>
            <template v-else >
              {{ $t('noData') }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('project.creator')"
          prop="creator"
          min-width="30px"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.creator.name || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('createdAt')"
          prop="created_at"
          min-width="35px"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.created_at || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('updatedAt')"
          prop="updated_at"
          min-width="35px"
          align="center">
          <template slot-scope="scope">
            {{ scope.row.updated_at || $t('noData') }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('house.actions')"
          fixed="right"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetails(scope.row)">{{ $t('details') }}</el-button>
            <el-button type="text" size="small" @click="handleEdit(scope.row)" >{{ $t('edit') }}</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row.id)" >{{ $t('delete') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row v-if="projects.meta.pagination" type="flex" justify="center" >
        <el-col :span="7" >
          <el-pagination
            :current-page="tablePage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="tablePageSize"
            :total="projects.meta.pagination.total"
            style="margin-top: 15px"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handlePaginatorSizeChange"
            @current-change="handlePaginatorChange" />
        </el-col>
      </el-row>
    </el-card>

    <!-- 创建项目 -->
    <create-project-dialog />

    <!-- 项目详情 -->
    <project-details-dialog />

    <!-- 项目编辑 -->
    <edit-project-dialog />
  </div>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('project')

import CreateProjectDialog from './create'
import ProjectDetailsDialog from './details'
import EditProjectDialog from './edit'
import ProjectFilter from './filter'

import 'font-awesome/css/font-awesome.min.css'

export default {
  name: 'Projects',
  components: {
    CreateProjectDialog, ProjectDetailsDialog, EditProjectDialog, ProjectFilter
  },
  computed: {
    ...mapState([
      'projects',
      'tableLoading',
      'tablePage',
      'tablePageSize'
    ])
  },
  created() {
    const loading = this.$loading({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    this.fetchProjects()
      .catch(() => {
        this.$message({
          type: 'error',
          message: this.$t('pullingDataFailed')
        })
      })
    this.fetchProductTypes()
      .catch(() => {
        this.$message({
          type: 'error',
          message: this.$t('pullingDataFailed')
        })
      })
      .finally(() => {
        loading.close()
      })
  },
  methods: {
    ...mapMutations([
      'setCreateProjectDialogVisible',
      'setProjectDetailsDialogVisible',
      'setProjectDetailsData',
      'setEditProjectData',
      'setEditProjectDialogVisible'
    ]),
    ...mapActions([
      'fetchProjects',
      'fetchProductTypes',
      'changeTablePage',
      'changeTablePageSize',
      'deleteProject'
    ]),
    /**
     * 创建项目数据
     */
    handleCreate() {
      this.setCreateProjectDialogVisible(true)
    },
    /**
     * 查看详情
     */
    handleDetails(rowData) {
      this.setProjectDetailsData(rowData)
      this.setProjectDetailsDialogVisible(true)
    },
    /**
     * 编辑数据
     */
    handleEdit(rowData) {
      this.setEditProjectData(rowData)
      this.setEditProjectDialogVisible(true)
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
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.deleteProject({ id })
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
    /**
     * 分页大小改变
     */
    handlePaginatorSizeChange(pageSize) {
      this.changeTablePageSize(pageSize)
    },
    /**
     * 分页页数改变
     */
    handlePaginatorChange(page) {
      this.changeTablePage(page)
    }
  }
}
</script>

<style scoped lang="scss" >
  .project {
    &__container {
      padding: 20px;
    }
    &__list-header {
      position: relative;
    }
    &__add-btn {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
</style>

