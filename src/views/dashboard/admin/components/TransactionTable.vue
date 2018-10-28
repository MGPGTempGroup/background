<template>
  <el-card>
    <div slot="header" class="transaction-table__card-header" >
      <h2 style="margin: 0px;" >{{ $t('table.lastComments') }}</h2>
    </div>
    <el-table :data="list" style="width: 100%;">
      <el-table-column :label="$t('table.id')" min-width="20">
        <template slot-scope="scope">
          1
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.name')" min-width="30">
        <template slot-scope="scope">
          Morgan
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.surname')" min-width="30">
        <template slot-scope="scope">
          Freeman
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.phone')" min-width="45">
        <template slot-scope="scope">
          1**********
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.email')" min-width="60">
        <template slot-scope="scope">
          ************@gmail.com
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.comments')" min-width="100">
        <template slot-scope="scope">
          Firstly I’d like to say that everyone I have been in contact with has been ver...
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.source')" min-width="50">
        <template slot-scope="scope">
          <el-tag type="primary">Project marketing</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.date')" min-width="30">
        <template slot-scope="scope">
          3 min ago
        </template>
      </el-table-column>
      <el-table-column label="Status" width="100" align="center">
        <template slot-scope="scope">
          <el-tag type="danger">untreated</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { fetchList } from '@/api/transaction'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    commentsFilter(str) {
      if (str.length > 31) { return str.substring(0, 30) + '...' }
      return str
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetchList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    }
  }
}
</script>

<style lang="scss" >
  .transaction-table__card-header {
    padding: 20px 0px;
  }
</style>

