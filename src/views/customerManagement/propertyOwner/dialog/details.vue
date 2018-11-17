<template>
  <el-dialog
    :visible.sync="visible"
    :title="$t('owner.details')"
    width="55%" >
    <el-row v-if="Object.keys(detailsData).length" :gutter="48" >
      <el-col v-bind="infoLayoutProps" >
        <dl>
          <dt>{{ $t('owner.name') }}</dt>
          <dd>{{ detailsData.name || $t('noData') }}</dd>
        </dl>
      </el-col>
      <el-col v-bind="infoLayoutProps" >
        <dl>
          <dt>{{ $t('owner.surname') }}</dt>
          <dd>{{ detailsData.surname }}</dd>
        </dl>
      </el-col>
      <el-col v-bind="infoLayoutProps" >
        <dl>
          <dt>{{ $t('owner.phone') }}</dt>
          <dd>{{ detailsData.phone || $t('noData') }}</dd>
        </dl>
      </el-col>
      <el-col v-bind="infoLayoutProps" >
        <dl>
          <dt>{{ $t('owner.email') }}</dt>
          <dd>{{ detailsData.email || $t('noData') }}</dd>
        </dl>
      </el-col>
      <el-col v-bind="infoLayoutProps" >
        <dl>
          <dt>{{ $t('owner.idCardNum') }}</dt>
          <dd>{{ detailsData.id_card || $t('noData') }}</dd>
        </dl>
      </el-col>
      <el-col v-bind="infoLayoutProps" >
        <dl>
          <dt>{{ $t('owner.wechat') }}</dt>
          <dd>{{ detailsData.wechat || $t('noData') }}</dd>
        </dl>
      </el-col>
      <el-col v-bind="infoLayoutProps" >
        <dl>
          <dt>{{ $t('owner.identity') }}</dt>
          <dd>{{ detailsData.identity && detailsData.identity.name }}</dd>
        </dl>
      </el-col>
      <el-col v-bind="infoLargeLayoutProps" >
        <dl>
          <dt>{{ $t('owner.address') }}</dt>
          <dd>{{ detailsData.address.join('/') || $t('noData') }}</dd>
        </dl>
      </el-col>
      <el-col v-bind="infoLayoutProps" >
        <dl>
          <dt>{{ $t('createdAt') }}</dt>
          <dd>{{ detailsData.created_at }}</dd>
        </dl>
      </el-col>
      <el-col v-bind="infoLayoutProps" >
        <dl>
          <dt>{{ $t('updatedAt') }}</dt>
          <dd>{{ detailsData.updated_at }}</dd>
        </dl>
      </el-col>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="visible = false">{{ $t('close') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('propertyOwner')
export default {
  name: 'PropertyOwnerDetailsDialog',
  data() {
    return {
      infoLayoutProps: {
        xs: 24, sm: 12, md: 12, lg: 8, xl: 6
      },
      infoLargeLayoutProps: {
        xs: 24, sm: 16, md: 16, lg: 12, xl: 12
      }
    }
  },
  computed: {
    ...mapState(['detailsData']),
    visible: {
      get() {
        return this.$store.state.propertyOwner.detailsDialogVisible
      },
      set(visible) {
        this.setDetailsDialogVisible({ visible })
      }
    }
  },
  methods: {
    ...mapMutations([
      'setDetailsDialogVisible'
    ])
  }
}
</script>

<style lang="scss" scoped >
  @import '@/styles/dl.scss';
</style>

