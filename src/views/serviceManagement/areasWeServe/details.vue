<template>
  <el-dialog
    :title="$t('contentMGT.detailsOfServiceAreas')"
    :visible.sync="dialogVisible"
    top="40px"
    append-to-body
    class="area-details-dialog">
    <!-- 基本信息展示 -->
    <el-row>
      <el-col v-bind="{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }" >
        <dl>
          <dt>{{ $t('id') }}</dt>
          <dd>{{ serviceAreaDetailsData.id || $t('noData') }}</dd>
        </dl>
      </el-col>
      <el-col v-bind="{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }" >
        <dl>
          <dt>{{ $t('contentMGT.areaName') }}</dt>
          <dd>{{ serviceAreaDetailsData.name || $t('noData') }}</dd>
        </dl>
      </el-col>
      <el-col v-bind="{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }" >
        <dl>
          <dt>{{ $t('updatedAt') }}</dt>
          <dd>{{ serviceAreaDetailsData.created_at || $t('noData') }}</dd>
        </dl>
      </el-col>
      <el-col v-bind="{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }" >
        <dl>
          <dt>{{ $t('createdAt') }}</dt>
          <dd>{{ serviceAreaDetailsData.created_at || $t('noData') }}</dd>
        </dl>
      </el-col>
    </el-row>
    <!-- 主体内容展示 -->
    <h3 style="margin-top: 20px;" >{{ $t('contentMGT.introduction') }}</h3>
    <div class="area-details-dialog__introduction" v-html="serviceAreaDetailsData.introduction" >
      {{ $t('noData') }}
    </div>
    <!-- 图片相关展示 -->
    <el-row style="margin-top: 20px;" >
      <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }" >
        <h3>{{ $t('contentMGT.firstPicture') }}</h3>
        <template v-if="serviceAreaDetailsData.picture" >
          <img :src="serviceAreaDetailsData.picture" style="width: 381px;" alt="">
        </template>
        <template v-else >
          {{ $t('noData') }}
        </template>
      </el-col>
      <el-col v-bind="{ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }" >
        <h3 style="margin-top: 20px;" >{{ $t('contentMGT.topPicture') }}</h3>
        <template v-if="serviceAreaDetailsData.top_picture" >
          <img :src="serviceAreaDetailsData.top_picture" alt="">
        </template>
        <template v-else >
          {{ $t('noData') }}
        </template>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations } = createNamespacedHelpers('service')
export default {
  name: 'AreasWeServeDetailsDialog',
  computed: {
    ...mapState([
      'serviceAreaDetailsDialogVisible',
      'serviceAreaDetailsData'
    ]),
    dialogVisible: {
      get() {
        return this.serviceAreaDetailsDialogVisible
      },
      set(visible) {
        this.setServiceAreaDetailsDialogVisible(visible)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setServiceAreaDetailsDialogVisible'
    ])
  }
}
</script>

<style scoped lang="scss" >
@import '@/styles/dl.scss';
.areas-detial-dialog {
  &__introduction {

  }
}
</style>
