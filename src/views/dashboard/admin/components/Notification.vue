<template>
  <div class="notifications-wrapper" >
    <el-table v-loading="tableLoading" :data="notifications.data" class="notifications">
      <el-table-column
        :label="$t('message')"
        prop="message">
        <template slot-scope="scope" >
          {{ scope.row.messages }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NotificationList',
  data() {
    return {
      tableLoading: false
    }
  },
  computed: {
    ...mapState({
      notifications: state => state.user.notifications
    })
  },
  async created() {
    this.tableLoading = true
    try {
      await this.fetchNotifications()
    } catch (err) {
      this.$t('getDataError')
    } finally {
      this.tableLoading = false
    }
  },
  methods: {
    ...mapActions([
      'fetchNotifications'
    ])
  }
}
</script>

<style scoped lang="scss" >

</style>
