<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

import adminDashboard from './admin'
import editorDashboard from './editor'

import { Loading } from 'element-ui'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  async beforeRouteEnter(to, from, next) {
    const loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    try {
      await store.dispatch('appStatistics/fetchAllStatistics')
    } catch (err) {
      this.$t('getDataError')
    } finally {
      loading.close()
      next()
    }
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
